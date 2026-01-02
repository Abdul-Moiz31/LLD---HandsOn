import { renderHook, waitFor, act } from '@testing-library/react';
import { useSWR } from './useSWR';

describe('useSWR', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should start loading when no cache', async () => {
    const fetcher = jest.fn().mockResolvedValue('data');
    
    const { result } = renderHook(() => useSWR('key1', fetcher));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  test('should return data after fetch', async () => {
    const fetcher = jest.fn().mockResolvedValue({ name: 'Test' });
    
    const { result } = renderHook(() => useSWR('key2', fetcher));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual({ name: 'Test' });
  });

  test('should return error on fetch failure', async () => {
    const error = new Error('Fetch failed');
    const fetcher = jest.fn().mockRejectedValue(error);
    
    const { result } = renderHook(() => useSWR('key3', fetcher));

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });

    expect(result.current.error.message).toBe('Fetch failed');
  });

  test('should return cached data immediately', async () => {
    const fetcher = jest.fn().mockResolvedValue('fresh');
    
    // First render - populates cache
    const { result: result1, unmount } = renderHook(() => useSWR('key4', fetcher));
    
    await waitFor(() => {
      expect(result1.current.data).toBe('fresh');
    });

    unmount();

    // Second render - should have cached data
    const { result: result2 } = renderHook(() => useSWR('key4', fetcher));

    // Should have data from cache immediately (no loading)
    expect(result2.current.data).toBe('fresh');
  });

  test('should revalidate with mutate', async () => {
    let callCount = 0;
    const fetcher = jest.fn().mockImplementation(() => 
      Promise.resolve(`data-${++callCount}`)
    );
    
    const { result } = renderHook(() => useSWR('key5', fetcher));

    await waitFor(() => {
      expect(result.current.data).toBe('data-1');
    });

    await act(async () => {
      await result.current.mutate();
    });

    await waitFor(() => {
      expect(result.current.data).toBe('data-2');
    });
  });

  test('should support refreshInterval', async () => {
    let callCount = 0;
    const fetcher = jest.fn().mockImplementation(() => 
      Promise.resolve(`data-${++callCount}`)
    );
    
    renderHook(() => useSWR('key6', fetcher, { refreshInterval: 1000 }));

    await waitFor(() => {
      expect(fetcher).toHaveBeenCalledTimes(1);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(fetcher).toHaveBeenCalledTimes(2);
    });
  });

  test('should track isValidating state', async () => {
    let resolvePromise;
    const fetcher = jest.fn().mockImplementation(() => 
      new Promise(resolve => { resolvePromise = resolve; })
    );
    
    const { result } = renderHook(() => useSWR('key7', fetcher));

    expect(result.current.isValidating).toBe(true);

    await act(async () => {
      resolvePromise('data');
    });

    await waitFor(() => {
      expect(result.current.isValidating).toBe(false);
    });
  });
});

