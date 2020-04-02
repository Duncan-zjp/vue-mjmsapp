<template>
    <div class="IntegralCalculation container">
        <div class="address" @click="openSelectAdd">
            <div class="wrap">
                <p>
                    <span>名字名字</span>
                    <span>13800138000</span>
                </p>
                <p>详细地址详细地址详细地址详细地址详细地址详细地址详细地址</p>
            </div>
            <div class="r">></div>
        </div>

        <div class="product">
            <div class="pic">
                <img src="@/assets/images/mjms_ico.jpg" alt="">
            </div>
            <div class="content">
                <p>标题标题标题标题标题标题标题标题标题标题标题标题</p>
                <span>X1</span>
            </div>
        </div>

        <div class="public_option public_option_top">
            <p>共1件商品</p>
        </div>

        <div class="public_option">
            <p>商品合计</p>
            <p><span>2000</span>积分</p>
        </div>
        <div class="public_option">
            <p>商品合计</p>
            <p>免运费</p>
        </div>
        <div class="public_option">
            <p>支付方式</p>
            <p>微信支付</p>
        </div>


        <div class="submit_bt">
            <p>应付总额：<span>2000 </span>积分</p>
            <div>提交订单</div>
        </div>

        <!-- 收货地址列表 -->
        <popup v-model="selectAddress.show" position="bottom" max-height="100%">
            <div class="add_item">
                <div>
                    <p>姓名  13800138000</p>
                    <span>详细地址详细地址</span>
                </div>
                <div>
                    <small class="iconfont">&#xe6ab;</small>
                </div>
            </div>
            <div class="add_item">
                <div>
                    <p>姓名  13800138000</p>
                    <span>详细地址详细地址</span>
                </div>
                <div>
                    <small class="iconfont">&#xe6ab;</small>
                </div>
            </div>
        </popup>
        <!-- 收货地址列表 end -->
    </div>
</template>

<script>
    export default {
        components:{
            
        },
        data(){
            return{
                selectAddress:{
                    show:false
                }
            }
        },
        methods: {
            // 打开选择收货地址
            openSelectAdd(){
                this.selectAddress.show = true
            }
        },
    }
</script>

<style lang="less">
.IntegralCalculation{
    margin-bottom:0;

    .address{
        padding:.2rem;
        border-bottom:.02rem dashed #ccc;
        justify-content:space-between;
        .flex;
        align-items:center;

        .wrap{
            width:6rem;
        }

        .r{
            font-size:.32rem;
        }

        p{
            font-size:.28rem;
            margin-top:.2rem;
        }
        p:first-child{
            margin-top:0;
        }
        p span{
            font-size:.32rem;
        }
    }

    .product{
        padding:.2rem;
        overflow: hidden;
        margin-top:.2rem;

        .pic{
            width:1.8rem;
            height:1.8rem;
            float:left;
        }
        .pic img{
            .imgCenter;
        }
        .content{
            width:5rem;
            float:right;
        }
        .content *{
            display:block;
            font-size:.28rem;
        }
        .content span{
            color:#999;
            margin-top:.2rem;
        }
    }

    .public_option{
        padding:.2rem;
        .flex;
        justify-content:space-between;
        
        *{
            font-size:.28rem;
        }
        span{
            color:@theme
        }
    }

    .public_option_top{
        margin-bottom:.2rem;
    }

    .submit_bt{
        width:100%;
        height:1rem;
        .flex;
        justify-content:space-between;
        align-items:center;
        position:fixed;
        left:0;
        bottom:0;
        padding-left:.2rem;

        *{
            font-size:.32rem;
        }
        p span{
            color:@theme;
        }
        div{
            .btn(2.4rem,1rem,@theme,.32rem,#fff,0);
        }
    }

    .add_item{
        margin-top:.2rem;
        .flex;
        justify-content:space-between;
        align-items:center;
        padding:0 .2rem;

        *{
            display:block;
            font-size:.28rem;
        }
    }
}
</style>

