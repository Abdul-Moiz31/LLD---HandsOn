/**
 * @jest-environment jsdom
 */

const { h, render, diff, patch } = require('./solution');

describe('Virtual DOM', () => {
  describe('h (hyperscript)', () => {
    test('should create a virtual node', () => {
      const vnode = h('div', { class: 'test' }, []);
      
      expect(vnode.type).toBe('div');
      expect(vnode.props.class).toBe('test');
      expect(vnode.children).toEqual([]);
    });

    test('should create nested virtual nodes', () => {
      const vnode = h('div', {}, [
        h('span', {}, ['Hello']),
        h('span', {}, ['World'])
      ]);

      expect(vnode.children.length).toBe(2);
      expect(vnode.children[0].type).toBe('span');
    });

    test('should handle text children', () => {
      const vnode = h('p', {}, ['Hello World']);
      expect(vnode.children).toEqual(['Hello World']);
    });
  });

  describe('render', () => {
    test('should render a simple element', () => {
      const vnode = h('div', { id: 'test' }, []);
      const element = render(vnode);

      expect(element.tagName).toBe('DIV');
      expect(element.id).toBe('test');
    });

    test('should render text content', () => {
      const vnode = h('span', {}, ['Hello']);
      const element = render(vnode);

      expect(element.textContent).toBe('Hello');
    });

    test('should render nested elements', () => {
      const vnode = h('div', {}, [
        h('h1', {}, ['Title']),
        h('p', {}, ['Content'])
      ]);
      const element = render(vnode);

      expect(element.children.length).toBe(2);
      expect(element.children[0].tagName).toBe('H1');
      expect(element.children[1].tagName).toBe('P');
    });

    test('should render with class attribute', () => {
      const vnode = h('div', { class: 'container main' }, []);
      const element = render(vnode);

      expect(element.className).toBe('container main');
    });
  });

  describe('diff', () => {
    test('should detect text changes', () => {
      const oldTree = h('span', {}, ['Old']);
      const newTree = h('span', {}, ['New']);

      const patches = diff(oldTree, newTree);
      expect(patches.length).toBeGreaterThan(0);
    });

    test('should detect prop changes', () => {
      const oldTree = h('div', { class: 'old' }, []);
      const newTree = h('div', { class: 'new' }, []);

      const patches = diff(oldTree, newTree);
      expect(patches.length).toBeGreaterThan(0);
    });

    test('should detect added children', () => {
      const oldTree = h('div', {}, []);
      const newTree = h('div', {}, [h('span', {}, ['New child'])]);

      const patches = diff(oldTree, newTree);
      expect(patches.length).toBeGreaterThan(0);
    });

    test('should return empty patches for identical trees', () => {
      const oldTree = h('div', { class: 'same' }, ['Same content']);
      const newTree = h('div', { class: 'same' }, ['Same content']);

      const patches = diff(oldTree, newTree);
      expect(patches.length).toBe(0);
    });
  });

  describe('patch', () => {
    test('should update text content', () => {
      const oldTree = h('span', {}, ['Old']);
      const newTree = h('span', {}, ['New']);

      const element = render(oldTree);
      const patches = diff(oldTree, newTree);
      patch(element, patches);

      expect(element.textContent).toBe('New');
    });

    test('should update attributes', () => {
      const oldTree = h('div', { class: 'old' }, []);
      const newTree = h('div', { class: 'new' }, []);

      const element = render(oldTree);
      const patches = diff(oldTree, newTree);
      patch(element, patches);

      expect(element.className).toBe('new');
    });

    test('should add new children', () => {
      const oldTree = h('div', {}, []);
      const newTree = h('div', {}, [h('span', {}, ['Child'])]);

      const element = render(oldTree);
      document.body.appendChild(element);
      
      const patches = diff(oldTree, newTree);
      patch(element, patches);

      expect(element.children.length).toBe(1);
      expect(element.children[0].textContent).toBe('Child');
    });
  });
});

