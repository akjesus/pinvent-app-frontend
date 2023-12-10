import React, { useState } from "react";
import styles from "./auth.module.scss";
import { MdPassword } from "react-icons/md";
import Card from "../../components/card/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../services/authService";
import Loader from "../../components/loader/loader";
import { toast } from "react-toastify";

const initialState = {
  password: "",
  confirmPassword: "",
};

const Reset = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { password, confirmPassword } = formData;
  const { token } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const reset = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      return toast.error("All fields are required!", { theme: "colored" });
    }
    if (password.length < 6) {
      return toast.error(`Passwords must be up to 6 characters!`, {
        theme: "dark",
      });
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords must be the same", {
        theme: "dark",
      });
    }

    const userData = {
      password,
      confirmPassword,
    };
    setisLoading(true);
    try {
      const data = await resetPassword(userData, token);
      if (data.statusCode === 200) {
        toast.success(data.message, { theme: "colored" });
        setisLoading(false);
        navigate("/login");
      } else {
        console.log("this is the data: " + data);
        setisLoading(false);
        toast.error(data, { theme: "colored" });
      }
    } catch (error) {
      setisLoading(false);
      console.log(error);
      toast.error(error, { theme: "colored" });
    }
  };
  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="#999" />
          </div>
          <h2>Reset Password</h2>
          <form onSubmit={reset}>
            <input
              type="password"
              placeholder="New Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Password
            </button>
            <div className={styles.links}>
              <Link to="/">
                {" "}
                <p>-Home</p>
              </Link>

              <Link to="/login">
                {" "}
                <p> -Login</p>
              </Link>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Reset;
