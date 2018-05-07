import React from 'react';
import { Router } from 'dva/router';
import { isLogin } from './utils/index';

const cached = {};
const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}


function redirectToLogin(nextState, replace) {
  // if (!isLogin()) {
  //   replace({
  //     pathname: '/login',
  //   });
  // }else {
  //   replace('/algorithmModels');
  // }
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
      // onEnter: redirectToLogin,
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/algorithmModel'));
          cb(null, require('./routes/AlgorithmModel'),"module");
        });
      },
    },
    {
      path: '/algorithmInstances',
      name: 'InstancePage',
      // onEnter: redirectToLogin,
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/algorithmInstance'));
          cb(null, require('./routes/AlgorithmInstance'),"instance");
        });
      },
    },
    {
      path: '/algorithmInstanceHistorys',
      name: 'HistoryPage',
      // onEnter: redirectToLogin,
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/algorithmInstanceHistory'));
          cb(null, require('./routes/AlgorithmInstanceHistory'),"history");
        });
      },
    },
  ];

  return <Router history={history} routes={routes} />;
}

export default RouterConfig;
