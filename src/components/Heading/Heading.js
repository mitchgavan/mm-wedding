import React from 'react';
import styles from './Heading.module.css';

export default function Heading({ children }) {
  return <h2 className={styles.heading}>{children}</h2>;
}
