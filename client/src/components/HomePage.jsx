import React, { useEffect } from "react";
import styles from "../styles/home.module.css";
import { Link } from "react-router-dom";
//redux
import { connect } from "react-redux";
import { pedirVideojuegos, pedirVideojuegosId } from "../redux/actions";

//modulos
import Card from "./Card";
import SearchBar from "./SearchBar";
import Order from "./Order";

const HomePage = ({  /* variables:  */videojuegos, loading, /* functions:  */pedirVideojuegos , pedirVideojuegosId }) => {
  useEffect(() => {
    pedirVideojuegos();
  }, [pedirVideojuegos]);

  return (
    <>
      <div className={styles.container}>
        {/* sidebar */}
        <div className={styles.sidebar}>
          <h2>Order / Filter</h2>
            <Order/>
        </div>
        {/*search bar  */}
        <div className={styles.content}>
          <SearchBar/>
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
            <Card
                key={videojuegos.id}
                name={videojuegos.name}
                image={videojuegos.image}
                landingDate={videojuegos.landingDate}
                platform={videojuegos.platform}
              />
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
