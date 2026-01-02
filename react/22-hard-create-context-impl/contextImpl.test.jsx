import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMyContext, useMyContext } from './contextImpl';

describe('Context Implementation', () => {
  test('should use default value when no Provider', () => {
    const TestContext = createMyContext('default');

    function Consumer() {
      const value = useMyContext(TestContext);
      return <span data-testid="value">{value}</span>;
    }

    render(<Consumer />);
    expect(screen.getByTestId('value').textContent).toBe('default');
  });

  test('should use Provider value', () => {
    const TestContext = createMyContext('default');

    function Consumer() {
      const value = useMyContext(TestContext);
      return <span data-testid="value">{value}</span>;
    }

    render(
      <TestContext.Provider value="provided">
        <Consumer />
      </TestContext.Provider>
    );

    expect(screen.getByTestId('value').textContent).toBe('provided');
  });

  test('should work with object values', () => {
    const UserContext = createMyContext({ name: 'Guest' });

    function UserDisplay() {
      const user = useMyContext(UserContext);
      return <span data-testid="name">{user.name}</span>;
    }

    render(
      <UserContext.Provider value={{ name: 'Alice' }}>
        <UserDisplay />
      </UserContext.Provider>
    );

    expect(screen.getByTestId('name').textContent).toBe('Alice');
  });

  test('should use closest Provider value (nested)', () => {
    const ThemeContext = createMyContext('light');

    function ThemeDisplay() {
      const theme = useMyContext(ThemeContext);
      return <span data-testid="theme">{theme}</span>;
    }

    render(
      <ThemeContext.Provider value="dark">
        <div>
          <ThemeContext.Provider value="light">
            <ThemeDisplay />
          </ThemeContext.Provider>
        </div>
      </ThemeContext.Provider>
    );

    expect(screen.getByTestId('theme').textContent).toBe('light');
  });

  test('should update when Provider value changes', () => {
    const CountContext = createMyContext(0);

    function CountDisplay() {
      const count = useMyContext(CountContext);
      return <span data-testid="count">{count}</span>;
    }

    const { rerender } = render(
      <CountContext.Provider value={1}>
        <CountDisplay />
      </CountContext.Provider>
    );

    expect(screen.getByTestId('count').textContent).toBe('1');

    rerender(
      <CountContext.Provider value={2}>
        <CountDisplay />
      </CountContext.Provider>
    );

    expect(screen.getByTestId('count').textContent).toBe('2');
  });

  test('should work with multiple contexts', () => {
    const ThemeContext = createMyContext('light');
    const UserContext = createMyContext({ name: 'Guest' });

    function Display() {
      const theme = useMyContext(ThemeContext);
      const user = useMyContext(UserContext);
      return (
        <div>
          <span data-testid="theme">{theme}</span>
          <span data-testid="user">{user.name}</span>
        </div>
      );
    }

    render(
      <ThemeContext.Provider value="dark">
        <UserContext.Provider value={{ name: 'Bob' }}>
          <Display />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );

    expect(screen.getByTestId('theme').textContent).toBe('dark');
    expect(screen.getByTestId('user').textContent).toBe('Bob');
  });
});

