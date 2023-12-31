import React, { useState } from "react";
import styles from "../styles/form.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { imageVerifier, crearVideojuego } from "../redux/actions";

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

    const {
      nameError,
      descriptionError,
      platformError,
      landingDateError,
      ratingError,
      genreError,
    } = values;

    //esto maneja que no haya errores obvios de los controladores de errores
    if (
      !nameError &&
      !descriptionError &&
      !platformError &&
      !imageErrorG &&
      !landingDateError &&
      !ratingError &&
      !genreError
    ) {
      console.log("enviado");
      
      //se forma un objeto data para crear un videojuego y poder enviarlo
      const data = {
        name: values.name,
        description: values.description,
        platform: values.platform,
        image: values.image,
        landingDate: values.landingDate,
        rating: values.rating,
        genre: values.genre,
    }
    console.log(data)
      crearVideojuego(data)
    }

    //se vuelven a poner los valores originales
    setValues({
      name: "",
      nameError: false,
      description: "",
      descriptionError: false,
      platform: "",
      platformError: false,
      image: "",
      landingDate: "",
      landingDateError: false,
      rating: 0,
      ratingError: false,
      genre: "",
      genreError: false,
    });

  };

  //handle change maneja los cambios en cada uno de los inputs del estado, asignando los valores correspondientes a sus variables del estado local
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


  //handleBlur es una funcion asyncrona que recibe la informacion del input una vez se ha finalizado la carga de los datos
  //de esta manera se previene enviarle mensajes de error prematuramente

  //cada uno de los manejos de errores tiene un setValue con su error para asignarlo true or false segun corresponda
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

    //La imagen es la unica que requiere una solicitud asyncrona, dado que necesita verificar si el link es realmente una imagen
    if (name === "image") {
      console.log("Verificando imagen con URL: " + value);
      imageVerifier(value);
    }

    //verifica que la fecha no sea anterior a 1970. Fue establecido arbitrariamente
    if (name === "landingDate") {
      const selectedDate = new Date(value);

      if (selectedDate.getFullYear() < 1970) {
        setValues((prevState) => ({
          ...prevState,
          landingDateError: true,
        }));
      } else {
        setValues((prevState) => ({
          ...prevState,
          landingDateError: false,
        }));
      }
    }

    if (name === "rating") {
      if (value > 5 || value < 0) {
        setValues((prevState) => ({
          ...prevState,
          ratingError: true,
        }));
      } else {
        setValues((prevState) => ({
          ...prevState,
          ratingError: false,
        }));
      }
    }

    if (name === "genre" && value === "") {
      setValues((prevState) => ({
        ...prevState,
        genreError: true,
      }));
    } else {
      setValues((prevState) => ({
        ...prevState,
        genreError: false,
      }));
    }
  };

  return (
    <>
    <div className={styles.container}>
    <button className={styles.goback}>
          <Link style={{ color: 'white', textDecoration: 'none' }} to="/home">
            Back Home
          </Link>
        </button>
    
      <h1 className={styles.title}>Create Videogame</h1>
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
        {/* con estos codigos se maneja los mensajes de error del form */}
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
        {values.platformError && (
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
        {values.landingDateError && (
          <p className={styles.error}>Any game was created before 1970</p>
        )}

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
        {values.ratingError && (
          <p className={styles.error}>Rating has to be between 0 and 5</p>
        )}

        <label htmlFor="genre">Genre:</label>
        <select
          id="genre"
          name="genre"
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

        {values.genreError && (
          <p className={styles.error}>You must choose one</p>
        )}

        <input type="submit" value="Crear Videojuego" />
      </form>
    </div>
    </>
  );
}

//imageError es la unica variable del estado global que se requiere para el modulo form dado que trae la informacion de si la imagen es valida o no


const mapStateToProps = (state) => {
  return {
    imageErrorG: state.verifier.imageError, //G de estado global
  };
};

//las dos funciones que se envian son la de verificar la imagen y la de crear el videojuego propiamente dicha
const mapDispatchToProps = (dispatch) => {
  return {
    imageVerifier: (data) => dispatch(imageVerifier(data)),
    crearVideojuego: (data) => dispatch(crearVideojuego(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
