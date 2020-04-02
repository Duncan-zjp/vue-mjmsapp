<template>
    <div class="container personalCoupon">
        <tab class="coupon_tab" v-model="couponIndex" :line-width="1">
            <tab-item @on-item-click="couponSelect" class="coupon_tab_item" active-class="coupon_tab_item_active">未使用（1）</tab-item>
            <tab-item @on-item-click="couponSelect" class="coupon_tab_item" active-class="coupon_tab_item_active">使用记录（0）</tab-item>
            <tab-item @on-item-click="couponSelect" class="coupon_tab_item" active-class="coupon_tab_item_active">已过期（0）</tab-item>
        </tab>

        <div v-show="couponIndex == 0" class="coupon_list coupon_use_list">
            <ul>
                <li>
                    <div class="money"><small>￥</small><span>5</span></div>
                    <div class="msg">
                        <p>限蜂足商城使用</p>
                        <span>2019.1.1-2019.12.31</span>
                        <i @click="showCouponMessage">使用规则></i>
                    </div>
                    <router-link :to="{name:'index'}" tag="button">立刻使用</router-link>
                </li>
            </ul>
        </div>

        <div v-show="couponIndex == 1" class="coupon_list coupon_use_list">
            <ul>
                <li>
                    <div class="money"><small>￥</small><span>5</span></div>
                    <div class="msg">
                        <p>限蜂足商城使用</p>
                        <span>2019.1.1-2019.12.31</span>
                        <i @click="showCouponMessage">使用规则></i>
                    </div>
                    <div class="none"></div>
                </li>
            </ul>
        </div>

        <div v-show="couponIndex == 2" class="coupon_list coupon_use_list">
            <ul>
                <li>
                    <div class="money"><small>￥</small><span>5</span></div>
                    <div class="msg">
                        <p>限蜂足商城使用</p>
                        <span>2019.1.1-2019.12.31</span>
                        <i @click="showCouponMessage">使用规则></i>
                    </div>
                    <div class="none"></div>
                </li>
            </ul>
        </div>

        <x-dialog v-model="couponMessageShow" hide-on-blur class="couponDialog">
            <div class="coupon_message">
                <h5>优惠劵使用说明：</h5>
                <div class="content">
                    <p>1·旅游线路产品：全额抵扣；</p>
                    <p>2·土特产品：抵扣价格的10%；</p>
                    <p>3·优惠券可在本商城抵扣指定消费金额，不可提现。</p>
                    <p>4·优惠券需在有效期间使用，逾期无效。</p>
                </div>

                <span class="del" @click="showCouponMessage">x</span>
            </div>
        </x-dialog>
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
                couponIndex:0,
                couponMessageShow:false
            }
        },
        methods: {
            couponSelect(){

            },
            showCouponMessage(){
                this.couponMessageShow = !this.couponMessageShow
            }
        },
    }
</script>


<style lang="less">
.personalCoupon{
    margin-bottom:0;
    padding-top:44px;
    .coupon_tab{
        width:100%;
        position:fixed;
        left:0;
        top:0;
    }
    .coupon_list{
        margin-top:.2rem;
        ul li{
            .boxSizing;
            .flex;
            justify-content:space-between;
            align-items:center;
            height:2rem;
            padding-right:.2rem;
            margin-bottom:.2rem;
        }
        ul li .money{
            .btn(2rem,2rem,#ccc,.16rem,#000,0);
            small{
                font-size:.28rem;
            }
            span{
                font-size:.5rem;
            }
        }
        ul li .msg{
            .boxSizing;
            height:100%;
            .flex;
            flex-direction:column;
            justify-content:space-between;
            padding:.2rem 0;
        }
        ul li .msg *{
            width:100%;
        }
        ul li .msg p{
            font-size:.32rem;
        }
        ul li .msg span{
            font-size:.28rem;
        }
        ul li .msg i{
            font-size:.28rem;
            font-style:normal;
        }
        ul li button{
            .btn(1.5rem,.6rem,#ccc,.28rem,#000,.1rem);
        }
        ul li .none{
            width:1.5rem;
        }
    }


    .couponDialog .weui-dialog{
        background:none !important;
        overflow:visible;
    }
    .coupon_message{
        .boxSizing;
        width:5rem;
        height:6rem;
        margin:0 auto;
        text-align:left;
        background:#fff;
        padding:.2rem;
        .borderRadius(.2rem);
        position: relative;
        overflow:visible;

        h5{
            font-size:.32rem;
        }

        .content{
            p{
                font-size:.28rem;
                margin-top:.1rem;
            }
        }

        .del{
            .btn(.6rem,.6rem,none,.3rem,#fff,.8rem);
            border:1px solid #fff;
            position:absolute;
            top:-.8rem;
            right:0;
        }
    }
}
</style>

