//third parties
import { GoogleLogin } from "react-google-login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";

//asssets
import google_src from "../../asssets/google.png";
import logo_src from "../../asssets/R.svg";
import guy_working_src from "../../asssets/guy_loking_to_a_computer.svg";

//local
import { responseGoogle, emailSignUp } from "./SignInAPI.js";
import "./signIn.css";
const CLIENT_ID =
  "390130223308-nkhtdqj3h68tp3ejnvqickugre42t8hg.apps.googleusercontent.com";

const Signup = () => {
  return (
    <div className="container">
      <ReactSVG src={logo_src} className="logo" />
      <Introduction />
      <Form_container />
    </div>
  );
};
function Introduction() {
  return (
    <article className="introduction_container">
      <h1 className="introduction_header">
        Mange Your <br />
        Time And Your work <br />
        With <span>REMINDME</span>
      </h1>
      <ReactSVG src={guy_working_src} className="guy_working" />
    </article>
  );
}
function Form_container() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
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
      const res = await emailSignUp(data);
      if (res.data.success) {
        navigate("/main", { replace: true });
      }
      setError(res.error);
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
      <p className="create_account"> Create An Account</p>
      <div className="social_media_btns_con">
        <GoogleLogin
          clientId={CLIENT_ID}
          onSuccess={responseG}
          onFailure={responseG}
          cookiePolicy={"single_host_origin"}
        />
      </div>
      <span className="or">-or-</span>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          onChange={handleChange}
          value={data.firstName}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          onChange={handleChange}
          value={data.lastName}
          required
        />
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
          Sing Up
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      <h1 className="already_have_one">
        Alreay Have An Account{" "}
        <a role="button" onClick={() => navigate("/login", { replace: true })}>
          Login <span className="under_line"></span>
        </a>
      </h1>
    </section>
  );
}

export default Signup;
