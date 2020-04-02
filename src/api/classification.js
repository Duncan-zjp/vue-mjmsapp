import request from '@/util/request'

export function classList(){
    return request({
        url : 'wxapp.php?page=category&action=getSightsTag'
    })
}

export function addList(){
    return request({
        url : 'wxapp.php?page=category&action=getGoodsCity'
    })
}


export function personalHotList(){
    return request({
        url : 'wxapp.php?page=category&action=getHotGoods'
    })
}