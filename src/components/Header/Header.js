import React from 'react';
import hero from '../../images/vineyard-hero.jpg'
import styles from './Header.module.css'; 

export default function Header() {
  return (
    <div className={styles.header}>
      <img src={hero} alt="" className={styles.bgImage} />
      <header className={styles.content}>
        <h1 className={styles.subTitle}>
          We're getting married
        </h1>
        <h2 className={styles.title}>
          Mitch <span className={styles.titleHighlight}>&</span> Melissa
        </h2>
        <p className={styles.date}>
          16/03/2018
        </p>
      </header>
    </div>
  )
}