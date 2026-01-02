const { render } = require('./solution');

describe('Template Engine', () => {
  describe('variable interpolation', () => {
    test('should replace simple variables', () => {
      const template = 'Hello, {{name}}!';
      const data = { name: 'Alice' };
      expect(render(template, data)).toBe('Hello, Alice!');
    });

    test('should replace multiple variables', () => {
      const template = '{{greeting}}, {{name}}!';
      const data = { greeting: 'Hi', name: 'Bob' };
      expect(render(template, data)).toBe('Hi, Bob!');
    });

    test('should handle missing variables', () => {
      const template = 'Hello, {{name}}!';
      const data = {};
      expect(render(template, data)).toBe('Hello, !');
    });

    test('should handle nested properties', () => {
      const template = 'Welcome, {{user.name}}!';
      const data = { user: { name: 'Carol' } };
      expect(render(template, data)).toBe('Welcome, Carol!');
    });

    test('should handle deeply nested properties', () => {
      const template = '{{a.b.c.d}}';
      const data = { a: { b: { c: { d: 'deep' } } } };
      expect(render(template, data)).toBe('deep');
    });
  });

  describe('conditionals', () => {
    test('should render content when condition is true', () => {
      const template = '{{#if isAdmin}}Admin{{/if}}';
      const data = { isAdmin: true };
      expect(render(template, data)).toBe('Admin');
    });

    test('should not render content when condition is false', () => {
      const template = '{{#if isAdmin}}Admin{{/if}}';
      const data = { isAdmin: false };
      expect(render(template, data)).toBe('');
    });

    test('should handle negated conditions', () => {
      const template = '{{#if !isAdmin}}User{{/if}}';
      const data = { isAdmin: false };
      expect(render(template, data)).toBe('User');
    });

    test('should handle truthy/falsy values', () => {
      const template = '{{#if count}}Has items{{/if}}';
      expect(render(template, { count: 5 })).toBe('Has items');
      expect(render(template, { count: 0 })).toBe('');
    });
  });

  describe('loops', () => {
    test('should iterate over array with {{this}}', () => {
      const template = '{{#each items}}{{this}},{{/each}}';
      const data = { items: ['a', 'b', 'c'] };
      expect(render(template, data)).toBe('a,b,c,');
    });

    test('should iterate over array of objects', () => {
      const template = '{{#each users}}{{name}};{{/each}}';
      const data = { 
        users: [
          { name: 'Alice' },
          { name: 'Bob' }
        ]
      };
      expect(render(template, data)).toBe('Alice;Bob;');
    });

    test('should handle empty arrays', () => {
      const template = '{{#each items}}{{this}}{{/each}}';
      const data = { items: [] };
      expect(render(template, data)).toBe('');
    });

    test('should access multiple properties in loop', () => {
      const template = '{{#each users}}{{name}}:{{age}} {{/each}}';
      const data = { 
        users: [
          { name: 'Alice', age: 30 },
          { name: 'Bob', age: 25 }
        ]
      };
      expect(render(template, data)).toBe('Alice:30 Bob:25 ');
    });
  });

  describe('complex templates', () => {
    test('should handle conditionals inside loops', () => {
      const template = '{{#each users}}{{#if active}}{{name}}{{/if}}{{/each}}';
      const data = {
        users: [
          { name: 'Alice', active: true },
          { name: 'Bob', active: false },
          { name: 'Carol', active: true }
        ]
      };
      expect(render(template, data)).toBe('AliceCarol');
    });

    test('should handle variables with loops and conditionals', () => {
      const template = 'Users: {{#if hasUsers}}{{#each users}}{{name}} {{/each}}{{/if}}';
      const data = {
        hasUsers: true,
        users: [{ name: 'Alice' }, { name: 'Bob' }]
      };
      expect(render(template, data)).toBe('Users: Alice Bob ');
    });

    test('should handle HTML-like templates', () => {
      const template = '<ul>{{#each items}}<li>{{this}}</li>{{/each}}</ul>';
      const data = { items: ['A', 'B'] };
      expect(render(template, data)).toBe('<ul><li>A</li><li>B</li></ul>');
    });
  });
});

