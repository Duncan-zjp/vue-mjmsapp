<template>
  <div id="app" v-if="isLogin">
    <router-view/>
  </div>
</template>

<script>
import {login} from '@/api/login'
import request from '@/util/request'
import List from '@/config/wxApiList'
import {GetRequest,setUrl} from '@/util/other'
export default {
  name: 'App',
  data(){
    return{
      // isLogin:false
      isLogin:true
    }
  },
  created() {
    // let vm = this;
    // login(userdata => {
    //   let _href = location.href;
    //   this.isLogin = true
    //   if(history.replaceState) {
    //     // alert('支持urlreplace')
    //     // alert(`登陆成功之后的uri ${_href}`)
    //     if(_href.indexOf('STATE') != -1){
    //       history.replaceState(null, null,_href.split('?')[0] + _href.split('STATE')[1]);        
    //     }
    //     if(_href.indexOf('?from') != -1){
    //       history.replaceState(null, null,_href.split('?from')[0] + '#'+ _href.split('#/')[1]);        
    //     }
    //     //配置 jsapi
    //     request({
    //         url:'wxapp.php?page=wxpay&action=getWXPayInfo',
    //         data:{
    //             url:location.href.split('#')[0]
    //         }
    //     })
    //     .then(res2 => {
    //         this.$wechat.config({
    //             debug:false,
    //             appId:res2.data.data.appId,
    //             timestamp:res2.data.data.timestamp,
    //             nonceStr:res2.data.data.nonceStr,
    //             signature:res2.data.data.js_sign,
    //             jsApiList:List
    //         })
    //     })
    //   }

    // })

    
  },
}
</script>





