import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function fetch({ page }) {
  return request(`/api/algorithm/module/list?pageIndex=${page}&pageSize=${PAGE_SIZE}`);
}

export function remove(id) {
  const values = { pkId: id };
  return request('/api/algorithm/module/remove', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function patch(id, values) {
  const params = { pkId: id };
  return request('api/algorithm/module/edit', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function create(values) {
  return request('api/algorithm/module/save', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
