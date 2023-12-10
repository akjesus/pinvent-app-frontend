import React, { useState } from "react";
import styles from "./auth.module.scss";
import { TiUserAddOutline } from "react-icons/ti";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail, registerUser } from "../../services/authService";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/loader";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setisLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { name, email, password, confirmPassword } = formData;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const register = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      return toast.error("All fields are required!", { theme: "colored" });
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid Email!", {
        theme: "dark",
      });
    }
    if (password.length < 6) {
      return toast.error(`Passwords must be up to 6 characters!`, {
        theme: "dark",
      });
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!", { theme: "colored" });
    }
    const userData = {
      name,
      email,
      password,
    };
    setisLoading(true);
    try {
      const data = await registerUser(userData);
      toast.success(data.message, { theme: "colored" });
      setisLoading(false);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.payload.user.name));
      navigate("/dashboard");
    } catch (error) {
      setisLoading(false);
      console.log(error);
    }
  };
  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={35} color="#999" />
          </div>
          <h2>Register</h2>
          <form onSubmit={register}>
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>
          <span className={styles.register}>
            <Link to="/"> Home</Link>
            <p> &nbsp; Already have an account? &nbsp;</p>
            <Link to="/login"> Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;
