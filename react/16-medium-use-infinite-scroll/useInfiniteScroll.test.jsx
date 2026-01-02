import { renderHook, act, waitFor } from '@testing-library/react';
import { useInfiniteScroll } from './useInfiniteScroll';

// Mock IntersectionObserver
const mockObserve = jest.fn();
const mockUnobserve = jest.fn();
const mockDisconnect = jest.fn();

let intersectionCallback;

beforeEach(() => {
  global.IntersectionObserver = jest.fn((callback) => {
    intersectionCallback = callback;
    return {
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
    };
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('useInfiniteScroll', () => {
  test('should return loaderRef and loading state', () => {
    const { result } = renderHook(() => useInfiniteScroll({
      loadMore: jest.fn(),
      hasMore: true
    }));

    expect(result.current.loaderRef).toBeDefined();
    expect(result.current.loading).toBe(false);
  });

  test('should call loadMore when element is visible', async () => {
    const loadMore = jest.fn().mockResolvedValue(undefined);
    
    const { result } = renderHook(() => useInfiniteScroll({
      loadMore,
      hasMore: true
    }));

    // Simulate element becoming visible
    const element = document.createElement('div');
    result.current.loaderRef.current = element;

    act(() => {
      intersectionCallback([{ isIntersecting: true }]);
    });

    await waitFor(() => {
      expect(loadMore).toHaveBeenCalled();
    });
  });

  test('should not call loadMore when hasMore is false', async () => {
    const loadMore = jest.fn();
    
    const { result } = renderHook(() => useInfiniteScroll({
      loadMore,
      hasMore: false
    }));

    const element = document.createElement('div');
    result.current.loaderRef.current = element;

    act(() => {
      intersectionCallback([{ isIntersecting: true }]);
    });

    expect(loadMore).not.toHaveBeenCalled();
  });

  test('should not call loadMore when loading', async () => {
    let resolveLoad;
    const loadMore = jest.fn().mockImplementation(() => 
      new Promise(resolve => { resolveLoad = resolve; })
    );
    
    const { result } = renderHook(() => useInfiniteScroll({
      loadMore,
      hasMore: true
    }));

    const element = document.createElement('div');
    result.current.loaderRef.current = element;

    // First intersection
    act(() => {
      intersectionCallback([{ isIntersecting: true }]);
    });

    expect(loadMore).toHaveBeenCalledTimes(1);

    // Second intersection while still loading
    act(() => {
      intersectionCallback([{ isIntersecting: true }]);
    });

    // Should still be 1
    expect(loadMore).toHaveBeenCalledTimes(1);

    // Resolve and check loading state
    await act(async () => {
      resolveLoad();
    });
  });

  test('should disconnect observer on unmount', () => {
    const { unmount } = renderHook(() => useInfiniteScroll({
      loadMore: jest.fn(),
      hasMore: true
    }));

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });
});

