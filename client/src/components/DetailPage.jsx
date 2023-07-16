import React from "react";
import style from '../styles/detail.module.css';

function DetailPage({ name, image, landingDate, platform, onClose }) {

    const handleButtonClick = () => {
        onClose()
    }

  const platformString = platform.join(", ");

  return (
    <>
      <div className={style.detail_page}>
        <h2 className={style.detail_page__name}>{name}</h2>
        <div className={style.detail_page__image}>
          <img src={image} alt="Imagen del videojuego" />
        </div>
        <p className={style.detail_page__landing_date}>{landingDate}</p>
        <p className={style.detail_page__platform}>{platformString}</p>
        <button className={style.detail_page__close_button} onClick={handleButtonClick}>
          X
        </button>
      </div>
      <div className={style.background}></div>
    </>
  );
}

export default DetailPage;