import request from '@/util/request'

export function list(order,page){
    return request({
        url : 'wxapp.php?page=flow&action=orderList',
        data:{
            composite_status:order,
            curPage:page
        }
    })
}


export function activityShow(order_id){
    return request({
        url : 'wxapp.php?page=flow&action=orderDetail',
        data:{
            order_id:order_id,
            type:'1'
        }
    })
}

export function specialtyShow(order_id){
    return request({
        url : 'wxapp.php?page=flow&action=orderDetail',
        data:{
            order_id:order_id,
            type:'0'
        }
    })
}

export function endorseData(order_id){
    return request({
        url : 'wxapp.php?page=goods&action=ticketChangeDetail',
        data:{
            order_id:order_id
        }
    })
}

export function onEndorse(group_id,member_log_id,old_group_id){
    return request({
        url : 'wxapp.php?page=goods&action=ticketChange',
        data:{
            group_id:group_id,
            member_log_id:member_log_id,
            old_group_id:old_group_id
        }
    })
}


export function comments(rec_id,content,comment_rank){
    return request({
        url : 'wxapp.php?page=flow&action=myCommentSend',
        data:{
            rec_id:rec_id,
            content:content,
            comment_rank:comment_rank
        }
    })
}
