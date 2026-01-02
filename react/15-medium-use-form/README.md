# useForm Hook

**Difficulty:** Medium

## Problem Statement

Implement a `useForm` hook that handles form state, validation, and submission. This is a simplified version of libraries like React Hook Form or Formik.

## Examples

### Example 1 - Basic Form:
```jsx
function LoginForm() {
  const { values, handleChange, handleSubmit, errors } = useForm({
    initialValues: { email: '', password: '' },
    validate: (values) => {
      const errors = {};
      if (!values.email) errors.email = 'Email is required';
      if (!values.password) errors.password = 'Password is required';
      return errors;
    },
    onSubmit: (values) => {
      console.log('Submitting:', values);
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={values.email} onChange={handleChange} />
      {errors.email && <span>{errors.email}</span>}
      
      <input name="password" type="password" value={values.password} onChange={handleChange} />
      {errors.password && <span>{errors.password}</span>}
      
      <button type="submit">Login</button>
    </form>
  );
}
```

### Example 2 - With Touched State:
```jsx
function Form() {
  const { values, errors, touched, handleChange, handleBlur } = useForm({
    initialValues: { name: '' },
    validate: (values) => ({
      name: values.name.length < 3 ? 'Too short' : ''
    })
  });

  return (
    <input
      name="name"
      value={values.name}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    {touched.name && errors.name && <span>{errors.name}</span>}
  );
}
```

## Requirements

1. Manage form values state
2. Handle input changes
3. Validate on submit
4. Track touched fields
5. Track submission state (isSubmitting)
6. Provide reset function

## Hook Signature

```javascript
function useForm({ initialValues, validate, onSubmit }) {
  // Return { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, reset, setValues }
}
```

