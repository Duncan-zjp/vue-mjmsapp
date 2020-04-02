import request from '@/util/request'



export function learUser(){
    return request({
        url : 'wxapp.php?page=goods&action=getLearUser'
    })
}
