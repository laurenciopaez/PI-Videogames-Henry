import React from "react";
import styles from "../styles/landing.module.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div className={`${styles.container} ${styles.background}`}>
        <div className={`${styles.welcome} ${styles.fontTitle}`}>Welcome to VideogamesApi</div>
        <div className={`${styles.welcome} ${styles.fontTitle}`}>Laurencio Paez</div>
          <div>
            <div className={styles.border}>
              <button className={styles.button}>
                <Link style={{ color: 'white', textDecoration: 'none' }} to="/home">PLAY</Link>
              </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
