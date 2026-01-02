import { renderHook, act } from '@testing-library/react';
import { useUndo } from './useUndo';

describe('useUndo', () => {
  test('should initialize with initial value', () => {
    const { result } = renderHook(() => useUndo('initial'));
    expect(result.current.value).toBe('initial');
  });

  test('should update value', () => {
    const { result } = renderHook(() => useUndo(''));

    act(() => {
      result.current.setValue('hello');
    });

    expect(result.current.value).toBe('hello');
  });

  test('should undo to previous value', () => {
    const { result } = renderHook(() => useUndo('a'));

    act(() => {
      result.current.setValue('b');
    });

    act(() => {
      result.current.setValue('c');
    });

    expect(result.current.value).toBe('c');

    act(() => {
      result.current.undo();
    });

    expect(result.current.value).toBe('b');

    act(() => {
      result.current.undo();
    });

    expect(result.current.value).toBe('a');
  });

  test('should redo after undo', () => {
    const { result } = renderHook(() => useUndo('a'));

    act(() => {
      result.current.setValue('b');
    });

    act(() => {
      result.current.undo();
    });

    expect(result.current.value).toBe('a');

    act(() => {
      result.current.redo();
    });

    expect(result.current.value).toBe('b');
  });

  test('should report canUndo correctly', () => {
    const { result } = renderHook(() => useUndo('a'));

    expect(result.current.canUndo).toBe(false);

    act(() => {
      result.current.setValue('b');
    });

    expect(result.current.canUndo).toBe(true);

    act(() => {
      result.current.undo();
    });

    expect(result.current.canUndo).toBe(false);
  });

  test('should report canRedo correctly', () => {
    const { result } = renderHook(() => useUndo('a'));

    expect(result.current.canRedo).toBe(false);

    act(() => {
      result.current.setValue('b');
    });

    expect(result.current.canRedo).toBe(false);

    act(() => {
      result.current.undo();
    });

    expect(result.current.canRedo).toBe(true);

    act(() => {
      result.current.redo();
    });

    expect(result.current.canRedo).toBe(false);
  });

  test('should clear redo stack on new value', () => {
    const { result } = renderHook(() => useUndo('a'));

    act(() => {
      result.current.setValue('b');
      result.current.undo();
      result.current.setValue('c');
    });

    expect(result.current.canRedo).toBe(false);
    expect(result.current.value).toBe('c');
  });

  test('should reset to initial value', () => {
    const { result } = renderHook(() => useUndo('initial'));

    act(() => {
      result.current.setValue('changed');
      result.current.setValue('changed again');
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.value).toBe('initial');
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
  });
});

