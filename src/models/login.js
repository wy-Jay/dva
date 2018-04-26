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
      setLoginIn(payload.username);

      if (data && data.success) {
        const nextLocation = yield select(state => state.routing.locationBeforeTransitions);
        const nextPathname = nextLocation.state && nextLocation.state.nextPathname && nextLocation.state.nextPathname !== '/no-power' ? nextLocation.state.nextPathname : '/dashboard';
        yield put(routerRedux.push({
          pathname: nextPathname,
        }));
      }
    },
  },
  reducers: {
  },
};
