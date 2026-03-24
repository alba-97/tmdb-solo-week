import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../../state/user';
import { removeResult } from '../../state/results';
import { addFavorite as addFavoriteApi, removeFavorite as removeFavoriteApi } from '../../services/favorite.service';
import { RootState, AppDispatch } from '../../state/store';
import { TmdbMovie, UserResult } from '../../interfaces';

interface Props {
  item: TmdbMovie | UserResult;
}

const isUserResult = (item: TmdbMovie | UserResult): item is UserResult =>
  'username' in item;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Card = ({ item }: Props) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const userPath = useLocation().pathname;

  if (isUserResult(item)) {
    return (
      <motion.div className="card card--user" variants={cardVariants}>
        <Link className="card__title" to={`/user/${item.id}`}>{item.username}</Link>
      </motion.div>
    );
  }

  const category = item.title ? 'movie' : 'tv';
  const isFavorited = user.favorites.some((f) => f.id === item.id);

  const handleAdd = async () => {
    try {
      const { data } = await addFavoriteApi(user.id as number, item.id, category);
      if (data[1]) dispatch(addFavorite(data[0]));
    } catch {
      // silent fail
    }
  };

  const handleRemove = async () => {
    try {
      const { data } = await removeFavoriteApi(user.id as number, item.id);
      dispatch(removeFavorite({ id: data.id }));
      if (userPath === `/user/${user.id}`) {
        dispatch(removeResult({ category: data.category as 'movie' | 'tv' | 'user', id: data.id }));
      }
    } catch {
      // silent fail
    }
  };

  return (
    <motion.div className="card" variants={cardVariants}>
      <Link to={`/${category}/${item.id}`} className="card__poster-link">
        {item.poster_path ? (
          <img
            className="card__poster"
            alt={item.title ?? item.name ?? 'Poster'}
            src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
          />
        ) : (
          <div className="card__poster card__poster--placeholder" />
        )}
      </Link>
      <div className="card__body">
        <Link className="card__title" to={`/${category}/${item.id}`}>
          {item.title ?? item.name}
        </Link>
        {(item.release_date ?? (item as TmdbMovie).first_air_date) && (
          <p className="card__date">{item.release_date ?? (item as TmdbMovie).first_air_date}</p>
        )}
        {user.id && (
          <button
            className={`btn btn--sm ${isFavorited ? 'btn--remove' : 'btn--add'}`}
            onClick={isFavorited ? handleRemove : handleAdd}
          >
            {isFavorited ? '− Remove' : '+ Favorite'}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
