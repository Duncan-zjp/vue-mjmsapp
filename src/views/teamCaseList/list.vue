<template>
    <div class="container teamCaseList">
        <ul>
            <li>
                <div class="pic">
                    <img src="@/assets/images/mjms_ico.jpg" alt="">
                </div>
                <div class="title">
                    <span>标题标题标题。。。</span>
                    <small>1天/1000人</small>
                </div>
                <div class="bt">
                   <span class="iconfont">&#xe652; 云南·大理</span>
                </div>
            </li>
            <li>
                <div class="pic">
                    <img src="@/assets/images/mjms_ico.jpg" alt="">
                </div>
                <div class="title">
                    <span>标题标题标题。。。</span>
                    <small>1天/1000人</small>
                </div>
                <div class="bt">
                   <span class="iconfont">&#xe652; 云南·大理</span>
                </div>
            </li>
        </ul>
    </div>
</template>


<script>
    export default {
        components:{

        },
        data(){
            return{

            }
        }
    }
</script>


<style lang="less">
.teamCaseList{
    margin-bottom:0;

    margin-bottom:0;
    padding:.2rem .25rem;
    .boxSizing;
    ul li{
        width:100%;
        background:#fff;
        margin-bottom:.2rem;
        padding-bottom:.2rem;
        border-bottom:.01rem solid #ccc;
    }
    ul li .pic{
        width:100%;
        height:3.5rem;
        position: relative;
        text-align:center;
        overflow: hidden;
    }
    ul li img{
        .imgCenter;
    }
    ul li .title{
        margin-top:.2rem;
        .flex;
        align-items:center;
    }
    ul li .title *{
        font-size:.28rem;
    }
    ul li .title span{
        flex:7;
    }
    ul li .title small{
        flex:3;
        text-align:right;
        color:#B2B2B9;
    }
    ul li .bt{
        margin-top:.2rem;
    }
    ul li .bt span{
        display:inline-block;
        height:.5rem;
        line-height:.5rem;
        padding:0 .2rem;
        text-align:center;
        font-size:.26rem;
        color:@theme;
        border:.01rem solid @theme;
        .borderRadius(.5rem);
    }
}
</style>

