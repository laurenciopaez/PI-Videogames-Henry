import React, { useEffect } from "react";
import styles from "../styles/home.module.css";
import { Link } from "react-router-dom";
//redux
import { connect } from "react-redux";
import { pedirVideojuegos } from "../redux/actions";

import Card from "./Card";

const HomePage = ({ videojuegos, loading, pedirVideojuegos }) => {
  useEffect(() => {
    pedirVideojuegos();
  }, [pedirVideojuegos]);

  return (
    <>
      <div className={styles.container}>
        {/* sidebar */}
        <div className={styles.sidebar}>
          <h2>Clasificación</h2>
          <ul>
            <li>Opción 1</li>
            <li>Opción 2</li>
            <li>Opción 3</li>
          </ul>
        </div>
        {/*search bar  */}
        <div className={styles.content}>
          <div className={styles.searchBar}>
            <input type="text" placeholder="Buscar..." />
            <button type="submit">Buscar</button>
          </div>
          {/* Main content */}
          <h2>Contenido principal</h2>
          <div className={styles.grid}>
          {loading ? (
          <p>Cargando...</p>
        ) : (
          videojuegos && videojuegos.length > 0 ? (
            videojuegos.map((el) => (
              <Card
                key={el.id}
                name={el.name}
                image={el.image}
                landingDate={el.landingDate}
                platform={el.platform}
              />
            ))
          ) : (
            <p>No se encontraron videojuegos.</p>
          )
        )}
          </div>
        </div>
      </div>
    </>
  );
};
// mapea el estado de redux a las props del componente
const mapStateToProps = (state) => {
  return {
    videojuegos: state.videogames.videogames100,
    loading: state.videogames.loading
  };
};

//mapea las acciones de redux a las props del componente
const mapDispatchToProps = (dispatch) => {
  return {
    pedirVideojuegos: () => dispatch(pedirVideojuegos()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
