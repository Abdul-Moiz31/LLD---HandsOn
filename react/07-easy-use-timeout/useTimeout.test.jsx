import { renderHook, act } from '@testing-library/react';
import { useTimeout } from './useTimeout';

describe('useTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should call callback after delay', () => {
    const callback = jest.fn();
    renderHook(() => useTimeout(callback, 1000));

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should not call callback when delay is null', () => {
    const callback = jest.fn();
    renderHook(() => useTimeout(callback, null));

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  test('should clear timeout on unmount', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useTimeout(callback, 1000));

    unmount();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  test('should reset timeout', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useTimeout(callback, 1000));

    act(() => {
      jest.advanceTimersByTime(500);
    });

    act(() => {
      result.current.reset();
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should clear timeout manually', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useTimeout(callback, 1000));

    act(() => {
      result.current.clear();
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  test('should only call callback once', () => {
    const callback = jest.fn();
    renderHook(() => useTimeout(callback, 1000));

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

