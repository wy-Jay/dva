import { routerRedux } from 'dva/router'
import { logOut } from '../services/logOut';
import {setLoginOut} from "../utils/index";

export default {
  namespace: 'logOut',
  state: {
  },
  reducers: {
  },
  effects: {
    * logOut ({}, { put }) {
      const data = yield call(logOut(), {})
      const returnData = data.data;
      if (returnData && returnData.success) {
        yield setLoginOut()
        yield put(routerRedux.push({
          pathname: '/login',
          state: {},
        }))
      }
    },
  },
};
