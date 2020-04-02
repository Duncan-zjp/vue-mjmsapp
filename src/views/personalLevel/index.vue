<template>
    <div class="personalLevel">
        <button-tab v-model="personalLevelIndex">
            <button-tab-item selected>成就中心</button-tab-item>
            <button-tab-item>用户体系</button-tab-item>
        </button-tab>

        <!-- 成就中心 -->
        <div v-show="personalLevelIndex==0" class="myLevel">
            <div class="myLevel_wrap">
                <div class="pic">
                    <img src="@/assets/images/mjms_ico.jpg" alt="">
                </div>
                <div class="text">
                    <span>用户名</span>
                    <span>0学分</span>
                </div>
                <div class="text">
                    <small>还差100学分即可升级到</small>
                    <small>一年级</small>
                </div>
            </div>

            <div class="level_list">
                <div class="item">
                    <div class="title">小学</div>
                    <div class="msg">
                        <span>100-999学分</span>
                        <span>奖励32号代金券</span>
                    </div>
                </div>
                <div class="item">
                    <div class="title">初中</div>
                    <div class="msg">
                        <span>1000-1999学分</span>
                        <span>奖励32号代金券</span>
                    </div>
                </div>
                <div class="item">
                    <div class="title">高中</div>
                    <div class="msg">
                        <span>2000-2999学分</span>
                        <span>奖励32号代金券</span>
                    </div>
                </div>
                <div class="item">
                    <div class="title">大学</div>
                    <div class="msg">
                        <span>3000-3999学分</span>
                        <span>奖励32号代金券</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 成就中心 end -->


        <!-- 用户体系 -->
        <div v-show="personalLevelIndex==1" class="user_sys">
            sss
        </div>
        <!-- 用户体系 end -->

    </div>
</template>

<script>
    import { ButtonTab, ButtonTabItem } from 'vux'
    export default{
        components:{
             ButtonTab,ButtonTabItem
        },
        data(){
            return{
                personalLevelIndex:0
            }
        }
    }
</script>


<style lang="less" scoped>
.vux-button-tab-item{
    background:rgb(228,228,228) !important;
    &::after{
        display:none;
    }
}
.vux-button-group-current{
    background:#fff !important;
    color:#000 !important;
}
.myLevel{
    padding:0.5rem 0.3rem 0;
    overflow: hidden;
    &_wrap{
       width:2.3rem;
       float:left;

       .pic{
           width:100%;
           height:2.1rem;
           img{width:100%;height:100%}
       }
       .text{
           font-size:0;
           margin:0.1rem 0;
       }
       .text span,.text small{
           font-size:0.14rem;
           color:rgb(180,180,180)
       }
       .text span{
           color:rgb(255,128,51)
       }
       .text small{
           text-align:center;
       }
    }

    .level_list{
        width:3.4rem;
        .flex;
        align-content:flex-end;
        flex-wrap:wrap;
        float:right;

        .item{
            width:100%;
            height:0.7rem;
            overflow: hidden;
            .borderRadius(.1rem);
            margin-top:0.2rem;
        }
        .item:first-child{
            margin-top:0;
        }
        .item div{
            height:100%;
            float:left;
        }
        .item .title{
            width:0.6rem;
            text-align:center;
            line-height:0.7rem;
            background:rgb(153,153,153);
            font-size:0.2rem;
            color:#fff;
        }
        .item .msg{
            .boxSizing;
            width:2.8rem;
            .flex;
            align-content:space-between;
            flex-wrap:wrap; 
            padding:0.1rem 0 0.1rem 0.1rem;
            background:rgb(198,198,198)
        }
        .item .msg span{
            width:100%;
            font-size:0.12rem;
            color:#fff;
        }
    }
}
</style>

