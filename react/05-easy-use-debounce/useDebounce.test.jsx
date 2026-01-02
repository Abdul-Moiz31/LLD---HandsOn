import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  test('should debounce value updates', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'updated' });
    expect(result.current).toBe('initial'); // Not updated yet

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  test('should reset timer on value change', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'a' } }
    );

    rerender({ value: 'b' });
    act(() => {
      jest.advanceTimersByTime(300);
    });

    rerender({ value: 'c' });
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('a'); // Still original

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe('c'); // Final value
  });

  test('should handle rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'start' } }
    );

    // Simulate rapid typing
    rerender({ value: 'h' });
    rerender({ value: 'he' });
    rerender({ value: 'hel' });
    rerender({ value: 'hell' });
    rerender({ value: 'hello' });

    expect(result.current).toBe('start');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('hello');
  });

  test('should work with different delay values', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 1000),
      { initialProps: { value: 'test' } }
    );

    rerender({ value: 'changed' });

    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current).toBe('test');

    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current).toBe('changed');
  });
});

