import React from 'react';
import cx from 'classnames';
import styles from './Panel.module.css'; 

export default function Panel({ children, dark }) {
  const cxClassNames = cx({
    [styles.panel]: true,
    [styles.dark]: dark,
  });

  return (
    <div className={cxClassNames}>
      {children}
    </div>
  )
}