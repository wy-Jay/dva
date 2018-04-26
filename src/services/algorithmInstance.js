import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function fetch({ page, moduleName }) {
  // let url = `/api/algorithm/instance/list?pageIndex=${page}&pageSize=${PAGE_SIZE}`;
  // if (moduleName) {
  //   url += (`&moduleName=${moduleName}`);
  // }
  // console.log(url);
  // return request(url);
  const params = { page, PAGE_SIZE, moduleName };
  // return request(`/api/algorithm/module/list?pageIndex=${page}&pageSize=${PAGE_SIZE}`);
  return request('/api/algorithm/instance/list', {
    method: 'get',
    data: params,
  });
}

export function remove(id) {
  const values = { pkId: id };
  return request('/api/algorithm/instance/remove', {
    method: 'POST',
    data: values,
  });
}

export function patch(id, values) {
  const params = { pkId: id };
  return request('api/algorithm/instance/edit', {
    method: 'POST',
    data: values,
  });
}

export function create(values) {
  return request('api/algorithm/instance/save', {
    method: 'POST',
    data: values,
  });
}
