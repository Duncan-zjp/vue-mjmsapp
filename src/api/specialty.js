import request from '@/util/request'

export function banner(){
    return request({
        url : 'wxapp.php?page=index&action=getBanner',
        data:{
            type:'1'
        }
    })
}



export function classList(){
    return request({
        url : 'wxapp.php?page=category&action=getFoodTag'
    })
}


export function list(tag_id,curPage,keyword){
    return request({
        url : 'wxapp.php?page=category&action=getSpecialtyGoods',
        data:{
            tag_id:tag_id,
            curPage:curPage,
            pageNum:6,
            keyword:keyword
        }
    })
}


