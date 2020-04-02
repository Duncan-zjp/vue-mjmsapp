import Vue from 'vue'
import request from '@/util/request'


export function pay(data,paySuccess,payError){
    return request({
        url : 'wxapp.php?page=flow&action=cartDone',
        data:data
    })
    .then(res => {
        if(res.status != 200){
            Vue.$vux.toast.text(res.data.message)
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