import { renderHook } from '@testing-library/react';
import { useClickOutside } from './useClickOutside';

describe('useClickOutside', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  test('should call callback when clicking outside', () => {
    const callback = jest.fn();
    const element = document.createElement('div');
    container.appendChild(element);
    
    const ref = { current: element };
    renderHook(() => useClickOutside(ref, callback));

    // Click outside
    const event = new MouseEvent('mousedown', { bubbles: true });
    document.body.dispatchEvent(event);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should not call callback when clicking inside', () => {
    const callback = jest.fn();
    const element = document.createElement('div');
    container.appendChild(element);
    
    const ref = { current: element };
    renderHook(() => useClickOutside(ref, callback));

    // Click inside
    const event = new MouseEvent('mousedown', { bubbles: true });
    element.dispatchEvent(event);

    expect(callback).not.toHaveBeenCalled();
  });

  test('should not call callback when clicking on child element', () => {
    const callback = jest.fn();
    const element = document.createElement('div');
    const child = document.createElement('button');
    element.appendChild(child);
    container.appendChild(element);
    
    const ref = { current: element };
    renderHook(() => useClickOutside(ref, callback));

    // Click on child
    const event = new MouseEvent('mousedown', { bubbles: true });
    child.dispatchEvent(event);

    expect(callback).not.toHaveBeenCalled();
  });

  test('should clean up event listener on unmount', () => {
    const callback = jest.fn();
    const element = document.createElement('div');
    container.appendChild(element);
    
    const ref = { current: element };
    const { unmount } = renderHook(() => useClickOutside(ref, callback));

    unmount();

    // Click outside after unmount
    const event = new MouseEvent('mousedown', { bubbles: true });
    document.body.dispatchEvent(event);

    expect(callback).not.toHaveBeenCalled();
  });

  test('should handle null ref gracefully', () => {
    const callback = jest.fn();
    const ref = { current: null };

    expect(() => {
      renderHook(() => useClickOutside(ref, callback));
    }).not.toThrow();
  });
});

