import { renderHook } from '@testing-library/react';
import { useInterval } from './useInterval';

describe('useInterval', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should call callback at specified interval', () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, 1000));

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  test('should not call callback when delay is null', () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, null));

    jest.advanceTimersByTime(5000);
    expect(callback).not.toHaveBeenCalled();
  });

  test('should pause when delay changes to null', () => {
    const callback = jest.fn();
    const { rerender } = renderHook(
      ({ delay }) => useInterval(callback, delay),
      { initialProps: { delay: 1000 } }
    );

    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(2);

    rerender({ delay: null });

    jest.advanceTimersByTime(5000);
    expect(callback).toHaveBeenCalledTimes(2); // No more calls
  });

  test('should resume when delay changes from null', () => {
    const callback = jest.fn();
    const { rerender } = renderHook(
      ({ delay }) => useInterval(callback, delay),
      { initialProps: { delay: null } }
    );

    jest.advanceTimersByTime(2000);
    expect(callback).not.toHaveBeenCalled();

    rerender({ delay: 1000 });

    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  test('should clean up on unmount', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useInterval(callback, 1000));

    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(2);

    unmount();

    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(2); // No more calls
  });

  test('should use latest callback without restarting interval', () => {
    let value = 0;
    const { rerender } = renderHook(
      ({ callback }) => useInterval(callback, 1000),
      { initialProps: { callback: () => (value = 1) } }
    );

    rerender({ callback: () => (value = 2) });

    jest.advanceTimersByTime(1000);
    expect(value).toBe(2); // Uses latest callback
  });

  test('should restart interval when delay changes', () => {
    const callback = jest.fn();
    const { rerender } = renderHook(
      ({ delay }) => useInterval(callback, delay),
      { initialProps: { delay: 1000 } }
    );

    jest.advanceTimersByTime(500);
    rerender({ delay: 500 });

    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

