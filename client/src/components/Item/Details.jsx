import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Details = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState([]);

  useEffect(() => {
    if (["tv", "movie"].includes(category)) {
      axios
        .get(`/api/${category}/${id}`)
        .then((res) => res.data)
        .then((data) => {
          setItem(data);
        })
        .catch(() => {});
    }
  }, [id]);

  return (
    item.id && (
      <div>
        <h3>{item.title}</h3>
        <p>{item.release_date}</p>
        <img
          alt="poster"
          src={"https://image.tmdb.org/t/p/w154" + item.poster_path}
        />
        {item.genres.map((genre, key) => (
          <div key={key}>{genre.name}</div>
        ))}
        <p>{item.overview}</p>
      </div>
    )
  );
};

export default Details;
