import React from 'react';
import { connect } from 'dva';
import styles from './AlgorithmModel.css';
import HeaderComponent from '../components/MainLayout/Header';

function Header() {
  return (
    <div className={styles.normal}>
      <HeaderComponent />
    </div>
  );
}

export default connect()(Header);
