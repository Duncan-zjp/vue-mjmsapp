import request from '@/util/request'

export function addressList(){
    return request({
        url : 'wxapp.php?page=flow&action=getRegionst'
    })
}


export function list(){
    return request({
        url : 'wxapp.php?page=flow&action=consignee'
    })
}


export function info(id){
    return request({
        url : 'wxapp.php?page=flow&action=addressDetail',
        data:{
            address_id:id
        }
    })
}



export function add(data){
    return request({
        url : 'wxapp.php?page=flow&action=editAddress',
        data:data
    })
}


export function del(address_id){
    return request({
        url : 'wxapp.php?page=flow&action=dropAddress',
        data:{
            address_id:address_id
        }
    })
}
