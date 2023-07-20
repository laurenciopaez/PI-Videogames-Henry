import React, { useEffect, useState } from "react";
import style from "../styles/detail.module.css";

import { connect } from "react-redux";
import { descriptionMaker } from "../redux/actions";

function DetailPage({
  name,
  image,
  landingDate,
  platform,
  genre,
  rating,
  /* description: tags */ description,
  onClose,
  /* funcion que pide la descripcion armada por chat gpt */
  descriptionMaker,
  /* estado global de la description de 'x' tarjeta hecha por chat gpt */
  trueDescription,
}) {
  const [descriptionType, setDescriptionType] = useState(false);
  //maneja el estado del boton de cierre de la pestaña de detalle
  const handleButtonClick = () => {
    onClose();
  };

  //una vez que carga el modulo envia la informacion al action para crear la descripcion con AI
  useEffect(() => {
    if (typeof description === "string") {
      setDescriptionType(true);
    } else {
      descriptionMaker(description);
    }
  }, [descriptionMaker]);

  //como las plataformas y los generos pueden venir uno o varios, aca los convierto a un solo string
  const platformString =
    platform && Array.isArray(platform) && platform.join(", ");
  const genresString = genre && Array.isArray(genre) && genre.join(", ");

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
        <p className={style.detail_page__platform}>Rating: {rating}</p>
        <p className={style.detail_page__platform}>Genres: {genresString}</p>
        {descriptionType ? (
          <p className={style.detail_page__description}>
            Description: {description}
          </p>
        ) : (
          <p className={style.detail_page__description}>
            Description: {trueDescription.toString()}
          </p>
        )}

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
    //true description es la descripcion que genera chat gpt y la carga en redux con ese nombre
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
