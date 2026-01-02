const { InMemoryStore, createCRUDHandler } = require('./solution');

describe('InMemoryStore', () => {
  let store;

  beforeEach(() => {
    store = new InMemoryStore();
  });

  test('should create and retrieve items', () => {
    const item = store.create({ name: 'Test' });
    expect(item.id).toBeDefined();
    expect(store.getById(item.id)).toEqual(item);
  });

  test('should list all items', () => {
    store.create({ name: 'A' });
    store.create({ name: 'B' });
    expect(store.getAll()).toHaveLength(2);
  });

  test('should update item', () => {
    const item = store.create({ name: 'Original' });
    store.update(item.id, { name: 'Updated' });
    expect(store.getById(item.id).name).toBe('Updated');
  });

  test('should delete item', () => {
    const item = store.create({ name: 'ToDelete' });
    store.delete(item.id);
    expect(store.getById(item.id)).toBeUndefined();
  });
});

describe('createCRUDHandler', () => {
  test('should create handler function', () => {
    const handler = createCRUDHandler('users');
    expect(typeof handler).toBe('function');
  });
});

