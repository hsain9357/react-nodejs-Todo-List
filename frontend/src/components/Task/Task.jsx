//third parties
import { useState, useRef, useEffect } from "react";
import { useLocation ,useNavigate} from "react-router-dom";

//local
import "./Task.css";
import Header from "../Header/Header.jsx";
import { addTask, updateTask } from "./TaskAPI.js";
const Task = () => {
  const { search } = useLocation();
    const navigate = useNavigate()
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
    taskTitle: title && title,
    taskDetails: details && details,
    taskHours: time,
    taskDays: DATE,
  });
  const DaysRef = useRef(),
    HoursRef = useRef();
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
            navigate('/task',{replace:true})
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
      <Header />
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
