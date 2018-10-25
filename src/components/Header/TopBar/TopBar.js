import React from 'react';
import { ReactComponent as ArrowForward } from '../../../svg/arrow-forward.svg'; 
import styles from './TopBar.module.css'; 

export default function TopBar() {
  return (
    <div className={styles.topbar}>
      <div>#MelAndMitchGetHitched</div>
      <a href="#rsvp" className={styles.link}>
        <span>RSVP</span> <ArrowForward />
      </a>
    </div>
  )
}