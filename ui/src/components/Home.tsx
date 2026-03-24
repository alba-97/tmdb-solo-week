import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '../state/store';

const Home = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <motion.div
      className="home"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="home__title">CineVault</h1>
      <p className="home__subtitle">Discover movies and TV shows. Save your favorites.</p>
      {!user.id && (
        <div className="home__actions">
          <Link className="btn btn--primary" to="/signup">Get Started</Link>
          <Link className="btn btn--outline" to="/login">Sign In</Link>
        </div>
      )}
    </motion.div>
  );
};

export default Home;
