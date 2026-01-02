import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from './useFetch';

describe('useFetch', () => {
  const mockData = { id: 1, name: 'Test' };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should start with loading state', () => {
    global.fetch.mockImplementation(() => new Promise(() => {}));
    
    const { result } = renderHook(() => useFetch('/api/test'));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
  });

  test('should fetch data successfully', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    const { result } = renderHook(() => useFetch('/api/test'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  test('should handle fetch error', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useFetch('/api/test'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error.message).toBe('Network error');
    expect(result.current.data).toBe(null);
  });

  test('should handle non-ok response', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    });

    const { result } = renderHook(() => useFetch('/api/test'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
  });

  test('should refetch data', async () => {
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ value: 1 })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ value: 2 })
      });

    const { result } = renderHook(() => useFetch('/api/test'));

    await waitFor(() => {
      expect(result.current.data).toEqual({ value: 1 });
    });

    result.current.refetch();

    await waitFor(() => {
      expect(result.current.data).toEqual({ value: 2 });
    });
  });

  test('should call fetch with correct URL', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({})
    });

    renderHook(() => useFetch('/api/users'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/users',
        expect.anything()
      );
    });
  });

  test('should pass options to fetch', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({})
    });

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };

    renderHook(() => useFetch('/api/users', options));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/users',
        expect.objectContaining(options)
      );
    });
  });
});

