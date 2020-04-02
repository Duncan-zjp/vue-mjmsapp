<template>
    <div class="container withdrawShow">

        <div class="price">-200.00</div>

        <div class="msg">
            <p>
                <span>收款方</span>
                <small>微信钱包</small>
            </p>
            <p>
                <span>创建时间</span>
                <small>2018-10-20 10:54</small>
            </p>
            <p>
                <span>交易状态</span>
                <small>已到账</small>
            </p>
        </div>
    </div>
</template>

<script>
    export default{
        components:{

        },
        dara(){
            return{

            }
        }
    }
</script>


<style lang="less">
.withdrawShow{
    margin-bottom:0;

    .price{
        padding:1rem 0;
        text-align:center;
        font-size:0.38rem;
        background:none;
    }

    .msg{
        background:none;
        padding:0 0.4rem;
        p{
            overflow: hidden;
        }
        p *{
            font-size:0.24rem;
        }
        p span{
            color:#808080;
            float:left;
        }
        p small{
            float:right;
        }
    }
}
</style>

