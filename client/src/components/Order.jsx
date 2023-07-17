import React, { useState } from "react";
import { Link } from "react-router-dom";
//redux
import { connect } from "react-redux";
import {
  orderByRating,
  orderByAlphabet,
  orderByAlphabetD,
} from "../redux/actions";

import styles from "../styles/order.module.css";

//Se comunica con el redux y reordena el array videojuegos100 segun la opcion seleccionada
function Order({ orderByRating, orderByAlphabet, orderByAlphabetD }) {
  const [sortingType, setSortingType] = useState("");

  const handleSortingChange = (event) => {
    const selectedSortingType = event.target.value;
    setSortingType(selectedSortingType);

    if (selectedSortingType === "alphabetic") {
      console.log("alphabet");
      orderByAlphabet();
    } else if (selectedSortingType === "rating") {
      console.log("rating");
      orderByRating();
    } else if (selectedSortingType === "D-alphabetic") {
      console.log("alphabet al revez");
      orderByAlphabetD();
    }
  };

  return (
    <>
      <form className={styles.orderBy}>
        <label>
          Order by:
          <select value={sortingType} onChange={handleSortingChange}>
            <option value="">Choose an option</option>
            <option value="alphabetic">Alphabetic order</option>
            <option value="D-alphabetic">D- Alphabetic order</option>
            <option value="rating">Rating order</option>
          </select>
        </label>
      </form>
      <form className={styles.orderBy}>
        <label>
          Order by genre:
          <select>
            <option value="">Choose an option</option>
            <option>Action</option>
            <option>Adventure</option>
            <option>RPG</option>
            <option>Shooter</option>
            <option>Puzzle</option>
            <option>Indie</option>
            <option>Platformer</option>
            <option>Massively Multiplayer</option>
            <option>Sports</option>
            <option>Racing</option>
            <option>Simulation</option>
            <option>Arcade</option>
            <option>Casual</option>
            <option>Fighting</option>
            <option>Strategy</option>
            <option>Family</option>
            <option>Educational</option>
            <option>Card</option>
            <option>Board Games</option>
          </select>
        </label>
      </form>
      <div >
        <button className={styles.button}>
          <Link style={{ color: 'white', textDecoration: 'none' }} to="/create">
            Create Videogame
          </Link>
        </button>
      </div>
    </>
  );
}

//mapea las acciones de redux a las props del componente
const mapDispatchToProps = (dispatch) => {
  return {
    orderByAlphabet: () => dispatch(orderByAlphabet()),
    orderByRating: () => dispatch(orderByRating()),
    orderByAlphabetD: () => dispatch(orderByAlphabetD()),
  };
};

export default connect(null, mapDispatchToProps)(Order);
