import React, { useState } from "react";
import styles from "./auth.module.scss";
import { AiOutlineMail } from "react-icons/ai";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import { forgotPassword, validateEmail } from "../../services/authService";
import { toast } from "react-toastify";
import Loader from "../../components/loader/loader";

const Forgot = () => {
  const [isLoading, setisLoading] = useState(false);
  const [email, setEmail] = useState("");

  const forgot = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter your email!", { theme: "colored" });
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid Email!", {
        theme: "dark",
      });
    }
    const userData = {
      email,
    };
    setisLoading(true);
    try {
      const data = await forgotPassword(userData);
      if (data.statusCode === 200) {
        setisLoading(false);
        setEmail("");
      } else {
        console.log(data);
        setisLoading(false);
      }
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
            <AiOutlineMail size={35} color="#999" />
          </div>
          <h2>Forgot Password</h2>
          <form onSubmit={forgot}>
            <input
              type="text"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Get Reset Email
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

export default Forgot;
