import request from '@/util/request'

export function list(tag_id,curPage){
    return request({
        url:'wxapp.php?page=category&action=tagGetGoods',
        data:{
            tag_id:tag_id,
            curPage:curPage,
            pageNum:6
        }
    })
}

export function addList(tag_id,curPage){
    return request({
        url:'wxapp.php?page=category&action=tagGetGoods',
        data:{
            region_id:tag_id,
            curPage:curPage,
            pageNum:6
        }
    })
}



export function indexList(tag_id,curPage){
    return request({
        url:'wxapp.php?page=category&action=getGoods',
        data:{
            cat_id:tag_id,
            curPage:curPage,
            pageNum:6
        }
    })
}