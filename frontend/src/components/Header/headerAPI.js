import axios from "axios";
const hostName = "http://localhost:4000";
export const getUserInfo = () => {
  const url = `${hostName}/user`;
  return axios.get(url, {
    withCredentials: true,
    "Access-Control-Allow-Origin": true,
    crossorigin: true,
  });
};
export const replaceImg = (img) => {
  const url = `${hostName}/user/img`;
  return axios.post(
    url,
    { img },
    {
      withCredentials: true,
      "Access-Control-Allow-Origin": true,
      crossorigin: true,
    }
  );
};
