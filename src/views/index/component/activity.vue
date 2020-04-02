<template>
    <div class="activity">
        <tab v-model="activityIndex" :line-width="1" custom-bar-width="0.5rem">
            <tab-item v-for="(item,index) in activityData" :key="index" @on-item-click="activitySelect">{{item.title}}</tab-item>
        </tab>

        <div class="activity_content">
            <div v-for="(item, index) in activityData" :key="index" v-show="activityIndex==index" class="activity_content_item">
                <swiper class="artivity_list artivity_list1" ref="swiper1" :options="swiperOption[`swiperOptionActivity${index+1}`]">
                    <swiper-slide v-for="(item2, index2) in item.list" :key="index2" class="item">
                        <router-link :to="{name:'groupShow',query:{id:item2.goods_id}}" tag="div">
                            <div class="pic">
                                <img v-lazy="item2.goods_thumb"/>
                            </div>
                            <div class="title">{{item2.goods_name}}</div>
                            <div class="time">
                                <span>{{item2.strat_time}}</span>
                                <small :class="item2.status == '报名中'?'a':item2.status == '已成团'?'b':'c'">{{item2.status}}</small>
                            </div>
                        </router-link>
                    </swiper-slide>
                    <div class="swiper-pagination"  slot="pagination"></div>
                </swiper>
            </div>
        </div>
         
    </div>
</template>

<script>
    import { Tab, TabItem } from 'vux'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import {activity} from '@/api/index'

    const swiperOptionActivity1 = {
        autoplay:false,
        slidesPerView: 3,//一行显示3个
        slidesPerColumn: 2,//显示2行
        slidesPerColumnFill:'row',
        pagination:{
            el:'.swiper-pagination',
            bulletClass:'swiperColor',
            bulletActiveClass: 'swiperAticveColor',
        }
    }
    const swiperOptionActivity2 = {
        autoplay:false,
        slidesPerView: 3,//一行显示3个
        slidesPerColumn: 2,//显示2行
        slidesPerColumnFill:'row',
        pagination:{
            el:'.swiper-pagination',
            bulletClass:'swiperColor',
             bulletActiveClass: 'swiperAticveColor',
        }
    }
    const swiperOptionActivity3 = {
        autoplay:false,
        slidesPerView: 3,//一行显示3个
        slidesPerColumn: 2,//显示2行
        slidesPerColumnFill:'row',
        pagination:{
            el:'.swiper-pagination',
            bulletClass:'swiperColor',
             bulletActiveClass: 'swiperAticveColor',
        }
    }

    export default {
        components: {
            Tab,
            TabItem,
            swiper,
            swiperSlide
        },
        data(){
            return{
                swiperOption:{
                    swiperOptionActivity1:swiperOptionActivity1,
                    swiperOptionActivity2:swiperOptionActivity2,
                    swiperOptionActivity3:swiperOptionActivity3
                },
                // 当前显示的活动
                activityIndex:0,
                //活动数据
                activityData:[
                    {
                        name:'本周活动',
                        list:[
                            {
                                errimg:require('@/assets/images/mjms_ico.jpg'),
                                img:'http://file.32hike.com/image/2016/10/12/bfeedb66045ae983b39f6eeeddf94df3.jpg'
                            },
                            {
                                errimg:require('@/assets/images/mjms_ico.jpg'),
                                img:'http://file.32hike.com/image/2016/10/12/bfeedb66045ae983b39f6eeeddf94df3.jpg'
                            },
                            {
                                errimg:require('@/assets/images/mjms_ico.jpg'),
                                img:'http://file.32hike.com/image/2016/10/12/bfeedb66045ae983b39f6eeeddf94df3.jpg'
                            },
                            {
                                errimg:require('@/assets/images/mjms_ico.jpg'),
                                img:'http://file.32hike.com/image/2016/10/12/bfeedb66045ae983b39f6eeeddf94df3.jpg'
                            },
                            {
                                errimg:require('@/assets/images/mjms_ico.jpg'),
                                img:'http://file.32hike.com/image/2016/10/12/bfeedb66045ae983b39f6eeeddf94df3.jpg'
                            },
                            {
                                errimg:require('@/assets/images/mjms_ico.jpg'),
                                img:'http://file.32hike.com/image/2016/10/12/bfeedb66045ae983b39f6eeeddf94df3.jpg'
                            },
                            {
                                errimg:require('@/assets/images/mjms_ico.jpg'),
                                img:'http://file.32hike.com/image/2016/10/12/bfeedb66045ae983b39f6eeeddf94df3.jpg'
                            },
                        ]
                    },
                    {
                        name:'下周活动',
                        list:[
                            {
                                errimg:require('@/assets/images/mjms_ico.jpg'),
                                img:'http://f01.32hike.com/image/2018/06/21/86c251e8ee30dcdd93766769d3787ac9.jpg'
                            }
                        ]
                    },
                    {
                        name:'元旦春节',
                        list:[
                            {
                                errimg:require('@/assets/images/mjms_ico.jpg'),
                                img:'http://f01.32hike.com/image/2018/11/08/a699e33b2110745e71cd22092ff9d0f0.jpg'
                            }
                        ]
                    }
                ]
            }
        },
        methods:{
            getActivity(){
                activity().then(res => {
                    this.activityData = res.data.data;
                    console.log(this.activityData)
                })
            },
            activitySelect(e){
                
            }
        },
        created() {
            this.getActivity()
        },
    }
</script>
<style lang="less">
.artivity_list{
    // padding:0.25rem;
    padding-top:.2rem;
    .item{
       height:2.2rem;
       margin-bottom:1rem !important;
    }
    .item .pic{
        height:2.2rem;
        text-align:center;
        overflow: hidden;
        img{
            .imgCenter;
        }
    }
    .item .pic,.item .title,.item .time{
        width:2.2rem;
        margin:0 auto
    }
    .item .title{
        font-size:.28rem;
        .textOverflow;
    }
    .item .time{
        .flex;
        justify-content:space-between;
        span{
            font-size:.26rem;
            color:#909090;
        }
        small{
            color:#fff;
            padding:0 .05rem;
        }
        .a{
            background:#7ae4a4;
        }
        .b{
            background:#f6af61;
        }
        .c{
            background:#d97ffb;
        }
    }
}
.swiper-wrapper{
    padding-bottom:0.4rem;
}
</style>


