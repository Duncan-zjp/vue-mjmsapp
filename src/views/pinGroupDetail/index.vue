<template>
    <div class="container pinGroupDetail">
        <div class="pin_product">
            <div class="pic"><img src="" alt=""></div>
            <div class="msg">
                <p>标题标题标题标题</p>
                <span>价格：¥3999</span>
                <div>
                    <small>4人拼团价</small>
                    <b>¥3099</b>
                </div>
            </div>
        </div>

        <div class="pin_peoples">
            <ul>
                <li><img src="@/assets/images/mjms_ico.jpg" alt=""></li>
                <li><img src="" alt=""></li>
                <li><img src="" alt=""></li>
                <li><img src="" alt=""></li>
                <li><img src="" alt=""></li>
            </ul>
        </div>

        <flow>
            <flow-state  :title="'发起拼团'" is-done></flow-state>
            <flow-line is-done></flow-line>
            <flow-state  :title="'邀请朋友拼团'" is-done></flow-state>
            <flow-line :is-done="false"></flow-line>
            <flow-state  :title="'拼团成功'" is-done></flow-state>
        </flow>

        <div class="pinMsg">点击右上角分享按钮发送给朋友 ↑</div>
    </div>
</template>



<script>
    import { Flow, FlowState, FlowLine } from 'vux'
    export default {
        components:{
            Flow, FlowState, FlowLine
        },
        data(){
            return{
                
            }
        }
    }
</script>


<style lang="less">
.pinGroupDetail{
    margin-bottom:0;

    .pin_product{
        .boxSizing;
        width:100%;
        background:#e6e6e6;
        padding:.2rem .3rem;
        overflow: hidden;
    }
    .pin_product .pic{
        .imgBox(3.15rem,2.6rem);
        .borderRadius(.2rem);
        float:left;
        background:#fff;
        img{
            .imgCenter;
        }
    }
    .pin_product .msg{
        width:3.6rem;
        float:right;
        .flex;
        flex-direction:column;
        justify-content:space-between;
        height:2.6rem;
    }
    .pin_product .msg p{
        font-size:.28rem;
        font-weight:400;
    }
    .pin_product .msg span{
        font-size:.24rem;
        color:#ccc;
        text-decoration:line-through;
    }
    .pin_product .msg div{
        small,b{
            font-weight:normal;
            font-size:.28rem;
        } 
        small{
            color:#808080;
        }
        b{
            color:#f27d3e;
        }
    }

    .pin_peoples{
        padding:.4rem .4rem 0;
        ul{
            width:7.6rem;
            overflow: hidden;
        }
        ul li{
            .imgBox(1rem,1rem);
            .borderRadius(100%);
            float:left;
            margin:0 .9rem .2rem 0;
            background:#ccc;
        }
        ul li img{
            width:100%;
            height:100%;
        }
    }

    .pinMsg{
        text-align:center;
        font-size:.4rem;
        color:@theme;
        padding:2rem .2rem .4rem;
    }
}
</style>

