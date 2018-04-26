import Cookie from './cookie';


const isLogin = () => {
  return Cookie.get('user_session') && Cookie.get('user_session') > new Date().getTime();
};

const userName = Cookie.get('username');

const setLoginIn = (username, token) => {
  const now = new Date();
  now.setDate(now.getDate() + 1);
  Cookie.set('user_session', now.getTime());
  Cookie.set('username', username);
  Cookie.set('token', token);
  // Cookie.set('user_power', power);
  // localStorage.setItem('allPathPowers', JSON.stringify(pathPowers));
};

const setLoginOut = () => {
  Cookie.remove('user_session');
  Cookie.remove('username');
  Cookie.remove('token');
  // Cookie.remove('user_power');
  // localStorage.removeItem('allPathPowers');
};


export {
  Cookie,
  isLogin,
  userName,
  setLoginIn,
  setLoginOut,
};
