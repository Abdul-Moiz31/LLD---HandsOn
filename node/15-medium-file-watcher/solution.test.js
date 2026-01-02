const fs = require('fs');
const path = require('path');
const { FileWatcher } = require('./solution');

const testDir = path.join(__dirname, 'test-watch');

beforeAll(() => {
  fs.mkdirSync(testDir, { recursive: true });
});

afterAll(() => {
  fs.rmSync(testDir, { recursive: true, force: true });
});

describe('FileWatcher', () => {
  let watcher;

  afterEach(() => {
    if (watcher) watcher.close();
  });

  test('should emit change event', (done) => {
    const testFile = path.join(testDir, 'test.txt');
    fs.writeFileSync(testFile, 'initial');

    watcher = new FileWatcher();
    watcher.watch(testDir);

    watcher.on('change', (filePath) => {
      expect(filePath).toContain('test.txt');
      done();
    });

    setTimeout(() => {
      fs.writeFileSync(testFile, 'modified');
    }, 100);
  }, 5000);

  test('should close all watchers', () => {
    watcher = new FileWatcher();
    watcher.watch(testDir);

    expect(() => watcher.close()).not.toThrow();
  });
});

