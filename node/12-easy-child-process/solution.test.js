const { execCommand, spawnProcess, execWithTimeout } = require('./solution');

describe('Child Process', () => {
  test('execCommand should execute and return output', async () => {
    const result = await execCommand('echo hello');
    expect(result.trim()).toBe('hello');
  });

  test('spawnProcess should spawn process', () => {
    const proc = spawnProcess('node', ['--version']);
    expect(proc).toBeDefined();
    expect(proc.pid).toBeDefined();
    proc.kill();
  });

  test('execWithTimeout should timeout', async () => {
    await expect(execWithTimeout('sleep 10', 100)).rejects.toThrow();
  }, 1000);
});

