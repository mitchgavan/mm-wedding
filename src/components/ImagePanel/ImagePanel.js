import React from 'react';
import imgWedding from '../../images/mm2.jpg';
import imgYounger from '../../images/mm3.jpg';
// import imgAmsterdam from '../../images/mm1.jpg';
import imgParis from '../../images/mm-paris.jpg';
// import imgBroek from '../../images/mm-broek.jpg';
import imgFlowerDivider from '../../images/flower-divider.png';
import styles from './ImagePanel.module.css'; 

export default function ImagePanel() {
  return (
    <div className={styles.imagePanel}>
      <img src={imgFlowerDivider} className={styles.divider} alt="" />
      <div className={styles.imagePanelScroll}>
        <div>
          <img src={imgYounger} className={styles.image} alt="Mitch and Mel younger" />
        </div>
        <div>
          <img src={imgWedding} className={styles.image} alt="Mitch and Mel wedding" />
        </div>
        <div>
          <img src={imgParis} className={styles.image} alt="Mitch and Mel Paris" />
        </div>
      </div>
      <img src={imgFlowerDivider} className={styles.divider} alt="" />
    </div>
  )
}