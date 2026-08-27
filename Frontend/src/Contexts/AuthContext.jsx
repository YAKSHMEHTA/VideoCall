import axios, { HttpStatusCode } from "axios";
import { createContext, useState } from "react";

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const client = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const router = useNavigate();

  const handleRegister = async (name, username, password) => {
    const request = await client.post("/register", {
      name,
      username,
      password,
    });

    if (request.status === HttpStatusCode.Created) {
      return request.data.message;
    }
  };


    const handleLogin = async(username, password) => {
      const request = await client.post("/login",{
        username: username,
        password: password,
      },{withCredentials:true});
      if (request.status === HttpStatusCode.Created) {
        return request.data.message;
      }
    }


  const data = {
    userData,
    setUserData,
    handleLogin,
    handleRegister,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
