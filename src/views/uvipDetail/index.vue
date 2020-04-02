<template>
    <div class="uvipDetail">
        <div class="head">
            <p>{{userData.user_name}}</p>
            <img v-lazy="userData.headimg" alt="">
            <span class="iconfont">&#xe639; {{userData.account_role}}</span>
        </div>

        <div class="public_top">如何成为会员</div>

        <div class="uvipDetail_msg">凡在蜂足平台<span>消费任意旅游线路一次</span>，即可成为蜂足会员。</div>

        <div class="public_top">会员权益</div>

        <div class="uvipDetail_con">
            <x-table full-bordered style="background-color:#fff;">
                <!-- <thead style="display:none;">
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead> -->
                <tbody>
                    <tr>
                        <td style="background:#f8e07e;">分享有益</td>
                        <td colspan="2">分享平台任意产品链接并促成交易</td>
                    </tr>
                    <tr>
                        <td style="background:#f8e07e;">产品类型</td>
                        <td>旅游线路</td>
                        <td>土特产</td>
                    </tr>
                    <tr>
                        <td style="background:#f8e07e;">返利规则</td>
                        <td>返利8%</td>
                        <td>返利3%</td>
                    </tr>
                    <tr>
                        <td colspan="3" style="text-align:left;padding-left:10px;">在<span>“我的返利”</span>可提现哦！</td>
                    </tr>
                </tbody>
            </x-table>
        </div>
    </div>
</template>

<script>
    import {getUserData} from '@/api/other'
    import { XTable } from 'vux'
    export default {
        components:{
            XTable
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
.uvipDetail{
    margin-bottom:0;

    .head{
        width:100%;
        height:3.08rem;
        background:url(http://shop.cnmjms.com/mobile/apptest/images/vip_head_bg.jpg);
        background-size:100% 100%;
        .flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;

        *{
            margin:.1rem 0;
        }
        p{
            font-size:.28rem;
            color:#fff;
        }
        img{
            width:1.2rem;
            height:1.2rem;
            .borderRadius(1.2rem)
        }
        span{
            font-size:.28rem;
            color:#e9f108;
        }
    }

    .public_top{
        .btn(100%,1rem,#f4cf39,.32rem,#333,0)
    }

    .uvipDetail_msg{
        padding:.4rem;
        font-size:.28rem;

        span{
            color:#dea22f;
            font-size:.28rem;
            line-height:.6rem;
        }
    }

    .uvipDetail_con{
        padding:.2rem;

        tr td span{
            color:@theme;
        }
    }
}
</style>



