import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { setUser, setFavorites } from '../state/user';
import { login, getSecret } from '../services/auth.service';
import { getUserProfile } from '../services/user.service';
import loginSchema from '../utils/schemas/login.schema';
import { AppDispatch } from '../state/store';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        await login(values.username, values.password);
        const { data: user } = await getSecret();
        dispatch(setUser({ id: user.id, username: user.username }));
        const { data: profile } = await getUserProfile(user.id as number);
        dispatch(setFavorites(profile.items));
        navigate('/');
      } catch {
        setFieldError('password', 'Invalid username or password');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <motion.div
      className="auth-page"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="auth-card">
        <h2 className="auth-title">Sign In</h2>
        <form onSubmit={formik.handleSubmit} className="auth-form">
          <div className="field-group">
            <input
              className={`field-input ${formik.touched.username && formik.errors.username ? 'field-input--error' : ''}`}
              name="username"
              type="text"
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username && (
              <span className="field-error">{formik.errors.username}</span>
            )}
          </div>
          <div className="field-group">
            <input
              className={`field-input ${formik.touched.password && formik.errors.password ? 'field-input--error' : ''}`}
              name="password"
              type="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <span className="field-error">{formik.errors.password}</span>
            )}
          </div>
          <button className="btn btn--primary btn--full" type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
