//third parties
import { useState, useRef, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//local
import "./Task.css";
import { addTask, updateTask } from "./TaskAPI.js";
import { Context } from "../App.jsx";

const Task = () => {
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id");
  const details = new URLSearchParams(search).get("details");
  const title = new URLSearchParams(search).get("title");
  const date = new Date();
  const DATE = `${date.getFullYear()}-${formatDate(
    date.getMonth()
  )}-${formatDate(date.getUTCDate())}`;
  const time = `${formatDate(date.getHours())}:${formatDate(
    date.getMinutes(),
    true
  )}`;

  const [data, setData] = useState({
    taskTitle: title ? title : "",
    taskDetails: details ? details : "",
    taskHours: time,
    taskDays: DATE,
  });
  const navigate = useNavigate();
  const DaysRef = useRef();
  const HoursRef = useRef();
  const { setShouldHeaderAppear } = useContext(Context);

  useEffect(() => {
    setShouldHeaderAppear(true);
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const wholeTime =
        DaysRef.current.valueAsNumber + HoursRef.current.valueAsNumber;
      if (id) {
        const res = await updateTask({
          taskTitle: data.taskTitle,
          taskDetails: data.taskDetails,
          taskTime: wholeTime,
          id: id,
        });
        if (res.data.success) {
          setData({ taskTitle: "", taskDetails: "" });

          alert("updated Successfuly");
          navigate("/task", { replace: true });
        }
      } else {
        const res = await addTask({
          taskTitle: data.taskTitle,
          taskDetails: data.taskDetails,
          taskTime: wholeTime,
        });
        if (res.data.success) {
          setData({ taskTitle: "", taskDetails: "" });
          alert("Added Successfuly");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="Task">
        <form className="task_form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Title"
            name="taskTitle"
            onChange={handleChange}
            value={data.taskTitle}
            required
          />
          <input
            type="text"
            placeholder="Task details"
            name="taskDetails"
            onChange={handleChange}
            value={data.taskDetails}
            required
          />
          <input
            type="time"
            name="taskHours"
            ref={HoursRef}
            onChange={handleChange}
            value={data.taskHours}
            required
          />
          <input
            type="date"
            name="taskDays"
            ref={DaysRef}
            onChange={handleChange}
            value={data.taskDays}
            required
          />

          <button type="submit" className="submit_btn">
            Save
          </button>
        </form>
      </div>
    </>
  );
};
const formatDate = (p, isMinutes) => {
  let value;

  //add 5 minutes more for the time
  if (isMinutes && p <= 55) {
    value = String(p + 5);
  } else {
    value = String(p);
  }

  if (value.length == 2) {
    return value;
  } else {
    return `0${value}`;
  }
};

export default Task;
