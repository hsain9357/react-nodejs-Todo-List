import axios from "axios";
const hostName = "http://localhost:4000";
export const responseGoogle = (response) => {
  const bodyObject = {
    authId: response.tokenId,
  };
  if (!response.errors && response.tokenId) {
    return axios.post(`${hostName}/user/loginGoogle`, bodyObject, {
      withCredentials: true,
      "Access-Control-Allow-Origin": true,
      crossorigin: true,
    });
  }
};

export const emailLogin = async (data) => {
  const url = `${hostName}/user/loginEmail`;
  const res = await axios.post(url, data, {
    withCredentials: true,
    "Access-Control-Allow-Origin": true,
    crossorigin: true,
  });
  return res;
};
