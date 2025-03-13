//rrd
import { Link, useNavigate, useParams } from "react-router-dom";

//icons
import { FaArrowLeft, FaLocationDot } from "react-icons/fa6";
import { FaUser, FaEye } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

//formik
import { Formik, Form, Field, ErrorMessage } from "formik";

//hooks
import { useEffect, useState } from "react";
import usePost from "../hooks/usePost";
import useAxios from "../hooks/useAxios";
import usePut from "../hooks/usePut";

//toast
import { toast } from "react-toastify";

//yup
import * as Yup from "yup";

//validation form
const userFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required")
    .required("Required"),
  username: Yup.string()
    .min(4, "Too Short !")
    .max(20, "Too Long!")
    .required("Required"),
  address: Yup.string()
    .min(2, "Too Short !")
    .max(50, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .matches(/^\d+$/, "Consisting only of numbers")
    .min(9, "Too Short!")
    .required("Required"),
  password: Yup.string().min(6, "Too short!").required("Required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "parollar mos kelmadi")
    .required("Required"),
  notrobot: Yup.boolean()
    .oneOf([true], "Confirm you are not a robot.")
    .required("Required"),
});

function FormUsers() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmShowPassword] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { error, loading, post } = usePost();
  const { error: putError, loading: putLoading, put } = usePut();
  const { data } = useAxios(id ? `http://localhost:5000/users/${id}` : null);
  const [initialValue, setInitialValue] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    username: "",
    address: "",
    phone: "",
    notrobot: false,
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
            console.log(values);

            handleSubmitUser(values);
          }}
          validationSchema={userFormSchema}
          enableReinitialize={true}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form className="flex w-96 flex-col gap-2">
              <label className="flex flex-col gap-2">
                <span
                  className={`${errors.username && touched.username ? "text-red-500" : "text-primary"} font-semibold`}
                >
                  User Name:
                </span>
                <div
                  className={`flex w-80 items-center justify-between rounded-md border-2 px-4 py-2 ${errors.username && touched.username ? "border-red-500" : "border-primary"} `}
                >
                  <Field
                    className="bg-transparent outline-none"
                    type="text"
                    placeholder="user_name"
                    name="username"
                  />
                  <FaUser
                    className={`${errors.username && touched.username ? "text-red-500" : "text-primary"} `}
                  />
                </div>
                <ErrorMessage name="username">
                  {(msg) => <div className="text-red-500">{msg}</div>}
                </ErrorMessage>
              </label>
              {/* username */}
              <label className="flex flex-col gap-2">
                <span
                  className={`${errors.email && touched.email ? "text-red-500" : "f text-primary"} font-semibold`}
                >
                  Email:
                </span>
                <div
                  className={`flex w-80 items-center justify-between rounded-md border-2 px-4 py-2 ${errors.email && touched.email ? "border-red-500" : "border-primary"}`}
                >
                  <Field
                    className="bg-transparent outline-none"
                    type="email"
                    placeholder="email"
                    name="email"
                  />
                  <MdEmail
                    className={`${errors.email && touched.email ? "text-red-500" : "text-primary"}`}
                  />
                </div>

                <ErrorMessage name="email">
                  {(msg) => <div>{msg}</div>}
                </ErrorMessage>
              </label>
              {/* email */}
              <label className="flex flex-col gap-2">
                <span
                  className={`${errors.password && touched.password ? "text-red-500" : "text-primary"} font-semibold`}
                >
                  Password:
                </span>
                <div
                  className={`flex w-80 items-center justify-between rounded-md border-2 px-4 py-2 ${errors.password && touched.password ? "border-red-500" : "border-primary"}`}
                >
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
                <ErrorMessage name="password">
                  {(msg) => <div>{msg}</div>}
                </ErrorMessage>
              </label>
              {/* password */}
              <label className="flex flex-col gap-2">
                <span
                  className={`${errors.confirmpassword && touched.confirmpassword ? "text-red-500" : "text-primary"} font-semibold`}
                >
                  Confirm Password:
                </span>
                <div
                  className={`flex w-80 items-center justify-between rounded-md border-2 px-4 py-2 ${errors.confirmpassword && touched.confirmpassword ? "border-red-500" : "border-primary"}`}
                >
                  <Field
                    className="bg-transparent outline-none"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="password"
                    name="confirmpassword"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmShowPassword(!showConfirmPassword)
                    }
                  >
                    {" "}
                    <FaEye className="text-primary" />
                  </button>
                </div>
                <ErrorMessage name="confirmpassword">
                  {(msg) => <div>{msg}</div>}
                </ErrorMessage>
              </label>
              {/* //confirm password */}
              <label className="flex flex-col gap-2">
                <span
                  className={`${errors.address && touched.address ? "text-red-500" : "text-primary"} font-semibold`}
                >
                  Address:
                </span>
                <div
                  className={`flex w-80 items-center justify-between rounded-md border-2 px-4 py-2 ${errors.address && touched.address ? "border-red-500" : "border-primary"}`}
                >
                  <Field
                    className="bg-transparent outline-none"
                    type="text"
                    placeholder="Address"
                    name="address"
                  />
                  <FaLocationDot className="text-primary" />
                </div>
                <ErrorMessage name="address">
                  {(msg) => <div>{msg}</div>}
                </ErrorMessage>
              </label>
              {/* //address */}
              <label className="flex flex-col gap-2">
                <span
                  className={`${errors.address && touched.address ? "text-red-500" : "text-primary"} font-semibold`}
                >
                  Phone:
                </span>
                <div
                  className={`flex w-80 items-center justify-between rounded-md border-2 px-4 py-2 ${errors.address && touched.address ? "border-red-500" : "border-primary"}`}
                >
                  <Field
                    className="bg-transparent outline-none"
                    type="tel"
                    placeholder="Phone"
                    name="phone"
                  />
                  <FaLocationDot className="text-primary" />
                </div>
                <ErrorMessage name="phone">
                  {(msg) => <div>{msg}</div>}
                </ErrorMessage>
              </label>
              {/* //notrobot */}
              <label className="flex items-center gap-3">
                <span
                  className={`${errors.notrobot && touched.notrobot ? "text-red-500" : "text-primary"} font-semibold`}
                >
                  I am not a robot
                </span>
                <Field
                  className="bg-transparent"
                  type="checkbox"
                  name="notrobot"
                />
              </label>
              <ErrorMessage name="notrobot">
                {(msg) => <div>{msg}</div>}
              </ErrorMessage>
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

export default FormUsers;
