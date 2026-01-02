import { renderHook } from '@testing-library/react';
import { useEventListener } from './useEventListener';

describe('useEventListener', () => {
  test('should add event listener to window', () => {
    const handler = jest.fn();
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

    renderHook(() => useEventListener('resize', handler));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
      expect.anything()
    );

    addEventListenerSpy.mockRestore();
  });

  test('should remove event listener on unmount', () => {
    const handler = jest.fn();
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useEventListener('resize', handler));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
      expect.anything()
    );

    removeEventListenerSpy.mockRestore();
  });

  test('should call handler when event fires', () => {
    const handler = jest.fn();
    renderHook(() => useEventListener('click', handler));

    window.dispatchEvent(new Event('click'));

    expect(handler).toHaveBeenCalled();
  });

  test('should use latest handler', () => {
    let handlerVersion = 1;
    const handler1 = jest.fn(() => handlerVersion);
    const handler2 = jest.fn(() => handlerVersion);

    const { rerender } = renderHook(
      ({ handler }) => useEventListener('click', handler),
      { initialProps: { handler: handler1 } }
    );

    handlerVersion = 2;
    rerender({ handler: handler2 });

    window.dispatchEvent(new Event('click'));

    expect(handler2).toHaveBeenCalled();
    // handler1 should not be called after rerender
  });

  test('should add listener to element ref', () => {
    const handler = jest.fn();
    const element = document.createElement('div');
    const ref = { current: element };
    const addEventListenerSpy = jest.spyOn(element, 'addEventListener');

    renderHook(() => useEventListener('click', handler, ref));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'click',
      expect.any(Function),
      expect.anything()
    );

    addEventListenerSpy.mockRestore();
  });

  test('should handle null element gracefully', () => {
    const handler = jest.fn();
    const ref = { current: null };

    expect(() => {
      renderHook(() => useEventListener('click', handler, ref));
    }).not.toThrow();
  });

  test('should pass options to addEventListener', () => {
    const handler = jest.fn();
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

    renderHook(() => useEventListener('scroll', handler, window, { passive: true }));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      expect.objectContaining({ passive: true })
    );

    addEventListenerSpy.mockRestore();
  });
});

