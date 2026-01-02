const path = require('path');
const { resolvePath, getFileInfo, joinPaths, isAbsolute, getRelativePath } = require('./solution');

describe('Path Utilities', () => {
  test('resolvePath should return absolute path', () => {
    const result = resolvePath('src', 'index.js');
    expect(path.isAbsolute(result)).toBe(true);
  });

  test('getFileInfo should extract path components', () => {
    const info = getFileInfo('/home/user/file.txt');
    expect(info.base).toBe('file.txt');
    expect(info.name).toBe('file');
    expect(info.ext).toBe('.txt');
  });

  test('joinPaths should join path segments', () => {
    const result = joinPaths('src', 'components', 'Button.js');
    expect(result).toContain('src');
    expect(result).toContain('Button.js');
  });

  test('isAbsolute should detect absolute paths', () => {
    expect(isAbsolute('/home/user')).toBe(true);
    expect(isAbsolute('./relative')).toBe(false);
  });

  test('getRelativePath should return relative path', () => {
    const result = getRelativePath('/home/user', '/home/user/docs');
    expect(result).toBe('docs');
  });
});

