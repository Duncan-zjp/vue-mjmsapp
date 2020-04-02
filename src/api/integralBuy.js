import request from '@/util/request'


export function list(){
    return request({
        url : 'wxapp.php?page=integral&action=getGoodsList'
    })
}