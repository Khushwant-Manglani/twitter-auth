import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./component/Home";
import Login from "./component/Login";
import { useAuth } from "./context/auth-context";
// import './App.css'

function App() {
  const { isLogin } = useAuth();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isLogin ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
