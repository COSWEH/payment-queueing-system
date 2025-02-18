import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { useLogin } from "../hooks/useLogin";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  windowNo: Yup.string().required("Window number is required"),
});

const Login = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [windowAvailability, setWindowAvailability] = useState({});

  const { login, error, isLoading } = useLogin();

  useEffect(() => {
    const checkAllWindowsAvailability = async () => {
      for (let i = 1; i <= 5; i++) {
        try {
          const response = await fetch(
            "http://localhost:5000/teller/checkWindowNo",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ window_no: i }),
            }
          );
          const data = await response.json();
          setWindowAvailability((prev) => ({
            ...prev,
            [i]: data.message,
          }));
        } catch (error) {
          console.error("Error checking window availability:", error);
        }
      }
    };

    checkAllWindowsAvailability();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <Toaster />
      <div className="bg-white shadow-2xl shadow-green-500 rounded-lg p-6 w-full max-w-md text-center">
        <Formik
          initialValues={{
            username: "",
            password: "",
            windowNo: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await login(values.username, values.password, values.windowNo);
            setSubmitting(false);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <h1 className="text-3xl font-bold text-green-500 mb-4">Login</h1>

              <div className="mb-4">
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
                {errors.username && touched.username && (
                  <div className="text-red-500 mt-1">{errors.username}</div>
                )}
              </div>

              <div className="relative w-full mb-4">
                <Field
                  type={isHidden ? "password" : "text"}
                  name="password"
                  placeholder="Password"
                  className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setIsHidden(!isHidden)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {isHidden ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && touched.password && (
                  <div className="text-red-500 mt-1">{errors.password}</div>
                )}
              </div>

              <div className="mb-4">
                <Field
                  as="select"
                  name="windowNo"
                  className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                >
                  <option value="">Select Window Number</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option
                      key={num}
                      value={num}
                      disabled={windowAvailability[num] === "Occupied"}
                      className={
                        windowAvailability[num] === "Available"
                          ? "text-green-600"
                          : "text-gray-800"
                      }
                    >
                      Window {num} - {windowAvailability[num] || "Checking..."}
                    </option>
                  ))}
                </Field>
                {errors.windowNo && touched.windowNo && (
                  <div className="text-red-500 mt-1">{errors.windowNo}</div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition disabled:bg-gray-400"
              >
                Login
              </button>

              {/* ... existing Link component ... */}
            </Form>
          )}
        </Formik>
        <p className=" text-gray-700 mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-green-500 underline underline-offset-6"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
