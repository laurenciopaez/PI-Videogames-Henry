import React, { useEffect, useState } from "react";
import styles from "../styles/home.module.css";
//redux
import { connect } from "react-redux";
import { pedirVideojuegos } from "../redux/actions";

//modulos
import Card from "./Card";
import SearchBar from "./SearchBar";
import Order from "./Order";

const HomePage = ({
  /* variables:  */ videojuegos,
  loading,
  /* functions:  */ pedirVideojuegos,
}) => {
  //Paginado de los videojuegos
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  //Carga los videojuegos automaticamente
  useEffect(() => {
    pedirVideojuegos();
  }, [pedirVideojuegos]);

  // Obtener el rango de índices para mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = videojuegos.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar de página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className={styles.container}>
        {/* sidebar */}
        <div className={styles.sidebar}>
          <h2 className={styles.center}>Order / Filter</h2>
          <Order />
          <div>
            <p>With love by: Laurencio Paez</p>
            <p>Using: RAGW and OpenAi</p>
          </div>
        </div>
        {/*search bar  */}
        <div className={styles.content}>
          <SearchBar />
          {/* Main content */}
          <h2 className={styles.center} style={{ color: 'white' }}>Main Content</h2>
          <div className={styles.grid}>
            {loading
              ? Array.from({ length: itemsPerPage }).map((_, index) => (
                  <div key={index} className={styles.loadingCard}>
                    <div className={styles.loadingImage}></div>
                    <div className={styles.loadingText}></div>
                  </div>
                ))
              : currentItems.map((el) => (
                  <Card
                    key={el.id}
                    name={el.name}
                    image={el.image}
                    landingDate={el.landingDate}
                    platform={el.platform}
                    rating={el.rating}
                    description={el.description}
                  />
                ))}
          </div>
          {/* Paginación */}
          <div className={styles.pagination}>
            {videojuegos.length > itemsPerPage && (
              <ul>
                {Array.from(
                  { length: Math.ceil(videojuegos.length / itemsPerPage) },
                  (_, index) => (
                    <li key={index}>
                      <button onClick={() => paginate(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  )
                )}
              </ul>
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
    loading: state.videogames.loading,
  };
};

//mapea las acciones de redux a las props del componente
const mapDispatchToProps = (dispatch) => {
  return {
    pedirVideojuegos: () => dispatch(pedirVideojuegos()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
