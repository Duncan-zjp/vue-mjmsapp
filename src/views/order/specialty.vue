<template>
    <div class="container specialtyOrderShow" v-if="viewShow">
        <div class="wrap">
            <div class="p_list">
                
                <div class="p_item" v-for="(item, index) in data.goods_list" :key="index">
                    <div class="top">
                        <span>{{item.supplier_name}}</span>
                    </div>
                    <div class="p_item_wrap" v-for="(item2, index2) in item.goods_list" :key="index2">
                        <div class="pic">
                            <img :src="item2.goods_thumb" alt="">
                        </div>
                        <div class="content">
                            <div class="title">{{item2.goods_name}}</div>
                            <div class="bt">
                                <span>数量{{item2.goods_number}}</span>
                                <span>￥{{item2.goods_price}}</span>
                            </div>
                        </div>
                        <div class="comments">
                            <router-link :to="{name:'orderComments',query:{id:item2.rec_id}}" tag="span">评论</router-link>
                        </div>
                    </div>
                </div>
            </div>

            <div class="order_options">
                <p>
                    <span>创建订单日期：{{data.order.formated_add_time}}</span>
                </p>
                <p>
                    <span>订单号码：{{data.order.order_sn}}</span>
                </p>
            </div>

            <div class="order_price">
                <small>共{{data.order.goods_number}}件  实付：</small>
                <span>¥{{data.order.total_fee}}</span>
            </div>
        </div>

        <div class="order_address">
            <small class="iconfont">&#xe652;</small>
            <p>
                <span>收货人：{{data.order.consignee}}</span>
                <span>收货地址：{{data.order.province_name}}{{data.order.district_name}}{{data.order.city_name}}{{data.order.district_name}}{{data.order.address}}</span>
            </p>
        </div>

        <div class="order_logistics" v-if="data.expressList">
            <h4>订单物流信息：</h4>
            <div class="options">
                <p><a>物流公司：{{data.expressList.shipping_name}}</a></p>
                <p><a>物流单号：<small ref="order_logistics_sn">{{data.expressList.shipping_no}}</small></a><span v-clipboard="data.expressList.shipping_no" @success="copysuccess" @error="copyerror">复制</span></p>
            </div>

            <div class="list">
                <ul>
                    <li v-for="(item, index) in data.expressList.shipping_traces" :key="index">
                        <p>{{item.AcceptStation}}</p>
                        <span>{{item.AcceptTime}}</span>
                    </li>
                </ul>
            </div>
        </div>

        
    </div>
</template>


<script>
    import {specialtyShow} from '@/api/order'
    export default {
        components:{

        },
        data(){
            return{
                data:{

                },
                viewShow:false
            }
        },
        methods: {
            getData(){
                specialtyShow(this.$route.query.id).then(res => {
                    if(res.status == 200){
                        this.data = res.data.data
                        this.viewShow = true
                    }
                })
            },
            // 复制
            copysuccess(){
                this.$vux.toast.text('复制成功')
            },
            copyerror(){

            }
        },
        created() {
            this.getData()
        },
    }
</script>


<style lang="less">
.specialtyOrderShow{
    margin-bottom:0;
    padding:.1rem;
    .boxSizing;
    .wrap{
        padding:0 .2rem;
        .borderRadius(.4rem);
        

        .p_item{
            margin-top:.2rem;
        }
        .p_item .top{
            .flex;
            justify-content:space-between;
            padding-bottom:.1rem;
            border-bottom:.01rem solid #ccc;
            span{
                font-size:.32rem;
                color:#eb9f26;
            }
            span:first-child{
                color:#000;
            }
        }

        .p_item .comments{
            width:100%;
            .flex;
            justify-content:flex-end;
            margin-top:.1rem;

            span{
                .boxSizing;
                .btn(auto,auto,#fff,.24rem,#000,.1rem);
                padding:.1rem .3rem;
                border:.01rem solid #ccc;
            }
        }

        .p_item_wrap{
            
            .flex;
            justify-content: flex-start;
            margin-top:.1rem;
        }
        .p_item_wrap .pic{
            width:2.05rem;
            height:1.55rem;
            overflow: hidden;
            img{
                .imgCenter;
            }
        }
        .p_item_wrap .content{
            .boxSizing;
            width:4.85rem;
            height:1.55rem;
            background:#ccc;
            padding:.1rem .1rem 0 .1rem;
        }
        .p_item_wrap .content .title{
            font-size:.28rem;
            height:.7rem;
            line-height:.35rem;
            overflow: hidden;
        }
        .p_item_wrap .content .bt{
            .flex;
            margin-top:.2rem;
            justify-content:space-between;
            span{
                font-size:.28rem;
                color:#808080;
            }
        }
    }

    .order_options{
        margin-top:.2rem;
        padding-bottom:.1rem;
        border-bottom:.01rem solid #ccc;
        p{
            margin-top:.1rem;
            .flex;
            justify-content:space-between;
        }
        p span{
            font-size:.28rem;
            color:#ccc;
        }
    }

    .order_price{
        line-height:.8rem;
        text-align:right;

        span,small{
            font-size:.32rem;
        }
        span{
            color:#eba22d;
        }
    }

    .order_address{
        .borderRadius(.4rem);
        margin-top:.2rem;
        .flex;
        justify-content: flex-start;
        padding:.3rem;
        align-items:center;
        small{
            font-size:.4rem;
        }
        p{
            width:6rem;
            margin-left:.2rem;
        }
        p span{
            display:block;
            font-size:.28rem;
        }
    }

    .order_btns{
        .boxSizing;
        width:100%;
        padding:0 .2rem;
        height:1rem;
        .flex;
        justify-content:flex-end;
        position:fixed;
        align-items:center;
        left:0;
        bottom:0;

        span{
            .boxSizing;
            .btn(auto,.6rem,#fff,.32rem,#000,.6rem);
            padding:0 .2rem;
            border:.01rem solid #ccc;
        }
    }

    .order_logistics{
        background:none;
        margin-top:.2rem;
        .boxSizing;
        h4{
            font-size:.28rem;
            padding-left:.2rem;
        }

        .options{
            margin-top:.2rem;
            background:#fff;
            padding:.2rem;
        }
        .options p{
            .flex;
            justify-content:space-between;
            margin:.1em 0;
            align-items:center;
        }
        .options p *{
            font-size:.28rem;
            font-weight:normal;
        }

        .list{
            padding:0 .2rem;
            margin-top:.2rem;

            ul li{
                padding:.2rem 0;
                // margin-bottom:.2rem;
                margin-left:.5rem;
                border-bottom:.01rem solid #ccc;
                position: relative;
            }
            ul li:after{
                display:block;
                content:'';
                width:1px;
                height:100%;
                background:#ccc;
                position:absolute;
                left:-0.4rem;
                top:0;
            }
            ul li:before{
                display:block;
                content:'';
                width:.2rem;
                height:.2rem;
                .borderRadius(.2rem);
                background:#ccc;
                position:absolute;
                left:-.5rem;
                top:0.275rem;
            }
            ul li p,ul li span{
                font-size:.28rem;
                display:block;
                line-height:.4rem;
            }
            ul li span{
                margin-top:.15rem;
            }
            ul li:first-child{
                padding-top:0;
                *{
                    color:@theme;
                }
                &:before{
                    top:.075rem;
                    background:@theme;
                }
            }
        }
    }
}
</style>
