import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => (
  <motion.div
    className="not-found"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
  >
    <span className="not-found__code">404</span>
    <p className="not-found__message">This scene doesn't exist.</p>
    <Link className="btn btn--primary" to="/">Back to Home</Link>
  </motion.div>
);

export default NotFound;
