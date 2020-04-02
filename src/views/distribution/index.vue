<template>
    <div class="container distribution">
        <div class="distribution_header">
            <div class="dis_card">
                <img src="@/assets/images/distribution_car_bg.png" alt="">
                <p>NO.888888</p>
            </div>

            <div class="distribution_msg">
                <h4>加入时间：2018-10-25</h4>
                <h5>累积收益：863,456</h5>
            </div>
        </div>

        <div class="distribution_main">
            <router-link class="disType_item" :to="{name:'distributionProxy'}" tag="div">
                <p>
                    <span>代理收益</span>
                    <span>128,523</span>
                </p>
                <p>
                    <span>资产明细▼</span>
                </p>
            </router-link>
            <router-link class="disType_item" :to="{name:'shareIncome'}" tag="div">
                <p>
                    <span>分享收益</span>
                    <span>8,523</span>
                </p>
                <p>
                    <span>零钱明细▼</span>
                </p>
            </router-link>
        </div>
    </div>


</template>

<script>
    export default{
        components:{

        },
        data(){
            return{

            }
        }
    }
</script>


<style lang="less">
.distribution{
    width:100%;
    overflow: hidden;
    margin-bottom:0;
}
.distribution_header{
    padding:0.3rem 0;
}
.dis_card{
    width:6.34rem;
    height:3.81rem;
    margin:0 auto 0.3rem;
    position: relative;
    .boxShadow(0,0.05rem,0.1rem,#d8d8d8);
    .borderRadius(.2rem);

    img{
        width:100%;
        height:100%
    }
    p{
        position:absolute;
        left:0.2rem;
        bottom:0.2rem;
        font-size:0.3rem;
    }
}
.distribution_msg{
    width:6.34rem;
    margin:0 auto;

    h4{
        font-size:0.24rem;
        color:#cccccc;
    }
    h5{
        font-size:0.32rem;
        color:#10a801;
    }
}
.distribution_main{
    margin-top:0.2rem;
}
.disType_item{
    .boxSizing;
    .flex;
    justify-content:space-between;
    padding:0 0.4rem;
    width:100%;
    height:1.2rem;
    border-top:0.01rem solid #ccc;
    &:first-child{
        border-top:0;
    }

    p{
        .flex;
        flex-wrap:wrap;
        align-items:center;
        align-content:center;
    }
    p span{
        display:block;
        width:100%;
        font-size:0.28rem;
    }
}
</style>

