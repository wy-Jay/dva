import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button ,Icon } from 'antd';
import { routerRedux } from 'dva/router';
import styles from '../Common/common.css';
import { PAGE_SIZE } from '../../constants';
import AlgorithmInstanceHistoryModal from './AlgorithmInstanceHistoryModal';

function AlgorithmInstanceHistorys({ props, dispatch, list: dataSource, loading, total, page: current }) {


  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/algorithmInstanceHistorys',
      query: { page },
    }));
  }

  function editHandler(pkId, values) {
    dispatch({
      type: 'algorithmInstanceHistorys/patch',
      payload: { pkId, values },
    });
  }

  function rollBackHandler(pkId) {
    dispatch({
      type: 'algorithmInstanceHistorys/rollBack',
      payload: pkId,
    });
  }

  const columns = [
    {
      title: '版本号',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: '算法模块名',
      dataIndex: 'moduleName',
      key: 'moduleName',
    },
    {
      title: '实例名',
      dataIndex: 'instanceName',
      key: 'instanceName',
    },
    {
      title: '类路径',
      dataIndex: 'classPath',
      key: 'classPath',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <AlgorithmInstanceHistoryModal record={record} onOk={editHandler.bind(null, record.pkId)}>
            <a>查看</a>
          </AlgorithmInstanceHistoryModal>
          <Popconfirm title="确认回滚?" placement="right" onConfirm={rollBackHandler.bind(null, record.pkId)}>
            <a href="">回滚</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.algorithmInstanceHistorys;
  return {
    loading: state.loading.models.algorithmInstanceHistorys,
    list,
    total,
    page,
  };
}


export default connect(mapStateToProps)(AlgorithmInstanceHistorys);
