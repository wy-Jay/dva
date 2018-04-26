import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function fetch({ page, moduleName }) {
  let url = `/api/algorithm/instance/list?pageIndex=${page}&pageSize=${PAGE_SIZE}`;
  // console.log(moduleName);
  debugger;
  if (moduleName) {
    url += (`&moduleName=${moduleName}`);
  }
  console.log(url);
  return request(url);
}

export function remove(id) {
  const values = { pkId: id };
  return request('/api/algorithm/instance/remove', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function patch(id, values) {
  const params = { pkId: id };
  return request('api/algorithm/instance/edit', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function create(values) {
  return request('api/algorithm/instance/save', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
