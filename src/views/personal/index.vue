<template>
    <div class="personal container">
        <header class="personal_header">
            <img class="personal_header_bg" src="http://shop.cnmjms.com/mobile/apptest/images/user_bg.jpg" alt="">
            <div class="headerBox">
                <!-- <div class="head"><img :src="userData?userData.headimg:''" alt=""></div>
                <div class="username">{{userData?userData.user_name:''}}</div>
                <div class="level">
                    <span>
                        <small>{{userData?userData.rank_name:''}} | 学分 {{userData?userData.rank_points:''}}</small>
                    </span>
                </div> -->

                <div class="head">
                    <img :src="userData.headimg" alt="">
                    <div class="msg">
                        <div class="username">{{userData?userData.user_name:''}}</div>
                        <div class="isvip">{{userData.account_role}}</div>
                        <div class="integral">积分：{{userData.rank_points}}</div>
                    </div>
                </div>
                
                <div class="sigoInBtn" @click="signFn"></div>
                
            </div>
            <router-link class="iconfont personalSettingIco" :to="{name:'personalSetting'}" tag="div">&#xe63b;</router-link>
        </header>

        <div class="personal_main">

            <!-- <div class="personal_options">
                <router-link :to="{name:'personalAlbum'}" tag="div" class="item album">
                    <span class="iconfont">&#xe67a;</span>
                    <span>相册</span>
                </router-link>
                
                
                <router-link :to="{name:'personalTravel'}" tag="div" class="item travel">
                    <span class="iconfont">&#xe636;</span>
                    <span>游记</span>
                </router-link>
                <router-link :to="{name:'distributionProxy'}" tag="div" class="item account">
                    <span class="iconfont">&#xe688;</span>
                    <span>分销</span>
                </router-link>
                <router-link :to="{name:'personalLevel'}" tag="div" class="item grade">
                    <span class="iconfont">&#xe600;</span>
                    <span>等级</span>
                </router-link>
            </div> -->

            <!-- <tab class="personal_order_tab" v-model="personalOrderIndex" :line-width="1" custom-bar-width="0.5rem">
                <tab-item @on-item-click="personalOrderSelect" class="personal_order_tab_item" active-class="personal_order_tab_item_active">已报名</tab-item>
                <tab-item @on-item-click="personalOrderSelect" class="personal_order_tab_item" active-class="personal_order_tab_item_active">已结束</tab-item>
                <tab-item @on-item-click="personalOrderSelect" class="personal_order_tab_item" active-class="personal_order_tab_item_active">已退出</tab-item>
                <tab-item @on-item-click="personalOrderSelect" class="personal_order_tab_item" active-class="personal_order_tab_item_active">商品订单</tab-item>
            </tab> -->

            <!-- <swiper :options="personalOrderOption" ref="personalOrderSwiper">
                <swiper-slide v-for="(order, i) in 4" :key="i">
                    <div class="orderList">
                        <ul>
                            <li v-for="(item, index) in list" :key="index">
                                <div class="pic">
                                    <img v-lazy="item.goods_list[0].goods_thumb" alt="">
                                </div>
                                <div class="content">
                                    <div class="title">{{item.goods_list[0].goods_name}}</div>
                                    <div class="time">{{item.goods_list[0].start_time}}</div>
                                    <div class="add">集合点：{{item.goods_list[0].place}}</div>
                                   
                                    <div class="btns" v-if="personalOrderIndex == 3">
                                        <router-link :to="{name:'specialtyOrder',query:{id:item.order_id}}" tag="span">订单详情</router-link>
                                    </div>
                                    <div class="btns" v-else>
                                        <router-link :to="{name:'activityKnow',query:{id:item.goods_list[0].goods_id,groupid:item.group_id}}" tag="span">活动须知</router-link>
                                        <router-link :to="{name:'orderShow',query:{id:item.order_id}}" tag="span">订单详情</router-link>
                                        <router-link :to="{name:'activeEndorse',query:{id:item.order_id}}" tag="span">改签/退出</router-link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </swiper-slide>
            </swiper> -->
        </div>

        <!-- <none v-if="noDataShow" /> -->

        <div class="order_option">
            <p>
                <span>我的订单</span>
                <!-- <router-link :to="{name:'orderList',query:{id:0}}" tag="small">我参加的所有活动 ></router-link> -->
            </p>
            <ul>
                <router-link :to="{name:'orderList',query:{id:0}}" tag="li">
                    <i class="iconfont">&#xe63d;</i>
                    <span>已报名</span>
                </router-link>
                <router-link :to="{name:'orderList',query:{id:1}}" tag="li">
                    <i class="iconfont">&#xe627;</i>
                    <span>已结束</span>
                </router-link>
                <router-link :to="{name:'orderList',query:{id:2}}" tag="li">
                    <i class="iconfont">&#xe68c;</i>
                    <span>已退出</span>
                </router-link>
                <router-link :to="{name:'orderList',query:{id:3}}" tag="li">
                    <i class="iconfont">&#xe663;</i>
                    <span>商品订单</span>
                </router-link>
            </ul>
        </div>

        <div class="order_option">
            <p>
                <span>我的钱包</span>
                <!-- <router-link :to="{name:'orderList',query:{id:0}}" tag="small">我参加的所有活动 ></router-link> -->
            </p>
            <ul>
                <router-link :to="{name:'integralDetail'}" tag="li">
                    <i class="iconfont">&#xe64b;</i>
                    <span>积分详情</span>
                </router-link>
                <router-link :to="{name:'uvipDetail'}" tag="li">
                    <i class="iconfont">&#xe639;</i>
                    <span>会员权益</span>
                </router-link>
                <!-- <router-link :to="{name:'integralBuy'}" tag="li">
                    <i class="iconfont">&#xe648;</i>
                    <span>积分换购</span>
                </router-link> -->
                <router-link :to="{name:'distributionProxy'}" tag="li">
                    <i class="iconfont">&#xe60e;</i>
                    <span>我的返利</span>
                </router-link>
            </ul>
        </div>

        <div class="order_option">
            <p>
                <span>更多服务</span>
                <!-- <router-link :to="{name:'orderList',query:{id:0}}" tag="small">我参加的所有活动 ></router-link> -->
            </p>
            <ul>
                <router-link :to="{name:'usignInDetail'}" tag="li">
                    <i class="iconfont">&#xe6b8;</i>
                    <span>我的签到</span>
                </router-link>
                <router-link :to="{name:'personalTravel'}" tag="li">
                    <i class="iconfont">&#xe636;</i>
                    <span>我的游记</span>
                </router-link>
                <!-- <router-link :to="{name:'personalCollection'}" tag="li">
                    <i class="iconfont">&#xe62e;</i>
                    <span>收藏夹</span>
                </router-link>
                <router-link :to="{name:'personalCoupon'}" tag="li">
                    <i class="iconfont">&#xe61d;</i>
                    <span>优惠劵</span>
                </router-link>
                <router-link :to="{name:'teamDiy'}" tag="li">
                    <i class="iconfont">&#xe653;</i>
                    <span>团队服务</span>
                </router-link>
                <router-link :to="{name:'personalFeedBack'}" tag="li">
                    <i class="iconfont">&#xe67b;</i>
                    <span>投诉反馈</span>
                </router-link> -->
                <router-link :to="{name:'personalAddress'}" tag="li">
                    <i class="iconfont">&#xe6b5;</i>
                    <span>收货地址</span>
                </router-link>
            </ul>
        </div>
        
        <!-- <div class="public_top">
            <span>更多服务</span>
        </div>

        <div class="order_more">
            <ul>
                <router-link :to="{name:'teamDiy'}" tag="li">
                    <i class="iconfont" style="color:#8CC5F4;">&#xe653;</i>
                    <span>团队服务</span>
                </router-link>
                <router-link :to="{name:'personalCoupon'}" tag="li">
                    <i class="iconfont" style="color:#8CC5F4;">&#xe653;</i>
                    <span>优惠劵</span>
                </router-link>
                <router-link :to="{name:'personalFeedBack'}" tag="li">
                    <i class="iconfont" style="color:#8CC5F4;">&#xe653;</i>
                    <span>投诉反馈</span>
                </router-link>
            </ul>
        </div> -->


        <!-- 热门推荐 -->
        <hotProduct />
        <!-- 热门推荐 end -->
    </div>
</template>

<script>
    import { Tab, TabItem } from 'vux'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import {list} from '@/api/order'
    import {getUserData,signin} from '@/api/other'
    import {scrollBottom,scrollOption} from '@/util/other'
    import none from '@/components/noAnyData/none'
    import hotProduct from '@/components/hotProduct/hotProduct'
    let vm = null;
    // 底部内容swiper配置
    const personalOrderOption = {
        autoplay:false,
        on:{
            slideChangeTransitionStart:function(e){
                vm.personalOrderIndex = this.activeIndex
                vm.page = 1
                vm.list = []
                vm.noDataShow = false
                vm.orderType(vm.personalOrderIndex)
                vm.getOrder()
            }
        }
    }
    
    export default{
        components:{
            Tab,TabItem,swiper,swiperSlide,none,hotProduct
        },
        data(){
            return{
                // 订单tab的index
                personalOrderIndex:0,
                personalOrderOption:personalOrderOption,
                // 订单类型
                orderid:'201',
                // 分页
                page:1,
                // 订单数据
                list:[],
                noDataShow:false,
                // 用户数据
                userData:{}
            }
        },
         created() {
            vm = this
        },
        methods:{
            personalOrderSelect(e){
                // 重置页数,数据
                this.orderType(this.personalOrderIndex)
                this.page = 1
                this.list = []
                this.noDataShow = false
                this.getOrder()
                this.$refs.personalOrderSwiper.swiper.slideTo(e, 300, false)
            },
            // 获取订单列表
            getOrder(){
                list(this.orderid,this.page).then(res => {
                    if(res.status == 200){
                        if(res.data.data.length < 1){
                            this.page = this.page - 1;
                            this.noDataShow = true
                        }
                        res.data.data.forEach(item => {
                            this.list.push(item)
                        });
                    }
                })
            },
            // 设置不同的订单类型
            orderType(val){
                let _orderid = ''
                switch (val) {
                    case 0:
                    this.orderid = '201'
                    break;
                    case 1:
                    this.orderid = '202'
                    break;
                    case 2:
                    this.orderid = '203'
                    break;
                    case 3:
                    this.orderid = ''
                    break;
                }
            },
            // 获取用户信息
            getUserData(){
                getUserData().then(res => {
                    if(res.status == 200){
                        this.userData = res.data.data
                    }
                })
            },
            // 签到
            signFn(){
                signin().then(res => {
                    if(res.status == 200){
                        this.$vux.toast.text('签到成功')
                        this.getUserData()
                    }else{
                        this.$vux.toast.text(res.data.message)
                    }
                })
            },
            scroll(){
                if(scrollOption.getScrollTop() + scrollOption.getWindowHeight() == scrollOption.getScrollHeight()){
                    console.log('滚动到底部')
                    this.page = this.page + 1;
                    this.getOrder()
                }
            },
        },
        created() {
            vm = this;
            this.getOrder();
            // let _userData = JSON.parse(window.localStorage.getItem('appUser'));
            // this.userData =_userData
            this.getUserData()
        },
        mounted(){
            window.addEventListener('scroll',this.scroll)
        },
         beforeDestroy(){
            window.removeEventListener('scroll',this.scroll)
        }
    }
</script>

<style lang="less">
.personal{
    width:100%;
    overflow: hidden;
    min-height:calc(100vh);

    .public_top{
        .flex;
        justify-content:space-between;
        padding:.1rem .2rem;
        border-bottom:.01rem solid #ccc;
        align-items:center;

        span{
            font-size:.32rem;
            color:@theme;
        }
    }
}
.personal_header{
    width:100%;
    position: relative;
    text-align:center;
}
.personal_header_bg{
    max-width:100%;
    height:auto;
}
.personalSettingIco{
    font-size:0.6rem !important;
    color:#fff;
    position:absolute;
    top:0.2rem;
    right:0.2rem;
}
.headerBox{
    .boxSizing;
    width:100%;
    height:100%;
    position:absolute;
    left:0;
    top:0;
    .flex;
    justify-content:space-between;
    flex-wrap:wrap;
    align-content:center;
    align-items:center;
    padding:0 .6rem;
    // div{
    //     width:100%;
    //     font-size:0.32rem;
    //     color:#fff;
    //     text-align:center;
    // }
    .head{
        .flex;
        align-items:center;
        justify-content:center;
    }
    .head img{
        width:1.3rem;
        height:1.3rem;
        .borderRadius(1.3rem)
    }
    .head .msg{
        padding-left:.2rem;
        *{
            color:#fff;
            font-size:.28rem;
        }
    }
    .sigoInBtn{
        .btn(1.83rem,.615rem,none,.28rem,#fff,.6rem);
        // background-color:@theme;
        background-image:url(http://shop.cnmjms.com/mobile/apptest/images/signIn_bg.png);
        background-size:100% 100%;
    }
    .level span{
        display:block;
        text-align:center;
    }
    .level span small{
        display:inline-block;
        background:rgba(0,0,0,.6);
        font-size:0.28rem;
        color:#fff;
        .borderRadius(.4rem);
        padding:0.1rem 0.2rem;
    }
}
.personal_options{
    .flex;
    justify-content:flex-start;
    align-content:center;
    flex-wrap:wrap;
    padding:0.1rem 0;
    .item{
        width:25%;
        text-align:center;
    }
    .iconfont{
        font-size:0.8rem !important;
    }
    .item span{
        font-size:0.24rem;
        display:block;
        width:100%;
    }
    .album .iconfont{
        color:rgb(114,214,167)
    }
    .grade .iconfont{
        color:rgb(216,140,244)
    }
    .account .iconfont{
        color:rgb(250,181,32)
    }
    .travel .iconfont{
        color:rgb(42,208,244)
    }
    .travel{
        margin-bottom:0;
    }
    
}
.orderList{
    padding:.2rem .15rem;
    ul li{
        background:#ccc;
        .flex;
        padding:.15rem .15rem .05rem;
        .borderRadius(.3rem);
        margin-top:.15rem;
    }
    ul li:first-child{
        margin-top:0;
    }
    ul li .pic{
        width:2.3rem;
        height:2rem;
        overflow: hidden;
        img{
            .imgCenter;
        }
    }
    ul li .content{
        width:4.3rem;
        margin-left:.15rem;
        .title,.time,.add{
            font-size:.28rem;
            margin:.05rem 0;
        }
    }
    ul li .btns{
        width:100%;
        .flex;
        justify-content:space-between;
        margin-top:.1rem;
        span{
            .btn(28%,.4rem,none,.24rem,@theme,.4rem);
            border:0.01rem solid @theme;
            padding:.1rem;
        }
    }
}

.personal{
    .order_option{
        padding:0 .2rem;
        margin-top:.2rem;

        p{
            .flex;
            justify-content:space-between;
            padding:.1rem 0;
            // border-bottom:.01rem solid #ccc;
            align-items:center;

            span{
                font-size:.32rem;
                color:@theme;
            }
            small{
                font-size:.28rem;
                color:#999999;
            }
        }

        ul{
            overflow: hidden;
        }
        ul li{
            width:25%;
            text-align:center;
            padding:.1rem 0;
            float:left;
        }
        ul li *{
            display:block;
        }
        ul li i{
            font-size:.5rem;
            color:@theme;
        }
        ul li span{
            font-size:.28rem;
            margin-top:.15rem;
        }
    }
    


    

    .order_more{
        padding:.2rem .2rem 0;
        
        ul{
            overflow: hidden;
        }
        ul li{
            width:25%;
            float:left;
        }
        ul li *{
            display:block;
            text-align:center;
        }
        ul li i{
            font-size:.5rem;
        }
        ul li span{
            font-size:.28rem;
            margin-top:.1rem;
        }
    }
}
</style>

