import { renderHook } from '@testing-library/react';
import { usePrevious } from './usePrevious';

describe('usePrevious', () => {
  test('should return undefined on first render', () => {
    const { result } = renderHook(() => usePrevious(0));
    expect(result.current).toBe(undefined);
  });

  test('should return previous value after rerender', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      { initialProps: { value: 0 } }
    );

    expect(result.current).toBe(undefined);

    rerender({ value: 1 });
    expect(result.current).toBe(0);

    rerender({ value: 2 });
    expect(result.current).toBe(1);

    rerender({ value: 5 });
    expect(result.current).toBe(2);
  });

  test('should work with strings', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      { initialProps: { value: 'hello' } }
    );

    expect(result.current).toBe(undefined);

    rerender({ value: 'world' });
    expect(result.current).toBe('hello');
  });

  test('should work with objects', () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };

    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      { initialProps: { value: obj1 } }
    );

    expect(result.current).toBe(undefined);

    rerender({ value: obj2 });
    expect(result.current).toBe(obj1);
  });

  test('should handle same value rerenders', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      { initialProps: { value: 'same' } }
    );

    rerender({ value: 'same' });
    expect(result.current).toBe('same');

    rerender({ value: 'same' });
    expect(result.current).toBe('same');
  });
});

