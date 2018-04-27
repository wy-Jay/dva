import request from '../utils/request';

export async function logOut(params) {
  return request('/api/user/logOut', {
    method: 'post',
    // body: JSON.stringify(params),
    data: params,
  });
}
