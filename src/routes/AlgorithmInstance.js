import React from 'react';
import { connect } from 'dva';
import styles from './AlgorithmInstance.css';
import AlgorithmInstancesComponent from '../components/AlgorithmInstance/AlgorithmInstance';
import MainLayout from '../components/MainLayout/MainLayout';

function AlgorithmInstances({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <AlgorithmInstancesComponent />
      </div>
    </MainLayout>
  );
}

export default connect()(AlgorithmInstances);
