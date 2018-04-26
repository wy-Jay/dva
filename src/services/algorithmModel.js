import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function fetch({ page }) {
  const params = { page, PAGE_SIZE };
  // return request(`/api/algorithm/module/list?pageIndex=${page}&pageSize=${PAGE_SIZE}`);
  return request('/api/algorithm/module/list', {
    method: 'get',
    data: params,
  });
}

export function remove(id) {
  const values = { pkId: id };
  return request('/api/algorithm/module/remove', {
    method: 'POST',
    data: values,
  });
}

export function patch(id, values) {
  const params = { pkId: id };
  return request('api/algorithm/module/edit', {
    method: 'POST',
    data: values,
  });
}

export function create(values) {
  return request('api/algorithm/module/save', {
    method: 'POST',
    data: values,
  });
}
