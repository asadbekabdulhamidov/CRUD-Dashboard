//formik
import { Formik, Form, Field } from "formik";
//yup
import * as Yup from "yup";
//react icons
import { FaUser, FaKey } from "react-icons/fa";
//redux
import { login } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//axios
import axios from "axios";

//validate
const LoginSchema = Yup.object().shape({
  username: Yup.string().min(4, "To short! ").required("Required"),
  password: Yup.string()
    .min(4, "Too short!")
    .max(8, "Too Long!")
    .required("required"),
});

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    console.log(values);

    try {
      const response = await axios.post(
        "https://fakestoreapi.com/auth/login",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("serverdan javob", response.data);
      localStorage.setItem("access_token", response.data.token);
      dispatch(login({ token: response.data.token }));
      navigate("/");
    } catch (error) {
      console.error(
        "Xatolik:",
        error.response ? error.response.data : error.message,
      );
    }
  };
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden w-[45%] bg-[url(https://picsum.photos/900/1200)] bg-cover bg-center bg-no-repeat md:block"></div>

      <div className="fixed bottom-0 left-0 right-0 top-0 z-10 w-full bg-black bg-opacity-30 md:hidden"></div>

      <div className="flex w-full items-center justify-center bg-[url(https://picsum.photos/900/1200)] bg-cover bg-center bg-no-repeat md:w-[55%] md:bg-none">
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            console.log(values);
            handleLogin(values);
          }}
        >
          {() => (
            <div className="relative z-50 flex w-full flex-col items-center justify-center">
              <h1 className="mb-3 text-center text-2xl font-semibold text-white md:text-4xl md:text-black">
                Login
              </h1>
              <Form className="flex w-full max-w-96 flex-col gap-4 px-3 md:p-0">
                <label className="flex cursor-pointer flex-col gap-2">
                  <span className="font-medium text-white md:text-black">
                    Login :
                  </span>
                  <div className="flex items-center justify-between rounded-md border-black bg-white px-2 py-2 md:border-2">
                    <Field
                      className="w-full bg-transparent outline-none placeholder:text-gray-500"
                      type="text"
                      name="username"
                      placeholder="user_name :"
                    />
                    <FaUser className="text-gray-500" />
                  </div>
                </label>
                <label className="flex cursor-pointer flex-col gap-2">
                  <span className="font-medium text-white md:text-black">
                    Password :{" "}
                  </span>
                  <div className="flex items-center justify-between rounded-md border-black bg-white px-2 py-2 md:border-2">
                    <Field
                      className="w-full bg-transparent outline-none placeholder:text-gray-500"
                      type="password"
                      name="password"
                      placeholder="Parolingiz :"
                    />
                    <FaKey className="text-gray-500" />
                  </div>
                </label>
                <button
                  type="submit"
                  className="rounded-md bg-blue-500 py-3 text-white transition-all duration-300 hover:bg-blue-600 active:scale-x-110"
                >
                  Submit
                </button>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginPage;
