import axios from "axios";

const baseURL = "https://hasquiz-api.herokuapp.com/api";

export const postRequest = async (url, data) => {
  try {
    const res = await axios.post(`${baseURL}${url}`, data);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getRequest = async (url) => {
  try {
    const res = await axios.get(`${baseURL}${url}`);
    return res
  } catch (error) {
    console.log(error)
    console.log({ ...error });
    return error;
  }
};
