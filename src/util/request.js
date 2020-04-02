import {AjaxPlugin,AlertModule} from 'vux'
import qs from 'qs'



const service = AjaxPlugin.$http.create({
    baseURL : 'http://shop.cnmjms.com/mobile/WXAPI/',
    // baseURL : 'http://192.168.8.13/mobile/WXAPI/',
    transformRequest : [function(data){
        return qs.stringify(data)
    }]
})


// 拦截器
service.interceptors.request.use(
    config => {
        config.method = 'post'
        config.headers = {
            'content-type': 'application/x-www-form-urlencoded'
        }
        let _appUser =  window.localStorage.getItem('appUser')
        let _userid = ''
        if(_appUser){
            _userid = JSON.parse(_appUser).user_id
            console.log(`获取到user${_userid}`)
        }else{
            console.log(`获取不到user${_userid}`)
        }
        // 每次请求都携带本地缓存的userid
        if(config.data){
            // config.data.user_id = _userid
            config.data.user_id = '2419'
        }else{
            config.data = {
                // user_id:_userid
                user_id:'2419'
            }
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)


service.interceptors.response.use(
    res => {
        if(!res.data.status){
            res.status = 0
            // alert(JSON.stringify(res.data))
        }
        return res
    },
    error => {
        Promise.reject(error)
    }
)



export default service