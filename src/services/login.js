import request from '../utils/request';

export async function login(params) {
  return request('/api/user/login', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
