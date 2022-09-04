import axios from "axios";
const hostName = "http://localhost:4000";
export const addTask = (data) => {
  const url = `${hostName}/task/`;
  return axios.post(url, data, {
    withCredentials: true,
    "Access-Control-Allow-Origin": true,
    crossorigin: true,
  });
};
export const updateTask = (data) => {
  const url = `${hostName}/task/`;
  return axios.patch(url, data, {
    withCredentials: true,
    "Access-Control-Allow-Origin": true,
    crossorigin: true,
  });
};
