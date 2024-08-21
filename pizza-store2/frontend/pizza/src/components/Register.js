import * as Yup from 'yup';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { useFormik } from "formik";

function Register() {

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      role: 'customer' // Default role is 'customer'
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
      role: Yup.string().required('Role is required') // Validate role
    }),
    onSubmit: (values, { setSubmitting, resetForm, setStatus }) => {
      axios.post('http://localhost:5000/api/users/register', values)
        .then(response => {
          setStatus('success');
          resetForm();
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
        <h2>Register</h2>
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
            data-testid="username"
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
        <div className='mb-3'>
          <label htmlFor='role' className='form-label'>Role</label>
          <select
            id="role"
            name="role"
            className='form-control'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.role}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
          {formik.touched.role && formik.errors.role ? (
            <div className='text-danger'>{formik.errors.role}</div>
          ) : null}
        </div>
        <div className="text-center">
          <button type='submit' className='btn btn-primary' disabled={formik.isSubmitting} href="/">
            Register
          </button>
        </div>
        
      </form>
    </div>
  );
}

export default Register;
