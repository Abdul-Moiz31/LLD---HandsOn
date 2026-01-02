import { renderHook, act } from '@testing-library/react';
import { usePagination } from './usePagination';

describe('usePagination', () => {
  test('should initialize with first page', () => {
    const { result } = renderHook(() => usePagination({
      totalItems: 100,
      itemsPerPage: 10
    }));

    expect(result.current.currentPage).toBe(1);
  });

  test('should calculate total pages correctly', () => {
    const { result } = renderHook(() => usePagination({
      totalItems: 95,
      itemsPerPage: 10
    }));

    expect(result.current.totalPages).toBe(10); // 95/10 = 9.5, ceil = 10
  });

  test('should go to next page', () => {
    const { result } = renderHook(() => usePagination({
      totalItems: 100,
      itemsPerPage: 10
    }));

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(2);
  });

  test('should go to previous page', () => {
    const { result } = renderHook(() => usePagination({
      totalItems: 100,
      itemsPerPage: 10,
      initialPage: 5
    }));

    act(() => {
      result.current.prevPage();
    });

    expect(result.current.currentPage).toBe(4);
  });

  test('should not go below page 1', () => {
    const { result } = renderHook(() => usePagination({
      totalItems: 100,
      itemsPerPage: 10,
      initialPage: 1
    }));

    act(() => {
      result.current.prevPage();
    });

    expect(result.current.currentPage).toBe(1);
  });

  test('should not go above total pages', () => {
    const { result } = renderHook(() => usePagination({
      totalItems: 30,
      itemsPerPage: 10,
      initialPage: 3
    }));

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(3);
  });

  test('should go to specific page', () => {
    const { result } = renderHook(() => usePagination({
      totalItems: 100,
      itemsPerPage: 10
    }));

    act(() => {
      result.current.goToPage(5);
    });

    expect(result.current.currentPage).toBe(5);
  });

  test('should calculate correct start and end indices', () => {
    const { result } = renderHook(() => usePagination({
      totalItems: 100,
      itemsPerPage: 10,
      initialPage: 3
    }));

    expect(result.current.startIndex).toBe(20); // (3-1) * 10
    expect(result.current.endIndex).toBe(30);   // 3 * 10
  });

  test('should generate page numbers', () => {
    const { result } = renderHook(() => usePagination({
      totalItems: 50,
      itemsPerPage: 10
    }));

    expect(result.current.pageNumbers).toEqual([1, 2, 3, 4, 5]);
  });

  test('should use initial page', () => {
    const { result } = renderHook(() => usePagination({
      totalItems: 100,
      itemsPerPage: 10,
      initialPage: 7
    }));

    expect(result.current.currentPage).toBe(7);
  });

  test('should clamp goToPage within bounds', () => {
    const { result } = renderHook(() => usePagination({
      totalItems: 50,
      itemsPerPage: 10
    }));

    act(() => {
      result.current.goToPage(100);
    });

    expect(result.current.currentPage).toBe(5);

    act(() => {
      result.current.goToPage(0);
    });

    expect(result.current.currentPage).toBe(1);
  });
});

