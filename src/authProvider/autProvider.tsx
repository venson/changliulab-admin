import { AuthProvider, Options, fetchUtils } from "react-admin"
const authProvider:AuthProvider = {
    logout: function (params: any): Promise<string | false | void> {
        localStorage.removeItem('token');
        // throw new Error("Function not implemented.");
        return Promise.resolve();
    },
    checkAuth: function (params: any): Promise<void> {
        return localStorage.getItem('token')? Promise.resolve(): Promise.reject();
        // throw new Error("Function not implemented.");
    },
    checkError: function (error: any): Promise<void> {
        const status = error.status;
        if( status === 401 || status === 403){
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
        // throw new Error("Function not implemented.");
    },
    getPermissions: function (params: any): Promise<any> {
        const permission = localStorage.getItem('permission')
        return Promise.resolve(permission);

        // throw new Error("Function not implemented.");
    },
    login: async function ({username, password}): Promise<any> {
        console.log(username)
        console.log(password)
        if(!username || !password ){
            return Promise.reject();
        }
        // fetchUtils.fetchJson("http://changliulab.com/api/auth/admin/login",{method:'POST', body:JSON.stringify({username, password})}).then((res)=>{
        //     console.log(res);
        //     localStorage.setItem('token', res.json.token);
        //     localStorage.setItem('permission',res.json.permissionList)
        //     return Promise.resolve();
        // }).catch(error => console.log(error
        //     ));
        const url = "http://changliulab.com/api/auth/admin/login"
        const options:Options = {
            method: 'POST',
            body:JSON.stringify({
                username: username,
                password: password,
            })
        }
        console.log(url)
        console.log(options)
        const res = await fetchUtils.fetchJson(url,options)
        console.log(res)
        return Promise.reject();
    }
}
export default authProvider;