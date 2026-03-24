import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { setResults } from '../state/results';
import { getUserProfile } from '../services/user.service';
import { RootState, AppDispatch } from '../state/store';
import List from './Item/List';

const User = () => {
  const { id } = useParams<{ id: string }>();
  const { movie, tv } = useSelector((state: RootState) => state.results);
  const [username, setUsername] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!id) return;
    getUserProfile(id)
      .then(({ data }) => {
        setUsername(data.username);
        dispatch(setResults({ category: 'movie', data: data.items.filter((i) => i.category === 'movie') }));
        dispatch(setResults({ category: 'tv', data: data.items.filter((i) => i.category === 'tv') }));
      })
      .catch(() => {});
  }, [id, dispatch]);

  return (
    <motion.div
      className="user-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="user-page__name">{username}</h1>
      <section className="user-section">
        <h2 className="user-section__title">Favorite Movies</h2>
        {movie.length > 0 ? <List items={movie} /> : <p className="empty-state">Nothing here yet.</p>}
      </section>
      <section className="user-section">
        <h2 className="user-section__title">Favorite TV Shows</h2>
        {tv.length > 0 ? <List items={tv} /> : <p className="empty-state">Nothing here yet.</p>}
      </section>
    </motion.div>
  );
};

export default User;
