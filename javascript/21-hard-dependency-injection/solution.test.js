const { DIContainer } = require('./solution');

describe('DIContainer', () => {
  let container;

  beforeEach(() => {
    container = new DIContainer();
  });

  describe('register and resolve', () => {
    test('should register and resolve a simple dependency', () => {
      container.register('config', () => ({ env: 'test' }));
      
      const config = container.resolve('config');
      expect(config.env).toBe('test');
    });

    test('should throw when resolving unregistered dependency', () => {
      expect(() => container.resolve('unknown')).toThrow();
    });
  });

  describe('dependency resolution', () => {
    test('should resolve dependencies of dependencies', () => {
      container.register('config', () => ({ apiUrl: 'http://api.test' }));
      container.register('apiClient', (c) => ({
        config: c.resolve('config'),
        getUrl: function() { return this.config.apiUrl; }
      }));

      const client = container.resolve('apiClient');
      expect(client.getUrl()).toBe('http://api.test');
    });

    test('should resolve deep dependency chains', () => {
      container.register('a', () => ({ value: 'A' }));
      container.register('b', (c) => ({ a: c.resolve('a'), value: 'B' }));
      container.register('c', (c) => ({ b: c.resolve('b'), value: 'C' }));

      const result = container.resolve('c');
      expect(result.value).toBe('C');
      expect(result.b.value).toBe('B');
      expect(result.b.a.value).toBe('A');
    });
  });

  describe('singleton scope', () => {
    test('should return same instance for singleton', () => {
      let instanceCount = 0;
      container.register('singleton', () => {
        instanceCount++;
        return { id: instanceCount };
      }, { singleton: true });

      const first = container.resolve('singleton');
      const second = container.resolve('singleton');

      expect(first).toBe(second);
      expect(instanceCount).toBe(1);
    });
  });

  describe('transient scope', () => {
    test('should return new instance each time for transient', () => {
      let instanceCount = 0;
      container.register('transient', () => {
        instanceCount++;
        return { id: instanceCount };
      }, { singleton: false });

      const first = container.resolve('transient');
      const second = container.resolve('transient');

      expect(first).not.toBe(second);
      expect(first.id).toBe(1);
      expect(second.id).toBe(2);
    });

    test('should be transient by default', () => {
      let instanceCount = 0;
      container.register('default', () => ({ id: ++instanceCount }));

      const first = container.resolve('default');
      const second = container.resolve('default');

      expect(first).not.toBe(second);
    });
  });

  describe('circular dependency detection', () => {
    test('should detect direct circular dependency', () => {
      container.register('a', (c) => ({ b: c.resolve('b') }));
      container.register('b', (c) => ({ a: c.resolve('a') }));

      expect(() => container.resolve('a')).toThrow(/circular/i);
    });

    test('should detect indirect circular dependency', () => {
      container.register('a', (c) => ({ b: c.resolve('b') }));
      container.register('b', (c) => ({ c: c.resolve('c') }));
      container.register('c', (c) => ({ a: c.resolve('a') }));

      expect(() => container.resolve('a')).toThrow(/circular/i);
    });
  });
});

