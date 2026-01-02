# usePagination Hook

**Difficulty:** Medium

## Problem Statement

Implement a `usePagination` hook that manages pagination state and provides navigation functions.

## Examples

### Example 1 - Basic Pagination:
```jsx
function UserList() {
  const {
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    pageNumbers
  } = usePagination({
    totalItems: 100,
    itemsPerPage: 10
  });

  return (
    <div>
      <button onClick={prevPage} disabled={currentPage === 1}>
        Previous
      </button>
      
      {pageNumbers.map(num => (
        <button
          key={num}
          onClick={() => goToPage(num)}
          className={num === currentPage ? 'active' : ''}
        >
          {num}
        </button>
      ))}
      
      <button onClick={nextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}
```

### Example 2 - With Data Slicing:
```jsx
function PaginatedList({ items }) {
  const { currentPage, itemsPerPage, startIndex, endIndex } = usePagination({
    totalItems: items.length,
    itemsPerPage: 20
  });

  const currentItems = items.slice(startIndex, endIndex);

  return (
    <ul>
      {currentItems.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}
```

## Requirements

1. Track current page
2. Calculate total pages
3. Provide navigation functions (next, prev, goTo)
4. Generate page number array (with ellipsis for many pages)
5. Calculate start/end indices for slicing data
6. Handle edge cases (first page, last page)

## Hook Signature

```javascript
function usePagination({ totalItems, itemsPerPage, initialPage = 1 }) {
  // Return { currentPage, totalPages, goToPage, nextPage, prevPage, pageNumbers, startIndex, endIndex }
}
```

