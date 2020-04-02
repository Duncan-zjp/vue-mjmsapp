<template>
    <div class="travel" ref="travel">
        <!-- 精选游记 -->
        <div class="good_travel">
            <swiper class="good_travel_wrap" :options="swiperOption">
                <swiper-slide v-for="(item, index) in good_travelList" :key="index">
                    <router-link class="good_travel_item" :to="{name:'travelShow',query:{id:item.id}}" tag="div">
                        <div class="pic">
                            <img v-lazy="item.cover_img" alt="">
                        </div>
                        <div class="msg">
                            <div class="title">{{item.title}}</div>
                            <div class="user">
                                <img :src="item.headimg" alt="">
                                <span>{{item.user_name}}</span>
                            </div>
                        </div>
                    </router-link>
                </swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
        <!-- 精选游记 end -->

        <!-- 下面内容 -->
        <div :class="`travel_content ${travelFixed?'travel_content_fixed':''}`" ref="travel_content">
            <div class="travel_content_top">
                <tab class="travel_content_tab" v-model="travelContentIndex" :line-width="1" custom-bar-width="0.5rem">
                    <!-- <tab-item class="travel_content_tab_item" active-class="travel_content_tab_item_active" v-for="(item,index) in travelList" :key="index" @on-item-click="activitySelect">{{item.class}}</tab-item> -->
                    <tab-item class="travel_content_tab_item" active-class="travel_content_tab_item_active" @on-item-click="activitySelect(0)">全部</tab-item>
                    <tab-item class="travel_content_tab_item" active-class="travel_content_tab_item_active" @on-item-click="activitySelect(1)">推荐</tab-item>
                </tab>
                <div :class="`travel_search ${isSearch?'travel_search_open':''}`">
                    <span @click="open_travel_search" class="iconfont search_ico">&#xe693;</span>
                    <input type="text" placeholder="青输入关键词搜索">
                    <span @click="close_travel_search">取消</span>
                </div>
            </div>

            <div class="travel_content_wrap">
                <swiper :options="traveSwiperOption" ref="traveSwiper">
                    <swiper-slide v-for="(item, index) in 2" :key="index">
                        <div class="travel_list">
                            <ul>
                                <router-link class="travelItem" :to="{name:'travelShow',query:{id:item2.id}}" tag="li" v-for="(item2, index2) in list" :key="index2">
                                    <div class="title">
                                        <span v-if="item2.isPos==1">精选</span>
                                        <p>{{item2.title}}</p>
                                    </div>
                                    <div class="content">
                                        <div class="content_wrap">
                                            <div class="article">
                                                <p>{{item2.introduction}}</p>
                                            </div>
                                            <div class="u">
                                                <img v-lazy="item2.headimg" alt="">
                                                <span>{{item2.user_name}}</span>
                                            </div>
                                        </div>

                                        <div class="picBox">
                                            <div class="img">
                                                <img v-lazy="item2.cover_img" alt="">
                                            </div>
                                            <div class="bt">
                                                <span class="iconfont see">&#xe65e; {{item2.click_count}}</span>
                                                <span class="iconfont like">&#xe673; {{item2.like_count}}</span>
                                                <span class="iconfont time">{{item2.time}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                                
                                <!-- 相册 -->
                                <!-- <router-link class="travelPicItem" v-if="item2.pid==2" :to="{name:'travelAlbum'}" tag="li" v-for="(item2, index2) in item.list" :key="index2">
                                    <div class="title">
                                        <span>{{item.class}}</span>
                                        <p>{{item2.title}}</p>
                                    </div>
                                    <div class="pics">
                                        <div class="l">
                                            <img v-lazy="item2.imgList[0]" alt="">
                                        </div>
                                        <div class="r">
                                            <div class="imgBox"><img v-lazy="item2.imgList[1]" alt=""></div>
                                            <div class="imgBox"><img v-lazy="item2.imgList[2]" alt=""></div>
                                        </div>
                                    </div>
                                    <div class="bt">
                                        <div><span class="iconfont">&#xe652; {{item2.address}}</span></div>
                                        <div>
                                            <span class="iconfont">&#xe65e; {{item2.seeNum}}</span>
                                            <span class="iconfont">&#xe695; {{item2.imgNum}}</span>
                                        </div>
                                    </div>
                                </router-link> -->
                                <!-- 相册 end -->
                            </ul>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
            
            <none v-if="noDataShow" />
        </div>
        <!-- 下面内容 end -->

        <router-link :to="{name:'travelWrite'}" tag="div" class="writeTravelBtn">+</router-link>
    </div>
</template>

<script>
    import { Tab, TabItem } from 'vux'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import {scrollBottom,scrollOption} from '@/util/other'
    import {indexList} from '@/api/travel'
    import none from '@/components/noAnyData/none'
    // 头部精选列表swiper配置
    const swiperOption = {
        autoplay:false,
        pagination:{
            el:'.swiper-pagination',
            bulletClass:'swiperColor',
            bulletActiveClass: 'swiperAticveColor',
        }
    }
    // 底部内容swiper配置
    const traveSwiperOption = {
        autoplay:false,
        on:{
            slideChangeTransitionStart:function(e){
                vm.travelContentIndex = this.activeIndex
                // 固定tab的时候每次滚动都回到顶部
                if(scrollOption.getScrollTop() > vm.$refs.travel_content.offsetTop){
                    document.documentElement.scrollTop=vm.$refs.travel_content.offsetTop
                }
                vm.setType(this.activeIndex)
                vm.getList()
            }
        },
        touchMoveStopPropagation:false
    }
    let vm = null
    export default{
        components:{
            Tab,TabItem,swiper,swiperSlide,none
        },
        data(){
            return{
                swiperOption:swiperOption,
                traveSwiperOption:traveSwiperOption,
                // tab当前显示
                travelContentIndex:0,
                // 列表是否固定在顶部
                travelFixed:false,
                // 是否显示搜索框
                isSearch:false,
                // 精品游记数据
                good_travelList:[
                    {
                        title:'游记标题游记标题',
                        img:'http://harbin.wanjinglvxing.top/kindeditor/attached/image/20181119/20181119200949064906.jpg',
                        userhead:require('@/assets/images/mjms_ico.jpg'),
                        nickname:'用户名字'
                    },
                    {
                        title:'游记标题游记标题',
                        img:'http://harbin.wanjinglvxing.top/kindeditor/attached/image/20181119/20181119201196799679.jpg',
                        userhead:require('@/assets/images/mjms_ico.jpg'),
                        nickname:'用户名字'
                    },
                    {
                        title:'游记标题游记标题',
                        img:'http://harbin.wanjinglvxing.top/kindeditor/attached/image/20181119/20181119201294169416.jpg',
                        userhead:require('@/assets/images/mjms_ico.jpg'),
                        nickname:'用户名字'
                    },
                    {
                        title:'游记标题游记标题',
                        img:'http://harbin.wanjinglvxing.top/kindeditor/attached/image/20181119/20181119201579777977.jpg',
                        userhead:require('@/assets/images/mjms_ico.jpg'),
                        nickname:'用户名字'
                    },
                    
                ],
                // 分类游记数据
                travelList:[
                    {
                        class:'推荐',
                        classid:0,
                        list:[
                            {
                                title:'游记标题游记标题',
                                img:'http://harbin.wanjinglvxing.top/kindeditor/attached/image/20181119/20181119201579777977.jpg',
                                userhead:require('@/assets/images/mjms_ico.jpg'),
                                nickname:'用户名字',
                                seeNum:355,
                                likeNum:66,
                                time:'3天前',
                                content:'简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
                                pid:0
                            },
                            {
                                title:'游记标题游记标题',
                                img:'http://harbin.wanjinglvxing.top/kindeditor/attached/image/20181119/20181119201579777977.jpg',
                                userhead:require('@/assets/images/mjms_ico.jpg'),
                                nickname:'用户名字',
                                seeNum:355,
                                likeNum:66,
                                time:'3天前',
                                content:'简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
                                isPos:1,
                                pid:0
                            },
                            {
                                title:'游记标题游记标题',
                                img:'http://harbin.wanjinglvxing.top/kindeditor/attached/image/20181119/20181119201579777977.jpg',
                                userhead:require('@/assets/images/mjms_ico.jpg'),
                                nickname:'用户名字',
                                seeNum:355,
                                likeNum:66,
                                time:'3天前',
                                content:'简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
                                pid:0
                            },
                            {
                                title:'游记标题游记标题',
                                img:'http://harbin.wanjinglvxing.top/kindeditor/attached/image/20181119/20181119201579777977.jpg',
                                userhead:require('@/assets/images/mjms_ico.jpg'),
                                nickname:'用户名字',
                                seeNum:355,
                                likeNum:66,
                                time:'3天前',
                                content:'简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
                                pid:0
                            },
                            {
                                title:'游记标题游记标题',
                                img:'http://harbin.wanjinglvxing.top/kindeditor/attached/image/20181119/20181119201579777977.jpg',
                                userhead:require('@/assets/images/mjms_ico.jpg'),
                                nickname:'用户名字',
                                seeNum:355,
                                likeNum:66,
                                time:'3天前',
                                content:'简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
                                pid:0
                            },
                            {
                                title:'游记标题游记标题',
                                img:'http://harbin.wanjinglvxing.top/kindeditor/attached/image/20181119/20181119201579777977.jpg',
                                userhead:require('@/assets/images/mjms_ico.jpg'),
                                nickname:'用户名字',
                                seeNum:355,
                                likeNum:66,
                                time:'3天前',
                                content:'简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
                                pid:0
                            },
                            {
                                title:'游记标题游记标题',
                                imgList:[
                                    'http://harbin.wanjinglvxing.top/kindeditor/attached/image/20181119/20181119201579777977.jpg',
                                    'http://harbin.wanjinglvxing.top/kindeditor/attached/image/20181119/20181119201579777977.jpg',
                                    'http://harbin.wanjinglvxing.top/kindeditor/attached/image/20181119/20181119201579777977.jpg'
                                ],
                                imgNum:154,
                                userhead:require('@/assets/images/mjms_ico.jpg'),
                                nickname:'用户名字',
                                seeNum:355,
                                address:'土耳其',
                                pid:2
                            },
                        ]
                    },
                    {
                        class:'游记',
                        classid:1,
                        list:[
                            {
                                title:'游记标题游记标题',
                                img:'http://harbin.wanjinglvxing.top/kindeditor/attached/image/20181119/20181119201579777977.jpg',
                                userhead:require('@/assets/images/mjms_ico.jpg'),
                                nickname:'用户名字',
                                seeNum:355,
                                likeNum:66,
                                time:'3天前',
                                content:'简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
                                pid:1
                            }
                        ]
                    },
                    {
                        class:'相册',
                        classid:2,
                        list:[
                            {
                                title:'游记标题游记标题',
                                imgList:[
                                    'http://harbin.wanjinglvxing.top/kindeditor/attached/image/20181119/20181119201579777977.jpg',
                                    'http://harbin.wanjinglvxing.top/kindeditor/attached/image/20181119/20181119201579777977.jpg',
                                    'http://harbin.wanjinglvxing.top/kindeditor/attached/image/20181119/20181119201579777977.jpg'
                                ],
                                imgNum:154,
                                userhead:require('@/assets/images/mjms_ico.jpg'),
                                nickname:'用户名字',
                                seeNum:355,
                                address:'土耳其',
                                pid:2
                            },
                            {
                                title:'游记标题游记标题',
                                imgList:[
                                    'http://harbin.wanjinglvxing.top/kindeditor/attached/image/20181119/20181119201579777977.jpg',
                                    'http://harbin.wanjinglvxing.top/kindeditor/attached/image/20181119/20181119201579777977.jpg',
                                    'http://harbin.wanjinglvxing.top/kindeditor/attached/image/20181119/20181119201579777977.jpg'
                                ],
                                imgNum:154,
                                userhead:require('@/assets/images/mjms_ico.jpg'),
                                nickname:'用户名字',
                                seeNum:355,
                                address:'土耳其',
                                pid:2
                            },
                        ]
                    },
                ],
                page:1,
                list:[],
                noDataShow:false,
                type:'100'
            }
        },
        compoted:{
            swiper() {
                return this.$refs.traveSwiper.swiper
            }
        },
        methods:{
            activitySelect(i){
                this.$refs.traveSwiper.swiper.slideTo(i, 300, false)
                this.setType(i)
                this.getList()
            },
            open_travel_search(){
                this.isSearch = true
            },
            close_travel_search(){
                this.isSearch = false
            },
            scroll(){
                //     固定游记tab
                if(scrollOption.getScrollTop() > this.$refs.travel_content.offsetTop){
                    this.travelFixed = true
                }else{
                    this.travelFixed = false
                }

                if(scrollOption.getScrollTop() + scrollOption.getWindowHeight() == scrollOption.getScrollHeight()){
                    console.log('滚动到底部')
                    this.page = this.page + 1;
                    this.getList()
                }
            },
            // 获取数据
            getList(){
                indexList(this.type,this.page).then(res => {
                    this.noDataShow = false
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
            // 根据滑动的index改变获取游记的类型
            setType(i){
                // 重置页数
                this.page = 1
                // 重置数据
                this.list = []
                this.noDataShow = false
                if(i == 0){
                    this.type = '100'
                }
                if(i == 1){
                    this.type = '101'
                }
            },
            // 获取顶部推荐
            getPosList(){
                indexList('102',1).then(res => {
                    this.good_travelList = res.data.data
                })
            }
        },
        created() {
            vm = this
            this.getList()
            this.getPosList()
        },
        mounted() {
            window.addEventListener('scroll',this.scroll)
            
        },
        beforeDestroy(){
            window.removeEventListener('scroll',this.scroll)
        }
    }
</script>

<style lang="less">
.travel{
    width:100%;
    position: relative;
    margin-bottom:50px;
}
.good_travel{
    position: relative;
    padding:0.2rem 0.2rem;
    
    &_wrap{
        .borderRadius(0.1rem);
        
    }
    .pic{
        width:100%;
        height:2.4rem;
        overflow: hidden;
        img{
            width:100%;
            .imgCenter;
        }
    }
    .msg{
        .boxSizing;
        .flex;
        align-items:center;
        justify-content:space-between;
        padding:0.1rem 0.2rem;
    }
    .msg .title{
        font-size:0.26rem;
    }
    .msg .user{
        *{margin:0 auto;text-align:center}
    }
    .msg .user img{
        display:block;
        width:0.8rem;
        height:0.8rem;
        .borderRadius(0.8rem)
    }
    .msg .user span{
        display:block;
        font-size:0.24rem;
    }
}
.good_travel_item{
    margin:0.1rem;
    .boxShadow(0,3px,0.2rem,#ccc)
}
.swiper-pagination{
    bottom:0;
}
.good_travel .swiper-wrapper{
    padding-bottom:0.5rem;
    
}
.travel_content{
    background:#fff;
}
.travel_content_tab{
    width:2rem;
}
.travel_content_top{
    width:100%;
    padding:0 0.2rem;
    .flex;
    .boxSizing;
    justify-content:space-between;
    align-items:center;
    flex-wrap:nowrap;
    background-image: linear-gradient(180deg, #e5e5e5, #e5e5e5, rgba(229, 229, 229, 0)) bottom left no-repeat;
    background-size: 100% 1px;
    background-color:#fff;
}
.travel_search{
    width:20px;
    height:44px;
    .flex;
    .animate(.3s);
    overflow: hidden;
    *{
        display:inline-block;
        height:100%;
        line-height:44px;
    }
    span{
        text-align:center;
        flex:2;
        font-size:0.28rem;
    }
    input{
        width:3rem;
        flex:8;
        font-size:0.28rem;
    }
    .search_ico{
        font-size:0.32rem;
    }
}
.travel_search_open{
    width:100%;
}
.travel_content_tab_item_active{
    .animate(.3s);
    font-size:0.3rem !important;
}

.travel_list{
    padding:0 0.2rem;

    ul li{
        padding:0.2rem 0;
        border-bottom:0.01rem solid #ccc;
    }
    ul li .title{
        vertical-align:middle;
    }
    ul li .title *{
        display:inline-block !important;
        vertical-align:middle;
    }
    .travelItem .title span{
        .btn(0.4rem,0.2rem,rgb(250,119,119),0.12rem,#fff,0.05rem)
    }
    ul li .title p{
        font-size:0.28rem;
    }
    ul li .content{
        .flex;
        justify-content:space-between;
        margin-top:0.2rem;
    }
    ul li .content_wrap{
        width:3.7rem;
        padding:0;
    }
    ul li .picBox{
        width:3rem;
    }
    ul li .content_wrap .article{
        .flex;
        align-items:center;
        height:2rem;
        flex-wrap:wrap;
        overflow: hidden;
    }
    ul li .content_wrap .article p{
        font-size:0.28rem;
        color:rgb(153,153,153);
        line-height:.5rem;
    }
    ul li .content_wrap .u{
        .flex;
        height:0.5rem;
        align-items:center;
        margin-top:.1rem;
    }
    ul li .content_wrap .u img{
        width:0.5rem;
        height:100%;
        .borderRadius(.5rem)
    }
    ul li .content_wrap .u span{
        font-size:0.2rem;
        color:rgb(153,153,153);
        padding-left:.2rem;
    }
    ul li .picBox .img{
        width:100%;
        height:2rem;
        .borderRadius(0.1rem);
    }
    ul li .picBox img{
        width:100%;
        .imgCenter;        
    }
    ul li .picBox .bt{
        .flex;
        justify-content:space-between;
        margin-top:.1rem;
    }
    ul li .picBox .bt span{
        font-size:.24rem;
        color:rgb(153,153,153);
    }
}
.travel_content_fixed{
    .travel_content_top{
        position:fixed;
        left:0;
        top:0;
        z-index:999;
    }
    .travel_content_wrap{
        padding-top:44px;
    }
}

.travelPicItem{
    .title span{
        .btn(0.4rem,0.2rem,rgb(250,176,64),0.12rem,#fff,0.05rem)
    }
    .pics{
        height:1.55rem;
        overflow: hidden;
        margin-top:0.2rem;
    }
    .pics .l{
        width:6.3rem;
        height:100%;
        float:left;
        text-align:center;
        img{
            max-width:100%;
            .imgCenter;
        }
    }
    .pics .r{
        width:0.75rem;
        height:1.55rem;
        float:right;
        .flex;
        flex-wrap:wrap;
        align-content:space-between;
    }
    .pics .r .imgBox{
        width:100%;
        height:0.75rem;
        img{
            width:100%;
            .imgCenter;
            // min-height:100%;
        }
    }
    .bt{
        .flex;
        justify-content:space-between;
        margin-top:0.1rem;
        span{
             color:rgb(153,153,153);
             font-size:0.14rem;
        }
    }
}

.writeTravelBtn{
   .btn(.8rem,.8rem,@theme,.3rem,#fff,.5rem);
   position:fixed;
   right:0.2rem;
   bottom:70px;
   z-index:9999;
}
</style>

