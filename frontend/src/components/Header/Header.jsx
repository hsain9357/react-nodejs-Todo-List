//third parties
import { ReactSVG } from "react-svg";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

//local
import "./Header.css";
import Logo from "../../asssets/R.svg";
import { getUserInfo, replaceImg } from "./headerAPI.js";
import unknown_person_src from "../../asssets/unknown.png";

const Header = () => {
  const inputRef = useRef();
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();
  //this just for resend request for the server to ask about image
  const [isThereImg, setIsThereImg] = useState(false);
  const [UserInfo, setUserInfo] = useState({});

  function toogleDropDown() {
    setDropDown((p) => !p);
  }

  useEffect(() => {
    getUserInfo().then((res) => {
      setUserInfo(res.data);
    });
  }, [isThereImg]);

  function handleChangePic(e) {
    const file = e.target.files[0];
    if (file) {
      var pattern = /image-*/;
      if (!file.type.match(pattern)) {
        alert("Invalid format");
        return;
      }

      var reader = new FileReader();

      reader.onloadend = async function () {
        const res = await replaceImg(reader.result);
        if (res.data.success) {
          alert("your picuture has been added");
          setIsThereImg((p) => !p);
        }
      };

      reader.readAsDataURL(file);
    }
  }

  return (
    <header className="header">
      <Link className="logo" to="/main" role="button" tabIndex="0">
        <ReactSVG src={Logo} className="logo_img" />
      </Link>
      <div
        className="avatar"
        onClick={toogleDropDown}
        aria-pressed={`${dropDown}`}
      >
        <img src={UserInfo.img || unknown_person_src} alt="" className="img" />
        <ul className={`drop_down ${dropDown && "active"}`}>
          <p>
            {UserInfo.firstName} {UserInfo.lastName}
          </p>

          <li className="option">
            <button onClick={() => inputRef.current.click()}>
              Change Pic
              <input
                type="file"
                style={{ display: "none" }}
                onChange={handleChangePic}
                accept="image/*"
                ref={inputRef}
              />
            </button>
          </li>

          <li className="option">
            <button onClick={() => logout(navigate)}>Logout</button>
          </li>
        </ul>
      </div>
    </header>
  );
};

function logout(navigate) {
  document.cookie.split(";").forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
  navigate("/signup");
}

export default Header;
