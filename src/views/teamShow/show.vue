<template>
    <div class="container teamShow">
        <div class="ShowPic">
            <img src="@/assets/images/mjms_ico.jpg" alt="">
        </div>

        <div class="team_msg">
            <div class="title">
                <p>标题标题标题标题标题</p>
                <span>5天</span>
            </div>
            <div class="option">
                <p><b class="iconfont">&#xe652;</b>  地点：东北·雪乡</p>
            </div>
            <div class="option">
                <p><b class="iconfont">&#xe645;</b>  类型：露营</p>
                <span><small>3500</small>元/人</span>
            </div>
        </div>

        <tab class="groupCon_tab" v-model="teamContentIndex" :line-width="1" >
            <tab-item @on-item-click="teamContentSelect" class="team_content_item" active-class="team_content_item_active">产品介绍</tab-item>
            <tab-item @on-item-click="teamContentSelect" class="team_content_item" active-class="team_content_item_active">行程准备</tab-item>
            <tab-item @on-item-click="teamContentSelect" class="team_content_item" active-class="team_content_item_active">精选图集</tab-item>
            <tab-item @on-item-click="teamContentSelect" class="team_content_item" active-class="team_content_item_active">费用说明</tab-item>
        </tab>

        <div class="public_content team_introduce" v-show="teamContentIndex == 0">
            产品介绍
        </div>
        <div class="public_content team_trip" v-show="teamContentIndex == 1">
            行程准备
        </div>
        <div class="public_content team_imglist" v-show="teamContentIndex == 2">
            <ul>
                <li>
                    <img src="@/assets/images/mjms_ico.jpg" alt="">
                </li>
                <li>
                    <img src="@/assets/images/mjms_ico.jpg" alt="">
                </li>
                <li>
                    <img src="@/assets/images/mjms_ico.jpg" alt="">
                </li>
            </ul>
        </div>
        <div class="public_content team_instructions" v-show="teamContentIndex == 3">
            费用说明
        </div>

        <div class="team_btns">
            <span class="back" @click="back">返回</span>
            <span class="call" @click="showTeamPlanner">咨询团建策划师</span>
        </div>

        <x-dialog v-model="dialog" hide-on-blur>
            <div class="team_planner">
                <div class="head">
                    <img src="@/assets/images/mjms_ico.jpg" alt="">
                    <div class="r">
                        <p>用户名</p>
                        <span>团建策划师-广州</span>
                    </div>
                </div>
                <div class="planner_ewm">
                    <img src="@/assets/images/mjms_ico.jpg" alt="">
                </div>
                <div class="planner_msg">
                    <p>
                        <i class="iconfont">&#xe60d;</i>
                        <a href="tel:13800138000">13800138000</a>
                    </p>
                    <p>
                        <i class="iconfont">&#xe623;</i>
                        <span>Email: mjms@qq.com</span>
                    </p>
                </div>
            </div>
        </x-dialog>
    </div>
</template>

<script>
    import { Tab, TabItem,Rater } from 'vux'
    export default {
        components:{
             Tab, TabItem,Rater
        },
        data(){
            return{
                teamContentIndex:0,
                dialog:false
            }
        },
        methods: {
            teamContentSelect(){

            },
            back(){
                this.$router.go(-1 )
            },
            showTeamPlanner(){
                this.dialog = !this.dialog
            }
        },
    }
</script>

<style lang="less">
.teamShow{
    .ShowPic{
        width:100%;
        height:3.45rem;
        text-align:center;
        overflow: hidden;
    }
    .ShowPic img{
        .imgCenter;
    }

    .team_msg{
        padding:0 .2rem .2rem;
    }
    .team_msg .title{
        height:1rem;
        border-bottom:.01rem solid #ccc;
        .flex;
        justify-content:space-between;
        align-items:center;
        p{
            flex:8;
            font-size:.32rem;
        }
        span{
            flex:2;
            font-size:.26rem;
            color:@theme;
            text-align:right;
        }
    }

    .team_msg .option{
        margin-top:.2rem;
        .flex;
        justify-content:space-between;
        align-items:center;
        p,span,small,b{
            font-size:.28rem;
        }
        b{
            font-weight:normal;
        }
        small{
            color:#EB6281;
        }
    }

    .public_content{
        padding:.2rem;
    }
    .team_imglist{
        ul{
            width:7.4rem;
            overflow: hidden;
        }
        ul li{
            width:3.4rem;
            height:2.5rem;
            margin:0 .3rem .2rem 0;
            float:left;
            text-align:center;
            overflow: hidden;
        }
        ul li img{
            .imgCenter;
        }
    }

    .team_btns{
        width:100%;
        height:50px;
        .flex;
        position:fixed;
        left:0;
        bottom:0;

        span{
            .btn(auto,50px,@theme,.32rem,#fff,0)
        }
        .back{
            width:40%;
            background:#47A6D4;
        }
        .call{
            width:60%;
        }
    }

    .team_planner{
        .boxSizing;
        border:.01rem solid #ccc;
        padding:.3rem .2rem;
        .head{
            @headHeight:1rem;
            height:@headHeight;
            .flex;
            align-items:center;
            img{
                width:1rem;
                height:@headHeight;
                .borderRadius(@headHeight);
            }
            .r{
                margin-left:.2rem;
                text-align:left;
            }
            .r p{
                font-size:.32rem;
            }
            .r span{
                font-size:.28em;
            }
        }
        .planner_ewm{
            width:5rem;
            height:5rem;
            margin:.3rem auto .3rem;
            img{
                width:100%;
                height:100%;
            }
        }
        .planner_msg{
            width:80%;
            margin:0 auto;
            border-top:.01rem solid #ccc;

            p{
                margin-top:.2rem;
                text-align:left;
            }
            p *{
                font-size:.28rem;
                color:#A3A3A3;
            }
            p i{
                color:@theme;
            }
        }
    }
}
</style>

