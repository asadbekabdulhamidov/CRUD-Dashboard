//hooks
import { Link } from "react-router-dom";

function TableRow({ user, setIsOpenModal, setSelectedUserId }) {
  const { id, email, address, username, password, phone } = user;

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
            <div className="text-sm opacity-50">{address?.city}</div>
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
            onClick={() => {
              setSelectedUserId(id);
              setIsOpenModal(true);
            }}
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
