<template>
    <div class="usignIn">
        <div class="head">
           <p>已签到</p>
           <p><span>{{userData.days?userData.days:'0'}}</span>天</p>
           <div @click="signFn">点击签到</div>
        </div>

        <div class="con">
            <p><span>签到规则：</span></p>
            <p>1、每天签到一次，即可获得100积分；</p>
            <p>2、每年签到超过300天，可获得<span>500元旅游优惠券</span>，不可兑现。</p>
            <p>3、每过一个自然年（按公历），签到天数清零。</p>
            <p>4、可到“积分换购”处换购商品。</p>
        </div>
    </div>
</template>


<script>
    import {signin,getUserData} from '@/api/other'
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
            },
            signFn(){
                signin().then(res => {
                    this.getUser()
                    if(res.status == 200){
                        this.$vux.toast.text('签到成功')
                    }else{
                        this.$vux.toast.text(res.data.message)
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
.usignIn{
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
        span{
            font-size:.8rem;
        }
        div{
            .btn(2.5rem,.6rem,none,.28rem,#fff,.8rem);
            border:.01rem solid #fff;
        }
    }

    .con{
        padding:.3rem;
        p{
            line-height:.6rem;
        }
        p,span{
            font-size:.28rem;
        }
        span{
            color:@theme;
        }
    }
}
    
</style>

