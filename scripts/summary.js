#!/usr/bin/env node

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('\n🚀 NEAR JSON-RPC Project Summary\n');
console.log('='.repeat(50));

// Project Info
const rootPackage = JSON.parse(
  readFileSync(join(rootDir, 'package.json'), 'utf8'),
);
console.log('\n📦 Project Information:');
console.log(`  Name: ${rootPackage.name}`);
console.log(`  Version: ${rootPackage.version}`);
console.log(`  Package Manager: ${rootPackage.packageManager || 'pnpm'}`);

// Packages
console.log('\n📚 Packages:');
const packages = ['types', 'client'];
for (const pkg of packages) {
  const pkgPath = join(rootDir, 'packages', pkg, 'package.json');
  if (existsSync(pkgPath)) {
    const pkgData = JSON.parse(readFileSync(pkgPath, 'utf8'));
    console.log(`  - ${pkgData.name} (v${pkgData.version})`);
    console.log(`    ${pkgData.description}`);
  }
}

// Scripts
console.log('\n🛠️  Available Scripts:');
const scripts = Object.keys(rootPackage.scripts || {});
scripts.forEach(script => {
  console.log(`  - pnpm run ${script}`);
});

// Coverage
const coveragePath = join(rootDir, 'coverage', 'coverage-summary.json');
if (existsSync(coveragePath)) {
  console.log('\n📊 Test Coverage:');
  try {
    const coverage = JSON.parse(readFileSync(coveragePath, 'utf8'));
    const total = coverage.total;
    console.log(`  Lines:      ${total.lines.pct}%`);
    console.log(`  Statements: ${total.statements.pct}%`);
    console.log(`  Functions:  ${total.functions.pct}%`);
    console.log(`  Branches:   ${total.branches.pct}%`);
  } catch (error) {
    console.log('  Coverage data not available or invalid');
  }
} else {
  console.log(
    '\n📊 Test Coverage: Not available (run `pnpm test:coverage` first)',
  );
}

// Dependencies
console.log('\n📋 Key Dependencies:');
const deps = {
  ...rootPackage.dependencies,
  ...rootPackage.devDependencies,
};
const keyDeps = ['typescript', 'vitest', 'eslint', 'prettier', 'zod'];
keyDeps.forEach(dep => {
  if (deps[dep]) {
    console.log(`  - ${dep}: ${deps[dep]}`);
  }
});

// GitHub Actions
console.log('\n🔄 GitHub Actions Workflows:');
const workflowsPath = join(rootDir, '.github', 'workflows');
if (existsSync(workflowsPath)) {
  const { readdirSync } = await import('fs');
  const workflows = readdirSync(workflowsPath).filter(
    f => f.endsWith('.yml') || f.endsWith('.yaml'),
  );
  workflows.forEach(workflow => {
    console.log(`  - ${workflow}`);
  });
} else {
  console.log('  No workflows found');
}

// Publishing Info
console.log('\n📤 NPM Publishing:');
console.log('  Configure the following secrets in GitHub:');
console.log('  - NPM_TOKEN: Your npm authentication token');
console.log('  - CODECOV_TOKEN: (Optional) For coverage reports');
console.log('\n  Packages will be published automatically on release');
console.log('  Or manually trigger the workflow from GitHub Actions');

console.log('\n' + '='.repeat(50));
console.log('\n✅ Project is configured and ready!\n');
console.log('Next steps:');
console.log('  1. Run `pnpm test:coverage` to run tests');
console.log('  2. Run `pnpm build` to build packages');
console.log('  3. Commit and push to trigger CI/CD');
console.log('  4. Create releases using conventional commits');
console.log('\n');
