import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './AlgorithmModel.css';
import { PAGE_SIZE } from '../../constants';
import AlgorithmModelModal from './AlgorithmModelModal';


function AlgorithmModels({ dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(pkId) {
    dispatch({
      type: 'algorithmModels/remove',
      payload: pkId,
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/algorithmModels',
      query: { page },
    }));
  }

  function editHandler(pkId, values) {
    dispatch({
      type: 'algorithmModels/patch',
      payload: { pkId, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'algorithmModels/create',
      payload: values,
    });
  }

  function redirectHandler(moduleName) {
    const pathName = '/algorithmInstances';
    dispatch(routerRedux.push({
      pathname: pathName,
      query: { moduleName },
    }));
  }
  const columns = [
    {
      title: 'pkId',
      dataIndex: 'pkId',
      key: 'pkId',
    },
    {
      title: '算法模块名',
      dataIndex: 'moduleName',
      key: 'moduleName',
      render: (text, record) => (
        <a onClick={redirectHandler.bind(this, record.moduleName)}>{text}</a>
      ),
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
          <AlgorithmModelModal record={record} onOk={editHandler.bind(null, record.pkId)}>
            <a>编辑</a>
          </AlgorithmModelModal>
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
          <AlgorithmModelModal record={{}} onOk={createHandler}>
            <Button type="primary">新建算法模块</Button>
          </AlgorithmModelModal>
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
  const { list, total, page } = state.algorithmModels;
  return {
    loading: state.loading.models.algorithmModels,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(AlgorithmModels);
