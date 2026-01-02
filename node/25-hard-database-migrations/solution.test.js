const fs = require('fs');
const path = require('path');
const { MigrationRunner, InMemoryDBAdapter } = require('./solution');

const testMigrationsDir = path.join(__dirname, 'test-migrations');

beforeAll(() => {
  fs.mkdirSync(testMigrationsDir, { recursive: true });
  
  // Create test migration files
  fs.writeFileSync(
    path.join(testMigrationsDir, '001_create_users.js'),
    `module.exports = {
      up: async (db) => { await db.query('CREATE TABLE users'); },
      down: async (db) => { await db.query('DROP TABLE users'); }
    };`
  );
  
  fs.writeFileSync(
    path.join(testMigrationsDir, '002_add_email.js'),
    `module.exports = {
      up: async (db) => { await db.query('ALTER TABLE users ADD email'); },
      down: async (db) => { await db.query('ALTER TABLE users DROP email'); }
    };`
  );
});

afterAll(() => {
  fs.rmSync(testMigrationsDir, { recursive: true, force: true });
});

describe('MigrationRunner', () => {
  let runner;
  let db;

  beforeEach(async () => {
    db = new InMemoryDBAdapter();
    runner = new MigrationRunner({
      migrationsPath: testMigrationsDir,
      db
    });
    await runner.init();
  });

  test('should return pending migrations', async () => {
    const status = await runner.status();
    expect(status.pending).toHaveLength(2);
    expect(status.applied).toHaveLength(0);
  });

  test('should run migrations', async () => {
    await runner.migrate();
    const status = await runner.status();
    expect(status.applied).toHaveLength(2);
    expect(status.pending).toHaveLength(0);
  });

  test('should rollback migrations', async () => {
    await runner.migrate();
    await runner.rollback(1);
    const status = await runner.status();
    expect(status.applied).toHaveLength(1);
  });

  test('should create new migration', async () => {
    const filePath = await runner.create('add_posts');
    expect(filePath).toContain('add_posts');
    fs.unlinkSync(filePath);
  });
});

describe('InMemoryDBAdapter', () => {
  test('should execute queries', async () => {
    const db = new InMemoryDBAdapter();
    await expect(db.query('SELECT 1')).resolves.not.toThrow();
  });
});

