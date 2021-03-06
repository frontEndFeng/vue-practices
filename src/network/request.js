import axios from "axios";
import nprogress from "nprogress"
import "nprogress/nprogress.css"

export function request(confi, user) {
    const instance = axios.create({
        baseURL: "http://127.0.0.1:8888/api/private/v1",
        timeout: 2000
    });
    instance.interceptors.request.use(config => {
        nprogress.start();
        console.log(config);
        config.headers.Authorization = window.sessionStorage.getItem("token");
        return config;
    }, err => {
        console.log("拦截失败!");
    })
    instance.interceptors.response.use(config => {
        nprogress.done();
        return config.data;
    }, err => {
        console.log("拦截失败！");
    })
    return instance.post(confi, user);
}
export function request1(confi, user) {
    const instance = axios.create({
        baseURL: "http://127.0.0.1:8888/api/private/v1",
        timeout: 2000
    });
    instance.interceptors.request.use(
        config => {
            config.headers.Authorization = window.sessionStorage.getItem("token");
            return config;
        },
        err => {
            console.log("拦截失败！");
        }
    );
    return instance(confi, user);
}