import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Card from './Card';
import { TmdbMovie, UserResult } from '../../interfaces';

interface Props {
  items: (TmdbMovie | UserResult)[];
}

const labels: Record<string, string> = {
  movie: 'Movies',
  tv: 'TV shows',
  user: 'Users',
};

const List = ({ items }: Props) => {
  const { pathname } = useLocation();
  const category = pathname.split('/').pop() ?? '';

  if (items.length === 0) {
    return (
      <motion.p
        className="empty-state"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        No {labels[category] ?? 'results'} found.
      </motion.p>
    );
  }

  return (
    <motion.div
      className="card-grid"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
    >
      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </motion.div>
  );
};

export default List;
