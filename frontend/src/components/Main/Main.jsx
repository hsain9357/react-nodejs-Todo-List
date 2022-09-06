//third parties
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
//asssets
import RemoveIconSrc from "../../asssets/Remove.png";
import EditIconSrc from "../../asssets/edit.png";
import DropdownToggleIconSrc from "../../asssets/MenuToggleIcon.png";
import add_icon_src from "../../asssets/addButton.svg";
import { Context } from "../App.jsx";

//local
import { getTasks, deleteTheTask } from "./MainAPI.js";
import "./Main.css";

const Main = () => {
  const [tasks, setTasks] = useState([]);
  const [update, setUpdate] = useState(false);
  const { setShouldHeaderAppear } = useContext(Context);
  useEffect(() => {
    getTasks().then((res) => {
      setTasks(res.data.tasks);
    });
  }, [update]);
  useEffect(() => {
    setShouldHeaderAppear(true);
  }, []);
  return (
    <>
      <main>
        <section className="title_container">
          <h1 className="available_missions">
            You have <span>{tasks.length}</span> misstions <br />
            to do
          </h1>
          <section className="cards_section">
            <div className="cards_container">
              {tasks.map((item) => {
                const date = new Date(item.taskTime);
                const month = date.toLocaleString("default", {
                  month: "short",
                });
                const day = date.getUTCDate();
                const time = `${formatHoursTo12(
                  date
                )}:${date.getUTCMinutes()} ${
                  date.getUTCHours() > 12 ? "pm" : "am"
                }`;
                return (
                  <Card
                    key={item._id}
                    id={item._id}
                    hours={time}
                    monthAndDay={`${month} ${day}`}
                    header={item.taskTitle}
                    details={item.taskDetails}
                    setUpdate={setUpdate}
                  />
                );
              })}
            </div>
          </section>
        </section>
        <Link className="add_one" to="/task">
          <img src={add_icon_src} alt="add new task" />
        </Link>
      </main>
    </>
  );
};

function formatHoursTo12(date) {
  return date.getUTCHours() % 12 || 12;
}
const Card = ({ header, details, monthAndDay, hours, id, setUpdate }) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  function toggleDropdown() {
    setIsDropdownOpened((prev) => !prev);
  }
  const deleteTask = async (id) => {
    const res = await deleteTheTask(id);
    if (res.data.success) {
      setUpdate((p) => !p);
      alert("deleted successfuly");
    }
  };
  return (
    <article className="card">
      <button className="dropdown_toggler" onClick={toggleDropdown}>
        <img src={DropdownToggleIconSrc} alt="open and close options" />
      </button>
      <ul className={`dropdown_menu ${isDropdownOpened ? "active" : ""}`}>
        <li>
          <img src={EditIconSrc} alt="Edit the task" className="edit" />
          <Link
            to={{
              pathname: "/task",
              search: `?id=${id}&title=${header}&details=${details}`,
            }}
          >
            edit
          </Link>
        </li>
        <li
          onClick={() => {
            deleteTask(id);
          }}
        >
          <img src={RemoveIconSrc} alt="delete the task" />
          <button>delete</button>
        </li>
      </ul>
      <h2 className="card_header">{header}</h2>
      <p className="card_body">{details}</p>
      <div className="date_container">
        <span className="month">{monthAndDay} </span>
        <span className="hours">{hours} </span>
      </div>
    </article>
  );
};
export default Main;
