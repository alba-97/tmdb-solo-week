import useInput from "../hooks/useInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const username = useInput();
  const password = useInput();
  const password2 = useInput();
  const email = useInput();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.value == password2.value)
      axios
        .post("/api/signup", {
          username: username.value,
          password: password.value,
          email: email.value,
        })
        .then(() => navigate("/"))
        .catch(() => {
          navigate("/404");
        });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          className="Signup-form"
          value={username.value}
          onChange={username.onChange}
          placeholder="Username"
          type="text"
          required
        />
      </div>
      <div>
        <input
          className="Signup-form"
          value={password.value}
          onChange={password.onChange}
          placeholder="Password"
          type="password"
          required
        />
      </div>
      <div>
        <input
          className="Signup-form"
          value={password2.value}
          onChange={password2.onChange}
          placeholder="Repeat password"
          type="password"
          required
        />
      </div>
      <div>
        <input
          className="Signup-form"
          value={email.value}
          onChange={email.onChange}
          placeholder="Email"
          type="email"
          required
        />
      </div>
      <div>
        <input className="Signup-form" type="submit" value="Sign up" />
      </div>
    </form>
  );
};

export default Signup;
