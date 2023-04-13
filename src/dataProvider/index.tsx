import { CreateParams, CreateResult, DataProvider, DeleteManyParams, DeleteManyResult, DeleteParams, DeleteResult, GetListParams, GetListResult, GetManyParams, GetManyReferenceParams, GetManyReferenceResult, GetManyResult, GetOneParams, GetOneResult, RaRecord, UpdateManyParams, UpdateManyResult, UpdateParams, UpdateResult, fetchUtils } from "react-admin";
import { stringify } from "query-string";
const apiUrl = 'http://www.changliulab.com/api'

export const httpClient = (url: string, options: fetchUtils.Options = {}) =>{
    const token = localStorage.getItem('token');
    const user = { token: `Bearer ${token}`, authenticated: !!token };
    return fetchUtils.fetchJson(url, {...options, user});
}
export const dataProvier:DataProvider = {
    getList: function <RecordType extends RaRecord = any>(resource: string, params: GetListParams): Promise<GetListResult<RecordType>> {
        const { page, perPage} = params.pagination;
        const { field, order} = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
        }
        const url = `${apiUrl}/${resource}/${page}/${perPage}`
        return httpClient(url).then(({json}) => ({data:json}));
    },
    getOne: function <RecordType extends RaRecord = any>(resource: string, params: GetOneParams<any>): Promise<GetOneResult<RecordType>> {
        return httpClient(`${apiUrl}/${resource}/${params.id}`)
        .then(({json}) =>({data:json}));
    },
    getMany: function <RecordType extends RaRecord = any>(resource: string, params: GetManyParams): Promise<GetManyResult<RecordType>> {
        const query = {
            filter: JSON.stringify({ ids: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));

    },
    getManyReference: function <RecordType extends RaRecord = any>(resource: string, params: GetManyReferenceParams): Promise<GetManyReferenceResult<RecordType>> {
        throw new Error("Function not implemented.");
    },
    update: function <RecordType extends RaRecord = any>(resource: string, params: UpdateParams<any>): Promise<UpdateResult<RecordType>> {
        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },
    updateMany: function <RecordType extends RaRecord = any>(resource: string, params: UpdateManyParams<any>): Promise<UpdateManyResult<RecordType>> {
        throw new Error("Function not implemented.");
    },
    create: function <RecordType extends RaRecord = any>(resource: string, params: CreateParams<any>): Promise<CreateResult<RecordType>> {
        return httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        }));
    },
    delete: function <RecordType extends RaRecord = any>(resource: string, params: DeleteParams<RecordType>): Promise<DeleteResult<RecordType>> {
        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json }))
    },
    deleteMany: function <RecordType extends RaRecord = any>(resource: string, params: DeleteManyParams<RecordType>): Promise<DeleteManyResult<RecordType>> {
        throw new Error("Function not implemented.");
    }
}