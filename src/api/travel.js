import request from '@/util/request'


export function release(notelist){
    return request({
        url : 'wxapp.php?page=user&action=uploadTravelNote',
        data:{
            notelist:notelist
        }
    })
}

export function list(type,curPage,pageNum){
    return request({
        url : 'wxapp.php?page=user&action=getTravelNoteList',
        data:{
            type:type,
            curPage:curPage,
            pageNum:pageNum
        }
    })
}


export function show(id){
    return request({
        url : 'wxapp.php?page=user&action=getTravelNote',
        data:{
            note_id:id
        }
    })
}

export function like(id){
    return request({
        url : 'wxapp.php?page=user&action=likeGoods',
        data:{
            note_id:id
        }
    })
}


export function indexList(status,curPage){
    return request({
        url : 'wxapp.php?page=user&action=getTravelNoteList',
        data:{
            type:'0',
            status:status,
            curPage:curPage,
            pageNum:6
        }
    })
}



