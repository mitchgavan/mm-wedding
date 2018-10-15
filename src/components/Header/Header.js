import React from 'react';
import hero from '../../images/vineyard-hero.jpg'
import styles from './Header.module.css'; 

export default function Header() {
  return (
    <div className={styles.header}>
      <img src={hero} alt="" className={styles.bgImage} />
      <h1 className={styles.title}>
        Mitch <span className={styles.titleHighlight}>&</span> Melissa
      </h1>
    </div>
  )
}