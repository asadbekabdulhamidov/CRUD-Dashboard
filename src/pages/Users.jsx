import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../hooks/useAxios";

//compoennts
import { TableRow } from "../components";

function Users() {
  const { data, loading, error } = useAxios("http://localhost:5000/users");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data) setUsers(data);
  }, [data]);

  const handleDeleteFromUI = (id) => {
    setUsers((prevUsers) => prevUsers.filter((item) => item.id !== id));
  };

  return (
    <div className="pt-10">
      <div className="flex pl-4">
        <h2 className="mb-10 text-4xl font-bold">Users</h2>
        <Link
          to="/formusers"
          className="btn btn-primary ml-auto mr-10 flex w-[150px] items-center"
        >
          &#43; Add New
        </Link>
      </div>
      <div className="w-full pt-10">
        <table className="table overflow-y-auto">
          {/* head */}
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>Id</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user) => {
              return (
                <TableRow
                  key={user.id}
                  user={user}
                  handleDeleteFromUI={handleDeleteFromUI}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
