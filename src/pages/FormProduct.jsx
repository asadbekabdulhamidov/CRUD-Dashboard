import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";

//hooks
import usePost from "../hooks/usePost";
import usePut from "../hooks/usePut";
import useAxios from "../hooks/useAxios";

//toast import
import { toast } from "react-toastify";

function FormProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { error, loading, post } = usePost();
  const { error: putError, loading: putLoading, put } = usePut();
  const { data } = useAxios(id ? `http://localhost:5000/products/${id}` : null);
  const [initialValue, setInitialValue] = useState({
    image: "",
    category: "",
    description: "",
    price: "",
    title: "",
  });

  useEffect(() => {
    if (data && id) {
      setInitialValue(data);
    }
  }, [data, id]);

  //handleSubmit
  const handleSubmitProduct = async (values) => {
    try {
      if (id) {
        await put(`http://localhost:5000/products/${id}`, values);
        toast.success("Muvaffaqiyatli O'zgartirildi ");
      } else {
        await post("http://localhost:5000/products", values);
        toast.success("Muvaffaqiyatli qo`shildi");
      }
      navigate("/products");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex gap-16 pl-10 pt-10">
      <Link
        to="/products"
        className="btn btn-primary flex w-[150px] items-center"
      >
        <FaArrowLeft />
        Go Products
      </Link>

      <div className="py-4">
        <h1 className="mb-4 text-3xl font-semibold">
          {id ? "Edit Products" : "Add New Product"}
        </h1>
        <Formik
          initialValues={initialValue}
          onSubmit={(values) => {
            handleSubmitProduct(values);
          }}
          enableReinitialize={true}
        >
          {() => (
            <Form className="grid w-full gap-3">
              <label className="flex flex-col gap-2">
                <span className="font-semibold text-primary">Title:</span>
                <div className="flex w-80 items-center justify-between rounded-md border-2 border-primary px-4 py-2">
                  <Field
                    className="w-full bg-transparent outline-none"
                    type="text"
                    placeholder="Product title"
                    name="title"
                  />
                </div>
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-semibold text-primary">Image:</span>
                <div className="flex w-80 items-center justify-between rounded-md border-2 border-primary px-4 py-2">
                  <Field
                    className="w-full bg-transparent outline-none"
                    type="url"
                    placeholder="image url"
                    name="image"
                  />
                </div>
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-semibold text-primary">Price:</span>
                <div className="flex w-80 items-center justify-between rounded-md border-2 border-primary px-4 py-2">
                  <Field
                    className="w-full bg-transparent outline-none"
                    type="text"
                    placeholder="Price"
                    name="price"
                  />
                </div>
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-semibold text-primary">Category:</span>
                <div className="flex w-80 items-center justify-between rounded-md border-2 border-primary px-4 py-2">
                  <Field
                    className="w-full bg-transparent outline-none"
                    type="text"
                    placeholder="Category"
                    name="category"
                  />
                </div>
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-semibold text-primary">Description:</span>
                <div className="flex w-80 items-center justify-between rounded-md border-2 border-primary px-4 py-2">
                  <Field
                    as="textarea"
                    className="w-full outline-none"
                    name="description"
                    rows="4"
                    cols="50"
                    placeholder="Description"
                  />
                </div>
              </label>

              <button className="btn btn-primary mt-10 w-80" type="submit">
                {id ? "Edit" : "Add"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default FormProduct;
