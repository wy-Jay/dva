import React from 'react';
import { connect } from 'dva';
import styles from './AlgorithmModel.css';
import AlgorithmModelsComponent from '../components/AlgorithmModel/AlgorithmModel';
import MainLayout from '../components/MainLayout/MainLayout';

function AlgorithmModels({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <AlgorithmModelsComponent />
      </div>
    </MainLayout>
  );
}

export default connect()(AlgorithmModels);
