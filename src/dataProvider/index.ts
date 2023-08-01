import { QueryClient } from 'react-query';
import {
  CreateParams,
  CreateResult,
  DataProvider,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  GetOneParams,
  GetOneResult,
  RaRecord,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
  UpdateResult,
  fetchUtils,
  usePermissionsOptimized,
} from "react-admin";
import { stringify } from "query-string";
import getResource from "./urlMap";
// const apiUrl = 'http://www.changliulab.com/api'
const apiUrl = "http://localhost:8222";

export const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  const token = localStorage.getItem("token");
  const user = { token: `Bearer ${token}`, authenticated: !!token };
  return fetchUtils.fetchJson(url, { ...options, user });
};
export const dataProvier: DataProvider = {
  getList: function <RecordType extends RaRecord = any>(
    resource: string,
    params: GetListParams
  ): Promise<GetListResult<RecordType>> {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      page: page,
      perPage: perPage,
      filter: JSON.stringify(params.filter),
      sort: JSON.stringify([field, order]),
    };
    // const url = `${apiUrl}/${resource}/${page}/${perPage}`
    const url = `${apiUrl}/${getResource(resource)}?${stringify(query)}`;
    // const url = `${apiUrl}/${resource}?${stringify(query)}`;
    // console.log(url);
    return httpClient(url)
      .then((res) => {
        // console.log(res);
        return Promise.resolve({
          data: res.json.data,
          pageInfo: res.json.pageInfo,
        });
      })
      // .catch((error) => {
      //   console.log('error',error);
      //   console.log('error',error.status);
      //   return Promise.reject();
      // });
  },
  getOne: function <RecordType extends RaRecord = any>(
    resource: string,
    params: GetOneParams<any>
  ): Promise<GetOneResult<RecordType>> {
    const meta = params.meta ?JSON.stringify(params.meta):undefined;
    // const query = meta? `?${stringify(meta)}` :''
    // console.log('param',params)
    // console.log('meta',params)
    const query = params.meta? `?${stringify(params.meta)}` :''
    // console.log('query',query)
    return (
      httpClient(`${apiUrl}/${getResource(resource)}/${params.id}${query}`)
    // httpClient(`${apiUrl}/${resource}/${params.id}`)
        // .then(({json}) =>({data:json.data}));
        .then(({ json }) => {
          // console.log(json);
          return { data: json };
        })
    );
  },
  getMany: function <RecordType extends RaRecord = any>(
    resource: string,
    params: GetManyParams
  ): Promise<GetManyResult<RecordType>> {
    const query = {
      filter: JSON.stringify({ ids: params.ids }),
    };
    const url = `${apiUrl}/${getResource(resource)}?${stringify(query)}`;
    console.log(url)
    // const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({ data: json }));
  },
  getManyReference: function <RecordType extends RaRecord = any>(
    resource: string,
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  update: (resource, params) => {

    return httpClient(`${apiUrl}/${getResource(resource)}/${params.id}`, {
          // return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => {
      return Promise.resolve({ data: { ...json, id: params.id } });
    });
  },

  updateMany: function <RecordType extends RaRecord = any>(
    resource: string,
    params: UpdateManyParams<any>
  ): Promise<UpdateManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  create: function <RecordType extends RaRecord = any>(
    resource: string,
    params: CreateParams<any>
  ): Promise<CreateResult<RecordType>> {
    return httpClient(`${apiUrl}/${getResource(resource)}`, {
          // return httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json },
    }));
  },
  delete: function <RecordType extends RaRecord = any>(
    resource: string,
    params: DeleteParams<RecordType>
  ): Promise<DeleteResult<RecordType>> {
    return httpClient(`${apiUrl}/${getResource(resource)}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({
      data: json,
    }));
  },
  deleteMany: function <RecordType extends RaRecord = any>(
    resource: string,
    params: DeleteManyParams<RecordType>
  ): Promise<DeleteManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
};

export const getImageAuth = (dir: string) => {
  return httpClient(`${apiUrl}/eduoss/admin/fileoss/auth?path=${dir}`, {
    method: "GET",
  }).then(({ json }) => ({ data: json }));
};
export const upLoadToOss = (url: string, form: FormData) => {
  return fetchUtils
    .fetchJson(`${url}`, {
      method: "POST",
      // body: JSON.stringify(form)
      body: form,
    })
    .then(({ json }) => ({ data: json }));
};
