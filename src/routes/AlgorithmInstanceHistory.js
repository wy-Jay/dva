import React from 'react';
import { connect } from 'dva';
import styles from './AlgorithmInstanceHistory.css';
import AlgorithmInstanceHistorysComponent from '../components/InstanceHistory/AlgorithmInstanceHistory';
import MainLayout from '../components/MainLayout/MainLayout';

function AlgorithmInstanceHistorys({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <AlgorithmInstanceHistorysComponent />
      </div>
    </MainLayout>
  );
}

export default connect()(AlgorithmInstanceHistorys);
