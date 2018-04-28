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
      debugger
      if (data && data.success) {
        setLoginIn(payload.username, data.data.token);
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
