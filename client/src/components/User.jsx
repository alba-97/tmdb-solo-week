import List from "./Item/List";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setResults } from "../state/results";

const User = () => {
  const { id } = useParams();

  const { movie, tv } = useSelector((state) => {
    return state.results;
  });

  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/api/users/${id}`)
      .then((res) => {
        setUsername(res.data.username);
        [("tv", "movie")].forEach((category) => {
          dispatch(
            setResults({
              category,
              data: res.data.items.filter(
                (favorite) => favorite.category === category
              ),
            })
          );
        });
      })
      .catch(() => {});
  }, []);

  return (
    <div style={{ marginBottom: "calc(5px + 2vmin)" }}>
      <h1>{username}</h1>
      <h2>Favorite movies</h2>
      {movie.length > 0 ? <List items={movie} /> : <h4>Nothing here</h4>}
      <h2>Favorite TV Shows</h2>
      {tv.length > 0 ? <List items={tv} /> : <h4>Nothing here</h4>}
    </div>
  );
};

export default User;
