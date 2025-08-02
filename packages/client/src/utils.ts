import { BaseIssue, BaseSchema, getDotPath, SafeParseResult } from 'valibot';

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

export function formatError(
  result: SafeParseResult<BaseSchema<unknown, unknown, BaseIssue<unknown>>>,
) {
  const errors: Record<string, unknown> = {};

  const getMessage = (issue: BaseIssue<unknown>) => {
    const path = getDotPath(issue);

    if (path) {
      errors[path] = issue.message;
    }

    issue.issues?.map(getMessage);
  };
  result.issues!.map(getMessage);

  return errors;
}
