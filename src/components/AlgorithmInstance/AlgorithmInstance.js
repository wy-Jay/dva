import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './AlgorithmInstance.css';
import { PAGE_SIZE } from '../../constants';
import AlgorithmInstanceModal from './AlgorithmInstanceModal';

function AlgorithmInstances({ props, dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(pkId) {
    dispatch({
      type: 'algorithmInstances/remove',
      payload: pkId,
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/algorithmInstances',
      query: { page },
    }));
  }

  function editHandler(pkId, values) {
    dispatch({
      type: 'algorithmInstances/patch',
      payload: { pkId, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'algorithmInstances/create',
      payload: values,
    });
  }

  const columns = [
    {
      title: 'pkId',
      dataIndex: 'pkId',
      key: 'pkId',
    },
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
          <AlgorithmInstanceModal record={record} onOk={editHandler.bind(null, record.pkId)}>
            <a>编辑</a>
          </AlgorithmInstanceModal>
          <Popconfirm title="Confirm to delete?" placement="right" onConfirm={deleteHandler.bind(null, record.pkId)}>
            <a href="">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <AlgorithmInstanceModal record={{}} onOk={createHandler}>
            <Button type="primary">新建实例</Button>
          </AlgorithmInstanceModal>
        </div>
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
  const { list, total, page } = state.algorithmInstances;
  return {
    loading: state.loading.models.algorithmInstances,
    list,
    total,
    page,
  };
}


export default connect(mapStateToProps)(AlgorithmInstances);
