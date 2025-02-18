import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { useSignup } from "../hooks/useSignup";

// ... existing code ...

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const Signup = () => {
  const [isHidden, setIsHidden] = useState(true);
  const { signup, isLoading } = useSignup();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <Toaster />
      <div className="bg-white shadow-2xl shadow-green-500 rounded-lg p-6 w-full max-w-md text-center">
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            await signup(values.username, values.password);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <h1 className="text-3xl font-bold text-green-500 mb-4">Signup</h1>
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
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
              >
                Signup
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
