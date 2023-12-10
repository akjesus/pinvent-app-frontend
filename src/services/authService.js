import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/users`;

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

//REGISTER USER
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);

    if (response.statusText === "OK") {
      // toast.success(response.data.message, { theme: "colored" });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message, { theme: "colored" });
  }
};

//LOGIN USER
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    if (response.statusText === "OK") {
      toast.success(response.data.message, { theme: "colored" });
      return response.data;
    } else {
      toast.error(response.data.message, { theme: "colored" });
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message, { theme: "colored" });
    return error;
  }
};

//LOGOUT USER
export const logoutUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/logout`);
    if (response.statusText === "OK") {
      toast.info(response.data.message, { theme: "colored" });
      return response.data;
    } else {
      toast.error(response.data.message, { theme: "colored" });
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message, { theme: "colored" });
    return error.response.data;
  }
};

//FORGOT PASSWORD
export const forgotPassword = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, userData);
    if (response.statusText === "OK") {
      toast.info(response.data.message, { theme: "colored" });
      return response.data;
    } else {
      toast.error(response.data.message, { theme: "colored" });
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message, { theme: "colored" });
    return error.response.data;
  }
};

//RESET PASSWORD
export const resetPassword = async (userData, token) => {
  try {
    const response = await axios.put(
      `${API_URL}s/reset-password/${token}`,
      userData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return message;
  }
};

//GET USER STATUS
export const getLoginStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/loggedin/`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return message;
  }
};

//GET USER PROFILE
export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile/`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return message;
  }
};

//UPDATE USER PROFILE
export const updateUser = async (formData) => {
  try {
    const response = await axios.patch(`${API_URL}/update-user`, formData);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//CHANGE PASSWORD
export const changePassword = async (formData) => {
  try {
    const response = await axios.patch(`${API_URL}/change-password`, formData);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message, { theme: "colored" });
  }
};
