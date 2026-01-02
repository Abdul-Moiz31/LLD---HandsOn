# Template Engine

**Difficulty:** Hard

## Problem Statement

Implement a simple template engine that can parse template strings with variables, conditionals, and loops, then render them with provided data.

Similar to handlebars, mustache, or EJS but simplified.

## Examples

### Example 1 - Variable Interpolation:
```javascript
const template = 'Hello, {{name}}!';
const data = { name: 'Alice' };

render(template, data); // "Hello, Alice!"
```

### Example 2 - Nested Properties:
```javascript
const template = 'Welcome, {{user.name}}! You have {{user.notifications}} notifications.';
const data = { user: { name: 'Bob', notifications: 5 } };

render(template, data); // "Welcome, Bob! You have 5 notifications."
```

### Example 3 - Conditionals:
```javascript
const template = '{{#if isAdmin}}Admin Panel{{/if}}{{#if !isAdmin}}User Dashboard{{/if}}';
const data = { isAdmin: true };

render(template, data); // "Admin Panel"
```

### Example 4 - Loops:
```javascript
const template = '<ul>{{#each items}}<li>{{this}}</li>{{/each}}</ul>';
const data = { items: ['Apple', 'Banana', 'Cherry'] };

render(template, data); // "<ul><li>Apple</li><li>Banana</li><li>Cherry</li></ul>"
```

### Example 5 - Loop with Object Properties:
```javascript
const template = '{{#each users}}{{name}}: {{age}}; {{/each}}';
const data = { 
  users: [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 }
  ]
};

render(template, data); // "Alice: 30; Bob: 25; "
```

## Requirements

1. Variable interpolation: `{{variable}}`
2. Nested property access: `{{object.property}}`
3. Conditionals: `{{#if condition}}...{{/if}}`
4. Negated conditionals: `{{#if !condition}}...{{/if}}`
5. Loops: `{{#each array}}...{{/each}}`
6. Access current item in loop: `{{this}}`
7. Access item properties in loop: `{{property}}`
8. Handle missing variables gracefully (empty string)

## Function Signature

```javascript
function render(template, data) {
  // Your implementation here
}
```

