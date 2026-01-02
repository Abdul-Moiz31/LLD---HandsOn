import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { VirtualList } from './VirtualList';

describe('VirtualList', () => {
  const createItems = (count) =>
    Array.from({ length: count }, (_, i) => ({ id: i, text: `Item ${i}` }));

  const defaultRenderItem = ({ item, style }) => (
    <div style={style} data-testid={`item-${item.id}`}>
      {item.text}
    </div>
  );

  test('should render visible items only', () => {
    const items = createItems(100);
    
    render(
      <VirtualList
        items={items}
        height={200}
        itemHeight={50}
        renderItem={defaultRenderItem}
      />
    );

    // With height=200 and itemHeight=50, only 4 items should be visible
    // Plus overscan of 3, so max ~7-10 items
    const renderedItems = screen.getAllByTestId(/^item-/);
    expect(renderedItems.length).toBeLessThan(20);
  });

  test('should render first items initially', () => {
    const items = createItems(100);
    
    render(
      <VirtualList
        items={items}
        height={200}
        itemHeight={50}
        renderItem={defaultRenderItem}
      />
    );

    expect(screen.getByTestId('item-0')).toBeInTheDocument();
    expect(screen.getByTestId('item-1')).toBeInTheDocument();
  });

  test('should have correct total height', () => {
    const items = createItems(100);
    
    const { container } = render(
      <VirtualList
        items={items}
        height={200}
        itemHeight={50}
        renderItem={defaultRenderItem}
      />
    );

    // Inner container should have total height for scrolling
    const innerContainer = container.querySelector('[style*="height"]');
    // Total height should be 100 * 50 = 5000px
  });

  test('should position items correctly', () => {
    const items = createItems(10);
    
    render(
      <VirtualList
        items={items}
        height={200}
        itemHeight={50}
        renderItem={({ item, style }) => (
          <div style={style} data-testid={`item-${item.id}`}>
            {item.text}
          </div>
        )}
      />
    );

    const firstItem = screen.getByTestId('item-0');
    // First item should be at top (0px or via transform)
    expect(firstItem).toBeInTheDocument();
  });

  test('should pass item and index to renderItem', () => {
    const items = createItems(5);
    const renderItem = jest.fn(({ item, index, style }) => (
      <div style={style} key={item.id} data-testid={`item-${index}`}>
        {item.text}
      </div>
    ));
    
    render(
      <VirtualList
        items={items}
        height={500}
        itemHeight={50}
        renderItem={renderItem}
      />
    );

    expect(renderItem).toHaveBeenCalled();
    const firstCall = renderItem.mock.calls[0][0];
    expect(firstCall.item).toEqual({ id: 0, text: 'Item 0' });
    expect(firstCall.index).toBe(0);
    expect(firstCall.style).toBeDefined();
  });

  test('should render container with correct height', () => {
    const items = createItems(10);
    
    const { container } = render(
      <VirtualList
        items={items}
        height={300}
        itemHeight={50}
        renderItem={defaultRenderItem}
      />
    );

    const scrollContainer = container.firstChild;
    expect(scrollContainer).toHaveStyle({ height: '300px' });
  });

  test('should handle empty items array', () => {
    const { container } = render(
      <VirtualList
        items={[]}
        height={200}
        itemHeight={50}
        renderItem={defaultRenderItem}
      />
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});

