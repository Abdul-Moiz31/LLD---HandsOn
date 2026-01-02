# Virtual DOM Implementation

**Difficulty:** Hard

## Problem Statement

Implement a basic Virtual DOM system with the ability to create virtual nodes, render them to real DOM, and diff/patch updates efficiently.

This is a simplified version of what libraries like React use under the hood.

## Examples

### Example 1 - Create Virtual Nodes:
```javascript
const vnode = h('div', { class: 'container' }, [
  h('h1', {}, ['Hello World']),
  h('p', { id: 'intro' }, ['Welcome to Virtual DOM'])
]);

// Creates: { type: 'div', props: { class: 'container' }, children: [...] }
```

### Example 2 - Render to Real DOM:
```javascript
const vnode = h('button', { onClick: () => alert('Hi') }, ['Click me']);
const element = render(vnode);
document.body.appendChild(element);
```

### Example 3 - Diff and Patch:
```javascript
const oldTree = h('div', {}, [h('span', {}, ['Old'])]);
const newTree = h('div', {}, [h('span', {}, ['New'])]);

const patches = diff(oldTree, newTree);
patch(domElement, patches);
```

## Requirements

1. `h(type, props, children)` - Create virtual DOM node
2. `render(vnode)` - Convert virtual node to real DOM element
3. `diff(oldTree, newTree)` - Calculate differences between trees
4. `patch(element, patches)` - Apply patches to real DOM
5. Handle text nodes, element nodes, and props changes
6. Handle adding/removing children

## Function Signatures

```javascript
function h(type, props, children) {
  // Create virtual node
}

function render(vnode) {
  // Convert to real DOM
}

function diff(oldTree, newTree) {
  // Calculate patches
}

function patch(element, patches) {
  // Apply patches to DOM
}
```

