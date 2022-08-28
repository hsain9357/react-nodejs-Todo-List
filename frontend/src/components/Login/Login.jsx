import "./Login.css";
import { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import axios from "axios";
import facebook_src from "../../asssets/facebook.png";
import google_src from "../../asssets/google.png";
import logo_src from "../../asssets/R.svg";
import guy_working_src from "../../asssets/guy_loking_to_a_computer.svg";
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";

const Login = () => {
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
const CLIENT_ID =
  "390130223308-nkhtdqj3h68tp3ejnvqickugre42t8hg.apps.googleusercontent.com";
function Form_container() {
  const hostName = "http://localhost:4000";

  const [isLoggedIn, setLoginStatus] = useState(false);
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  });
  const responseGoogle = async (response) => {
    const bodyObject = {
      authId: response.tokenId,
    };
    try {
      if (!response.errors && response.tokenId) {
        const res = await axios.post(`${hostName}/user/login`, bodyObject, {
          withCredentials: true,
          "Access-Control-Allow-Origin": true,
          crossorigin: true,
        });

        console.log(res);
        setLoginStatus(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${hostName}/user/logout`, {
        withCredentials: true,
        "Access-Control-Allow-Origin": true,
        crossorigin: true,
      });
      setLoginStatus(false);
    } catch (e) {
      console.log(e);
    }
  };

  //useEffect(() => {
  //async function getStatus() {
  //try {
  //const data = await axios.get(`${hostName}/user/checkStatusLogin`);
  //console.log(data);
  //if (!data.error) {
  //setLoginStatus(true);
  //}
  //} catch (e) {
  //console.log(e);
  //setLoginStatus(false);
  //}
  //}
  //getStatus();
  //}, []);
  async function checkStatus() {
    try {
      const data = await axios.get(`${hostName}/user/checkLoginStatus`, {
        withCredentials: true,
        "Access-Control-Allow-Origin": true,
        crossorigin: true,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className="form_container">
      <p className="create_account"> Create An Account</p>
      <div className="social_media_btns_con">
        <GoogleLogin
          clientId={CLIENT_ID}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          buttonText="Login with google"
          render={(renderProps) => (
            <button
              className="google_btn"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <img src={google_src} alt="Login with google " />
              <p>Login with google</p>
            </button>
          )}
        />

        <button className="facebook_btn">
          <img src={facebook_src} alt="Login with google " />
          <p>Login with facebook</p>
        </button>
      </div>
      <span className="or">-or-</span>
      <form>
        <input type="text " placeholder="Full Name" />
        <input type="text " placeholder="Email" />
        <input type="text " placeholder="Password" />
        <button type="submit" className="submit_btn">
          Create{" "}
        </button>
      </form>
      <h1 className="already_have_one">
        Alreay Have An Account{" "}
        <a href="#">
          Login <span className="under_line"></span>
        </a>
      </h1>
    </section>
  );
}

export default Login;
