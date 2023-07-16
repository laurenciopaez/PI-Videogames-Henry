import React, { useState } from "react";
import styles from "../styles/cards.module.css";
import DetailPage from "./DetailPage";

const Card = ({ name, image, landingDate, platform, rating, description }) => {
  const [showDetailPage, setShownDetailPage] = useState(false);

  const handleClick = () => {
    setShownDetailPage(true);
  };

  const handleDetailPageClose = () => {
    setShownDetailPage(false);
  };

  //Si se clickeo se muestra el modulo detail Page
  if (showDetailPage) {
    return (
      <DetailPage
        name={name}
        image={image}
        landingDate={landingDate}
        platform={platform}
        rating={rating}
        //se pasa la descripcion con los tags
        description={description}
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
        <p>Rating: {rating}</p>
        <p>Landing Date: {landingDate}</p>
        <p className={styles.platform}>Platforms: {platformString}</p>
      </div>
    </>
  );
};

export default Card;
