import React, { useEffect } from "react";
import style from "../styles/detail.module.css";

import { connect } from "react-redux";
import { descriptionMaker } from "../redux/actions";

function DetailPage({
  name,
  image,
  landingDate,
  platform,
  /* description: tags */ description,
  onClose,
  /* funcion que pide la descripcion armada por chat gpt */
  descriptionMaker,
  /* estado global de la description de 'x' tarjeta hecha por chat gpt */
  trueDescription,
}) {
  const handleButtonClick = () => {
    onClose();
  };

  //una vez que carga el modulo envia la informacion al action para crear la descripcion con AI
  useEffect(() => {
    descriptionMaker(description);
  }, [descriptionMaker]);

  const platformString = platform && platform.join(", ");

  return (
    <>
      <div className={style.detail_page}>
        <h2 className={style.detail_page__name}>{name}</h2>
        <div className={style.detail_page__image}>
          <img src={image} alt="Imagen del videojuego" />
        </div>
        <p className={style.detail_page__landing_date}>
          Landing Date: {landingDate}
        </p>
        <p className={style.detail_page__platform}>
          Plataforms: {platformString}
        </p>
        <p className={style.detail_page__description}>
          Description: {trueDescription.toString()}
        </p>
        <button
          className={style.detail_page__close_button}
          onClick={handleButtonClick}
        >
          X
        </button>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    trueDescription: state.videogames.trueDescription,
  };
};

//mapea las acciones de redux a las props del componente
const mapDispatchToProps = (dispatch) => {
  return {
    descriptionMaker: (data) => dispatch(descriptionMaker(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
