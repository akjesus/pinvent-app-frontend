import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/products/`;

//CREATE NEW PRODUCT
const createProduct = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

//GET ALL PRODUCTS
const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);

    if (response.statusText === "OK") {
      return response.data;
    } else {
      toast.info(response.data.message, { theme: "colored" });
      return response.data;
    }
  } catch (error) {
    console.log(error);
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message, { theme: "colored" });
  }
};

//GET SINGLE PRODUCT
const getProduct = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}`);

    if (response.statusText === "OK") {
      return response.data;
    } else {
      toast.info(response.data.message, { theme: "colored" });
      return response.data;
    }
  } catch (error) {
    console.log(error);
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message, { theme: "colored" });
  }
};
//DELETE PRODUCT
const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}`);

    if (response.statusText === "OK") {
      return response.data;
    } else {
      toast.info(response.data.message, { theme: "colored" });
      return response.data;
    }
  } catch (error) {
    console.log(error);
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message, { theme: "colored" });
  }
};
//UPDATE PRODUCT
const updateProduct = async (id, formData) => {
  try {
    const response = await axios.patch(`${API_URL}${id}`, formData);

    if (response.statusText === "OK") {
      toast.success(response.data.message, { theme: "colored" });
      return response.data;
    } else {
      toast.info(response.data.message, { theme: "colored" });
      return response.data;
    }
  } catch (error) {
    console.log(error);
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message, { theme: "colored" });
  }
};
const productService = {
  createProduct,
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct,
};
export default productService;
