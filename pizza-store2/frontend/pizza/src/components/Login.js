import React from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: (values, { setSubmitting, resetForm, setStatus }) => {
      axios.post('http://localhost:5000/api/users/login', values)
        .then(response => {
          // Assuming response contains a token and role
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('role', response.data.role);
          resetForm();
          navigate(response.data.role === 'admin' ? '/admin-dashboard' : '/customer-dashboard');
        })
        .catch(error => {
          setStatus('error');
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  });

  return (
    <div className='container mt-4'>
      <div className='text-center'>
        <h2>Login</h2>
      </div>
      <form onSubmit={formik.handleSubmit} className="border border-dark p-5 rounded">
        <div className='mb-3'>
          <label htmlFor='username' className='form-label'>Username</label>
          <input
            id="username"
            name="username"
            type="text"
            className='form-control'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className='text-danger'>{formik.errors.username}</div>
          ) : null}
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className='form-control'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className='text-danger'>{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="text-center">
          <button type='submit' className='btn btn-primary' disabled={formik.isSubmitting}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
