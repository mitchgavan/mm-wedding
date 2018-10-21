import React from 'react';
import cx from 'classnames';
import styles from './Panel.module.css'; 

export default function Panel({ children, dark, rsvp }) {
  const cxClassNames = cx(styles.panel, {
    [styles.dark]: dark,
    [styles.rsvp]: rsvp,
  });

  return (
    <div className={cxClassNames}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}