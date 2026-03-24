import './App.css';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { useDispatch } from 'react-redux';
import { setUser, setFavorites } from './state/user';
import { getMe } from './services/auth.service';
import { getUserProfile } from './services/user.service';
import { AppDispatch } from './state/store';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Details from './components/Item/Details';
import List from './components/Item/List';
import NotFound from './components/NotFound';
import User from './components/User';
import Home from './components/Home';
import { useSelector } from 'react-redux';
import { RootState } from './state/store';

const App = () => {
  const results = useSelector((state: RootState) => state.results);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getMe()
      .then(({ data: user }) => {
        dispatch(setUser({ id: user.id, username: user.username }));
        return getUserProfile(user.id as number);
      })
      .then(({ data: profile }) => {
        dispatch(setFavorites(profile.items));
      })
      .catch(() => {});
  }, [dispatch]);

  return (
    <div className="app">
      <Navbar />
      <main className="app__content">
        <Routes>
          <Route path="/:category/:id" element={<Details />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/search/user" element={<List items={results.user} />} />
          <Route path="/search/movie" element={<List items={results.movie} />} />
          <Route path="/search/tv" element={<List items={results.tv} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
