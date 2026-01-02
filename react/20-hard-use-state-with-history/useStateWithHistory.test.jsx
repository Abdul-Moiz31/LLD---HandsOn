import { renderHook, act } from '@testing-library/react';
import { useStateWithHistory } from './useStateWithHistory';

describe('useStateWithHistory', () => {
  test('should initialize with initial value', () => {
    const { result } = renderHook(() => useStateWithHistory(0));
    expect(result.current[0]).toBe(0);
  });

  test('should update value like useState', () => {
    const { result } = renderHook(() => useStateWithHistory(0));

    act(() => {
      result.current[1](5);
    });

    expect(result.current[0]).toBe(5);
  });

  test('should support functional updates', () => {
    const { result } = renderHook(() => useStateWithHistory(0));

    act(() => {
      result.current[1](prev => prev + 1);
      result.current[1](prev => prev + 1);
    });

    expect(result.current[0]).toBe(2);
  });

  test('should track history', () => {
    const { result } = renderHook(() => useStateWithHistory(0));

    act(() => {
      result.current[1](1);
      result.current[1](2);
      result.current[1](3);
    });

    expect(result.current[2].history).toEqual([0, 1, 2, 3]);
  });

  test('should go back in history', () => {
    const { result } = renderHook(() => useStateWithHistory('a'));

    act(() => {
      result.current[1]('b');
      result.current[1]('c');
    });

    expect(result.current[0]).toBe('c');

    act(() => {
      result.current[2].back();
    });

    expect(result.current[0]).toBe('b');

    act(() => {
      result.current[2].back();
    });

    expect(result.current[0]).toBe('a');
  });

  test('should go forward in history', () => {
    const { result } = renderHook(() => useStateWithHistory(1));

    act(() => {
      result.current[1](2);
      result.current[1](3);
      result.current[2].back();
      result.current[2].back();
    });

    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[2].forward();
    });

    expect(result.current[0]).toBe(2);
  });

  test('should report canBack/canForward correctly', () => {
    const { result } = renderHook(() => useStateWithHistory(0));

    expect(result.current[2].canBack).toBe(false);
    expect(result.current[2].canForward).toBe(false);

    act(() => {
      result.current[1](1);
    });

    expect(result.current[2].canBack).toBe(true);
    expect(result.current[2].canForward).toBe(false);

    act(() => {
      result.current[2].back();
    });

    expect(result.current[2].canBack).toBe(false);
    expect(result.current[2].canForward).toBe(true);
  });

  test('should goTo specific history index', () => {
    const { result } = renderHook(() => useStateWithHistory('a'));

    act(() => {
      result.current[1]('b');
      result.current[1]('c');
      result.current[1]('d');
    });

    act(() => {
      result.current[2].goTo(1);
    });

    expect(result.current[0]).toBe('b');
    expect(result.current[2].pointer).toBe(1);
  });

  test('should track pointer position', () => {
    const { result } = renderHook(() => useStateWithHistory(0));

    expect(result.current[2].pointer).toBe(0);

    act(() => {
      result.current[1](1);
      result.current[1](2);
    });

    expect(result.current[2].pointer).toBe(2);
  });

  test('should respect maxHistory limit', () => {
    const { result } = renderHook(() => useStateWithHistory(0, { maxHistory: 3 }));

    act(() => {
      result.current[1](1);
      result.current[1](2);
      result.current[1](3);
      result.current[1](4);
    });

    expect(result.current[2].history.length).toBeLessThanOrEqual(3);
  });
});

