<template>
    <div class="container shareIncome">
        <header class="shareIncome_header">
            <h5>下级收益</h5>
            <h4>{{childrenData.totle}}</h4>
            <!-- <span @click="withdrawFn">提现</span> -->
        </header>

        <div class="shareIncome_main">
            <!-- <tab class="shareIncome_tab" v-model="shareIncomeIndex" :line-width="1" custom-bar-width="0.5rem">
                <tab-item  class="shareIncome_tab_item">已分成</tab-item>
                <tab-item  class="shareIncome_tab_item">未分成</tab-item>
            </tab> -->

            <!-- 已分成 -->
            <div v-show="shareIncomeIndex==0" class="Divid">
                <!-- <div class="all">总收入（元）1,456</div> -->

                <div class="list">
                    <ul>
                        <li v-for="(item, index) in childrenData.detail_list" :key="index">
                            <p>
                                <img v-lazy="item.headimg" alt="">
                                <span>{{item.user_name}}</span>
                            </p>
                            <b><span>{{item.income}}</span></b>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 已分成 end -->


            <!-- 未分成 -->
            <div v-show="shareIncomeIndex==1" class="Divid">
                <div class="all">待分成（元）1,456</div>

                <div class="list">
                    <ul>
                        <li>
                            <p>
                                <span>消费商品标题...</span>
                                <small>2018-10-20  17:00</small>
                            </p>
                            <p>
                                <span>100.00</span>
                            </p>
                        </li>
                        <li>
                            <p>
                                <span>消费商品标题...</span>
                                <small>2018-10-20  17:00</small>
                            </p>
                            <p>
                                <span>100.00</span>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 未分成 end -->


        </div>

        <actionsheet v-model="withdraw.show" :menus="withdraw.options" @on-click-menu="withdrawOptionFn" />

        <x-dialog v-model="withdrawContent.show" hide-on-blur>
            <div class="withdrawBox">
                <div class="top">
                    <img src="@/assets/images/wx_ico.png" alt="">
                    <div class="r">
                        <p>提现到微信</p>
                        <span>00:00前到账</span>
                    </div>
                </div>
                <div class="main">
                    <p>提现金额</p>
                    <div class="price">
                        <span>￥</span>
                        <input  type="number">
                    </div>
                </div>
                <p class="msg">可提现金额：12,589.00</p>
                <div class="withdraw_btn">确认提现</div>
            </div>
        </x-dialog>
    </div>
</template>

<script>
    import { Tab, TabItem } from 'vux'
    import {childrenSy} from '@/api/proxy'
    export default{
        
        components:{
            Tab, TabItem
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
                shareIncomeIndex:0,
                // 下级收益数据
                childrenData:{}
            }
        },
        methods:{
            // 点击提现按钮
            withdrawFn(){
                this.withdraw.show = true
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
            // 获取下级收益明细
            getChildrenSy(){
                childrenSy(this.$route.query.cid).then(res => {
                    if(res.status == 200){
                        this.childrenData = res.data.data
                    }
                })
            }
        },
        created() {
            this.getChildrenSy()
        },
    }
</script>

<style lang="less">
.vux-tab,.vux-tab-container{
    height:1rem !important
}
.shareIncome_tab_item{
    line-height:1rem !important;
    font-size:0.28rem !important;
}
.vux-tab-wrap{
    padding-top:1rem !important;
}
.shareIncome{
    width:100%;
    margin-bottom:0;
}
.shareIncome_header{
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

.weui-dialog{
    background:none !important;
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
        font-size:0.24rem;
        color:#ccc;
        text-align:left;
    }
    .withdraw_btn{
        .btn(5rem,1rem,#fb8402,0.4rem,#fff,.2rem);
        margin:0.1rem auto 0;
    }
}

.shareIncome_main{
    margin-top:0.2rem;
    background:none !important;
}

.Divid .all{
    .btn(6.9rem,1.4rem,#fff,.36rem,#10a801,0);
    margin:.2rem auto;
}
.Divid .list{
    background:#fff;

    ul li{
        .flex;
        .boxSizing;
        width:100%;
        height:1.2rem;
        justify-content:space-between;
        align-items:center;
        border-bottom:0.01rem solid #ccc;
        padding:0 0.4rem;;


        p{
            .flex;
            align-items:center;
        }
        p img{
            width:.8rem;
            height:.8rem;
            .borderRadius(.8rem);
            margin-right:.2rem;
        }
        b{
            font-size:.28rem;
            font-weight:normal;
        }
        b span{
            font-size:.28rem;
        }
        p *{
            font-size:0.28rem;
            display:block;
        }
        p span{
            width:4.5rem;
            .textOverflow;
        }
        p small{
            color:#ccc;
        }
    }
    ul li:first-child{
        border-top:0;
    }
}
</style>

