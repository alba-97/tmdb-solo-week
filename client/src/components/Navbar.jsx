import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Search from "./Search";

import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../state/user";

const Navbar = () => {
  const user = useSelector((state) => {
    return state.user;
  });

  const dispatch = useDispatch();

  const handleLogout = () => {
    axios.post("/api/logout").then(() => {
      dispatch(setUser({ id: null, username: "" }));
    });
  };

  return (
    <div>
      <div className="Auth">
        <Link className="Auth-links" to="/">
          <span>Home</span>
        </Link>
        {!user.id && (
          <>
            <Link className="Auth-links" to="/login">
              <span>Login</span>
            </Link>
            <Link className="Auth-links" to="/signup">
              <span>Sign up</span>
            </Link>
          </>
        )}

        {user.id && (
          <>
            <Link className="Auth-links" to={`/user/${user.id}`}>
              <span>{user.username}</span>
            </Link>
            <Link className="Auth-links" to="/" onClick={handleLogout}>
              <span>Log out</span>
            </Link>
          </>
        )}
      </div>
      <div>
        <Search />
      </div>
    </div>
  );
};

export default Navbar;
