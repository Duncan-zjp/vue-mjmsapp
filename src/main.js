// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import qs from 'qs'
import request from '@/util/request'
import {GetRequest} from '@/util/other'







// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper);



// 引入public.less
import './assets/css/public.less'


// 全局注册vux组件
import { Flexbox,FlexboxItem,ViewBox,Swiper,XImg,XInput,XHeader,Group,Checklist,CheckIcon,Actionsheet,Popup,XDialog,Divider,XTextarea } from 'vux'
import {XSwitch} from 'vux'
Vue.component('flex-box', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('view-box', ViewBox)
Vue.component('swiper', Swiper)
Vue.component('x-img', XImg)
Vue.component('x-input', XInput)
Vue.component('x-header', XHeader)
Vue.component('group', Group)
Vue.component('checklist', Checklist)
Vue.component('check-icon', CheckIcon)
Vue.component('actionsheet', Actionsheet)
Vue.component('popup', Popup)
Vue.component('x-dialog', XDialog)
Vue.component('divider', Divider)
Vue.component('x-textarea', XTextarea)
Vue.component('x-switch', XSwitch)

// vux插件
import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin, {position: 'middle'})
import  { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)

// framework7 组件库
// import Framework7 from 'framework7';
// import Framework7Vue from 'framework7-vue';

// Vue.use(Framework7Vue, Framework7);


// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.5,
  error: require('./assets/images/mjms_ico.jpg'),
  loading: require('./assets/images/loading2.gif'),
  attempt: 1,
  throttleWait:400
})

// rem配置
import remConfig from './config/rem'
remConfig()




// 动态设置页面title
import vueWechatTitle from 'vue-wechat-title'
Vue.use(vueWechatTitle)

router.beforeEach((to,from,next) => {
  window.scroll(0, 0);
  if(to.meta.title){
    document.title = to.meta.title
  }

  const agent = navigator.userAgent
  const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  // XXX: 修复iOS版微信HTML5 History兼容性问题
  // alert(to.path)
  if (isiOS && to.path !== location.pathname) {
    // 此处不可使用location.replace
    // alert('这是ios')
    // alert(`to.path${to.path }`)
    // alert(`location.pathname${location.pathname }`)
    next()
    // location.assign(location.href)
  } else {
    next()
  }

})


// 上拉下拉
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)


// 微信jssdk
import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)

// 复制粘贴板
import VueClipboards from 'vue-clipboards';
 
Vue.use(VueClipboards);







Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({ 
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
