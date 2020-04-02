import request from '@/util/request'


export function list(){
    return request({
        url : 'wxapp.php?page=user&action=commonUserList'
    })
}

export function get(log_id){
    return request({
        url : 'wxapp.php?page=user&action=getCommonUser',
        data:{
            log_id:log_id
        }
    })
}


export function add(_data){
    return request({
        url : 'wxapp.php?page=user&action=createCommonUser',
        data:_data
    })
}

export function update(_data){
    return request({
        url : 'wxapp.php?page=user&action=editCommonUser',
        data:_data
    })
}

export function del(log_id){
    return request({
        url : 'wxapp.php?page=user&action=deleteCommonUser',
        data:{
            log_id:log_id
        }
    })
}