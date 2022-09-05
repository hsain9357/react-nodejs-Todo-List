//third parties
import React, { useEffect } from "react";
import { gapi } from "gapi-script";
import {
  Routes,
  Route,
  useNavigate,
  Outlet,
  useLocation,
} from "react-router-dom";

//local
import Signup from "./SignIn/SignIn.jsx";
import Main from "./Main/Main.jsx";
import BackgroundBubbles from "./BackgroundBubbles/BackgroundBubbles.jsx";
import Login from "./Login/Login.jsx";
import Task from "./Task/Task.jsx";
import "./App.css";

const App = () => {
  const CLIENT_ID =
    "390130223308-nkhtdqj3h68tp3ejnvqickugre42t8hg.apps.googleusercontent.com";

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);
  return (
    <>
      <BackgroundBubbles />
      <Routes>
        <Route path="/" element={<MangeNavigation />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="main" element={<Main />} />
          <Route path="task" element={<Task />} />
          <Route path="*" element={<div>not found</div>} />
        </Route>
      </Routes>
      ;
    </>
  );
};
function MangeNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname == "/") {
      if (getCookie("login") == "") {
        navigate("/signup", { replace: true });
      } else {
        navigate("/main", { replace: true });
      }
    } else if (location.pathname == "/main") {
      if (getCookie("login") == "") {
        navigate("/signup", { replace: true });
      }
    } else if (location.pathname != "/" && getCookie("login") == "") {
      navigate("/signup");
    }
  }, []);

  return <Outlet />;
}

export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

export default App;
