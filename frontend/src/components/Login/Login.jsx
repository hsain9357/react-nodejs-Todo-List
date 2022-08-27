import "./Login.css";
import facebook_src from "../../asssets/facebook.png";
import google_src from "../../asssets/google.png";
import logo_src from "../../asssets/R.svg";
import guy_working_src from "../../asssets/guy_loking_to_a_computer.svg";
import { ReactSVG } from "react-svg";

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
function Form_container() {
  return (
    <section className="form_container">
      <p className="create_account"> Create An Account</p>
      <div className="social_media_btns_con">
        <button className="google_btn">
          <img src={google_src} alt="Login with google " />
          <p>Login with google</p>
        </button>
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
