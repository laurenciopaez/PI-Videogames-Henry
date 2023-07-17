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
        <label htmlFor="genre">Filter by genre:</label>
        <select id="genre" name="genre">
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
      </form>
      <div>
        <button className={styles.button}>
          <Link style={{ color: "white", textDecoration: "none" }} to="/create">
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
