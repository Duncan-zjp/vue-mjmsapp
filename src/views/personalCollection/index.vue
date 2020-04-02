<template>
    <div class="container personalCollection">
        <tab :line-width="1" v-model="adciveIndex" class="collection_tab">
            <tab-item @on-item-click="handler">景点</tab-item>
            <tab-item @on-item-click="handler">土特产</tab-item>
        </tab>

        <div v-if="adciveIndex == 0" class="attractions_list">
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

        <div v-if="adciveIndex == 1" class="specialty_list">
            <ul>
                <li>
                    <div class="pic">
                        <img src="@/assets/images/mjms_ico.jpg" alt="">
                    </div>
                    <div class="title">商品标题商品标题商品标题商品标题</div>
                    <div class="price">￥99.00</div>
                </li>
                <li>
                    <div class="pic">
                        <img src="@/assets/images/mjms_ico.jpg" alt="">
                    </div>
                    <div class="title">商品标题商品标题商品标题商品标题</div>
                    <div class="price">￥99.00</div>
                </li>
                <li>
                    <div class="pic">
                        <img src="@/assets/images/mjms_ico.jpg" alt="">
                    </div>
                    <div class="title">商品标题商品标题商品标题商品标题</div>
                    <div class="price">￥99.00</div>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
    import { Tab, TabItem } from 'vux'
    export default {
        components:{
            Tab, TabItem
        },
        data(){
            return{
                adciveIndex:0
            }
        },
        methods: {
            handler(){

            }
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

