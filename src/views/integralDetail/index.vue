<template>
    <div class="integralDetail">
        <div class="head">
            <p>{{userData.user_name}}</p>
            <img v-lazy="userData.headimg" alt="">
            <p>我的积分</p>
            <b>{{userData.rank_points}}</b>
        </div>

        <div class="line"></div>
        <div class="integral_get_title"></div>

        <div class="con">
            <p>1、于本平台消费即可获得相应积分，每消费1元获得1积分；</p>
            <p>2、<span>每日签到：</span>每天签到到一次获得100积分；</p>
            <p>3、<span>额外奖励：</span>连续签到30天，额外奖励500积分，即全年(按自然年算)签到最高额外奖励可达6000积分。</p>
        </div>

        <div class="integral_use_title"></div>

        <div class="con">
            <p>积分可在“我的”<span>-“积分换购”</span>处换取相应商品。</p>
        </div>
    </div>
</template>


<script>
    import {getUserData} from '@/api/other'
    export default {
        components:{

        },
        data(){
            return{
                userData:{}
            }
        },
        methods: {
            getUser(){
                getUserData().then(res => {
                    if(res.status == 200){
                        this.userData = res.data.data
                    }
                })
            }
        },
        created() {
            this.getUser()
        },
    }
</script>

<style lang="less">
.integralDetail{
    margin-bottom:0;
    background:#fef4e7;
    min-height:calc(100vh);

    .head{
        width:100%;
        height:4rem;
        background:url(http://shop.cnmjms.com/mobile/apptest/images/integral_head_bg.jpg) 100% 100%;
        .flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        *{
            color:#fff;
            margin:.1rem 0;
        }
        p{
            font-size:.28rem;
        }
        img{
            width:1.2rem;
            height:1.2rem;
            .borderRadius(1.2rem)
        }
        b{
            font-size:.4rem;
            font-weight:normal;
        }
    }

    .line{
        width:90%;
        height:1rem;
        background-image:-webkit-gradient(linear,0% 0%, 0% 65%, from(#ECDAC3), to(#FAEEDF), color-stop(0.0,#FFFFFF));
        margin:0 auto;
    }

    .integral_get_title{
        width:3.41rem;
        height:.76rem;
        background:url(http://shop.cnmjms.com/mobile/apptest/images/integral_get_title_bg.png);
        background-size:100% 100%;
        margin:-.5rem auto 0;
    }

    .con{
        padding:.5rem .3rem 0;

        p{
            font-size:.28rem;
            line-height:.5rem;
        }
        span{
            font-size:.28rem;
            color:@theme;
        }
    }

    .integral_use_title{
        width:3.41rem;
        height:.76rem;
        background:url(http://shop.cnmjms.com/mobile/apptest/images/integral_use_title_bg.png);
        background-size:100% 100%;
        margin:.3rem auto 0;
    }
}
</style>

