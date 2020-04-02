import request from '@/util/request'

export function show(id){
    return request({
        url : 'wxapp.php?page=goods&action=getGoods',
        data:{
            goods_id:id
        }
    })
}


export function selectGroup(goodsid,groupid,group_place_id){
    return request({
        url : 'wxapp.php?page=goods&action=getGoods',
        data:{
            goods_id:goodsid,
            group_id:groupid,
            group_place_id:group_place_id
        }
    })
}

export function selectJh(goodsid,groupid,group_place_id){
    return request({
        url : 'wxapp.php?page=goods&action=getGoods',
        data:{
            goods_id:goodsid,
            group_id:groupid,
            group_place_id:group_place_id
        }
    })
}


