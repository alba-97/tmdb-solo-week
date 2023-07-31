import useInput from "../hooks/useInput";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setResults } from "../state/results";

const Search = () => {
  const search = useInput();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [category, setCategory] = useState("movie");

  const onChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (["movie", "tv", "user"].includes(category)) {
      const query = search.value.replaceAll(" ", "+");
      const parameter = category === "user" ? "username" : "title";
      console.log(`/api/search/${category}?${parameter}=${query}`);
      axios
        .get(`/api/search/${category}?${parameter}=${query}`)
        .then((res) => res.data)
        .then((data) => {
          dispatch(setResults({ category, data }));
          navigate("/search/" + category);
        })
        .catch(() => {});
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <span className="Search-element">
        <input
          className="Search-field"
          value={search.value}
          onChange={search.onChange}
          placeholder="Search..."
          type="text"
          required
        />
      </span>
      <span className="Search-element">
        <label>
          <input
            onChange={onChange}
            type="radio"
            name="category"
            id="movie"
            value="movie"
            defaultChecked
          />
          Movies
        </label>
        <label>
          <input
            onChange={onChange}
            type="radio"
            name="category"
            id="tv"
            value="tv"
          />
          TV
        </label>
        <label>
          <input
            onChange={onChange}
            type="radio"
            name="category"
            id="user"
            value="user"
          />
          Users
        </label>
      </span>
      <span className="Search-element">
        <input className="Search-button" type="submit" value="SEARCH" />
      </span>
    </form>
  );
};

export default Search;
