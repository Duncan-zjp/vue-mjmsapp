import request from '@/util/request'


export function banner(type){
    return request({
        url : 'wxapp.php?page=index&action=getBanner',
        data:{
            type:type
        }
    })
}


export function activity(){
    return request({
        url : 'wxapp.php?page=category&action=weekActivity',
    })
}

export function specialtyClass(){
    return request({
        url : 'wxapp.php?page=category&action=getFoodTag',
    })
}

export function specialty(){
    return request({
        url : 'wxapp.php?page=index&action=getPromoteGoods',
    })
}


export function seasonRecommend(){
    return request({
        url : 'wxapp.php?page=category&action=getSeasonGoods'
    })
}

export function selectLine(){
    return request({
        url : 'wxapp.php?page=category&action=getBestGoods'
    })
}

export function productList(page){
    return request({
        url : 'wxapp.php?page=goods&action=ortherGoods',
        data:{
            curPage:page,
            pageNum:6
        }
    })
}