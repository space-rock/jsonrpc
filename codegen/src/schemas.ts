import fs from 'fs/promises';
import path from 'path';
import {
  InterfaceDeclaration,
  Project,
  SyntaxKind,
  TypeAliasDeclaration,
  TypeNode,
} from 'ts-morph';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Type mappings for primitive types
const TYPE_MAPPINGS = {
  string: 'z.string()',
  number: 'z.number()',
  boolean: 'z.boolean()',
  null: 'z.null()',
  undefined: 'z.undefined()',
  unknown: 'z.unknown()',
  any: 'z.any()',
  void: 'z.void()',
  bigint: 'z.bigint()',
  Date: 'z.date()',
} as const;

interface ParsedSchema {
  name: string;
  definition: string;
}

/**
 * Main function that generates Zod mini schemas from TypeScript types.
 * Handles errors gracefully and exits on critical failures.
 *
 * This generator uses z.lazy() for all type references to avoid dependency resolution
 * complexities and ensure small bundle size.
 */
async function generateSchemasMain() {
  try {
    console.log('🚀 Generating Zod v4 mini schemas...');

    const typesPath = path.resolve(
      __dirname,
      '../../packages/types/src/types.ts',
    );
    const outputPath = path.resolve(
      __dirname,
      '../../packages/types/src/schemas.ts',
    );

    const typesContent = await fs.readFile(typesPath, 'utf-8');
    const schemas = await parseTypes(typesContent);
    const schemasContent = generateSchemasFileContent(schemas);

    await fs.writeFile(outputPath, schemasContent);

    console.log(
      `✅ Successfully generated ${schemas.length} Zod mini schemas at: ${outputPath}`,
    );
  } catch (error) {
    console.error('❌ Error generating Zod mini schemas:', error);
    process.exit(1);
  }
}

/**
 * Parse TypeScript types and generate schemas.
 * Creates a TypeScript project in memory, analyzes the source file,
 * and processes each type alias and interface to generate corresponding
 * Zod mini schemas. Collects all type names first to handle references properly.
 *
 * @param typesContent - The content of the TypeScript types file
 * @returns Array of parsed schemas with names and definitions
 */
async function parseTypes(typesContent: string): Promise<ParsedSchema[]> {
  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      strictNullChecks: true,
    },
  });

  const sourceFile = project.createSourceFile('types.ts', typesContent);
  const schemas: ParsedSchema[] = [];
  const allTypeNames = new Set<string>();

  // Collect all type names
  const typeAliases = sourceFile.getTypeAliases();
  const interfaces = sourceFile.getInterfaces();

  for (const typeDecl of [...typeAliases, ...interfaces]) {
    const typeName = typeDecl.getName();
    if (!shouldSkipType(typeName)) {
      allTypeNames.add(typeName);
    }
  }

  console.log(`📋 Found ${allTypeNames.size} types to process`);

  // Generate schemas for each type
  for (const typeDecl of [...typeAliases, ...interfaces]) {
    const typeName = typeDecl.getName();

    if (shouldSkipType(typeName)) {
      continue;
    }

    try {
      const definition = generateSchemaForType(typeDecl, allTypeNames);
      if (definition) {
        schemas.push({
          name: typeName,
          definition: definition,
        });
      }
    } catch (error) {
      console.error(
        `❌ Failed to process type ${typeName}:`,
        (error as Error).message,
      );
      // Fail generation instead of using fallbacks
      process.exit(1);
    }
  }

  return schemas;
}

/**
 * Generate schema for a single type.
 * Determines the kind of type declaration (interface or type alias)
 * and delegates to the appropriate generator function.
 *
 * @param typeDecl - The type declaration to process
 * @param allTypeNames - Set of all type names for reference resolution
 * @returns The generated schema definition as a string, or null if generation failed
 */
function generateSchemaForType(
  typeDecl: TypeAliasDeclaration | InterfaceDeclaration,
  allTypeNames: Set<string>,
): string | null {
  if (typeDecl.getKind() === SyntaxKind.InterfaceDeclaration) {
    return generateInterfaceSchema(
      typeDecl as InterfaceDeclaration,
      allTypeNames,
    );
  } else {
    const typeNode = (typeDecl as TypeAliasDeclaration).getTypeNode();
    if (!typeNode) return null;
    return generateSchemaFromTypeNode(typeNode, allTypeNames);
  }
}

/**
 * Generate interface schema definition.
 * Processes each property of the interface, determines if it's optional,
 * and generates the corresponding Zod object schema with proper property types.
 *
 * @param interfaceDecl - The interface declaration to process
 * @param allTypeNames - Set of all type names for reference resolution
 * @returns The generated Zod object schema as a string
 */
function generateInterfaceSchema(
  interfaceDecl: InterfaceDeclaration,
  allTypeNames: Set<string>,
): string {
  const properties: string[] = [];

  for (const prop of interfaceDecl.getProperties()) {
    const propName = prop.getName();
    const isOptional = prop.hasQuestionToken();
    const typeNode = prop.getTypeNode();

    if (!typeNode) {
      throw new Error(`Property ${propName} has no type node`);
    }

    let propSchema = generateSchemaFromTypeNode(typeNode, allTypeNames);

    // Use z.optional wrapper for optional properties
    if (isOptional) {
      propSchema = `z.optional(${propSchema})`;
    }

    properties.push(`  ${propName}: ${propSchema}`);
  }

  return `z.object({\n${properties.join(',\n')}\n})`;
}

/**
 * Generate schema from TypeScript type node.
 * Recursively processes type nodes based on their kind (primitive, array, union, etc.)
 * and generates the corresponding Zod schema. Handles complex types including unions,
 * intersections, literals, and nested objects.
 *
 * This is the core type conversion function that maps TypeScript type syntax to
 * Zod mini schema definitions.
 *
 * @param typeNode - The TypeScript type node to process
 * @param allTypeNames - Set of all type names for reference resolution
 * @returns The generated Zod schema as a string
 * @throws Error if an unsupported type pattern is encountered
 */
function generateSchemaFromTypeNode(
  typeNode: TypeNode,
  allTypeNames: Set<string>,
): string {
  const typeText = typeNode.getText().trim();

  // Handle primitive types
  if (typeText in TYPE_MAPPINGS) {
    return TYPE_MAPPINGS[typeText as keyof typeof TYPE_MAPPINGS];
  }

  // Handle custom types - always use z.lazy to avoid forward reference issues
  if (allTypeNames.has(typeText)) {
    return `${typeText}Schema`;
  }

  // Handle arrays
  if (typeNode.getKind() === SyntaxKind.ArrayType) {
    const arrayTypeNode = typeNode as any;
    const elementTypeNode = arrayTypeNode.getElementTypeNode();
    if (!elementTypeNode) {
      throw new Error(`Array type has no element type: ${typeText}`);
    }
    const elementSchema = generateSchemaFromTypeNode(
      elementTypeNode,
      allTypeNames,
    );
    return `z.array(${elementSchema})`;
  }

  // Handle unions
  if (typeNode.getKind() === SyntaxKind.UnionType) {
    const unionTypeNode = typeNode as any;
    const unionTypes: string[] = [];

    for (const memberType of unionTypeNode.getTypeNodes()) {
      const memberSchema = generateSchemaFromTypeNode(memberType, allTypeNames);
      unionTypes.push(memberSchema);
    }

    if (unionTypes.length === 0) {
      throw new Error(`Union type has no members: ${typeText}`);
    }

    if (unionTypes.length === 1) {
      return unionTypes[0]!;
    }

    return `z.union([${unionTypes.join(', ')}])`;
  }

  // Handle literal types
  if (typeNode.getKind() === SyntaxKind.LiteralType) {
    const literalTypeNode = typeNode as any;
    const literal = literalTypeNode.getLiteral();

    if (literal.getKind() === SyntaxKind.StringLiteral) {
      return `z.literal(${literal.getText()})`;
    }
    if (literal.getKind() === SyntaxKind.NumericLiteral) {
      return `z.literal(${literal.getText()})`;
    }
    if (
      literal.getKind() === SyntaxKind.TrueKeyword ||
      literal.getKind() === SyntaxKind.FalseKeyword
    ) {
      return `z.literal(${literal.getText()})`;
    }
  }

  // Handle type references (generic types like Array<T>, etc.)
  if (typeNode.getKind() === SyntaxKind.TypeReference) {
    const typeRefNode = typeNode as any;
    const typeName = typeRefNode.getTypeName().getText();

    if (typeName === 'Array') {
      const typeArgs = typeRefNode.getTypeArguments();
      if (typeArgs.length === 0) {
        throw new Error(
          `Array type reference has no type arguments: ${typeText}`,
        );
      }
      const elementSchema = generateSchemaFromTypeNode(
        typeArgs[0],
        allTypeNames,
      );
      return `z.array(${elementSchema})`;
    }

    if (allTypeNames.has(typeName)) {
      return `${typeName}Schema`;
    }
  }

  // Handle intersection types
  if (typeNode.getKind() === SyntaxKind.IntersectionType) {
    const intersectionNode = typeNode as any;
    const intersectionTypes: string[] = [];

    for (const memberType of intersectionNode.getTypeNodes()) {
      const memberSchema = generateSchemaFromTypeNode(memberType, allTypeNames);
      intersectionTypes.push(memberSchema);
    }

    if (intersectionTypes.length === 0) {
      throw new Error(`Intersection type has no members: ${typeText}`);
    }

    if (intersectionTypes.length === 1) {
      return intersectionTypes[0]!;
    }

    return `z.intersection(${intersectionTypes[0]}, ${intersectionTypes[1]})${intersectionTypes
      .slice(2)
      .map(t => `.and(${t})`)
      .join('')}`;
  }

  // Handle parenthesized types
  if (typeNode.getKind() === SyntaxKind.ParenthesizedType) {
    const parenthesizedNode = typeNode as any;
    const innerType = parenthesizedNode.getTypeNode();
    return generateSchemaFromTypeNode(innerType, allTypeNames);
  }

  // Handle object types
  if (typeNode.getKind() === SyntaxKind.TypeLiteral) {
    const typeLiteralNode = typeNode as any;
    const properties: string[] = [];

    for (const member of typeLiteralNode.getMembers()) {
      if (member.getKind() === SyntaxKind.PropertySignature) {
        const propName = member.getName();
        const propType = member.getTypeNode();

        if (!propName || !propType) {
          throw new Error(
            `Property has invalid structure: ${member.getText()}`,
          );
        }

        const isOptional = member.hasQuestionToken();
        let propSchema = generateSchemaFromTypeNode(propType, allTypeNames);

        if (isOptional) {
          propSchema = `z.optional(${propSchema})`;
        }

        properties.push(`  ${propName}: ${propSchema}`);
      }
    }

    return `z.object({\n${properties.join(',\n')}\n})`;
  }

  // If we can't handle it, fail instead of using fallbacks
  throw new Error(
    `Unsupported type pattern: ${typeText} (kind: ${SyntaxKind[typeNode.getKind()]})`,
  );
}

/**
 * Check if a type should be skipped during schema generation.
 * Filters out internal utility types, types with special prefixes,
 * and specific types that shouldn't have schemas generated.
 *
 * @param typeName - The name of the type to check
 * @returns Boolean indicating whether the type should be skipped
 */
function shouldSkipType(typeName: string): boolean {
  // Skip internal/utility types
  return (
    typeName.startsWith('_') ||
    typeName.includes('Internal') ||
    typeName === 'JsonRpcSuccessResponse' ||
    typeName === 'JsonRpcErrorResponse'
  );
}

/**
 * Generate the complete schemas file content.
 * Creates a standardized file header and formats all the schema
 * definitions with proper imports and exports. Uses z.lazy for
 * all schema definitions to handle circular references gracefully.
 *
 * @param schemas - Array of parsed schemas with names and definitions
 * @returns The complete file content as a string
 */
function generateSchemasFileContent(schemas: ParsedSchema[]): string {
  const header = `/**
 * This file was auto-generated from TypeScript types.
 * Do not make direct changes to the file.
 */

import { z } from 'zod/mini';
import type * as t from './types'

`;

  // Generate schema definitions using the ts-to-zod pattern without type annotations
  const schemaDefinitions = schemas
    .map(schema => {
      return `export const ${schema.name}Schema: z.ZodMiniType<t.${schema.name}> = /* @__PURE__ */ z.lazy(\n  () => ${schema.definition},\n);`;
    })
    .join('\n\n');

  return header + schemaDefinitions + '\n';
}

// Run the generator
generateSchemasMain();

export { generateSchemasMain };
