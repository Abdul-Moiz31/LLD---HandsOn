const fs = require('fs');
const path = require('path');
const { getEnv, requireEnv, loadEnvFile, createConfig } = require('./solution');

const testEnvFile = path.join(__dirname, '.env.test');

beforeAll(() => {
  fs.writeFileSync(testEnvFile, 'TEST_VAR=hello\nNUMBER=42\n');
  process.env.EXISTING_VAR = 'exists';
});

afterAll(() => {
  fs.unlinkSync(testEnvFile);
  delete process.env.EXISTING_VAR;
});

describe('getEnv', () => {
  test('should return env variable', () => {
    expect(getEnv('EXISTING_VAR')).toBe('exists');
  });

  test('should return default if not found', () => {
    expect(getEnv('NOT_EXISTS', 'default')).toBe('default');
  });
});

describe('requireEnv', () => {
  test('should throw if env not found', () => {
    expect(() => requireEnv('NOT_EXISTS')).toThrow();
  });
});

describe('loadEnvFile', () => {
  test('should parse env file', async () => {
    const env = await loadEnvFile(testEnvFile);
    expect(env.TEST_VAR).toBe('hello');
    expect(env.NUMBER).toBe('42');
  });
});

describe('createConfig', () => {
  test('should create config from schema', () => {
    process.env.PORT = '3000';
    const config = createConfig({
      port: { key: 'PORT', type: 'number', default: 8080 }
    });
    expect(config.port).toBe(3000);
    delete process.env.PORT;
  });
});

