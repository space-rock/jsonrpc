import fs from 'fs/promises';
import path from 'path';
import { generate } from 'ts-to-zod';

/**
 * Main function that generates Zod schemas from TypeScript types.
 * Reads the generated TypeScript types file and converts them to Zod validation schemas
 * using the ts-to-zod library. Handles errors and circular dependencies gracefully.
 */
async function generateZodSchemas() {
  try {
    const inputPath = path.join(
      process.cwd(),
      '../packages/types/src/types.ts',
    );
    const outputPath = path.join(
      process.cwd(),
      '../packages/types/src/schemas.ts',
    );

    console.log('🚀 Generating Zod schemas from TypeScript types...');

    // Read the processed TypeScript types from the types package
    const typesContent = await fs.readFile(inputPath, 'utf-8');

    // Generate Zod schemas using ts-to-zod with custom naming convention
    const { errors, getZodSchemasFile, hasCircularDependencies } = generate({
      getSchemaName: identifier => {
        // Generate schemas for Api-prefixed types (snake_case format)
        // These will validate the actual API format
        return identifier.startsWith('Api')
          ? `${identifier}Schema`
          : `${identifier}Schema`;
      },
      skipParseJSDoc: true,
      sourceText: typesContent,
    });

    // Report any types that couldn't be converted to Zod schemas
    if (errors.length > 0) {
      console.warn('⚠️  Some types could not be converted:');
      errors.forEach(error => {
        console.warn(`  - ${error}`);
      });
    }

    // Report circular dependencies which may affect schema validation
    if (hasCircularDependencies) {
      console.warn('⚠️  Circular dependencies detected in some schemas');
    }

    // Get the generated Zod schemas with relative import path to types
    const zodSchemasContent = getZodSchemasFile('./types');

    // Clean up and format the generated content
    const processedContent = cleanUpGeneratedZodContent(zodSchemasContent);

    await fs.writeFile(outputPath, processedContent);

    console.log(`✅ Successfully generated Zod schemas at: ${outputPath}`);
    console.log(`📊 Generated schemas with ${errors.length} conversion errors`);

    if (hasCircularDependencies) {
      console.log('⚠️  Note: Some schemas may have circular dependencies');
    }
  } catch (error) {
    console.error('❌ Error generating Zod schemas:', error);
    process.exit(1);
  }
}

/**
 * Cleans up and formats the generated Zod schemas content.
 * Adds proper header, removes duplicate imports, and fixes formatting issues
 * that may occur during the ts-to-zod generation process.
 * @param zodSchemasContent - The raw Zod schemas content from ts-to-zod
 * @returns The cleaned and formatted Zod schemas content ready for file output
 */
function cleanUpGeneratedZodContent(zodSchemasContent: string): string {
  // Add standardized header with generation timestamp
  const header = `/**
 * This file was auto-generated from TypeScript types using ts-to-zod.
 * Do not make direct changes to the file.
 */

import { z } from 'zod';

`;

  // Clean up the generated content by removing duplicates and fixing formatting
  const cleanedContent = zodSchemasContent
    // Remove the existing zod import since we add our own in the header
    .replace(/import { z } from ["']zod["'];?\n?/g, '')
    // Fix duplicate export keywords that sometimes occur during generation
    .replace(/export export const /g, 'export const ')
    // Clean up any remaining duplicate exports
    .replace(/export\s+export/g, 'export');

  return header + cleanedContent;
}

// Execute the Zod schema generation process
generateZodSchemas();
