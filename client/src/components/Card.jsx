import React from "react";
import styles from "../styles/cards.module.css";

const Card = ({ name, image, landingDate, platform }) => {
  return (
    <>
      <div className={styles.card}>
        <h3>{name}</h3>
        <img src={image} alt="Game" />
        <p>{landingDate}</p>
        <p className="platform">{platform}</p>
      </div>
    </>
  );
};

export default Card;
