import React from 'react';
import { connect } from 'dva';
import styles from './AlgorithmModel.css';
import LoginComponent from '../components/Login/index';

function Login() {
  return (
    <div className={styles.normal}>
      <LoginComponent />
    </div>
  );
}

export default connect()(Login);
