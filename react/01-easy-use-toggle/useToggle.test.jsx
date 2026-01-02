import { renderHook, act } from '@testing-library/react';
import { useToggle } from './useToggle';

describe('useToggle', () => {
  test('should initialize with false by default', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  test('should initialize with provided value', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
  });

  test('should toggle the value', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1](); // toggle
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1](); // toggle again
    });

    expect(result.current[0]).toBe(false);
  });

  test('should set specific value', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[2](true); // setValue
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[2](true); // setValue again (same value)
    });

    expect(result.current[0]).toBe(true);
  });

  test('toggle function should be stable', () => {
    const { result, rerender } = renderHook(() => useToggle());
    const firstToggle = result.current[1];

    rerender();

    expect(result.current[1]).toBe(firstToggle);
  });
});

