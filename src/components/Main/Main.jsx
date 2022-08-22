import RemoveIconSrc from "../../asssets/Remove.png";
import HideIconSrc from "../../asssets/Hide.png";
import DoneIconSrc from "../../asssets/Done.png";
import DropdownToggleIconSrc from "../../asssets/MenuToggleIcon.png";
import { useState } from "react";
import "./Main.css";
const Main = () => {
  return (
    <main>
      <section className="title_container">
        <h1 className="available_missions">
          You have <span>x</span> misstions <br />
          for today
        </h1>
        <div className="dates_container">
          <div className="months">Jr</div>
          <div className="days">3d</div>
        </div>
        <div className="cards_container">
          <Card />
        </div>
      </section>
    </main>
  );
};

const Card = () => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  function toggleDropdown() {
    setIsDropdownOpened((prev) => !prev);
  }
  return (
    <article className="card">
      <button className="dropdown_toggler" onClick={toggleDropdown}>
        <img src={DropdownToggleIconSrc} alt="open and close options" />
      </button>
      <ul className={`dropdown_menu ${isDropdownOpened ? "active" : ""}`}>
        <li>
          <img src={DoneIconSrc} alt="task done ?" />
          <button>done</button>
        </li>
        <li>
          <img src={HideIconSrc} alt="hide it" />
          <button>hide</button>
        </li>
        <li>
          <img src={RemoveIconSrc} alt="" />
          <button>remove</button>
        </li>
      </ul>
      <h2 className="card_header">Go to school</h2>
      <p className="card_body">Tomorrw at and gring my consin with me</p>
      <div className="date_container">
        <span className="month">20 january </span>
        <span className="hours">2pm </span>
      </div>
    </article>
  );
};
export default Main;
