import axios from "axios";
const hostName = "http://localhost:4000";
export const getTasks = () => {
  const url = `${hostName}/task/`;
  return axios.get(url, {
    withCredentials: true,
    "Access-Control-Allow-Origin": true,
    crossorigin: true,
  });
};
export const deleteTheTask = (id) => {
  const url = `${hostName}/task/delete`;
  return axios.post(
    url,
    { id },
    {
      withCredentials: true,
      "Access-Control-Allow-Origin": true,
      crossorigin: true,
    }
  );
};
