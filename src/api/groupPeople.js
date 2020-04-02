import request from '@/util/request'


export function groupData(group_id){
    return request({
        url : 'wxapp.php?page=goods&action=getTripByid',
        data:{
            group_id:group_id
        }
    })
}