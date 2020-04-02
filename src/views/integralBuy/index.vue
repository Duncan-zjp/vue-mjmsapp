<template>
    <div class="container personalCollection">
        <tab :line-width="1" v-model="adciveIndex" class="collection_tab">
            <tab-item v-for="(item, index) in listData" :key="index">{{item.title}}</tab-item>
            <!-- <tab-item >土特产</tab-item>
            <tab-item >优惠劵</tab-item> -->
        </tab>

        

        <div v-show="adciveIndex == 0" class="specialty_list">
            <ul>
                <router-link :to="{name:'integralShow',query:{id:item.goods_id}}" tag="li" v-for="(item, index) in listData[0].list" :key="index">
                     <div class="pic">
                        <img v-lazy="item.goods_thumb" alt="">
                    </div>
                    <div class="title">{{item.goods_name}}</div>
                    <div class="price">{{item.buy_for_integral}}积分</div>
                </router-link>
            </ul>
        </div>

        <div v-show="adciveIndex == 1" class="specialty_list">
            <ul>
                <router-link :to="{name:'integralShow',query:{id:item.goods_id}}" tag="li" v-for="(item, index) in listData[1].list" :key="index">
                     <div class="pic">
                        <img v-lazy="item.goods_thumb" alt="">
                    </div>
                    <div class="title">{{item.goods_name}}</div>
                    <div class="price">{{item.buy_for_integral}}积分</div>
                </router-link>
            </ul>
        </div>

         <div v-show="adciveIndex == 2" class="attractions_list">
            <div class="attractions_item">
                <div class="pic">
                    <img src="@/assets/images/mjms_ico.jpg" alt="">
                </div>
                <div class="title">我是标题我是标题我是标题我是标题我是标题我是标题</div>
                <div class="msg">这里说点什么</div>
            </div>
            <div class="attractions_item">
                <div class="pic">
                    <img src="@/assets/images/mjms_ico.jpg" alt="">
                </div>
                <div class="title">我是标题我是标题我是标题我是标题我是标题我是标题</div>
                <div class="msg">这里说点什么</div>
            </div>
        </div>

    </div>
</template>


<script>
    import { Tab, TabItem } from 'vux'
    import {list} from '@/api/integralBuy'
    export default {
        components:{
            Tab, TabItem
        },
        data(){
            return{
                adciveIndex:0,
                listData:[]
            }
        },
        methods: {
            getList(){
                list().then(res => {
                    if(res.status == 200){
                        this.listData = res.data.data
                    }
                })
            }
        },
        created() {
            this.getList()
        },
    }
</script>


<style lang="less">
.personalCollection{
    margin-bottom:0;
    
    .collection_tab{
        width:100%;
        position:fixed;
        left:0;
        top:0;
    }

    .attractions_list{
        padding:.2rem;
        margin-top:44px;
    }
    .attractions_item{
        .borderRadius(.2rem);
        .boxShadow(0,.05rem,.2rem,#ccc);
        margin-top:.2rem;
        padding-bottom:.1rem;

        .pic{
            width:100%;
            height:3rem;
            overflow: hidden;
            text-align:center;
        }
        .pic img{
            .imgCenter;
        }
        .title{
            font-size:.28rem;
            margin-top:.1rem;
            padding:0 .1rem;
        }
        .msg{
            font-size:.24rem;
            color:#999999;
            padding:0 .1rem;
            margin-top:.05rem;
        }
    }

    .specialty_list{
        overflow: hidden;
        padding:.2rem .4rem;
        margin-top:44px;
        ul{
            width:7.8rem;
            overflow: hidden;
        }
        ul li{
            width:3.2rem;
            float:left;
            margin:0 .3rem .2rem 0;
            background:#fff;
        }
        ul li div{
            width:100%;
            overflow: hidden;
        }
        ul li .pic{
            width:100%;
            height:3.2rem;
            text-align:center;
        }
        ul li .pic img{
            width:100%;
            height:100%;
        }
        ul li .title{
            .boxSizing;
            font-size:.28rem;
            line-height:.35rem;
            height:.7rem;
            overflow: hidden;
            margin:0.1rem 0;
        }
        ul li .price{
            font-size:.28rem;
            color:#ef9999;
            padding:0.1rem;
        }
    }
    .specialty_item{

    }
}
</style>

