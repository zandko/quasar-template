import { defHttp } from '@/utils/http';
import { IUserModel } from './types';

export * from './types';

enum Api {
  USER = '/users',
}

export function getUserList(params: any) {
  return defHttp.request<IUserModel[]>({
    url: Api.USER,
    method: 'GET',
    params,
  });
}

export function createUser(params: IUserModel) {
  return defHttp.request<IUserModel>({
    url: Api.USER,
    method: 'POST',
    params,
  });
}

export function updateUser(params: IUserModel) {
  return defHttp.request({
    url: Api.USER,
    method: 'PUT',
    params,
  });
}

export function deleteUser(id: string | number) {
  return defHttp.request({
    url: `${Api.USER}/${id}`,
    method: 'DELETE',
  });
}

export default {
  get: getUserList,
  post: createUser,
  put: updateUser,
  delete: deleteUser,
};
