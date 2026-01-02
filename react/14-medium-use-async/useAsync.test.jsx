import { renderHook, act, waitFor } from '@testing-library/react';
import { useAsync } from './useAsync';

describe('useAsync', () => {
  test('should start in idle state when immediate is false', () => {
    const asyncFn = jest.fn().mockResolvedValue('data');
    const { result } = renderHook(() => useAsync(asyncFn, false));

    expect(result.current.status).toBe('idle');
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(null);
  });

  test('should execute immediately when immediate is true', async () => {
    const asyncFn = jest.fn().mockResolvedValue('data');
    const { result } = renderHook(() => useAsync(asyncFn, true));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe('data');
  });

  test('should execute on demand', async () => {
    const asyncFn = jest.fn().mockResolvedValue('result');
    const { result } = renderHook(() => useAsync(asyncFn, false));

    expect(asyncFn).not.toHaveBeenCalled();

    await act(async () => {
      await result.current.execute();
    });

    expect(asyncFn).toHaveBeenCalledTimes(1);
    expect(result.current.data).toBe('result');
  });

  test('should pass arguments to async function', async () => {
    const asyncFn = jest.fn().mockResolvedValue('done');
    const { result } = renderHook(() => useAsync(asyncFn, false));

    await act(async () => {
      await result.current.execute('arg1', 'arg2');
    });

    expect(asyncFn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  test('should handle errors', async () => {
    const error = new Error('Test error');
    const asyncFn = jest.fn().mockRejectedValue(error);
    const { result } = renderHook(() => useAsync(asyncFn, false));

    await act(async () => {
      try {
        await result.current.execute();
      } catch (e) {
        // Expected
      }
    });

    expect(result.current.error).toEqual(error);
    expect(result.current.status).toBe('error');
  });

  test('should update status through lifecycle', async () => {
    let resolvePromise;
    const asyncFn = jest.fn().mockImplementation(() => 
      new Promise(resolve => { resolvePromise = resolve; })
    );
    
    const { result } = renderHook(() => useAsync(asyncFn, false));

    expect(result.current.status).toBe('idle');

    act(() => {
      result.current.execute();
    });

    expect(result.current.status).toBe('pending');

    await act(async () => {
      resolvePromise('done');
    });

    await waitFor(() => {
      expect(result.current.status).toBe('success');
    });
  });

  test('should return data from execute', async () => {
    const asyncFn = jest.fn().mockResolvedValue('return value');
    const { result } = renderHook(() => useAsync(asyncFn, false));

    let returnValue;
    await act(async () => {
      returnValue = await result.current.execute();
    });

    expect(returnValue).toBe('return value');
  });
});

