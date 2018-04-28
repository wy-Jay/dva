import { message } from 'antd';
import * as algorithmModelsService from '../services/algorithmModel';

export default {
  namespace: 'algorithmModels',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data } = yield call(algorithmModelsService.fetch, { page });
      yield put({
        type: 'save',
        payload: {
          data: data.rows.rows,
          total: data.rows.records,
          page: parseInt(page, 10),
        },
      });
    },
    *remove({ payload: id }, { call, put }) {
      yield call(algorithmModelsService.remove, id);
      yield put({ type: 'reload' });
    },
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(algorithmModelsService.patch, id, values);
      yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put }) {
      const { data } = yield call(algorithmModelsService.checkModuleName, values);
      if(data){
        message.error("模块名重复");
        return;
      }

      yield call(algorithmModelsService.create, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.algorithmModels.page);
      yield put({ type: 'fetch', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/algorithmModels') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
