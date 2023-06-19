// CommonJS 中的模块定义 => javascript 作为后端语言的一种规范
// 运行上下文  是node.js
module.exports = {
    devServer:{
        proxy:{
            '/baidu':{
                target:'http://www.baidu.com'
            },
            '/google':{
                target:'http://google.cn'
            },
            '/api':{
                target:'http://localhost:3000',
                changeOrigin:true, // 作用在origin请求发生变化为http://localhost:3000
                // 干掉 => 自动添加的命中标识符到url上
                // 干掉 /api
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}