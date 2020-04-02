import request from '@/util/request'

export function show(id){
    return request({
        url : 'wxapp.php?page=goods&action=getGoods',
        data:{
            goods_id:id
        }
    })
}
export function collect(goods_id){
    return request({
        url : 'wxapp.php?page=user&action=collectGoods',
        data:{
            goods_id:goods_id
        }
    })
}
export function joinCar(goods_id){
    return request({
        url : 'wxapp.php?page=flow&action=addToCart',
        data:{
            quick:'0',
            goods_id:goods_id,
            number:'1',
            rec_type:'0'
        }
    })
}
