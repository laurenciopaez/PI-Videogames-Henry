import React from "react";
import styles from "../styles/landing.module.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div className={`${styles.container} ${styles.background}`}>
        <div className={`${styles.welcome} ${styles.fontTitle}`}>Welcome to Go Play</div>
        <div className={styles.pic_ctn}>
          <img
            src="https://i.pinimg.com/564x/15/e8/ec/15e8ecb495252e7ebc7989383883515a.jpg"
            alt=""
            className={styles.pic}
          />
          <img
            src="https://i.pinimg.com/564x/cb/4d/5f/cb4d5f5d42ea7cb3f5ddef8f29408128.jpg"
            alt=""
            className={styles.pic}
          />
          <img
            src="https://i.pinimg.com/564x/20/42/c7/2042c777c911be32250a5a5ea6745056.jpg"
            alt=""
            className={styles.pic}
          />
          <img
            src="https://i.pinimg.com/564x/fb/dd/c9/fbddc9459124b1d1e8bf19dcdd6ad7d7.jpg"
            alt=""
            className={styles.pic}
          /> {/* nuevo */}
             <img
            src="https://i.pinimg.com/564x/30/dd/94/30dd946bd6ef45b05460c1e1ec40659b.jpg"
            alt=""
            className={styles.pic}
          />
             <img
            src="https://i.pinimg.com/564x/79/74/62/797462b47cad30c2fa35674888167b8b.jpg"
            alt=""
            className={styles.pic}
          />
             <img
            src="https://i.pinimg.com/564x/97/65/b3/9765b38a5757132440b44bb9e13d481d.jpg"
            alt=""
            className={styles.pic}
          />
        </div>

          <div>
            <div className={styles.border}>
              <button className={styles.button}>
                <Link className={styles.font} to="/home">PLAY</Link>
              </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
