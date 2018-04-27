import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function fetch({ page, moduleName,instanceName }) {
  const params = { page, PAGE_SIZE, moduleName, instanceName};
  return request('/api/algorithm/instance/history/list', {
    method: 'get',
    data: params,
  });
}

export function remove(id) {
  const values = { pkId: id };
  return request('/api/algorithm/instance/history/remove', {
    method: 'POST',
    data: values,
  });
}

export function patch(id, values) {
  const params = { pkId: id };
  return request('api/algorithm/instance/history/edit', {
    method: 'POST',
    data: values,
  });
}

export function create(values) {
  return request('api/algorithm/instance/history/save', {
    method: 'POST',
    data: values,
  });
}

export function rollBack(values) {
  return request('api/algorithm/instance/history/rollBack', {
    method: 'POST',
    data: values,
  });
}
