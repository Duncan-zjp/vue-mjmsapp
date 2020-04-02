import request from '@/util/request'

export function bind(pid){
    return request({
        url : 'wxapp.php?page=member&action=bindingRelation',
        data:{
            parent_id : pid
        }
    })
}