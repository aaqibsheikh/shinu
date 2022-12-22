import React from 'react';

import styles from '../styles';
import { logo } from '../assets';

const Loader = ({ title }) => {
  return (<div className={styles.loader}>
    <img src={logo} alt="logo" className={styles.loaderImg} />
    <p className={styles.loaderText}>{title}</p>
  </div>);
};

export default Loader;