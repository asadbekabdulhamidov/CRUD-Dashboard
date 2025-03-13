//hooks
import useAxios from "../hooks/useAxios";
import useDelete from "../hooks/useDelete";
//components
import { SingleCart, Modal } from "../components";

//rrd
import { Link } from "react-router-dom";

//react
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function Products() {
  const [openModal, setIsOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { data } = useAxios("http://localhost:5000/products");
  const { remove } = useDelete();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data) setProducts(data);
  }, [data]);

  const handleDeleteFromUI = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((item) => item.id !== id),
    );
  };

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
    <>
      {openModal && (
        <Modal
          deleteItem={handleDelete}
          setIsOpenModal={setIsOpenModal}
          selectedUserId={selectedUserId}
        />
      )}
      <div className="px-10 pt-10">
        <div className="flex flex-row-reverse">
          <Link
            to="/formproducts"
            className="btn btn-primary ml-auto mr-10 flex w-[150px] items-center"
          >
            &#43; Add New
          </Link>
          <h2 className="mb-10 text-4xl font-bold">Products</h2>
        </div>
        <div className="flex flex-wrap gap-6">
          {products.map((product) => {
            return (
              <SingleCart
                key={product.id}
                product={product}
                setIsOpenModal={setIsOpenModal}
                setSelectedUserId={setSelectedUserId}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Products;
