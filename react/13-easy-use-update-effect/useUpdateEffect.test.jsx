import { renderHook } from '@testing-library/react';
import { useUpdateEffect } from './useUpdateEffect';

describe('useUpdateEffect', () => {
  test('should not run on initial mount', () => {
    const callback = jest.fn();
    renderHook(() => useUpdateEffect(callback, []));

    expect(callback).not.toHaveBeenCalled();
  });

  test('should run on dependency change', () => {
    const callback = jest.fn();
    const { rerender } = renderHook(
      ({ dep }) => useUpdateEffect(callback, [dep]),
      { initialProps: { dep: 1 } }
    );

    expect(callback).not.toHaveBeenCalled();

    rerender({ dep: 2 });
    expect(callback).toHaveBeenCalledTimes(1);

    rerender({ dep: 3 });
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('should not run when dependencies stay same', () => {
    const callback = jest.fn();
    const { rerender } = renderHook(
      ({ dep }) => useUpdateEffect(callback, [dep]),
      { initialProps: { dep: 1 } }
    );

    rerender({ dep: 1 });
    rerender({ dep: 1 });

    expect(callback).not.toHaveBeenCalled();
  });

  test('should handle multiple dependencies', () => {
    const callback = jest.fn();
    const { rerender } = renderHook(
      ({ a, b }) => useUpdateEffect(callback, [a, b]),
      { initialProps: { a: 1, b: 1 } }
    );

    expect(callback).not.toHaveBeenCalled();

    rerender({ a: 2, b: 1 });
    expect(callback).toHaveBeenCalledTimes(1);

    rerender({ a: 2, b: 2 });
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('should call cleanup function', () => {
    const cleanup = jest.fn();
    const callback = jest.fn(() => cleanup);
    
    const { rerender, unmount } = renderHook(
      ({ dep }) => useUpdateEffect(callback, [dep]),
      { initialProps: { dep: 1 } }
    );

    rerender({ dep: 2 }); // First update
    rerender({ dep: 3 }); // Second update - should clean up first

    expect(cleanup).toHaveBeenCalled();
  });

  test('should work with empty dependencies', () => {
    const callback = jest.fn();
    const { rerender } = renderHook(() => useUpdateEffect(callback, []));

    expect(callback).not.toHaveBeenCalled();

    rerender();
    rerender();

    // Should not run since deps never change
    expect(callback).not.toHaveBeenCalled();
  });
});

