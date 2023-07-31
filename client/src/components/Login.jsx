import useInput from "../hooks/useInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setFavorites } from "../state/user";

const Login = () => {
  const username = useInput();
  const password = useInput();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/login", {
        username: username.value,
        password: password.value,
      })
      .then(() => axios.get("/api/secret"))
      .then((res) => res.data)
      .then((user) => {
        dispatch(setUser(user));
        return axios.get(`/api/users/${user.id}`);
      })
      .then((res) => {
        dispatch(setFavorites(res.data.items));
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        navigate("/404");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="Auth-form"
        value={username.value}
        onChange={username.onChange}
        placeholder="Username"
        type="text"
        required
      />
      <input
        className="Auth-form"
        value={password.value}
        onChange={password.onChange}
        placeholder="Password"
        type="password"
        required
      />
      <input className="Auth-form Auth-button" type="submit" value="Login" />
    </form>
  );
};

export default Login;
