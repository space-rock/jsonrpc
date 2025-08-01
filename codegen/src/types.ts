import fs from 'fs/promises';
import path, { join } from 'path';
import {
  IndexedAccessTypeNode,
  InterfaceDeclaration,
  Node,
  Project,
  PropertySignature,
  SourceFile,
  SyntaxKind,
  ts,
  TypeLiteralNode,
} from 'ts-morph';

/**
 * Converts a snake_case string to camelCase.
 */
function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Transforms property names in a type node from snake_case to camelCase.
 * Recursively processes nested type structures.
 */
function transformToCamelCase(node: Node): void {
  if (Node.isTypeLiteral(node)) {
    // Transform properties of type literals
    node.getProperties().forEach(prop => {
      const name = prop.getName();
      const camelName = snakeToCamel(name);
      if (name !== camelName) {
        // For quoted property names, we need to update them properly
        if (name.startsWith('"') && name.endsWith('"')) {
          const unquotedName = name.slice(1, -1);
          const camelUnquoted = snakeToCamel(unquotedName);
          prop.rename(`"${camelUnquoted}"`);
        } else {
          prop.rename(camelName);
        }
      }
      // Recursively transform the property type
      const typeNode = prop.getTypeNode();
      if (typeNode) {
        transformToCamelCase(typeNode);
      }
    });
  } else if (Node.isInterfaceDeclaration(node)) {
    // Transform properties of interfaces
    node.getProperties().forEach(prop => {
      const name = prop.getName();
      const camelName = snakeToCamel(name);
      if (name !== camelName) {
        prop.rename(camelName);
      }
      // Recursively transform the property type
      const typeNode = prop.getTypeNode();
      if (typeNode) {
        transformToCamelCase(typeNode);
      }
    });
  } else if (Node.isTypeReference(node)) {
    // For type references, we need to transform their type arguments
    node.getTypeArguments().forEach(arg => transformToCamelCase(arg));
  } else if (Node.isUnionTypeNode(node) || Node.isIntersectionTypeNode(node)) {
    // Transform each type in unions and intersections
    node.getTypeNodes().forEach(typeNode => transformToCamelCase(typeNode));
  } else if (Node.isArrayTypeNode(node)) {
    // Transform array element type
    transformToCamelCase(node.getElementTypeNode());
  } else if (Node.isMappedTypeNode(node)) {
    // Transform the type node of mapped types
    const typeNode = node.getTypeNode();
    if (typeNode) {
      transformToCamelCase(typeNode);
    }
  } else if (Node.isTypeAliasDeclaration(node)) {
    // Transform type alias type node
    const typeNode = node.getTypeNode();
    if (typeNode) {
      transformToCamelCase(typeNode);
    }
  } else if (Node.isParenthesizedTypeNode(node)) {
    // Transform the inner type of parenthesized types
    const typeNode = node.getTypeNode();
    if (typeNode) {
      transformToCamelCase(typeNode);
    }
  } else if (Node.isPropertySignature(node)) {
    // Handle property signatures (found in object literal types)
    const name = node.getName();
    const camelName = snakeToCamel(name);
    if (name !== camelName) {
      node.rename(camelName);
    }
    const typeNode = node.getTypeNode();
    if (typeNode) {
      transformToCamelCase(typeNode);
    }
  } else if (Node.isObjectLiteralExpression(node)) {
    // Handle object literal expressions
    node.getProperties().forEach(prop => {
      if (
        Node.isPropertyAssignment(prop) ||
        Node.isShorthandPropertyAssignment(prop)
      ) {
        const name = prop.getName();
        if (name) {
          const camelName = snakeToCamel(name);
          if (name !== camelName) {
            prop.rename(camelName);
          }
        }
      }
    });
  }

  // For any node type, also check and transform all descendant type literals
  // This catches nested object types that might be missed by the above specific handlers
  node.getDescendantsOfKind(ts.SyntaxKind.TypeLiteral).forEach(typeLiteral => {
    typeLiteral.getProperties().forEach(prop => {
      const name = prop.getName();
      const camelName = snakeToCamel(name);
      if (name !== camelName) {
        if (name.startsWith('"') && name.endsWith('"')) {
          const unquotedName = name.slice(1, -1);
          const camelUnquoted = snakeToCamel(unquotedName);
          prop.rename(`"${camelUnquoted}"`);
        } else {
          prop.rename(camelName);
        }
      }
    });
  });
}

/**
 * Information about an RPC method extracted from the OpenAPI specification.
 */
interface RpcMethodInfo {
  /** The RPC method name (e.g., "block", "status") */
  method: string;
  /** The name of the request schema type */
  requestSchemaName: string;
  /** The name of the response schema type */
  responseSchemaName: string;
}

/**
 * Main function that converts OpenAPI specification to TypeScript types.
 * Generates both original snake_case types and camelCase variants,
 * along with method mappings and schema validation functions.
 */
async function convertOpenAPIToTypes() {
  try {
    const { default: openapiTS } = await import('openapi-typescript');

    const inputPath = path.join(process.cwd(), 'openapi.json');
    const typesOutputPath = path.join(
      process.cwd(),
      '../packages/types/src/types.ts',
    );
    const mapOutputPath = path.join(
      process.cwd(),
      '../packages/types/src/mappings.ts',
    );

    console.log('🚀 Converting OpenAPI spec to TypeScript types...');

    const spec = JSON.parse(await fs.readFile(inputPath, 'utf-8'));

    // Generate types from the OpenAPI spec
    const result = await openapiTS(spec, {
      excludeDeprecated: true,
      rootTypes: true,
      rootTypesNoSchemaPrefix: true,
    });

    let outputString: string;
    if (typeof result === 'string') {
      outputString = result;
    } else if (Array.isArray(result)) {
      const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
      const sourceFile = ts.createSourceFile(
        'temp.ts',
        '',
        ts.ScriptTarget.Latest,
        false,
        ts.ScriptKind.TS,
      );
      outputString = result
        .map(node =>
          printer.printNode(ts.EmitHint.Unspecified, node, sourceFile),
        )
        .join('\n\n');
    } else {
      throw new Error('Unexpected output format from openapi-typescript');
    }

    // Use ts-morph to process and enhance the generated types into three separate files
    const { map, types } = await processOpenApiTypesWithTsMorph(
      outputString,
      spec,
    );

    await fs.writeFile(typesOutputPath, types);
    console.log(
      `✅ Successfully generated schema types at: ${typesOutputPath}`,
    );

    await fs.writeFile(mapOutputPath, map);
    console.log(`✅ Successfully generated method map at: ${mapOutputPath}`);
  } catch (error) {
    console.error('❌ Error converting OpenAPI spec:', error);
    process.exit(1);
  }
}

/**
 * Extracts RPC method information from the OpenAPI operations interface.
 * Parses request/response schema references and method names.
 * @param operationsInterface - The operations interface from OpenAPI spec
 * @param schemasType - The schemas type literal from components
 * @returns Array of RPC method information
 */
function extractRpcMethodInfo(
  operationsInterface: InterfaceDeclaration,
  schemasType: TypeLiteralNode,
): RpcMethodInfo[] {
  const methodInfos: RpcMethodInfo[] = [];

  operationsInterface.getProperties().forEach(operation => {
    const operationName = operation.getName();
    const operationType = operation.getTypeNode();
    if (!operationType || !TypeLiteralNode.isTypeLiteral(operationType)) {
      console.warn(
        `[WARN] Skipping operation '${operationName}' because its type is not a literal.`,
      );
      return;
    }

    try {
      const requestBodyProp = operationType.getPropertyOrThrow('requestBody');
      const requestBodyNode = requestBodyProp.getTypeNodeOrThrow(
        `[${operationName}] Could not get TypeNode for 'requestBody'.`,
      );

      if (!TypeLiteralNode.isTypeLiteral(requestBodyNode))
        throw new Error(
          `[${operationName}] 'requestBody' is not a type literal.`,
        );

      const requestContentProp = requestBodyNode.getPropertyOrThrow('content');
      const requestContentNode = requestContentProp.getTypeNodeOrThrow(
        `[${operationName}] Could not get TypeNode for 'requestBody.content'.`,
      );

      if (!TypeLiteralNode.isTypeLiteral(requestContentNode))
        throw new Error(
          `[${operationName}] 'requestBody.content' is not a type literal.`,
        );

      const requestJsonProp =
        requestContentNode.getPropertyOrThrow('"application/json"');
      const requestJsonNode = requestJsonProp.getTypeNodeOrThrow(
        `[${operationName}] Could not get TypeNode for request '"application/json"'.`,
      );

      if (!Node.isIndexedAccessTypeNode(requestJsonNode))
        throw new Error(
          `[${operationName}] Request content type is not an IndexedAccessTypeNode.`,
        );

      const responsesProp = operationType.getPropertyOrThrow('responses');
      const responsesNode = responsesProp.getTypeNodeOrThrow(
        `[${operationName}] Could not get TypeNode for 'responses'.`,
      );

      if (!TypeLiteralNode.isTypeLiteral(responsesNode))
        throw new Error(
          `[${operationName}] 'responses' is not a type literal.`,
        );

      const response200Prop = responsesNode.getPropertyOrThrow('200');
      const response200Node = response200Prop.getTypeNodeOrThrow();

      if (!TypeLiteralNode.isTypeLiteral(response200Node))
        throw new Error(
          `[${operationName}] '200' response is not a type literal.`,
        );

      const responseContentProp = response200Node.getPropertyOrThrow('content');
      const responseContentNode = responseContentProp.getTypeNodeOrThrow();

      if (!TypeLiteralNode.isTypeLiteral(responseContentNode))
        throw new Error(
          `[${operationName}] '200 response content' is not a type literal.`,
        );

      const responseJsonProp =
        responseContentNode.getPropertyOrThrow('"application/json"');
      const responseJsonNode = responseJsonProp.getTypeNodeOrThrow();

      if (!Node.isIndexedAccessTypeNode(responseJsonNode))
        throw new Error(
          `[${operationName}] 200 response content type is not an IndexedAccessTypeNode.`,
        );

      const requestSchemaName = requestJsonNode
        .getIndexTypeNode()
        .getText()
        .slice(1, -1);

      const responseSchemaName = responseJsonNode
        .getIndexTypeNode()
        .getText()
        .slice(1, -1);

      const requestSchema = schemasType
        .getPropertyOrThrow(requestSchemaName)
        .getTypeNodeOrThrow();

      if (!TypeLiteralNode.isTypeLiteral(requestSchema)) {
        throw new Error(
          `[${operationName}] Request schema '${requestSchemaName}' is not a type literal.`,
        );
      }

      const methodName = requestSchema
        .getPropertyOrThrow('method')
        .getTypeNodeOrThrow()
        .getText()
        .slice(1, -1);

      methodInfos.push({
        method: methodName,
        requestSchemaName,
        responseSchemaName,
      });
    } catch (error) {
      console.error(`Error processing operation '${operationName}':`, error);
    }
  });

  return methodInfos;
}

/**
 * Generates Zod schema mappings for RPC methods.
 * Creates a methodSchemas object that maps method names to their request/response schemas,
 * along with helper functions for schema retrieval.
 * @param operationsInterface - The operations interface from OpenAPI spec
 * @param schemasType - The schemas type literal from components
 * @param schemaOutputFile - The output file to write schema mappings to
 * @returns true if mappings were generated successfully
 */
function generateZodSchemaMappings(
  operationsInterface: InterfaceDeclaration,
  schemasType: TypeLiteralNode,
): boolean {
  const methodInfos = extractRpcMethodInfo(operationsInterface, schemasType);

  if (methodInfos.length === 0) return false;

  const usedSchemas = new Set<string>();
  const methodMapping: {
    method: string;
    requestSchema: string;
    responseSchema: string;
  }[] = [];

  methodInfos.forEach(({ method, requestSchemaName, responseSchemaName }) => {
    const requestSchema = `${requestSchemaName}Schema`;
    const responseSchema = `${responseSchemaName}Schema`;

    usedSchemas.add(requestSchema);
    usedSchemas.add(responseSchema);

    methodMapping.push({
      method,
      requestSchema,
      responseSchema,
    });
  });

  // Note: We no longer generate methodSchemas, getRequestSchema, or getResponseSchema
  // as these are handled by individual method files now
  // This function is kept for potential future use but currently does minimal work

  return true;
}

/**
 * Generates individual method files for each RPC method.
 * Each file exports a function that calls the RPC client with the appropriate schemas.
 * @param operationsInterface - The operations interface from OpenAPI spec
 * @param schemasType - The schemas type literal from components
 * @param project - The ts-morph project instance
 * @param basePath - The base path for output files
 * @returns true if method files were generated successfully
 */
async function generateMethodFiles(
  operationsInterface: InterfaceDeclaration,
  schemasType: TypeLiteralNode,
): Promise<boolean> {
  const methodInfos = extractRpcMethodInfo(operationsInterface, schemasType);

  if (methodInfos.length === 0) return false;

  // Create a separate project for method files that saves to disk
  const methodProject = new Project({
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
    },
  });

  // Create method directory if it doesn't exist
  const methodDir = path.join(process.cwd(), '../packages/client/src/methods');
  await fs.mkdir(methodDir, { recursive: true });

  for (const { method, requestSchemaName, responseSchemaName } of methodInfos) {
    const methodFile = methodProject.createSourceFile(
      join(methodDir, `${snakeToCamel(method)}.ts`),
      undefined,
      { overwrite: true },
    );

    // Add imports
    methodFile.addImportDeclaration({
      moduleSpecifier: '@space-rock/jsonrpc-types',
      namedImports: ['ApiParams', 'ApiResponse'],
      isTypeOnly: true,
    });

    methodFile.addImportDeclaration({
      moduleSpecifier: '@space-rock/jsonrpc-types',
      namedImports: [
        { name: `${requestSchemaName}Schema` },
        { name: `${responseSchemaName}Schema` },
      ],
    });

    methodFile.addImportDeclaration({
      moduleSpecifier: '../client',
      namedImports: ['RpcClient'],
      isTypeOnly: true,
    });

    // Add the method function
    methodFile.addFunction({
      name: snakeToCamel(method),
      isExported: true,
      isAsync: true,
      parameters: [
        { name: 'client', type: 'RpcClient' },
        { name: 'params', type: `ApiParams<'${method}'>` },
      ],
      returnType: `Promise<ApiResponse<'${method}'>>`,
      statements: writer => {
        writer.writeLine(
          `return client.call('${method}', params, ${requestSchemaName}Schema, ${responseSchemaName}Schema);`,
        );
      },
    });

    await methodFile.save();
  }

  // Create index file for method exports
  const indexFile = methodProject.createSourceFile(
    join(methodDir, 'index.ts'),
    undefined,
    { overwrite: true },
  );

  methodInfos
    .sort((a, b) => a.method.localeCompare(b.method))
    .forEach(({ method }) => {
      indexFile.addExportDeclaration({
        moduleSpecifier: `./${snakeToCamel(method)}`,
        namedExports: [{ name: snakeToCamel(method) }],
      });
    });

  await indexFile.save();

  return true;
}

/**
 * Generates TypeScript type mappings for RPC methods.
 * Creates a MethodMap type that maps method names to their request/response types,
 * along with helper types for type-safe API interactions.
 * @param operationsInterface - The operations interface from OpenAPI spec
 * @param schemasType - The schemas type literal from components
 * @param mapOutputFile - The output file to write type mappings to
 * @returns true if mappings were generated successfully
 */
function generateTypeScriptMethodMappings(
  operationsInterface: InterfaceDeclaration,
  schemasType: TypeLiteralNode,
  mapOutputFile: SourceFile,
): boolean {
  const methodInfos = extractRpcMethodInfo(operationsInterface, schemasType);

  if (methodInfos.length === 0) return false;

  const usedTypes = new Set<string>();
  const methodMapping: {
    method: string;
    request: string;
    response: string;
  }[] = [];

  methodInfos.forEach(({ method, requestSchemaName, responseSchemaName }) => {
    usedTypes.add(requestSchemaName);
    usedTypes.add(responseSchemaName);

    methodMapping.push({
      method,
      request: requestSchemaName,
      response: responseSchemaName,
    });
  });

  // Add type imports
  mapOutputFile.addImportDeclaration({
    moduleSpecifier: './types',
    namedImports: Array.from(usedTypes).map(type => ({ name: type })),
    isTypeOnly: true,
  });

  const methodMapObjectString = methodMapping
    .sort((a, b) => a.method.localeCompare(b.method))
    .map(
      m =>
        `  "${m.method}": {\n    request: ${m.request};\n    response: ${m.response};\n  };`,
    )
    .join('\n');

  mapOutputFile.addTypeAlias({
    isExported: true,
    name: 'MethodMap',
    type: `{\n${methodMapObjectString}\n}`,
  });

  mapOutputFile.addTypeAlias({
    isExported: true,
    name: 'RpcMethod',
    type: 'keyof MethodMap',
  });

  // Add helper type aliases
  mapOutputFile.addTypeAlias({
    isExported: true,
    name: 'ApiRequest',
    type: "MethodMap[M]['request']",
    typeParameters: [{ constraint: 'RpcMethod', name: 'M' }],
  });

  mapOutputFile.addTypeAlias({
    isExported: true,
    name: 'ApiParams',
    type: "MethodMap[M]['request']['params']",
    typeParameters: [{ constraint: 'RpcMethod', name: 'M' }],
  });

  mapOutputFile.addTypeAlias({
    isExported: true,
    name: 'ApiResponse',
    type: "MethodMap[M]['response']",
    typeParameters: [{ constraint: 'RpcMethod', name: 'M' }],
  });

  return true;
}

/**
 * Makes the 'cause' property optional in RpcError types within the AST.
 * This is a specific fix for NEAR RPC error structures.
 * @param node - The AST node to process
 */
function makeRpcErrorCauseOptional(node: Node) {
  const propertiesToModify: PropertySignature[] = [];
  node
    .getDescendantsOfKind(SyntaxKind.IntersectionType)
    .forEach(intersection => {
      intersection.getDescendantsOfKind(SyntaxKind.UnionType).forEach(union => {
        union.getTypeNodes().forEach(member => {
          if (TypeLiteralNode.isTypeLiteral(member)) {
            const causeProperty = member.getProperty('cause');
            if (causeProperty && !causeProperty.hasQuestionToken()) {
              propertiesToModify.push(causeProperty);
            }
          }
        });
      });
    });
  propertiesToModify.forEach(prop => prop.setHasQuestionToken(true));
}

/**
 * Fixes anyOf types that have properties by converting them to intersection types.
 * This handles cases where a schema has both anyOf and properties, which should be
 * represented as an intersection of the properties with a union of the anyOf schemas.
 * @param originalTypeText - The original type text from openapi-typescript
 * @param schemaName - The name of the schema being processed
 * @param openApiSpec - The original OpenAPI specification
 * @returns The fixed type text
 */
function fixAnyOfWithProperties(
  originalTypeText: string,
  schemaName: string,
  openApiSpec: any,
): string {
  // Get the schema definition from the OpenAPI spec
  const schemaDef = openApiSpec?.components?.schemas?.[schemaName];
  if (!schemaDef) {
    return originalTypeText;
  }

  // Check if this schema has both anyOf and properties
  if (schemaDef.anyOf && schemaDef.properties && schemaDef.type === 'object') {
    // Check if the original type is a union (which is the problem we're trying to fix)
    if (originalTypeText.includes('|')) {
      // Parse the union type and separate the properties from the anyOf types
      const parts = originalTypeText.split('|').map(part => part.trim());

      if (parts.length > 1) {
        // Find the part that represents the properties (it should be the first object literal)
        const propertiesPart = parts.find(
          part => part.startsWith('{') && part.includes(':'),
        );

        // Get the remaining parts that represent the anyOf types
        const anyOfParts = parts.filter(part => part !== propertiesPart);

        if (propertiesPart && anyOfParts.length > 0) {
          // Transform to intersection type
          const anyOfUnion = anyOfParts.join(' | ');
          return `${propertiesPart} & (${anyOfUnion})`;
        }
      }
    }
  }

  return originalTypeText;
}

function applyTypePatches(originalTypeText: string): string {
  // Replace Record<string, never> with {} for empty object types
  if (originalTypeText.includes('Record<string, never>')) {
    return '{}';
  }

  return originalTypeText;
}

/**
 * Processes the OpenAPI-generated TypeScript content using ts-morph.
 * Generates both original types and camelCase variants, along with utility types.
 * @param content - The raw TypeScript content from openapi-typescript
 * @param openApiSpec - The original OpenAPI specification
 * @returns An object containing the processed types and mappings
 */
async function processOpenApiTypesWithTsMorph(
  content: string,
  openApiSpec: any,
): Promise<{ map: string; types: string }> {
  const project = new Project({
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
    },
  });

  const initialSourceFile = project.createSourceFile('temp.ts', content);

  const componentsInterface =
    initialSourceFile.getInterfaceOrThrow('components');
  const operationsInterface =
    initialSourceFile.getInterfaceOrThrow('operations');
  const schemasType = componentsInterface
    .getPropertyOrThrow('schemas')
    .getTypeNodeOrThrow();

  if (!TypeLiteralNode.isTypeLiteral(schemasType)) {
    throw new Error('components.schemas is not a type literal');
  }

  const typesOutputFile = project.createSourceFile('openapi-types.ts', '');
  const mapOutputFile = project.createSourceFile('rpc-method-map.ts', '');

  const header = `/**
 * This file was auto-generated by a script.
 * Do not make direct changes to the file.
 */\n\n`;

  typesOutputFile.insertText(0, header);
  mapOutputFile.insertText(0, header);

  schemasType.getProperties().forEach(property => {
    const name = property.getName();
    const typeNode = property.getTypeNode();
    if (typeNode) {
      const tempFile = project.createSourceFile(
        `${name}.ts`,
        `type Temp = ${typeNode.getText()}`,
      );
      const typeAlias = tempFile.getTypeAliasOrThrow('Temp');

      transformComponentReferences(typeAlias);
      if (name === 'RpcError') makeRpcErrorCauseOptional(typeAlias);

      // Transform all property names to camelCase
      const typeAliasTypeNode = typeAlias.getTypeNodeOrThrow();
      transformToCamelCase(typeAliasTypeNode);

      const originalTypeText = typeAliasTypeNode.getText();

      // Apply type patches for specific request types
      let patchedTypeText = applyTypePatches(originalTypeText);

      // Fix anyOf with properties issue
      patchedTypeText = fixAnyOfWithProperties(
        patchedTypeText,
        name,
        openApiSpec,
      );

      typesOutputFile.addTypeAlias({
        isExported: true,
        name,
        type: patchedTypeText,
      });

      tempFile.delete();
    }
  });

  generateTypeScriptMethodMappings(
    operationsInterface,
    schemasType,
    mapOutputFile,
  );
  generateZodSchemaMappings(operationsInterface, schemasType);

  // Generate method files
  await generateMethodFiles(operationsInterface, schemasType);

  return {
    map: mapOutputFile.getFullText(),
    types: typesOutputFile.getFullText(),
  };
}

/**
 * Transforms OpenAPI component schema references from the verbose
 * `components["schemas"]["TypeName"]` format to simple `TypeName` references.
 * @param node - The AST node containing component references to transform
 */
function transformComponentReferences(node: Node) {
  while (true) {
    const indexedAccess = node.getFirstDescendant(
      n =>
        Node.isIndexedAccessTypeNode(n) &&
        n.getText().startsWith('components["schemas"]'),
    ) as IndexedAccessTypeNode | undefined;
    if (indexedAccess == null) break;
    const match = indexedAccess
      .getText()
      .match(/components\["schemas"\]\["([^"]+)"\]/);
    if (match && match[1]) indexedAccess.replaceWithText(match[1]);
    else break;
  }
}

// Run the conversion process
convertOpenAPIToTypes();
