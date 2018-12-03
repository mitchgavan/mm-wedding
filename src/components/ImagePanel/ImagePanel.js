import React from 'react';
import Heading from '../Heading/Heading';
import imgWedding from '../../images/mm2.jpg';
import imgYounger from '../../images/mm3.jpg';
import imgParis from '../../images/mm-paris.jpg';
import { ReactComponent as FlowerDivider } from '../../svg/flower-divider.svg';
import styles from './ImagePanel.module.css';

export default function ImagePanel() {
  return (
    <div className={styles.imagePanel}>
      <Heading>The Bride & Groom</Heading>
      <h3 className={styles.subHeading}>#MelAndMitchGetHitched</h3>
      <p className={styles.text}>
        Share the fun by tagging all of your wedding related Instagram photos
        with the #MelAndMitchGetHitched hashtag after the big day.
      </p>
      <div className={styles.imagePanelScroll}>
        <div>
          <img
            src={imgYounger}
            className={styles.image}
            alt="Mitch and Mel younger"
          />
        </div>
        <div>
          <img
            src={imgWedding}
            className={styles.image}
            alt="Mitch and Mel wedding"
          />
        </div>
        <div>
          <img
            src={imgParis}
            className={styles.image}
            alt="Mitch and Mel Paris"
          />
        </div>
      </div>
      <FlowerDivider className={styles.divider} />
    </div>
  );
}
