//hooks
import useAxios from "../hooks/useAxios";
//components
import { SingleCart } from "../components";

//rrd
import { Link } from "react-router-dom";

//react
import { useState, useEffect } from "react";

function Products() {
  const { data, loading, error } = useAxios("http://localhost:5000/products");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data) setProducts(data);
  }, [data]);

  const handleDeleteFromUI = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((item) => item.id !== id),
    );
  };

  return (
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
      <div className="grid gap-10 lg:grid-cols-3">
        {products.map((product) => {
          return (
            <SingleCart
              key={product.id}
              product={product}
              handleDeleteFromUI={handleDeleteFromUI}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Products;
