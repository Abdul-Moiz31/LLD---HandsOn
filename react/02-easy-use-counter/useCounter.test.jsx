import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  test('should initialize with default value 0', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  test('should initialize with provided value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  test('should increment by 1 by default', () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test('should decrement by 1 by default', () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });

  test('should reset to initial value', () => {
    const { result } = renderHook(() => useCounter(10));

    act(() => {
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(12);

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(10);
  });

  test('should set specific value', () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current.set(50);
    });

    expect(result.current.count).toBe(50);
  });

  test('should use custom step', () => {
    const { result } = renderHook(() => useCounter(0, { step: 5 }));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(5);

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(0);
  });

  test('should respect min boundary', () => {
    const { result } = renderHook(() => useCounter(5, { min: 0 }));

    act(() => {
      result.current.decrement();
      result.current.decrement();
      result.current.decrement();
      result.current.decrement();
      result.current.decrement();
      result.current.decrement(); // Should stop at 0
    });

    expect(result.current.count).toBe(0);
  });

  test('should respect max boundary', () => {
    const { result } = renderHook(() => useCounter(8, { max: 10 }));

    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.increment(); // Should stop at 10
    });

    expect(result.current.count).toBe(10);
  });

  test('set should respect min/max boundaries', () => {
    const { result } = renderHook(() => useCounter(5, { min: 0, max: 10 }));

    act(() => {
      result.current.set(100);
    });

    expect(result.current.count).toBe(10);

    act(() => {
      result.current.set(-50);
    });

    expect(result.current.count).toBe(0);
  });
});

