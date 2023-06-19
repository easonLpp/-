import Axios from 'axios';
import { ElNotification, ElMessage } from 'element-plus';


export const apiReq = Axios.create({
    baseURL: '/api',
    timeout: 3000
});

apiReq.interceptors.request.use(config => {
    let token = window.sessionStorage.getItem('token');
    if (token) {
        config.headers.token = token
    }

    return config;
});


// 通用 公共（拦截器）处理响应
apiReq.interceptors.response.use((response) => {

    let token = response.data.token;
    if (token) {
        window.sessionStorage.setItem('token', token)
    }

    // 200的成功响应 => 业务异常的code处理+
    // if (response.data.code !== 200) {
    //     ElMessage.error(response.data.message);
    //     // 显示无权访问的页面401 router.push(401)
    // }
    // 必须要返回
    return response;
}, (err) => {
    // 200以外的一些错误处理： 404 500 系统异常
    ElNotification({
        title: '系统错误',
        message: err.message,
        type: 'error',
    });
    return Promise.reject(err);
})