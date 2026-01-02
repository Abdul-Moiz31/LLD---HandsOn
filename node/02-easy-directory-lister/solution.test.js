const fs = require('fs');
const path = require('path');
const {
  listDirectory,
  listDirectoryDetailed,
  listDirectoryRecursive,
  filterByExtension,
} = require('./solution');

const testDir = path.join(__dirname, 'test-fixtures');

beforeAll(() => {
  // Create test directory structure
  fs.mkdirSync(path.join(testDir, 'subdir'), { recursive: true });
  fs.writeFileSync(path.join(testDir, 'file1.txt'), 'content');
  fs.writeFileSync(path.join(testDir, 'file2.js'), 'const x = 1;');
  fs.writeFileSync(path.join(testDir, 'file3.js'), 'const y = 2;');
  fs.writeFileSync(path.join(testDir, 'subdir', 'nested.txt'), 'nested');
});

afterAll(() => {
  fs.rmSync(testDir, { recursive: true, force: true });
});

describe('listDirectory', () => {
  test('should list files and folders', async () => {
    const contents = await listDirectory(testDir);
    expect(contents).toContain('file1.txt');
    expect(contents).toContain('file2.js');
    expect(contents).toContain('subdir');
  });

  test('should reject for non-existent directory', async () => {
    await expect(listDirectory('/non/existent')).rejects.toThrow();
  });
});

describe('listDirectoryDetailed', () => {
  test('should return detailed file info', async () => {
    const contents = await listDirectoryDetailed(testDir);
    
    const file1 = contents.find(f => f.name === 'file1.txt');
    expect(file1).toBeDefined();
    expect(file1.isFile).toBe(true);
    expect(file1.isDirectory).toBe(false);
    expect(typeof file1.size).toBe('number');

    const subdir = contents.find(f => f.name === 'subdir');
    expect(subdir).toBeDefined();
    expect(subdir.isDirectory).toBe(true);
  });
});

describe('listDirectoryRecursive', () => {
  test('should list all files recursively', async () => {
    const files = await listDirectoryRecursive(testDir);
    
    expect(files).toContain('file1.txt');
    expect(files.some(f => f.includes('nested.txt'))).toBe(true);
  });

  test('should not include directory names', async () => {
    const files = await listDirectoryRecursive(testDir);
    
    // Should only include files, not directories
    expect(files.every(f => !f.endsWith('subdir'))).toBe(true);
  });
});

describe('filterByExtension', () => {
  test('should filter by .js extension', async () => {
    const jsFiles = await filterByExtension(testDir, '.js');
    
    expect(jsFiles).toContain('file2.js');
    expect(jsFiles).toContain('file3.js');
    expect(jsFiles).not.toContain('file1.txt');
  });

  test('should filter by .txt extension', async () => {
    const txtFiles = await filterByExtension(testDir, '.txt');
    
    expect(txtFiles).toContain('file1.txt');
    expect(txtFiles).not.toContain('file2.js');
  });

  test('should return empty array for non-matching extension', async () => {
    const pyFiles = await filterByExtension(testDir, '.py');
    expect(pyFiles).toEqual([]);
  });
});

