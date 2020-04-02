import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/layout/layout'
import pageLayout from '@/views/layout/pageLayout'

Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {path:'/404',name:'404',component:()=>import('@/views/404/404'),mata:{title:'404'}},
    {
      path: '',
      name: 'index',
      component:layout,
      redirect:'/index',
      children:[
        {
          path:'index',
          component: () => import('@/views/index/index'),
          meta:{title:'首页'}
        }
      ]
    },
    {
      path: '/classification',
      name: 'classification',
      component:layout,
      redirect:'/classification/index',
      children:[
        {
          path:'index',
          component: () => import('@/views/classification/index'),
          meta:{title:'分类'}
        },
        {
          path:'info',
          name:'classinfo',
          component: () => import('@/views/classification/info'),
          meta:{title:'列表'}
        }
      ]
    },
    {
      path: '/travel',
      name: 'travel',
      component:layout,
      redirect:'/travel/index',
      children:[
        {
          path:'index',
          component: () => import('@/views/travel/index'),
          meta:{title:'轻记'}
        }
      ]
    },
    {
      path:'/travel/travelShow',
      name:'travelShow',
      component:pageLayout,
      component: () => import('@/views/travelShow/travelShow'),
      meta:{title:'游记详情'}
    },
    {
      path:'/travel/album',
      name:'travelAlbum',
      component:pageLayout,
      component: () => import('@/views/travelAlbum/travelAlbum'),
      meta:{title:'游记相册'}
    },
    {
      path:'/travel/write',
      name:'travelWrite',
      component:pageLayout,
      component: () => import('@/views/travelWrite/travelWrite'),
      meta:{title:'写游记'}
    },
    {
      path: '/specialty',
      name: 'specialty',
      component:layout,
      redirect:'/specialty/index',
      children:[
        {
          path:'index',
          component: () => import('@/views/specialty/index'),
          meta:{title:'土特产'}
        }
      ]
    },
    {
      path: '/personal',
      name: 'personal',
      component:layout,
      redirect:'/personal/index',
      children:[
        {
          path:'index',
          component: () => import('@/views/personal/index'),
          meta:{title:'我的'}
        },
      ]
    },
    {
      name:'personalTravel',
      path:'/personal/travel',
      component: () => import('@/views/personalTravel/list'),
      meta:{title:'我的游记'}
    },
    {
      name:'personalAlbum',
      path:'/personal/album',
      component: () => import('@/views/personalAlbum/index'),
      meta:{title:'我的相册'}
    },
    {
      name:'personalAccount',
      path:'/personal/account',
      component: () => import('@/views/personalAccount/index'),
      meta:{title:'账户'}
    },
    {
      name:'personalLevel',
      path:'/personal/level',
      component: () => import('@/views/personalLevel/index'),
      meta:{title:'等级说明'}
    },
    {
      name:'personalSetting',
      path:'/personal/setting',
      component: () => import('@/views/personalSetting/index'),
      meta:{title:'个人中心设置'}
    },
    {
      name:'personalAddress',
      path:'/personal/address',
      component: () => import('@/views/personalAddress/index'),
      meta:{title:'收货地址管理'}
    },
    {
      name:'addAddress',
      path:'/personal/addAddress',
      component: () => import('@/views/addAddress/index'),
      meta:{title:'添加/修改收货地址'}
    },
    {
      name:'personalCollection',
      path:'/personal/collection',
      component: () => import('@/views/personalCollection/index'),
      meta:{title:'我的收藏'}
    },
    {
      name:'personalPeople',
      path:'/personal/people',
      component: () => import('@/views/personalPeople/index'),
      meta:{title:'常用联系人'}
    },
    {
      name:'personalPeopleSet',
      path:'/personal/peopleSet',
      component: () => import('@/views/personalPeopleSet/index'),
      meta:{title:'添加/编辑联系人'}
    },
    {
      name:'personalCoupon',
      path:'/personal/coupon',
      component: () => import('@/views/personalCoupon/index'),
      meta:{title:'优惠劵'}
    },
    {
      name:'personalFeedBack',
      path:'/personal/feedBack',
      component: () => import('@/views/personalFeedBack/index'),
      meta:{title:'投诉反馈'}
    },
    {
      path: '/group',
      name: 'group',
      component:pageLayout,
      redirect:'/group/list',
      children:[
        {
          path:'list',
          name:'groupList',
          component: () => import('@/views/groupList/list'),
          meta:{title:'团购列表'}
        },
        {
          path:'show',
          name:'groupShow',
          component: () => import('@/views/groupShow/show'),
          meta:{title:'活动详情'}
        },
        {
          path:'sign',
          name:'groupSign',
          component: () => import('@/views/groupSignUp/index'),
          meta:{title:'填写报名信息'}
        },
        {
          path:'start',
          name:'groupStart',
          component: () => import('@/views/startGroup/index'),
          meta:{title:'开团'}
        },
        {
          path:'people',
          name:'groupPeople',
          component: () => import('@/views/groupPeople/index'),
          meta:{title:'已参团的人'}
        }
      ]
    },
    {
      path: '/product',
      name: 'product',
      component:pageLayout,
      redirect:'/404',
      children:[
        {
          path:'show',
          name:'productShow',
          component: () => import('@/views/productShow/show'),
          meta:{title:'产品详情'}
        }
      ]
    },
    {
      path: '/distribution',
      name: 'distribution',
      component:pageLayout,
      redirect:'/distribution/index',
      children:[
        {
          path:'index',
          component: () => import('@/views/distribution/index'),
          meta:{title:'分销中心'}
        },
        {
          path:'proxy',
          name:'distributionProxy',
          component: () => import('@/views/distribution/proxy'),
          meta:{title:'分享收益'}
        },
        {
          path:'withdrawList',
          name:'withdrawList',
          component: () => import('@/views/distribution/withdrawList'),
          meta:{title:'提现记录'}
        },
        {
          path:'withdrawShow',
          name:'withdrawShow',
          component: () => import('@/views/distribution/withdrawShow'),
          meta:{title:'提现详情'}
        },
        {
          path:'shareIncome',
          name:'shareIncome',
          component: () => import('@/views/distribution/shareIncome'),
          meta:{title:'分享收益'}
        },
        {
          path:'incomeDetails',
          name:'incomeDetails',
          component: () => import('@/views/distribution/incomeDetails'),
          meta:{title:'收益详情'}
        },
      ]
    },
    {
      path:'/buyCar',
      name:'buyCar',
      component: () => import('@/views/buyCar/index'),
      meta:{title:'购物车'}
    },
    {
      path: '/order',
      name: 'order',
      component:pageLayout,
      redirect:'/404',
      children:[
        {
          path:'list',
          name:'orderList',
          component: () => import('@/views/order/list'),
          meta:{title:'我的订单'}
        },
        {
          path:'show',
          name:'orderShow',
          component: () => import('@/views/order/index'),
          meta:{title:'订单详情'}
        },
        {
          path:'activityKnow',
          name:'activityKnow',
          component: () => import('@/views/order/activityKnow'),
          meta:{title:'活动须知'}
        },
        {
          path:'activeEndorse',
          name:'activeEndorse',
          component: () => import('@/views/order/endorse'),
          meta:{title:'活动改签'}
        },
        {
          path:'specialty',
          name:'specialtyOrder',
          component: () => import('@/views/order/specialty'),
          meta:{title:'订单详情'}
        },
        {
          path:'comments',
          name:'orderComments',
          component: () => import('@/views/order/comments'),
          meta:{title:'写评论'}
        },
      ]
    },
    {
      path: '/team',
      component:pageLayout,
      redirect:'/404',
      children:[
        {
          path:'index',
          name:'teamDiy',
          component: () => import('@/views/teamDiy/index'),
          meta:{title:'团队定制'}
        },
        {
          path:'list',
          name:'teamList',
          component: () => import('@/views/teamList/list'),
          meta:{title:'团队定制'}
        },
        {
          path:'show',
          name:'teamShow',
          component: () => import('@/views/teamShow/show'),
          meta:{title:'团队定制详情'}
        },
        {
          path:'case',
          name:'teamCaseList',
          component: () => import('@/views/teamCaseList/list'),
          meta:{title:'活动案例'}
        },
      ]
    },
    {
      path:'/userPersonal',
      component:pageLayout,
      redirect:'/404',
      children:[
        {
          path:'index',
          name:'userPersonalIndex',
          component: () => import('@/views/userPersonal/index'),
          meta:{title:'他/她的个人主页'}
        },
        {
          path:'photo',
          name:'userPersonalPhoto',
          component: () => import('@/views/userPersonalPhoto/index'),
          meta:{title:'个人相册'}
        },
      ]
    },
    {
      path:'/pinGroup',
      component:pageLayout,
      redirect:'/404',
      children:[
        {
          path:'detail',
          name:'pinGroupDetail',
          component: () => import('@/views/pinGroupDetail/index'),
          meta:{title:'拼团详情'}
        }
      ]
    },
    {
      path:'/integral',
      component:pageLayout,
      redirect:'/404',
      children:[
        {
          path:'detail',
          name:'integralDetail',
          component: () => import('@/views/integralDetail/index'),
          meta:{title:'积分详情'}
        },
        {
          path:'buy',
          name:'integralBuy',
          component: () => import('@/views/integralBuy/index'),
          meta:{title:'积分换购'}
        },
        {
          path:'show',
          name:'integralShow',
          component: () => import('@/views/integralProductShow/index'),
          meta:{title:'积分商品详情'}
        },
        {
          path:'Calculation',
          name:'IntegralCalculation',
          component: () => import('@/views/IntegralCalculation/index'),
          meta:{title:'结算'}
        },
      ]
    },
    {
      path:'/uvip',
      component:pageLayout,
      redirect:'/404',
      children:[
        {
          path:'detail',
          name:'uvipDetail',
          component: () => import('@/views/uvipDetail/index'),
          meta:{title:'会员权益'}
        }
      ]
    },
    {
      path:'/usignIn',
      component:pageLayout,
      redirect:'/404',
      children:[
        {
          path:'detail',
          name:'usignInDetail',
          component: () => import('@/views/usignIn/index'),
          meta:{title:'每日签到'}
        }
      ]
    },
  ]
})


