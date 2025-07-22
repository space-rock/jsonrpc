#!/usr/bin/env tsx

import { ModuleKind, Project, ScriptTarget, SyntaxKind } from 'ts-morph';
import * as path from 'path';
import * as fs from 'fs';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

// Get current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the generated types file
const TYPES_FILE_PATH = path.resolve(
  __dirname,
  '../../packages/types/src/types.ts',
);

// Constants for output formatting
const CHECK = chalk.green('✓');
const CROSS = chalk.red('✗');

/**
 * Checks if a string follows camelCase or PascalCase convention
 * - camelCase: First character must be lowercase, no underscores
 * - PascalCase: First character must be uppercase, no underscores (allowed for variant names)
 *
 * @param str The string to check
 * @returns True if string follows the naming convention, false otherwise
 */
function isValidCasing(str: string): boolean {
  // Ignore quoted property names or non-string type names
  if (str.startsWith('"') || str.startsWith('[') || str.includes('`')) {
    return true;
  }

  // Remove optional property indicator
  if (str.endsWith('?')) {
    str = str.slice(0, -1);
  }

  // Check for snake_case (which is what we're trying to avoid)
  if (str.includes('_')) {
    return false;
  }

  // Allow both camelCase and PascalCase
  const validCaseRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
  return validCaseRegex.test(str);
}

/**
 * Checks if a property name appears to be a variant name in a discriminated union
 * Variant names typically start with uppercase letters
 *
 * @param name The property name to check
 * @returns True if the name appears to be a variant name
 */
function isLikelyVariantName(name: string): boolean {
  // Variant names typically start with uppercase letters
  return /^[A-Z][a-zA-Z0-9]*$/.test(name);
}

/**
 * Main function to validate all property names in the types file
 */
async function validateCamelCase() {
  console.log(chalk.blue('🔍 Validating camelCase in generated types...'));

  if (!fs.existsSync(TYPES_FILE_PATH)) {
    console.error(chalk.red(`Error: File not found at ${TYPES_FILE_PATH}`));
    process.exit(1);
  }

  const project = new Project({
    compilerOptions: {
      target: ScriptTarget.ES2020,
      module: ModuleKind.ESNext,
    },
  });

  const sourceFile = project.addSourceFileAtPath(TYPES_FILE_PATH);
  const nonCamelCaseProperties: { name: string; location: string }[] = [];

  // Find all property signatures (in interfaces and type literals)
  const propertySignatures = sourceFile.getDescendantsOfKind(
    SyntaxKind.PropertySignature,
  );

  // Find all property assignments (in object literals)
  const propertyAssignments = sourceFile.getDescendantsOfKind(
    SyntaxKind.PropertyAssignment,
  );

  // Check property signatures
  for (const prop of propertySignatures) {
    const name = prop.getName();
    // Allow PascalCase for likely variant names
    if (
      !isValidCasing(name) ||
      (!isLikelyVariantName(name) && !/^[a-z]/.test(name))
    ) {
      const lineNumber = prop.getStartLineNumber();
      nonCamelCaseProperties.push({
        name,
        location: `line ${lineNumber}`,
      });
    }
  }

  // Check property assignments
  for (const prop of propertyAssignments) {
    const name = prop.getName();
    // Allow PascalCase for likely variant names
    if (
      !isValidCasing(name) ||
      (!isLikelyVariantName(name) && !/^[a-z]/.test(name))
    ) {
      const lineNumber = prop.getStartLineNumber();
      nonCamelCaseProperties.push({
        name,
        location: `line ${lineNumber}`,
      });
    }
  }

  // Report results
  if (nonCamelCaseProperties.length === 0) {
    console.log(
      chalk.green(`${CHECK} All properties follow camelCase convention!`),
    );
    process.exit(0);
  } else {
    console.log(
      chalk.red(
        `${CROSS} Found ${nonCamelCaseProperties.length} properties that don't follow camelCase convention:`,
      ),
    );

    for (const { name, location } of nonCamelCaseProperties) {
      console.log(chalk.yellow(`  - "${name}" at ${location}`));
    }

    process.exit(1);
  }
}

// Run the validation
validateCamelCase().catch(error => {
  console.error(chalk.red('Error during validation:'), error);
  process.exit(1);
});
