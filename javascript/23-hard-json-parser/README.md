# JSON Parser

**Difficulty:** Hard

## Problem Statement

Implement a JSON parser from scratch that can parse JSON strings into JavaScript objects. This exercise helps understand parsing techniques, tokenization, and recursive descent parsing.

Do NOT use `JSON.parse()` - implement the parsing logic yourself.

## Examples

### Example 1 - Simple Values:
```javascript
parseJSON('null');      // null
parseJSON('true');      // true
parseJSON('42');        // 42
parseJSON('"hello"');   // "hello"
```

### Example 2 - Arrays:
```javascript
parseJSON('[1, 2, 3]');           // [1, 2, 3]
parseJSON('["a", "b", "c"]');     // ["a", "b", "c"]
parseJSON('[1, [2, 3], 4]');      // [1, [2, 3], 4]
```

### Example 3 - Objects:
```javascript
parseJSON('{"name": "Alice", "age": 30}');
// { name: "Alice", age: 30 }

parseJSON('{"user": {"name": "Bob"}, "active": true}');
// { user: { name: "Bob" }, active: true }
```

## Requirements

1. Parse `null`, `true`, `false`
2. Parse numbers (integers and decimals)
3. Parse strings (with escape sequences: `\n`, `\t`, `\"`, `\\`)
4. Parse arrays (nested allowed)
5. Parse objects (nested allowed)
6. Handle whitespace correctly
7. Throw descriptive errors for invalid JSON

## JSON Grammar

```
value     -> object | array | string | number | "true" | "false" | "null"
object    -> "{" "}" | "{" members "}"
members   -> pair | pair "," members
pair      -> string ":" value
array     -> "[" "]" | "[" elements "]"
elements  -> value | value "," elements
string    -> '"' characters '"'
number    -> integer | integer "." digits
```

## Function Signature

```javascript
function parseJSON(jsonString) {
  // Your implementation here
}
```

