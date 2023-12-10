import "./InfoBox.scss";
import React from "react";

const InfoBox = ({ bgColor, title, count, icon }) => {
  return (
    <div className={`info-box ${bgColor}`}>
      <span className="info-icon --color-white">{icon}</span>
      <span className="info-text">
        <p>{title}</p>
        <p>
          <b>{count}</b>
        </p>
      </span>
    </div>
  );
};

export default InfoBox;
