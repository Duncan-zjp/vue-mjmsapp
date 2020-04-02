<template>
    <div v-if="show" class="container orderShow">
        <div class="showHeader">
            <div class="pic">
                <img :src="data.goods_list[0].goods_thumb" alt="">
            </div>
            <div class="content">
                <div class="tit">{{data.goods_list[0].goods_name}}</div>
                <div class="time">{{data.goods_list[0].start_time}}出发</div>
                <div class="price">互动费用：{{data.goods_list[0].shop_price}}元/人</div>
                <div class="status">{{data.goods_list[0].stauts}}</div>
            </div>
        </div>

        <router-link class="lineSee" :to="{name:'activityKnow',query:{id:data.goods_list[0].goods_id}}" tag="div">
            <span>点击查看详情须知</span>
            <span>></span>
        </router-link>

        <div class="content_wrap">
            <h5>报名信息</h5>
            <div class="bmMsg">
                 <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
                    <thead>
                    <tr style="background-color: #F7F7F7">
                        <th>报名人</th>
                        <th>项目</th>
                        <th>费用</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in data.memberList" :key="index">
                        <td>{{item.real_name}}</td>
                        <td>基础费用</td>
                        <td>{{item.price}}</td>
                        <router-link v-if="data.order.is_changed === '0'" :to="{name:'activeEndorse',query:{id:data.order.order_id}}" tag="td">改签/退出</router-link>
                        <td v-else>-/-</td>
                    </tr>
                    </tbody>
                </x-table>
            </div>

            <div class="activity_actions">
                <!-- <span>增加人员</span>
                <span>修改/替员</span> -->
                <router-link :to="{name:'orderComments',query:{id:data.goods_list[0].rec_id}}" tag="span">发表评论</router-link>
            </div>

        </div>
    </div>
</template>


<script>
    import { XTable } from 'vux'
    import {activityShow} from '@/api/order'
    export default {
        components:{
            XTable
        },
        data(){
            return{
                show:false,
                data:{}
            }
        },
        methods: {
            getData(orderid){
                activityShow(orderid).then(res => {
                    this.data = res.data.data
                    this.show = true
                })
            }
        },
        created() {
            this.getData(this.$route.query.id)
        },
    }
</script>


<style lang="less">
.orderShow{
    margin-bottom:0;
    .showHeader{
        padding:.2rem;
        .flex;
        align-items:center;
        .pic{
            width:2.3rem;
            height:2rem;
            overflow: hidden;
            img{
                .imgCenter;
            }
        }
        .content{
            margin-left:.2rem;
            div{
                margin:.05rem;
            }
            .tit{
                font-size:.32rem;
            }
            .time{
                font-size:.26rem;
                color:#ccc;
            }
            .price{
                font-size:.28rem;
            }
            .status{
                display:inline-block;
                padding:.05rem;
                .btn(auto,auto,@theme,.24rem,#fff,0)
            }
        }
    }
    .lineSee{
        width:100%;
        height:.8rem;
        line-height:.8rem;
        .flex;
        justify-content:space-between;
        padding:0 .2rem;
        .boxSizing;
        margin:.2rem 0;
        span{
            font-size:.32rem;
        }
    }

    .content_wrap{
        padding:.2rem;
        h5{
            font-size:.32rem;
            margin-bottom:.2rem;
        }
    }

    .activity_actions{
        .flex;
        margin-top:.2rem;
        span{
            .btn(auto,auto,@theme,.28rem,#fff,.1rem);
            padding:.2rem;
            margin-right:.15rem;
        }
    }

    th,td{
        font-size:.28rem !important;
    }
}

</style>
