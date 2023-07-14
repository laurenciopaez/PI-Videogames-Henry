import React, { useState } from "react";

//redux
import { connect } from "react-redux";
import { pedirVideojuegosId,pedirVideojuegosName } from "../redux/actions";
//css
import styles from "../styles/home.module.css";

function SearchBar({ pedirVideojuegosId, pedirVideojuegosName }) {
  //almacenar valor de barra de busqueda
  const [searchValue, setSearchValue] = useState("");

  //maneja los cambios de la barra de busqueda
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };
  //maneja el submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const isNumber = /^\d+$/.test(searchValue); //este codigo utiliza el metodo test que verifica si searchValue es un numero, el resto de simbolos se utilizan para setear la expresion regular a la cual tiene que ser verificada

    if (isNumber) {
      // Realizar búsqueda por ID
      console.log("Realizar búsqueda por ID:", searchValue);
      pedirVideojuegosId(searchValue);
    } else {
      // Realizar búsqueda por nombre
      console.log("Realizar búsqueda por nombre:", searchValue);
      pedirVideojuegosName(searchValue);
    }

    // Restablecer el valor de searchValue después de la búsqueda
    setSearchValue("");
  };

  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by name or Id"
          value={searchValue}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    videojuegos: state.videogames.videogames100,
    loading: state.videogames.loading,
  };
};

//mapea las acciones de redux a las props del componente
const mapDispatchToProps = (dispatch) => {
  return {
    pedirVideojuegosId: (id) => dispatch(pedirVideojuegosId(id)),
    pedirVideojuegosName: (name) => dispatch(pedirVideojuegosName(name))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
