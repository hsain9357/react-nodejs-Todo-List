import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./Login/Login.jsx";
import Main from "./Main/Main.jsx";
import BackgroundBubbles from "./BackgroundBubbles/BackgroundBubbles.jsx";

const App = () => {
  const navigate = useNavigate();
  const isUserLogedIn = localStorage.getItem("isUserLogedIn");

  useEffect(() => {
    if (isUserLogedIn) {
    } else {
    }
  }, []);

  return (
    <>
      <BackgroundBubbles />
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route path="main" element={<Main />} />
        </Route>
      </Routes>
      ;
    </>
  );
};

export default App;
