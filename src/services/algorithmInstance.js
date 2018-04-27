import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function fetch({ page, moduleName }) {
  const params = { page, PAGE_SIZE, moduleName };
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
