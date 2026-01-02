import { renderHook } from '@testing-library/react';
import { useMount } from './useMount';

describe('useMount', () => {
  test('should call callback on mount', () => {
    const callback = jest.fn();
    renderHook(() => useMount(callback));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should not call callback on rerender', () => {
    const callback = jest.fn();
    const { rerender } = renderHook(() => useMount(callback));

    expect(callback).toHaveBeenCalledTimes(1);

    rerender();
    rerender();
    rerender();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should work with different callbacks', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    renderHook(() => useMount(callback1));
    renderHook(() => useMount(callback2));

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  test('should handle async callbacks', async () => {
    const results = [];
    const asyncCallback = async () => {
      await Promise.resolve();
      results.push('done');
    };

    renderHook(() => useMount(asyncCallback));

    // Allow async callback to complete
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(results).toEqual(['done']);
  });
});

