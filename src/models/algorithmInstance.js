import * as algorithmInstancesService from '../services/algorithmInstance';

export default {
  namespace: 'algorithmInstances',
  state: {
    list: [],
    total: null,
    page: null,
    moduleName: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, page, moduleName } }) {
      return { ...state, list, total, page, moduleName };
    },
  },
  effects: {
    *fetch({ payload: { page = 1, moduleName } }, { call, put }) {
      // debugger;
      // console.log(moduleName);
      const { data } = yield call(algorithmInstancesService.fetch, { page, moduleName });
      yield put({
        type: 'save',
        payload: {
          data: data.data.rows.rows,
          total: data.data.rows.records,
          page: parseInt(page, 10),
        },
      });
    },
    *remove({ payload: id }, { call, put }) {
      yield call(algorithmInstancesService.remove, id);
      yield put({ type: 'reload' });
    },
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(algorithmInstancesService.patch, id, values);
      yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put }) {
      yield call(algorithmInstancesService.create, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.algorithmInstances.page);
      yield put({ type: 'fetch', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        // console.log('location is: %o', location);
        // console.log('重定向接收参数：%o', location.state)
        // debugger;
        console.log(query);
        if (pathname === '/algorithmInstances') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
