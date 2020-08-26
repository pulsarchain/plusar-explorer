import axios from "axios";

const baseURL = process.env.baseURL + "/api/v1";

const request = axios.create({
  baseURL,
  // timeout: 5000,
  headers: {}
});

request.interceptors.response.use(
  function(response) {
    const { status, data } = response;
    if (status !== 200) {
      return Promise.reject(new Error(`status: ${status}`));
    } else {
      return data;
    }
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default request;
