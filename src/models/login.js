import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { setLoginIn } from '../utils/index';
import { login } from '../services/login';

export default {
  namespace: 'login',
  state: {
  },
  effects: {
    * submit({
      payload,
    }, { call, put, select }) {
      const params = { username: payload.username, password: payload.password };
      const data = yield call(login, params);
      const returnData = data.data;
      debugger
      if (returnData && returnData.success) {
        setLoginIn(payload.username, returnData.data.token);
        const nextPathname = '/algorithmModels';
        yield put(routerRedux.push({
          pathname: nextPathname,
        }));
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(returnData.msg);
      }
    },
  },
  reducers: {
  },
};
