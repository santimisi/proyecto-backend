import axios from "axios";
import React, { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../Utils/globalContext";

export default function LoginForm(): ReactElement {
  const { setUser } = useGlobalState();
  const navigate = useNavigate();

  interface FormDataType {
    userName: string;
    password: string;
  }
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const responseBody: FormDataType = {
    userName: "",
    password: ""
  };

  const inputChangeHandler = (
    setFunction: React.Dispatch<React.SetStateAction<any>>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFunction(event.target.value);
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    responseBody.userName = userName;
    responseBody.password = password;
    // ya tenemos el request desde front
    setUser(responseBody);
    try {
      const { data: response } = await axios.post(
        `${process.env.REACT_APP_LOGIN_URL}`,
        responseBody,
        {
          withCredentials: true
        }
      );
      if (response.status === "success") {
        navigate("/home");
        window.location.reload();
      } else {
        alert(" Contraseña o usuario incorrecto");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">
          Login to your account
        </h3>
        <form onSubmit={onSubmitHandler}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">
                Username
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => inputChangeHandler(setUserName, e)}
                placeholder="Username"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => inputChangeHandler(setPassword, e)}
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
