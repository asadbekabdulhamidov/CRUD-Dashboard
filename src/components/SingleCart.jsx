import { toast } from "react-toastify";
import useDelete from "../hooks/useDelete";
import { Link } from "react-router-dom";

function SingleCart({ product, handleDeleteFromUI }) {
  // console.log(product);

  const { loading, error, remove } = useDelete();

  const { category, description, id, image, price, rating, title } = product;

  // console.log(product);

  const handleDelete = async (id) => {
    // console.log(id);

    try {
      await remove(`http://localhost:5000/products/${id}`);
      toast.success(`${id} deleted product`);
      handleDeleteFromUI(id);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="card w-80 bg-base-100 shadow-lg">
      <figure>
        <img className="h-[300px] w-[290px]" src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <h3 className="card-title">{category}</h3>
        <p>{description}</p>
        <strong>{price}$</strong>

        <div className="card-actions flex items-center justify-end">
          {/* <p>
            <b>Rating:</b> {rating.rate}
          </p> */}
          <div className="">
            <Link to={`/formproducts/${id}`} className="btn btn-secondary mr-3">
              edit
            </Link>
            <button
              onClick={() => handleDelete(id)}
              className="btn btn-primary"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleCart;
