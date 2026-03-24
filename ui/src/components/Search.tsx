import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchMovies, searchTv, searchUsers } from '../services/search.service';
import { setResults } from '../state/results';
import { AppDispatch } from '../state/store';
import useInput from '../hooks/useInput';

type Category = 'movie' | 'tv' | 'user';

const categoryFromPath = (pathname: string): Category | null => {
  if (pathname === '/search/movie') return 'movie';
  if (pathname === '/search/tv') return 'tv';
  if (pathname === '/search/user') return 'user';
  return null;
};

const runSearch = async (
  q: string,
  category: Category,
  dispatch: AppDispatch,
  navigate: ReturnType<typeof useNavigate>
) => {
  if (!q) return;
  try {
    if (category === 'movie') {
      const { data } = await searchMovies(q);
      dispatch(setResults({ category: 'movie', data: data.data }));
    } else if (category === 'tv') {
      const { data } = await searchTv(q);
      dispatch(setResults({ category: 'tv', data: data.data }));
    } else {
      const { data } = await searchUsers(q);
      dispatch(setResults({ category: 'user', data: data.data }));
    }
    navigate(`/search/${category}`);
  } catch {
    // silent fail
  }
};

const Search = () => {
  const search = useInput();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const isSearchPage = location.pathname.startsWith('/search/');
  const [category, setCategory] = useState<Category>('movie');

  useEffect(() => {
    const cat = categoryFromPath(location.pathname);
    if (cat) setCategory(cat);
  }, [location.pathname]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await runSearch(search.value.trim(), category, dispatch, navigate);
  };

  const handleCategoryChange = async (cat: Category) => {
    setCategory(cat);
    if (isSearchPage) {
      await runSearch(search.value.trim(), cat, dispatch, navigate);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-input"
        value={search.value}
        onChange={search.onChange}
        placeholder="Search…"
        type="text"
      />
      {isSearchPage && (
        <div className="search-radios">
          {(['movie', 'tv', 'user'] as Category[]).map((cat) => (
            <label key={cat} className={`radio-label ${category === cat ? 'radio-label--active' : ''}`}>
              <input
                type="radio"
                name="category"
                value={cat}
                checked={category === cat}
                onChange={() => handleCategoryChange(cat)}
              />
              {cat === 'movie' ? 'Movies' : cat === 'tv' ? 'TV' : 'Users'}
            </label>
          ))}
        </div>
      )}
      <button className="btn btn--search" type="submit">Search</button>
    </form>
  );
};

export default Search;
