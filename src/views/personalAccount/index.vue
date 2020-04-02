<template>
    <div class="personalAccount container">
        <header class="account_header">
            <span>零钱 0</span>
            <div>提现</div>
        </header>

        <div class="main">
            <div class="mainTop">
                <span>交易记录</span>
                <span>筛选</span>
            </div>
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

<style lang="less" scoped>
.personalAccount{
    margin-bottom:0;
}
.account_header{
    width:100%;
    height:1.2rem;
    background:@theme;
    .flex;
    justify-content:space-between;
    align-items:center;
    .boxSizing;
    padding:0 0.2rem;
    
    span{
        font-size:0.24rem;
        color:#fff;
    }
    div{
        .btn(0.6rem,0.3rem,rgb(183,236,208),0.12rem,@theme,0.05rem)
    }
}
.mainTop{
    height:0.8rem;
    padding:0 0.2rem;
    .flex;
    justify-content:space-between;
    align-items:center;
    .boxSizing;
}
</style>



