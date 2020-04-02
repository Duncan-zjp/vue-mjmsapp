import request from '@/util/request'
import {GetRequest,setUrl} from '@/util/other'


function loginData(_code){
    return request({
        url : 'wxapp.php?page=login&action=getUserOpenId',
        data:{
            code:_code
        }
    })
}

export function login(successCallback){
    let storage = window.localStorage
    let _href = location.href
    // alert(`uri${setUrl(_href)}`)
    let changAppUser = window.localStorage.getItem('appUser')
    if(GetRequest().code && GetRequest().code.length > 1){
        // alert('有code没缓存，请求用户数据')
        // alert(`有code没缓存的uri  ${_href}`)
        loginData(GetRequest().code).then(res => {
        // 登陆成功
        if(res.status == 200){
            let _appUser = res.data.data
            storage.setItem('appUser',JSON.stringify(_appUser));
            console.log('保存用户数据成功')
            if(successCallback)successCallback(res.data.data)
        }else{
            // 失败
            // alert('登陆失败，即将重新跳转到微信授权')
            // alert(`需要跳转的uri${setUrl(_href)}`)
            window.location.href=`http://shop.cnmjms.com/mobile/WXAPI/wxapp.php?page=login&action=Login&uri=${setUrl(_href)}`
        }
      })
    }else{ 
        if(changAppUser){
            // alert('没code有缓存，不需要授权')
            if(successCallback)successCallback()            
        }else{
            // alert('没code没缓存，第一次授权')
            // alert(`授权后回调的uri ${setUrl(_href)}`)
            window.location.href=`http://shop.cnmjms.com/mobile/WXAPI/wxapp.php?page=login&action=Login&uri=${setUrl(_href)}`
        }
    } 
}


