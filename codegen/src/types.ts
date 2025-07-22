import fs from 'fs/promises';
import path from 'path';
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
  VariableDeclarationKind,
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
    const { map, types } = await processOpenApiTypesWithTsMorph(outputString);

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
  schemaOutputFile: SourceFile,
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

  // Add import for Zod
  schemaOutputFile.insertImportDeclaration(0, {
    moduleSpecifier: 'zod',
    namedImports: [{ name: 'z' }],
  });

  // Add schema imports
  schemaOutputFile.insertImportDeclaration(1, {
    moduleSpecifier: './schemas',
    namedImports: Array.from(usedSchemas).map(schema => ({ name: schema })),
  });

  const schemaMapEntries = methodMapping
    .sort((a, b) => a.method.localeCompare(b.method))
    .map(
      m =>
        `  "${m.method}": {\n    request: ${m.requestSchema},\n    response: ${m.responseSchema},\n  }`,
    )
    .join(',\n');

  schemaOutputFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        initializer: `{\n${schemaMapEntries}\n} as const`,
        name: 'methodSchemas',
      },
    ],
    isExported: true,
  });

  // Add helper functions for schema lookup
  schemaOutputFile.addFunction({
    isExported: true,
    name: 'getRequestSchema',
    parameters: [{ name: 'method', type: 'string' }],
    returnType: 'z.ZodSchema | undefined',
    statements:
      'return methodSchemas[method as keyof typeof methodSchemas]?.request;',
  });

  schemaOutputFile.addFunction({
    isExported: true,
    name: 'getResponseSchema',
    parameters: [{ name: 'method', type: 'string' }],
    returnType: 'z.ZodSchema | undefined',
    statements:
      'return methodSchemas[method as keyof typeof methodSchemas]?.response;',
  });

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
  mapOutputFile.insertImportDeclaration(0, {
    moduleSpecifier: './types',
    namedImports: Array.from(usedTypes).map(type => ({ name: type })),
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
 * @returns An object containing the processed types and mappings
 */
async function processOpenApiTypesWithTsMorph(
  content: string,
): Promise<{ map: string; types: string }> {
  const project = new Project({
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
    },
    useInMemoryFileSystem: true,
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
 * Generated at: ${new Date().toISOString()}
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
      const patchedTypeText = applyTypePatches(originalTypeText);

      typesOutputFile.addTypeAlias({
        isExported: true,
        name,
        type: patchedTypeText,
      });

      tempFile.delete();
    }
  });

  // No need for CamelCase utility types since all types are generated in camelCase

  generateTypeScriptMethodMappings(
    operationsInterface,
    schemasType,
    mapOutputFile,
  );
  generateZodSchemaMappings(operationsInterface, schemasType, mapOutputFile);

  typesOutputFile.formatText();
  mapOutputFile.formatText();

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
