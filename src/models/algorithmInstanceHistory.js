import * as algorithmInstanceHistorysService from '../services/algorithmInstanceHistory';

export default {
  namespace: 'algorithmInstanceHistorys',
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
    *fetch({ payload: { page = 1, moduleName, instanceName } }, { call, put }) {
      const { data } = yield call(algorithmInstanceHistorysService.fetch, { page, moduleName,instanceName });
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
      yield call(algorithmInstanceHistorysService.remove, id);
      yield put({ type: 'reload' });
    },
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(algorithmInstanceHistorysService.patch, id, values);
      yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put }) {
      yield call(algorithmInstanceHistorysService.create, values);
      yield put({ type: 'reload' });
    },
    *rollBack({ payload: id }, { call, put }) {
      yield call(algorithmInstanceHistorysService.rollBack, id);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.algorithmInstanceHistorys.page);
      yield put({ type: 'fetch', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/algorithmInstanceHistorys') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
