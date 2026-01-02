const { ConnectionPool } = require('./solution');

describe('ConnectionPool', () => {
  let pool;
  let connectionId = 0;

  const createPool = (options = {}) => new ConnectionPool({
    minSize: 1,
    maxSize: 3,
    createConnection: async () => ({ id: ++connectionId }),
    destroyConnection: async () => {},
    ...options
  });

  beforeEach(() => {
    connectionId = 0;
  });

  afterEach(async () => {
    if (pool) await pool.destroy();
  });

  test('should acquire connection', async () => {
    pool = createPool();
    const conn = await pool.acquire();
    expect(conn).toBeDefined();
    expect(conn.id).toBe(1);
  });

  test('should reuse released connections', async () => {
    pool = createPool();
    const conn1 = await pool.acquire();
    pool.release(conn1);
    const conn2 = await pool.acquire();
    expect(conn2.id).toBe(conn1.id);
  });

  test('should respect maxSize', async () => {
    pool = createPool({ maxSize: 2, acquireTimeout: 100 });

    const conn1 = await pool.acquire();
    const conn2 = await pool.acquire();

    // Third acquire should timeout
    await expect(pool.acquire()).rejects.toThrow();

    pool.release(conn1);
    pool.release(conn2);
  });

  test('should report stats', async () => {
    pool = createPool();
    await pool.acquire();
    const stats = pool.getStats();

    expect(stats.total).toBeGreaterThanOrEqual(1);
    expect(stats.inUse).toBe(1);
  });

  test('should destroy all connections', async () => {
    const destroyed = [];
    pool = createPool({
      destroyConnection: async (conn) => destroyed.push(conn.id)
    });

    await pool.acquire();
    await pool.acquire();
    await pool.destroy();

    expect(destroyed.length).toBe(2);
  });
});

