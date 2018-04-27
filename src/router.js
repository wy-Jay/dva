import React from 'react';
import { Router } from 'dva/router';
import { isLogin } from './utils/index';

const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}


function redirectToLogin(nextState, replace) {
  if (!isLogin()) {
    replace({
      pathname: '/login',
    });
  }else {
    replace('/algorithmModels');
  }
}

function redirectToModulePage(nextState, replace) {
  if (isLogin()) {
    replace('/algorithmModels');
  }
}

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/',
      component: app,
      onEnter: redirectToLogin,
      getIndexRoute(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/algorithmModel'));
          cb(null, { component: require('./routes/AlgorithmModel') });
        }, 'modules');
      },
    },
    // login
    {
      path: 'login',
      name: 'login',
      onEnter: redirectToModulePage,
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/login'));
          cb(null, require('./routes/Login'));
        }, 'login');
      },
    },
    {
      path: '/algorithmModels',
      name: 'ModulePage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/algorithmModel'));
          cb(null, require('./routes/AlgorithmModel'));
        });
      },
    },
    {
      path: '/algorithmInstances',
      name: 'InstancePage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/algorithmInstance'));
          cb(null, require('./routes/AlgorithmInstance'));
        });
      },
    },
    {
      path: '/algorithmInstanceHistorys',
      name: 'HistoryPage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/algorithmInstanceHistory'));
          cb(null, require('./routes/AlgorithmInstanceHistory'));
        });
      },
    },
  ];

  return <Router history={history} routes={routes} />;
}

export default RouterConfig;
