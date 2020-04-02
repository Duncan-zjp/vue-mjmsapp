import request from '@/util/request'

export function getsy(){
    return request({
        url : 'wxapp.php?page=user&action=getLowerUser'
    })
}


export function childrenSy(id){
    return request({
        url : 'wxapp.php?page=user&action=getAccountList',
        data:{
            lower_id:id
        }
    })
}


export function withdrawal(amount){
    return request({
        url : 'wxapp.php?page=flow&action=tixian',
        data:{
            amount:amount
        }
    })
}

export function withdrawalRecord(){
    return request({
        url : 'wxapp.php?page=user&action=tixianLog',
    })
}

