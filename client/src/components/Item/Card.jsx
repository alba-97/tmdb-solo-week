import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../../state/user";
import { removeResult } from "../../state/results";

const Card = ({ item }) => {
  const user = useSelector((state) => {
    return state.user;
  });

  const dispatch = useDispatch();

  const category = item.username ? "user" : item.title ? "movie" : "tv";

  const userPath = useLocation().pathname;

  const addToFavorites = () => {
    axios
      .post("/api/favorites/add", {
        userId: user.id,
        itemId: item.id,
        category,
      })
      .then((res) => {
        if (res.data[1]) {
          dispatch(addFavorite(res.data[0]));
        }
      })
      .catch(() => {});
  };

  const removeFromFavorites = () => {
    axios
      .post("/api/favorites/remove", {
        userId: user.id,
        itemId: item.id,
      })
      .then((res) => {
        const category = res.data.category;
        dispatch(removeFavorite(res.data));
        if (userPath === `/user/${user.id}`) {
          dispatch(
            removeResult({
              category,
              id: res.data.id,
            })
          );
        }
      })
      .catch(() => {});
  };

  return (
    <div className="Content">
      <Link className="Content-links" to={`/${category}/${item.id}`}>
        <h3>{item.title || item.name || item.username}</h3>
      </Link>
      {category !== "user" && (
        <>
          <p>{item.release_date || item.first_air_date}</p>
          <Link to={`/${category}/${item.id}`}>
            <img
              alt="Poster"
              src={"https://image.tmdb.org/t/p/w154" + item.poster_path}
            />
          </Link>
          <div>
            {user.id &&
              (user.favorites.some((favorite) => favorite.id === item.id) ? (
                <button
                  className="Fav-button Fav-remove"
                  onClick={removeFromFavorites}
                >
                  Remove from favorites
                </button>
              ) : (
                <button className="Fav-button Fav-add" onClick={addToFavorites}>
                  Add to favorites
                </button>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
