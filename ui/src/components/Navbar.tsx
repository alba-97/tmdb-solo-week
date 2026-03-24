import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { setUser, setFavorites } from '../state/user';
import { logout } from '../services/auth.service';
import { RootState, AppDispatch } from '../state/store';
import Search from './Search';

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    await logout();
    dispatch(setUser({ id: null, username: '' }));
    dispatch(setFavorites([]));
  };

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          CineVault
        </Link>
        <div className="navbar__search">
          <Search />
        </div>
        <motion.div className="navbar__links" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {!user.id ? (
            <>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link nav-link--accent" to="/signup">Sign Up</Link>
            </>
          ) : (
            <>
              <Link className="nav-link" to={`/user/${user.id}`}>{user.username}</Link>
              <button className="nav-link nav-link--ghost" onClick={handleLogout}>Log out</button>
            </>
          )}
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
