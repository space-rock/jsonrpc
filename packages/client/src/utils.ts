import { ZodError } from 'zod';

export function toSnakeCase(obj: unknown): unknown {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(toSnakeCase);

  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = key.replace(
      /[A-Z]/g,
      letter => `_${letter.toLowerCase()}`,
    );
    result[snakeKey] = toSnakeCase(value);
  }

  return result;
}

export function toCamelCase(obj: unknown): unknown {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(toCamelCase);

  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
      letter.toUpperCase(),
    );
    result[camelKey] = toCamelCase(value);
  }

  return result;
}

export function formatZodError(error: ZodError): Record<string, string> {
  const errors: Record<string, string> = {};

  function processIssues(issues: any[], basePath: string[] = []) {
    issues.forEach(issue => {
      const fullPath = [...basePath, ...issue.path];
      const pathString = fullPath.join('.');

      if (issue.code === 'invalid_union' && issue.unionErrors) {
        issue.unionErrors.forEach((unionError: any) => {
          if (unionError.issues) {
            processIssues(unionError.issues, basePath);
          }
        });

        if (fullPath.length > 0) {
          errors[pathString] = issue.message;
        }
      } else {
        errors[pathString] = issue.message;
      }
    });
  }

  processIssues(error.issues);

  return errors;
}
