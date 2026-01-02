import { renderHook, act } from '@testing-library/react';
import { useForm } from './useForm';

describe('useForm', () => {
  test('should initialize with initial values', () => {
    const { result } = renderHook(() => useForm({
      initialValues: { name: 'John', email: 'john@test.com' }
    }));

    expect(result.current.values).toEqual({
      name: 'John',
      email: 'john@test.com'
    });
  });

  test('should handle input changes', () => {
    const { result } = renderHook(() => useForm({
      initialValues: { name: '' }
    }));

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Alice' }
      });
    });

    expect(result.current.values.name).toBe('Alice');
  });

  test('should track touched fields on blur', () => {
    const { result } = renderHook(() => useForm({
      initialValues: { email: '' }
    }));

    expect(result.current.touched.email).toBeFalsy();

    act(() => {
      result.current.handleBlur({
        target: { name: 'email' }
      });
    });

    expect(result.current.touched.email).toBe(true);
  });

  test('should validate on submit', async () => {
    const onSubmit = jest.fn();
    const validate = (values) => ({
      email: values.email ? '' : 'Email required'
    });

    const { result } = renderHook(() => useForm({
      initialValues: { email: '' },
      validate,
      onSubmit
    }));

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() });
    });

    expect(result.current.errors.email).toBe('Email required');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('should call onSubmit when valid', async () => {
    const onSubmit = jest.fn();
    const validate = () => ({});

    const { result } = renderHook(() => useForm({
      initialValues: { email: 'test@test.com' },
      validate,
      onSubmit
    }));

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() });
    });

    expect(onSubmit).toHaveBeenCalledWith({ email: 'test@test.com' });
  });

  test('should reset form', () => {
    const { result } = renderHook(() => useForm({
      initialValues: { name: 'Original' }
    }));

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Changed' }
      });
    });

    expect(result.current.values.name).toBe('Changed');

    act(() => {
      result.current.reset();
    });

    expect(result.current.values.name).toBe('Original');
  });

  test('should set values programmatically', () => {
    const { result } = renderHook(() => useForm({
      initialValues: { field: '' }
    }));

    act(() => {
      result.current.setValues({ field: 'New Value' });
    });

    expect(result.current.values.field).toBe('New Value');
  });

  test('should track isSubmitting state', async () => {
    let resolveSubmit;
    const onSubmit = jest.fn(() => new Promise(r => { resolveSubmit = r; }));

    const { result } = renderHook(() => useForm({
      initialValues: {},
      validate: () => ({}),
      onSubmit
    }));

    expect(result.current.isSubmitting).toBe(false);

    act(() => {
      result.current.handleSubmit({ preventDefault: jest.fn() });
    });

    expect(result.current.isSubmitting).toBe(true);

    await act(async () => {
      resolveSubmit();
    });

    expect(result.current.isSubmitting).toBe(false);
  });
});

