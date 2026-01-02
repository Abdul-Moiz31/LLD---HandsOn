const { parseURL, parseQueryString, buildQueryString, buildURL } = require('./solution');

describe('parseURL', () => {
  test('should parse URL components', () => {
    const result = parseURL('https://example.com:8080/path?query=value#hash');
    expect(result.protocol).toBe('https:');
    expect(result.host).toBe('example.com:8080');
    expect(result.pathname).toBe('/path');
  });
});

describe('parseQueryString', () => {
  test('should parse query string', () => {
    const result = parseQueryString('name=John&age=30');
    expect(result.name).toBe('John');
    expect(result.age).toBe('30');
  });
});

describe('buildQueryString', () => {
  test('should build query string', () => {
    const result = buildQueryString({ name: 'John', age: 30 });
    expect(result).toContain('name=John');
    expect(result).toContain('age=30');
  });
});

describe('buildURL', () => {
  test('should build complete URL', () => {
    const result = buildURL('https://api.example.com', '/users', { page: 1 });
    expect(result).toBe('https://api.example.com/users?page=1');
  });
});

