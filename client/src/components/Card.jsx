import React, { useState } from "react";
import styles from "../styles/cards.module.css";
import DetailPage from "./DetailPage";

const Card = ({ name, image, landingDate, platform }) => {
  const [showDetailPage, setShownDetailPage] = useState(false);

  const handleClick = () => {
    setShownDetailPage(true);
  };

  const handleDetailPageClose = () => {
    setShownDetailPage(false)
  }

  if (showDetailPage) {
    return (
      <DetailPage
        name={name}
        image={image}
        landingDate={landingDate}
        platform={platform}
        onClose={handleDetailPageClose}
      />
    );
  }

  const platformString = platform.join(", ");

  return (
    <>
      <div className={styles.card} onClick={handleClick}>
        <h3>{name}</h3>
        <img src={image} alt="Game" />
        <p>{landingDate}</p>
        <p className={styles.platform}>{platformString}</p>
      </div>
    </>
  );
};

export default Card;
