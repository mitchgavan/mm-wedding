import React from 'react';
import { ReactComponent as ArrowForward } from '../../../svg/arrow-forward.svg';
import styles from './TopBar.module.css';

export default function TopBar() {
  const handleAnchorClick = id => e => {
    const el = document.querySelector(`#${id}`);

    if (el && typeof el.scrollIntoView === 'function') {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.topbar}>
      <div>#MelAndMitchGetHitched</div>
      <a
        href="#rsvp"
        className={styles.link}
        onClick={handleAnchorClick('rsvp')}
      >
        <span>RSVP</span> <ArrowForward />
      </a>
    </div>
  );
}
