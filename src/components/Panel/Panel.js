import React from 'react';
import cx from 'classnames';
import styles from './Panel.module.css';

export default function Panel({ children, dark, id, type }) {
  const cxClassNames = cx(styles.panel, {
    [styles.dark]: dark,
    [styles.rsvp]: type === 'rsvp',
    [styles.countdown]: type === 'countdown',
  });

  return (
    <div id={id} className={cxClassNames}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
