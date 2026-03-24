import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getMovie, getTv } from '../../services/search.service';
import { TmdbMovie } from '../../interfaces';

const Details = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const [item, setItem] = useState<TmdbMovie | null>(null);

  useEffect(() => {
    if (!id || !['tv', 'movie'].includes(category ?? '')) return;
    const fetcher = category === 'movie' ? getMovie : getTv;
    fetcher(id)
      .then(({ data }) => setItem(data))
      .catch(() => {});
  }, [id, category]);

  if (!item) return null;

  return (
    <motion.div
      className="details"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="details__layout">
        {item.poster_path && (
          <img
            className="details__poster"
            alt={item.title ?? item.name ?? 'Poster'}
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          />
        )}
        <div className="details__info">
          <h1 className="details__title">{item.title ?? item.name}</h1>
          {(item.release_date ?? item.first_air_date) && (
            <p className="details__date">{item.release_date ?? item.first_air_date}</p>
          )}
          {item.genres && item.genres.length > 0 && (
            <div className="details__genres">
              {item.genres.map((g) => (
                <span key={g.id} className="genre-tag">{g.name}</span>
              ))}
            </div>
          )}
          {item.overview && <p className="details__overview">{item.overview}</p>}
        </div>
      </div>
    </motion.div>
  );
};

export default Details;
