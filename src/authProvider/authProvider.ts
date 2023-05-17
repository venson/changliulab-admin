import React,{ useState } from "react";
import {AuthProvider, Options, fetchUtils, UserIdentity, useNotify} from "react-admin";
const baseUrl = "http://127.0.0.1:8222";

let permissions = new Set();

const authProvider: AuthProvider = {
  logout: function (params: any): Promise<string | false | void> {
    console.log('logout')
    localStorage.removeItem("token");
    localStorage.removeItem("permissions")
    permissions = new Set();
    // throw new Error("Function not implemented.");
    return Promise.resolve();
  },
  checkAuth: function (params: any): Promise<void> {
    const auth = localStorage.getItem("token");
    console.log("check auth", auth);
    auth ? console.log("loged") : console.log("not Logged");
    return auth ? Promise.resolve() : Promise.reject();
    // return Promise.reject();
    // throw new Error("Function not implemented.");
  },
  checkError: function (error: any): Promise<void> {
    const {status}  = error;
    // console.log('checkError',error);
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("permissions");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: function (params: any): Promise<any> {
    if(!permissions || permissions.size===0){
    const permission = localStorage.getItem("permissions");
    if(permission){
      permissions = new Set(permission.split(','));
    }
    console.log("get permission");
    }
    return permissions.size!==0 ? Promise.resolve(permissions) : Promise.reject();
    // throw new Error("Function not implemented.");
  },
  getIdentity: function (): Promise<UserIdentity> {
    return Promise.resolve({ id: 101, fullName: "venson" });
  },
  login: async function ({ username, password }): Promise<any> {
    // console.log(username);
    // console.log(password);
    if (!username || !password) {
      return Promise.reject();
    }
    // fetchUtils.fetchJson("http://changliulab.com/api/auth/admin/login",{method:'POST', body:JSON.stringify({username, password})}).then((res)=>{
    //     console.log(res);
    //     localStorage.setItem('permission',res.json.permissionList)
    //     return Promise.resolve();
    // }).catch(error => console.log(error
    //     ));
    // const url = "http://changliulab.com/api/auth/admin/login"
    const url = baseUrl + "/auth/admin/login";
    const options: Options = {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    // console.log('login url',url);
    // console.log(options);
    return fetchUtils.fetchJson(url, options).then((res) => {
      // console.log('login res',res);
      // console.log('token',res.json.token)
      localStorage.setItem("token", res.json.token);
      localStorage.setItem("permissions", res.json.permissions)
      return Promise.resolve();
    // }).catch(() => Promise.reject());
    });
  },
};
export default authProvider;
