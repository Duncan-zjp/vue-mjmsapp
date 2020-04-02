<template>
    <div class="ordersList">
        <tab class="order_tab" v-model="OrderIndex" :line-width="1" custom-bar-width="0.5rem">
            <tab-item @on-item-click="OrderSelect" class="order_tab_item" active-class="order_tab_item_active">已报名</tab-item>
            <tab-item @on-item-click="OrderSelect" class="order_tab_item" active-class="order_tab_item_active">已结束</tab-item>
            <tab-item @on-item-click="OrderSelect" class="order_tab_item" active-class="order_tab_item_active">已退出</tab-item>
            <tab-item @on-item-click="OrderSelect" class="order_tab_item" active-class="order_tab_item_active">商品订单</tab-item>
        </tab>

        <div class="order_type">
            <div v-show="OrderIndex == 0" class="order_item">
                <div class="ordersList">
                    <ul>
                        <li v-for="(item, index) in order.start.list" :key="index">
                            <div class="pic">
                                <img v-lazy="item.goods_list[0].goods_thumb" alt="">
                            </div>
                            <div class="content">
                                <div class="title">{{item.goods_list[0].goods_name}}</div>
                                <div class="time">{{item.goods_list[0].start_time}}</div>
                                <div class="add">集合点：{{item.goods_list[0].place}}</div>

                                <div class="btns">
                                    <router-link :to="{name:'activityKnow',query:{id:item.goods_list[0].goods_id,groupid:item.group_id}}" tag="span">活动须知</router-link>
                                    <router-link :to="{name:'orderShow',query:{id:item.order_id}}" tag="span">订单详情</router-link>
                                    <router-link v-if="item.is_changed === '0'" :to="{name:'activeEndorse',query:{id:item.order_id}}" tag="span">改签</router-link>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <none v-if="order.start.noneShow" />
            </div>
            <div v-show="OrderIndex == 1" class="order_item">
                <div class="ordersList">
                    <ul>
                        <li v-for="(item, index) in order.end.list" :key="index">
                            <div class="pic">
                                <img v-lazy="item.goods_list[0].goods_thumb" alt="">
                            </div>
                            <div class="content">
                                <div class="title">{{item.goods_list[0].goods_name}}</div>
                                <div class="time">{{item.goods_list[0].start_time}}</div>
                                <div class="add">集合点：{{item.goods_list[0].place}}</div>

                                <div class="btns">
                                    <router-link :to="{name:'activityKnow',query:{id:item.goods_list[0].goods_id,groupid:item.group_id}}" tag="span">活动须知</router-link>
                                    <router-link :to="{name:'orderShow',query:{id:item.order_id}}" tag="span">订单详情</router-link>
                                    <router-link v-if="item.is_changed === '0'" :to="{name:'activeEndorse',query:{id:item.order_id}}" tag="span">改签</router-link>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <none v-if="order.end.noneShow" />
            </div>
            <div v-show="OrderIndex == 2" class="order_item">
                <div class="ordersList">
                    <ul>
                        <li v-for="(item, index) in order.exit.list" :key="index">
                            <div class="pic">
                                <img v-lazy="item.goods_list[0].goods_thumb" alt="">
                            </div>
                            <div class="content">
                                <div class="title">{{item.goods_list[0].goods_name}}</div>
                                <div class="time">{{item.goods_list[0].start_time}}</div>
                                <div class="add">集合点：{{item.goods_list[0].place}}</div>

                                <div class="btns">
                                    <router-link :to="{name:'activityKnow',query:{id:item.goods_list[0].goods_id,groupid:item.group_id}}" tag="span">活动须知</router-link>
                                    <router-link :to="{name:'orderShow',query:{id:item.order_id}}" tag="span">订单详情</router-link>
                                    <router-link v-if="item.is_changed === '0'" :to="{name:'activeEndorse',query:{id:item.order_id}}" tag="span">改签</router-link>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <none v-if="order.exit.noneShow" />
            </div>
            <div v-show="OrderIndex == 3" class="order_item">
                <div class="ordersList">
                    <ul>
                        <li v-for="(item, index) in order.shop.list" :key="index">
                            <div class="pic">
                                <img v-lazy="item.goods_list[0].goods_thumb" alt="">
                            </div>
                            <div class="content">
                                <div class="title">{{item.goods_list[0].goods_name}}</div>
                                <div class="time">{{item.goods_list[0].start_time}}</div>
                                <div class="add">集合点：{{item.goods_list[0].place}}</div>

                                <div class="btns">
                                    <router-link :to="{name:'specialtyOrder',query:{id:item.order_id}}" tag="span">订单详情</router-link>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <none v-if="order.shop.noneShow" />
            </div>
        </div>
    </div>
</template>


<script>
    import { Tab, TabItem } from 'vux'
    import {list} from '@/api/order'
    import {scrollBottom,scrollOption} from '@/util/other'
    import none from '@/components/noAnyData/none'
    export default {
        components:{
            Tab, TabItem,none
        },
        data(){
            return{
                OrderIndex:this.$route.query.id ? parseInt(this.$route.query.id) : 0,
                order:{
                    start:{
                        list:[],
                        page:1,
                        noneShow:false
                    },
                    end:{
                        list:[],
                        page:1,
                        noneShow:false
                    },
                    exit:{
                        list:[],
                        page:1,
                        noneShow:false
                    },
                    shop:{
                        list:[],
                        page:1,
                        noneShow:false
                    },
                }
            }
        },
        methods: {
            // 选择订单类型
            OrderSelect(){

            },
            startData(){
                list('201',this.order.start.page).then(res => {
                    if(res.status == 200){
                        if(res.data.data.length < 1){
                            this.order.start.page = this.order.start.page - 1;
                            this.order.start.noneShow = true
                        }
                        res.data.data.forEach(item => {
                            this.order.start.list.push(item)
                        });
                    }
                })
            },
            endData(){
                list('202',this.order.end.page).then(res => {
                    if(res.status == 200){
                        if(res.data.data.length < 1){
                            this.order.end.page = this.order.end.page - 1;
                            this.order.end.noneShow = true
                        }
                        res.data.data.forEach(item => {
                            this.order.end.list.push(item)
                        });
                    }
                })
            },
            exitData(){
                list('203',this.order.exit.page).then(res => {
                    if(res.status == 200){
                        if(res.data.data.length < 1){
                            this.order.exit.page = this.order.exit.page - 1;
                            this.order.exit.noneShow = true
                        }
                        res.data.data.forEach(item => {
                            this.order.exit.list.push(item)
                        });
                    }
                })
            },
            shopData(){
                list('',this.order.shop.page).then(res => {
                    if(res.status == 200){
                        if(res.data.data.length < 1){
                            this.order.shop.page = this.order.shop.page - 1;
                            this.order.shop.noneShow = true
                        }
                        res.data.data.forEach(item => {
                            this.order.shop.list.push(item)
                        });
                    }
                })
            },
            scroll(){
                console.log(this.OrderIndex)
                if(scrollOption.getScrollTop() + scrollOption.getWindowHeight() == scrollOption.getScrollHeight()){
                    console.log('滚动到底部')
                    if(this.OrderIndex == 0){
                        this.order.start.page += 1
                        this.startData()
                    }
                    if(this.OrderIndex == 1){
                        this.order.end.page += 1
                        this.endData()
                    }
                    if(this.OrderIndex == 2){
                        this.order.exit.page += 1
                        this.exitData()
                    }
                    if(this.OrderIndex == 3){
                        this.order.shop.page += 1
                        this.shopData()
                    }
                }
            },
            init(){
                this.startData()
                this.endData()
                this.exitData()
                this.shopData()
            }
        },
        created() {
            this.init()
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
.ordersList{
    .order_tab{
        width:100%;
        position:fixed;
        left:0;
        top:0;
    }

    .order_type{
        margin-top:44px;
    }

    .ordersList{
        padding:.2rem .15rem;
        ul li{
            background:#ccc;
            .flex;
            padding:.15rem;
            .borderRadius(.3rem);
            margin-top:.15rem;
            align-items:center;
            
        }
        ul li:first-child{
            margin-top:0;
        }
        ul li .pic{
            width:2.3rem;
            height:2rem;
            overflow: hidden;
            .borderRadius(.1rem);
            background:#fff;
            img{
                .imgCenter;
            }
        }
        ul li .content{
            width:4.3rem;
            margin-left:.15rem;
            .flex;
            flex-wrap:wrap;
            .title,.time,.add{
                display:block;
                width:100%;
                font-size:.28rem;
                margin:.05rem 0;
            }
        }
        ul li .btns{
            width:100%;
            .flex;
            justify-content:flex-start;
            margin-top:.1rem;
            span{
                .btn(28%,.4rem,none,.24rem,@theme,.4rem);
                border:0.01rem solid @theme;
                margin-right:.1rem;
            }
        }
    }
}
</style>

