import "./App.css";

import { useEffect } from "react";
import { Routes, Route } from "react-router";

import axios from "axios";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

import Details from "./components/Item/Details";
import List from "./components/Item/List";

import NotFound from "./components/NotFound";
import User from "./components/User";

import { useSelector, useDispatch } from "react-redux";
import { setUser, setFavorites } from "./state/user";

function App() {
  const results = useSelector((state) => {
    return state.results;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/api/me")
      .then((res) => res.data)
      .then((user) => {
        dispatch(setUser(user));
        return axios.get(`/api/users/${user.id}`);
      })
      .then((res) => {
        dispatch(setFavorites(res.data.items));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="App">
      <div className="App-navbar">
        <Navbar />
      </div>
      <div className="App-content">
        <Routes>
          <Route path="/:category/:id" element={<Details />} />
          <Route path="/user/:id" element={<User />} />

          <Route path="/search/user" element={<List items={results.user} />} />
          <Route
            path="/search/movie"
            element={<List items={results.movie} />}
          />
          <Route path="/search/tv" element={<List items={results.tv} />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
