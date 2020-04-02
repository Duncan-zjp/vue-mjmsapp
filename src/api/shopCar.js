import Vue from 'vue'
import request from '@/util/request'
import wxPay from './wxPay'
import List from '@/config/wxApiList'


export function list(){
    return request({
        url : 'wxapp.php?page=flow&action=showCart'
    })
}

export function select(goods_id,rec_id,type){
    return request({
        url : 'wxapp.php?page=flow&action=selectCart',
        data:{
            goods_id:goods_id,
            rec_id:rec_id,
            type:type
        }
    })
}

export function updateNum(rec_id,goods_id,number,suppid){
    return request({
        url : 'wxapp.php?page=flow&action=updateCartGoods',
        data:{
            rec_id:rec_id,
            goods_id:goods_id,
            number:number,
            suppid:suppid
        }
    })
}

export function del(rec_id){
    return request({
        url : 'wxapp.php?page=flow&action=deleteCartGoods',
        data:{
            rec_id:rec_id
        }
    })
}

export function pay(data,paySuccess,payError){
    return request({
        url : 'wxapp.php?page=flow&action=checkoutShoppingList',
        data:data
    })
    .then(res => {
        let posData = {
            pay_ship:[],
            payment:'11',
            sel_cartgoods:'',
            flow_type:'0'
        }
        Object.keys(res.data.data.goods_list).forEach(k => {
            res.data.data.goods_list[k].goodlist.forEach(item => {
                posData.pay_ship.push(`${item.supplier_id}_1`);
                posData.sel_cartgoods += `${item.rec_id},`
            });
        });
        posData.sel_cartgoods = posData.sel_cartgoods.substring(0,posData.sel_cartgoods.length - 1)
        return request({
            url:'wxapp.php?page=flow&action=cartDone',
            data:posData
        })
    })
    .then(res => {
        if(res.data.message === '收货人信息不完整'){
            // Vue.$vux.toast.text('请先添加收货地址')
            Vue.$vux.confirm.show({
                content:'你还没有添加收货地址，是否前往添加？',
                onConfirm () {
                    location.href=`http://${location.host}/#/personal/addAddress`
                }
            })
            return;
        }
        let _log_id = res.data.data.orders.log_id;
        return request({
            url:'wxapp.php?page=wxpay&action=wechatpay',
            data:{
                log_id:_log_id
            }
        })
    })
    .then(res => {
        let _logid = res.data.data.log_id
        let _orderid = res.data.data.order_id
        function onBridgeReady(){
            WeixinJSBridge.invoke(
               'getBrandWCPayRequest', {
                  "appId":res.data.data.appId,     //公众号名称，由商户传入     
                  "timeStamp":res.data.data.timeStamp,         //时间戳，自1970年以来的秒数     
                  "nonceStr":res.data.data.nonceStr, //随机串     
                  "package":res.data.data.package,     
                  "signType":res.data.data.signType,         //微信签名方式：     
                  "paySign":res.data.data.paySign //微信签名 
               },
               function(res){
               if(res.err_msg == "get_brand_wcpay_request:ok" ){
                    // 支付完成修改订单状态
                    request({
                        url:'wxapp.php?page=flow&action=xcxpayDone',
                        data:{
                            log_id:_logid,
                            isorder:'1'
                        }
                    })
                    .then(res => {
                        if(res.status == 200){
                            if(paySuccess)paySuccess(res);
                            return;
                        }
                        Vue.$vux.toast.text(res.data.message)
                    })
               }else{
                    if(payError)payError(res)
                    request({
                        url:'wxapp.php?page=flow&action=payFalseToDeleteOrder',
                        data:{
                            order_id : _orderid
                        }
                    }).then(res => {
                        return;
                    })
               } 
            }); 
         }
        //  alert(JSON.stringify(WeixinJSBridge))
         if (typeof WeixinJSBridge == "undefined"){
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
         }else{
            onBridgeReady();
         }
    })
}
