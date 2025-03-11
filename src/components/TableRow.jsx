//hooks
import { Link, useNavigate } from "react-router-dom";
import useDelete from "../hooks/useDelete";

//toast
import { toast } from "react-toastify";

function TableRow({ user, handleDeleteFromUI }) {
  const navigate = useNavigate();
  const { loading, error, remove } = useDelete();
  const { id, email, address, username, password, phone } = user;

  //handleDelete
  const handleDeleteUser = async (id) => {
    try {
      await remove(`http://localhost:5000/users/${id}`);
      toast.success(`${username}  O'chirildi `);
      handleDeleteFromUI(id);
      // navigate("/users");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img
                src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{username}</div>
            <div className="text-sm opacity-50">{address.city}</div>
          </div>
        </div>
      </td>
      <td>
        {email}
        <br />
        <span className="badge badge-ghost badge-sm">{phone}</span>
      </td>
      <td>{password}</td>
      <td>
        <p>{id}</p>
      </td>
      <td className="flex justify-center">
        <div className="flex gap-10">
          <Link to={`/formusers/${id}`} className="btn btn-secondary">
            Edit
          </Link>
          <button
            onClick={() => handleDeleteUser(id)}
            className="btn btn-primary"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TableRow;
