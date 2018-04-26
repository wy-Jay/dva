import Cookie from './cookie';


const isLogin = () => {
  return Cookie.get('user_session') && Cookie.get('user_session') > new Date().getTime();
};

const userName = Cookie.get('user_name');

const setLoginIn = (name) => {
  const now = new Date();
  now.setDate(now.getDate() + 1);
  Cookie.set('user_session', now.getTime());
  Cookie.set('user_name', name);
  // Cookie.set('access_token', accessToken);
  // Cookie.set('user_power', power);
  // localStorage.setItem('allPathPowers', JSON.stringify(pathPowers));
};

const setLoginOut = () => {
  Cookie.remove('user_session');
  Cookie.remove('user_name');
  // Cookie.remove('access_token');
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
