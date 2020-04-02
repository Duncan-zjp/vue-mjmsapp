<template>
    <div class="container proxy">
        
        <header class="proxy_header">
            <router-link :to="{name:'incomeDetails'}" tag="h5">总收益余额（元）</router-link>
            <!-- <h5>总收益余额（元）</h5>
            <h4>{{sydata.totle}}</h4> -->
            <router-link :to="{name:'incomeDetails'}" tag="h4">{{sydata.totle}}</router-link>
            <span @click="withdrawFn">提现</span>
        </header>

        <div class="proxy_main">
            <div class="proxy_main_top">
                <p>收益明细（{{sydata.list?sydata.list.length:''}}）</p>
                <span>{{sydata.totle}}</span>
            </div>

            <div class="proxy_account">
                <router-link class="ac_item" :to="{name:'shareIncome',query:{cid:item.user_id}}" tag="div" v-for="(item, index) in sydata.list" :key="index">
                    <p>
                        <img v-lazy="item.headimg" alt="">
                        <b>
                            <span>{{item.user_name}}</span>
                            <small>加入代理：{{item.time}}</small>
                        </b>
                    </p>
                    <p>
                        <span>
                            <small>收益：{{item.totle}}</small>
                            <small>消费：{{item.consumption}}</small>
                        </span>
                    </p>
                </router-link>
            </div>
        </div>

        <actionsheet v-model="withdraw.show" :menus="withdraw.options" @on-click-menu="withdrawOptionFn" />

        <x-dialog v-model="withdrawContent.show" hide-on-blur>
            <div class="withdrawBox">
                <div class="top">
                    <img src="@/assets/images/wx_ico.png" alt="">
                    <div class="r">
                        <p>提现到微信</p>
                        <span>72小时内到账</span>
                    </div>
                </div>
                <div class="main">
                    <p>提现金额</p>
                    <div class="price">
                        <span>￥</span>
                        <input v-model="withdrawContent.val"  type="number">
                    </div>
                </div>
                <p class="msg">可提现金额：<span>{{sydata.totle}}</span></p>
                <p class="msg">请输入<span>1-5000</span>的提现金额</p>
                <p class="msg">一天最多可提现<span>3</span>次</p>
                <div v-show="parseFloat(sydata.totle) >= 1" class="withdraw_btn" @click="withdrawInfo">确认提现</div>
                <div v-show="parseFloat(sydata.totle) < 1" class="withdraw_btn withdraw_btnNo">确认提现</div>
            </div>
        </x-dialog>
    </div>
</template>

<script>
    import {getsy,withdrawal} from '@/api/proxy'
    import {bindUid} from '@/api/other'
    export default{
        components:{

        },
        data(){
            return{
                // 提现选择
                withdraw:{
                    show:false,
                    options:{
                        a: '提现记录',
                        b: '提现'
                    }
                },
                // 提现内容
                withdrawContent:{
                    show:false,
                    val:''
                },
                // 收益数据
                sydata:{}
            }
        },
        methods:{
            // 点击提现按钮
            withdrawFn(){
                this.withdraw.show = true

                // let appUser = JSON.parse(window.localStorage.getItem('appUser'));
                // if(!appUser.unionid || appUser.unionid == ''){
                //     this.$vux.confirm.show({
                //         content:'首次提现需要绑定到微信小程序，点击确定重新登陆用户绑定小程序',
                //         onConfirm () {
                //             window.localStorage.removeItem('appUser')
                //             window.location.reload(true)
                //         }
                //     })
                //     return;
                // }
                // bindUid(appUser.unionid).then(res => {
                //     if(res.status == 200){
                //         alert('成功')
                //     }
                // })
            },
            //点击提现菜单项
            withdrawOptionFn(key){
                if(key == 'a'){
                    console.log('提现记录')
                    this.$router.push({name:'withdrawList'})
                }else{
                    console.log('提现')
                    this.withdrawContent.show = true;
                } 
            },
            // 获取收益明细
            getsy(){
                getsy().then(res => {
                    if(res.status == 200){
                        this.sydata = res.data.data
                        console.log(this.sydata)
                    }
                })
            },
            // 确认提现
            withdrawInfo(){
                if(parseFloat(this.withdrawContent.val) < 1 || parseFloat(this.withdrawContent.val) > 5000 || this.withdrawContent.val == ''){
                    this.$vux.toast.text('请输入1-5000的提现金额');
                    return;
                }
                this.withdrawContent.show = false
                withdrawal(this.withdrawContent.val).then(res => {
                    if(res.status == 200){
                        this.$vux.toast.text('提现成功，请注意查收');
                    }else{
                        this.$vux.toast.text(`提现失败，原因：${res.data.message}`);
                    }
                    this.getsy()
                })
            }
        },
        created() {
            this.getsy()
        },
    }
</script>

<style lang="less">
.proxy{
    width:100%;
    margin-bottom:0;
}
.proxy_header{
    width:100%;
    height:3.6rem;
    background:#2cc490;
    position: relative;
    padding:1.3rem 0 0 0.7rem;
    .boxSizing;

    h5,h4,span{
        color:#fff;
    }
    h5{
        font-size:0.32rem;
    }
    h4{
        font-size:0.7rem;
    }
    span{
        font-size:0.32rem;
        position:absolute;
        top:0.2rem;
        right:0.2rem;
    }
}
.proxy_main{
    width:100%;
    background:none !important;
}
.proxy_main_top{
    width:100%;
    height:1.6rem;
    .flex;
    flex-wrap:wrap;
    align-content:center;
    background:#fff;

    p,span{
        width:100%;
        text-align:center;
    }
    p{
        font-size:0.32rem;
    }
    span{
        font-size:0.32rem;
        color:#10a801;
    }
}
.proxy_account{
    margin-top:0.2rem;
    background:#fff;

    .ac_item{
        .flex;
        width:100%;
        height:1.4rem;
        .boxSizing;
        padding:0 0.2rem;
        justify-content:space-between;
        align-items:center;
        border-top:0.01rem solid #ccc;
        &:first-child{
            border-top:0;
        }

        p{
            .flex;
        }
        
        p b{
            width:3.5rem;
            font-weight:normal;
            margin-left:.2rem;
        }
        p img{
            width:.8rem;
            height:.8rem;
            .borderRadius(.8rem)
        }
        p span,p small{
            display:block;
            width:100%;
        }
        p span{
            font-size:0.32rem;
            .textOverflow;
        }
        p small{
            font-size:0.24rem;
            color:#ccc;
        }
        p span small{
            color:#999;
        }
    }
}
.weui-dialog{
    // background:none !important;
}
.withdrawBox{
    .boxSizing;
    width:6.5rem;
    padding:0.25rem;
    margin:0 auto;
    background:#fff;
    .borderRadius(.2rem);

    .top{
        padding-bottom:0.2rem;
        border-bottom:0.01rem solid #ccc;
        .flex;
        justify-content: flex-start;
        align-items:center;
        height:0.8rem;

        img{
            width:0.8rem;
            height:0.8rem;
        }

        .r{
            padding-left:0.2rem;
        }
        .r p{
            font-size:0.32rem;
        }
        .r{
            span{
                display:block;
                font-size:0.24rem;
                color:#ccc;
            }
        }
    }

    .main{
        width:100%;
        background:#f2f2f2;
        .boxSizing;
        padding:0.2rem 0.1rem;
        p{
            font-size:0.28rem;
            text-align:left;
        }
        .price{
            .flex;
            justify-content: flex-start;
            align-items:center;
        }
        .price span{
            font-size:0.32rem;
        }
        .price input{
            height:1rem;
            font-size:0.4rem;
        }
    }
    .msg{
        font-size:0.28rem;
        color:#999999;
        text-align:left;
        margin-top:.1rem;
    }
    .msg span{
        font-size:0.28rem;
        color:@theme;
    }
    .withdraw_btn{
        .btn(5rem,1rem,#fb8402,0.4rem,#fff,.2rem);
        margin:0.3rem auto 0;
    }
    .withdraw_btnNo{
        background:#999999 !important;
        color:#fff;
    }
}
</style>

