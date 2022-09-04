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

export const emailSignUp = (data) => {
  const url = `${hostName}/user/signupEmail`;
  return axios.post(url, data, {
    withCredentials: true,
    "Access-Control-Allow-Origin": true,
    crossorigin: true,
  });
};
