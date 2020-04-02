import request from '@/util/request'


export default function wxPay(logid){
    let _openid = JSON.parse(window.localStorage.getItem('appUser')).openid
    return request({
        url : 'wxapp.php?page=wxpay&action=getWXPayInfo',
        data:{
            log_id:logid,
            openid:_openid
        }
    })
}