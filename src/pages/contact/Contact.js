import React, { useState } from "react";
import "./Contact.scss";
import Card from "../../components/card/Card";
import { FaEnvelope, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { toast } from "react-toastify";
import axios from "axios";

const Contact = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const data = {
    subject,
    message,
  };
  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/contact-us`,
        data
      );
      toast.success(response.data.message, { theme: "colored" });
      setSubject("");
      setMessage("");
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.message, { theme: "colored" });
    }
  };
  return (
    <div className="contact">
      <h3 className="--mt">Contact Us</h3>
      <div className="section">
        <form onSubmit={sendEmail}>
          <Card cardClass={"card"}>
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <label> Message</label>
            <textarea
              name="message"
              cols="30"
              rows="10"
              placeholder="Message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div>
              <button className="--btn --btn-primary" type="submit">
                Send Message
              </button>
            </div>
          </Card>
        </form>
        <div className="details">
          <Card cardClass={"card2"}>
            <h3>Contact Information</h3>
            <p>Fill the form or contact us via other channels listed below</p>
            <div className="icons">
              <span>
                <FaPhoneAlt />
                <p> +234 802 074 5685</p>
              </span>
              <span>
                <FaEnvelope />
                <p> support@pinvent.com.ng</p>
              </span>
              <span>
                <GoLocation />
                <p> Enugu, Nigeria</p>
              </span>
              <span>
                <FaTwitter />
                <p> @akjesus</p>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
