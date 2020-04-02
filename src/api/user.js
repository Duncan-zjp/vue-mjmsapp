import request from '@/util/request'


export function changeFocus(){
    return request({
        url : 'wxapp.php?page=user&action=isFocusonWechat'
    })
}
