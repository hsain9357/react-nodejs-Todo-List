//third parties
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { GoogleLogin } from "react-google-login";

//local
import { emailLogin } from "./LoginAPI.js";
import { Context } from "../App.jsx";
import "./Login.css";
const CLIENT_ID =
  "390130223308-nkhtdqj3h68tp3ejnvqickugre42t8hg.apps.googleusercontent.com";

const Login = () => {
  useEffect(() => {
    setShouldHeaderAppear(false);
  }, []);
  return (
    <div className="login">
      <Form_container />
    </div>
  );
};

function Form_container() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await emailLogin(data);
      if (res.data.success) navigate("/main", { replace: true });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error);
        setError(error.response.data.message);
      }
    }
  };
  const responseG = async (response) => {
    try {
      const res = await responseGoogle(response);
      if (res.data.success) {
        navigate("/main", { replace: true });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <section className="form_container">
      <p className="login_p">Login</p>
      <div className="social_media_btns_con">
        <GoogleLogin
          clientId={CLIENT_ID}
          onSuccess={responseG}
          onFailure={responseG}
          cookiePolicy={"single_host_origin"}
          buttonText="signin with google"
        />
      </div>
      <span className="or">-or-</span>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={data.email}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          min="8"
          onChange={handleChange}
          value={data.password}
          required
        />
        <button type="submit" className="submit_btn">
          Login
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      <h1 className="not_have_one">
        Not Have An Account{" "}
        <a role="button" onClick={() => navigate("/signup", { replace: true })}>
          signup <span className="under_line"></span>
        </a>
      </h1>
    </section>
  );
}
export default Login;
