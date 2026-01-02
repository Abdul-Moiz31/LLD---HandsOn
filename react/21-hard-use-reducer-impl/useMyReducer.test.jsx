import { renderHook, act } from '@testing-library/react';
import { useMyReducer } from './useMyReducer';

describe('useMyReducer', () => {
  const counterReducer = (state, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return { count: state.count + 1 };
      case 'DECREMENT':
        return { count: state.count - 1 };
      case 'SET':
        return { count: action.payload };
      default:
        return state;
    }
  };

  test('should initialize with initial state', () => {
    const { result } = renderHook(() => 
      useMyReducer(counterReducer, { count: 0 })
    );

    expect(result.current[0]).toEqual({ count: 0 });
  });

  test('should dispatch actions and update state', () => {
    const { result } = renderHook(() => 
      useMyReducer(counterReducer, { count: 0 })
    );

    act(() => {
      result.current[1]({ type: 'INCREMENT' });
    });

    expect(result.current[0]).toEqual({ count: 1 });

    act(() => {
      result.current[1]({ type: 'INCREMENT' });
      result.current[1]({ type: 'INCREMENT' });
    });

    expect(result.current[0]).toEqual({ count: 3 });
  });

  test('should handle different action types', () => {
    const { result } = renderHook(() => 
      useMyReducer(counterReducer, { count: 10 })
    );

    act(() => {
      result.current[1]({ type: 'DECREMENT' });
    });

    expect(result.current[0]).toEqual({ count: 9 });

    act(() => {
      result.current[1]({ type: 'SET', payload: 100 });
    });

    expect(result.current[0]).toEqual({ count: 100 });
  });

  test('should support init function', () => {
    const init = (count) => ({ count: count * 2 });

    const { result } = renderHook(() => 
      useMyReducer(counterReducer, 5, init)
    );

    expect(result.current[0]).toEqual({ count: 10 });
  });

  test('dispatch should be stable across renders', () => {
    const { result, rerender } = renderHook(() => 
      useMyReducer(counterReducer, { count: 0 })
    );

    const firstDispatch = result.current[1];

    act(() => {
      result.current[1]({ type: 'INCREMENT' });
    });

    rerender();

    expect(result.current[1]).toBe(firstDispatch);
  });

  test('should handle reducer returning same state', () => {
    const { result } = renderHook(() => 
      useMyReducer(counterReducer, { count: 0 })
    );

    const initialState = result.current[0];

    act(() => {
      result.current[1]({ type: 'UNKNOWN' });
    });

    // State should be unchanged for unknown action
    expect(result.current[0]).toEqual(initialState);
  });

  test('should work with complex state', () => {
    const todoReducer = (state, action) => {
      switch (action.type) {
        case 'ADD':
          return { ...state, todos: [...state.todos, action.payload] };
        case 'TOGGLE':
          return {
            ...state,
            todos: state.todos.map((t, i) =>
              i === action.payload ? { ...t, done: !t.done } : t
            )
          };
        default:
          return state;
      }
    };

    const { result } = renderHook(() => 
      useMyReducer(todoReducer, { todos: [] })
    );

    act(() => {
      result.current[1]({ type: 'ADD', payload: { text: 'Test', done: false } });
    });

    expect(result.current[0].todos).toHaveLength(1);
    expect(result.current[0].todos[0].text).toBe('Test');
  });
});

