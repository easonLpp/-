// 定义仓库
import { defineStore } from 'pinia';

// 国际惯例: useXxx命名
export const useUser = defineStore({
    id:'user',
    state(){
        return {
            isLogin:false
        }
    },
    actions:{
        changeLogin(status){
            this.isLogin = status;
        }
    }
});