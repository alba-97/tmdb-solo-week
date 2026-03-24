import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signup } from '../services/auth.service';
import signupSchema from '../utils/schemas/signup.schema';

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: '', email: '', password: '', confirmPassword: '' },
    validationSchema: signupSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        await signup(values.username, values.password, values.email);
        navigate('/login');
      } catch {
        setFieldError('username', 'Username or email already taken');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const fields: Array<{ name: keyof typeof formik.values; label: string; type: string }> = [
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
  ];

  return (
    <motion.div
      className="auth-page"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <form onSubmit={formik.handleSubmit} className="auth-form">
          {fields.map(({ name, label, type }) => (
            <div className="field-group" key={name}>
              <input
                className={`field-input ${formik.touched[name] && formik.errors[name] ? 'field-input--error' : ''}`}
                name={name}
                type={type}
                placeholder={label}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched[name] && formik.errors[name] && (
                <span className="field-error">{formik.errors[name]}</span>
              )}
            </div>
          ))}
          <button className="btn btn--primary btn--full" type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Creating account…' : 'Create Account'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Signup;
