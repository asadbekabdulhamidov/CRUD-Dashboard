//rrd
import { Link, useNavigate, useParams } from "react-router-dom";

//icons
import { FaArrowLeft, FaLocationDot } from "react-icons/fa6";
import { FaUser, FaEye } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

//formik
import { Formik, Form, Field } from "formik";
//hooks
import { useEffect, useState } from "react";
import usePost from "../hooks/usePost";
import useAxios from "../hooks/useAxios";
import usePut from "../hooks/usePut";

//toast
import { toast } from "react-toastify";

function FormUsers() {
  const [showPassword, setShowPassword] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { error, loading, post } = usePost();
  const { error: putError, loading: putLoading, put } = usePut();
  const { data } = useAxios(id ? `http://localhost:5000/users/${id}` : null);
  const [initialValue, setInitialValue] = useState({
    email: "",
    password: "",
    username: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    if (id && data) {
      setInitialValue(data);
    }
  }, [id, data]);
  //handleSubmit
  const handleSubmitUser = async (values) => {
    try {
      if (id) {
        await put(`http://localhost:5000/users/${id}`, values);
        toast.success("Muvaffaqiyatli Tahrirlandi 😊");
      } else {
        await post("http://localhost:5000/users", values);
        toast.success("Muvaffaqiyatli qo`shildi");
      }
      navigate("/users");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex gap-16 pl-10 pt-10">
      <Link to="/users" className="btn btn-primary flex w-[150px] items-center">
        <FaArrowLeft />
        Go Users
      </Link>

      <div className="py-4">
        <h1 className="mb-4 text-3xl font-semibold">
          {id ? "Edit users" : "Add user"}
        </h1>
        <Formik
          initialValues={initialValue}
          onSubmit={(values) => {
            handleSubmitUser(values);
          }}
          enableReinitialize={true}
        >
          <Form className="w-96">
            <label className="flex flex-col gap-2">
              <span className="font-semibold text-primary">User Name:</span>
              <div className="flex w-80 items-center justify-between rounded-md border-2 border-primary px-4 py-2">
                <Field
                  className="bg-transparent outline-none"
                  type="text"
                  placeholder="user_name"
                  name="username"
                />
                <FaUser className="text-primary" />
              </div>
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-semibold text-primary">Email:</span>
              <div className="flex w-80 items-center justify-between rounded-md border-2 border-primary px-4 py-2">
                <Field
                  className="bg-transparent outline-none"
                  type="email"
                  placeholder="email"
                  name="email"
                />
                <MdEmail className="text-primary" />
              </div>
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-semibold text-primary">Password:</span>
              <div className="flex w-80 items-center justify-between rounded-md border-2 border-primary px-4 py-2">
                <Field
                  className="bg-transparent outline-none"
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  name="password"
                />
                <button type="button" onClick={() => togglePassword()}>
                  {" "}
                  <FaEye className="text-primary" />
                </button>
              </div>
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-semibold text-primary">Address:</span>
              <div className="flex w-80 items-center justify-between rounded-md border-2 border-primary px-4 py-2">
                <Field
                  className="bg-transparent outline-none"
                  type="text"
                  placeholder="Address"
                  name="address"
                />
                <FaLocationDot className="text-primary" />
              </div>
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-semibold text-primary">Phone:</span>
              <div className="flex w-80 items-center justify-between rounded-md border-2 border-primary px-4 py-2">
                <Field
                  className="bg-transparent outline-none"
                  type="tel"
                  placeholder="Phone"
                  name="phone"
                />
                <FaLocationDot className="text-primary" />
              </div>
            </label>
            <button className="btn btn-primary mt-10 w-80" type="submit">
              {id ? "Edit" : "Add"}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default FormUsers;
