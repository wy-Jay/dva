import dva from 'dva';
import { browserHistory,hashHistory } from 'dva/router';
import createLoading from 'dva-loading';
import { message } from 'antd';
import './index.html';
import './index.css';

const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize
const app = dva({
  history: browserHistory,
  onError(e) {
    message.error(e.message, ERROR_MSG_DURATION);
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
// Moved to router.js
app.model(require('./models/algorithmModel'));
app.model(require('./models/algorithmInstance'));
app.model(require('./models/algorithmInstanceHistory'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
