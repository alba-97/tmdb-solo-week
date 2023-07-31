import { Link } from "react-router-dom";

const Users = ({ users }) => {
  return (
    <div>
      {users.map((user, key) => (
        <div key={key}>
          <Link to={"/user/" + user.id}>{user.username}</Link>
        </div>
      ))}
    </div>
  );
};

export default Users;
