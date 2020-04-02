<template>
    <div class="container teamList">
        <ul>
            <router-link tag="li" :to="{name:'teamShow',query:{id:111}}">
                <div class="pic">
                    <img src="@/assets/images/mjms_ico.jpg" alt="">
                </div>
                <div class="title">标题标题标题。。。</div>
                <div class="bt">
                    <p>
                        <i class="iconfont">&#xe652;</i>
                        <span>清远·英德市</span>
                    </p>
                    <small>￥180/人起</small>
                </div>
            </router-link>
            <li>
                <div class="pic">
                    <img src="@/assets/images/mjms_ico.jpg" alt="">
                </div>
                <div class="title">标题标题标题。。。</div>
                <div class="bt">
                    <p>
                        <i class="iconfont">&#xe652;</i>
                        <span>清远·英德市</span>
                    </p>
                    <small>￥180/人起</small>
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
.teamList{
    margin-bottom:0;
    padding:.2rem .25rem;
    .boxSizing;
    ul li{
        width:100%;
        background:#fff;
        margin-bottom:.2rem;
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
        font-size:.32rem;
        .textOverflow;
        padding:0 .2rem;
    }
    ul li .bt{
        .flex;
        justify-content:space-between;
        align-items:center;
        padding:.2rem;
    }
    ul li .bt *{
        font-size:.28rem;
        color:#7F7F7F;
    }
    ul li .bt span{
        margin-left:.2rem;
    }
}
</style>

