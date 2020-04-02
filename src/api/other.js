import request from '@/util/request'


export function heckIdCard(idcard,name){
    return request({
        url : 'wxapp.php?page=user&action=checkIDCard',
        data:{
            idcard:idcard,
            name:name
        }
    })
}


export function bindUid(unionid){
    return request({
        url : 'wxapp.php?page=user&action=setUnionid',
        data:{
            unionid:unionid,
        }
    })
}


export function getUserData(){
    return request({
        url : 'wxapp.php?page=user&action=getUserInfo'
    })
}


export function signin(){
    return request({
        url : 'wxapp.php?page=user&action=signin'
    })
}




