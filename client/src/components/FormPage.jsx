import React, { useState } from "react";
import styles from "../styles/form.module.css";

import { connect } from "react-redux";
import { imageVerifier } from "../redux/actions";

function FormPage({
  /* variables */ imageErrorG,
  /* funciones asyncronas  */ imageVerifier,
}) {
  const [values, setValues] = useState({
    name: "",
    nameError: false,
    description: "",
    descriptionError: false,
    platform: "",
    platformError: false,
    image: "",
    //image error es asincronico
    landingDate: "",
    landingDateError: false,
    rating: 0,
    ratingError: false,
    genre: "",
    genreError: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault(); //previene el comportamiento default el cual recarga la pagina

    //validaciones asincronas
  };

  const handleChange = (e) => {
    const { target } = e; //elemento que ejecuto el evento
    const { name, value } = target; //name identifca el input y value el valor actual

    const newValues = {
      //clona el estado actual y reemplaza el valor del input
      ...values,
      [name]: value,
    };

    setValues(newValues); //sincroniza el estado nuevo
  };

  const handleBlur = async (e) => {
    //validacion asincrona de formularios (cuando se deja de hacer focus)
    const { target } = e; //elemento que ejecuto el evento
    const { name, value } = target; //name identifca el input y value el valor actual

    if (name === "name" && value.length > 20) {
      setValues((prevState) => ({ ...prevState, nameError: true }));
    } else {
      setValues((prevState) => ({ ...prevState, nameError: false }));
    }

    if (name === "description" && value.length > 200) {
      setValues((prevState) => ({ ...prevState, descriptionError: true }));
    } else {
      setValues((prevState) => ({ ...prevState, descriptionError: false }));
    }

    if (name === "platform" && value.length > 20) {
      setValues((prevState) => ({ ...prevState, platformError: true }));
    } else {
      setValues((prevState) => ({ ...prevState, platformError: false }));
    }

    if (name === "image") {
      console.log("Verificando imagen con URL: " + value);
      imageVerifier(value);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create Videogame</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="The game name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {values.nameError && (
          <p className={styles.error}>Name should not exceed 20 characters</p>
        )}

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Write the game description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        ></textarea>
        {values.descriptionError && (
          <p className={styles.error}>
            Description should not exceed 200 characters
          </p>
        )}

        <label htmlFor="platform">Platform:</label>
        <input
          type="text"
          id="platform"
          name="platform"
          placeholder="Where can you play?"
          value={values.platform}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {platformError && (
          <p className={styles.error}>
            Platform description should not exceed 20 characters
          </p>
        )}

        <label htmlFor="image">Image:</label>
        <input
          type="text"
          id="image"
          name="image"
          placeholder="You should give us the http direction"
          value={values.image}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {imageErrorG && (
          <p className={styles.error}>Image should be a valid http image</p>
        )}

        <label htmlFor="landingDate">Landing Date:</label>
        <input
          type="date"
          id="landingDate"
          name="landingDate"
          value={values.landingDate}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          name="rating"
          placeholder="Has to be between 0 and 5"
          value={values.rating}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />

        <label htmlFor="genreName">Genre:</label>
        <select
          id="genreName"
          name="genreName"
          value={values.genreName}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        >
          <option value="">Choose an option</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="RPG">RPG</option>
          <option value="Shooter">Shooter</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Indie">Indie</option>
          <option value="Platformer">Platformer</option>
          <option value="Massively Multiplayer">Massively Multiplayer</option>
          <option value="Sports">Sports</option>
          <option value="Racing">Racing</option>
          <option value="Simulation">Simulation</option>
          <option value="Arcade">Arcade</option>
          <option value="Casual">Casual</option>
          <option value="Fighting">Fighting</option>
          <option value="Strategy">Strategy</option>
          <option value="Family">Family</option>
          <option value="Educational">Educational</option>
          <option value="Card">Card</option>
          <option value="Board Games">Board Games</option>
        </select>

        <input type="submit" value="Crear Videojuego" />
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    imageErrorG: state.verifier.imageError, //G de estado global
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    imageVerifier: (data) => dispatch(imageVerifier(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
