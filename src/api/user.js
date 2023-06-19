import {apiReq} from '@/utils/request'

export const test = ()=>{
    return apiReq.get('/')
}
export const doLogin = (username,password)=>{
    return apiReq({
        method:'post',
        url:'/login',
        data:{
            username,password
        }
    })
}
export const accessAdmin = ()=>{
    return apiReq.get('/admin')
}
