import React, { useState } from "react";
import styles from "../styles/cards.module.css";
import DetailPage from "./DetailPage";

const Card = ({ name, image, landingDate, platform, rating, genre,description }) => {
  const [showDetailPage, setShownDetailPage] = useState(false);
  //este codigo de aca maneja el estado de la pagina de detail que se despliega al hacer click en una tarjeta
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
        genre = {genre}
        //se pasa la descripcion con los tags
        description={description}
        onClose={handleDetailPageClose}
      />
    );
  }

  const genresString = genre && genre.join(", ");

  return (
    <>
      <div className={styles.card} onClick={handleClick}>
        <h3>{name}</h3>
        <img src={image} alt="Game" />
        <p className={styles.platform}>Genres: {genresString}</p>
      </div>
    </>
  );
};

export default Card;
