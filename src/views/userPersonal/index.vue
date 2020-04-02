<template>
    <div class="container userPersonal">
        <div class="header">
            <div class="coverImg">
                <!-- <img src="" alt=""> -->
            </div>
            <div class="content">
                <div class="headimg">
                    <div class="pic"><img src="@/assets/images/mjms_ico.jpg" alt=""></div>
                    <span>+关注</span>
                </div>
                <div class="username">用户名</div>
                <div class="userlavel">
                    <span>四年级 | 学分530</span>
                </div>
                <div class="bt">
                    <span>3关注</span>
                    <span>0粉丝</span>
                </div>
            </div>
        </div>

        <tab class="content_tab" v-model="ucTabIndex" :line-width="0" >
            <tab-item @on-item-click="uctabselect" class="uc_tab" active-class="uc_tab_active">相册</tab-item>
            <tab-item @on-item-click="uctabselect" class="uc_tab" active-class="uc_tab_active">游记</tab-item>
            <tab-item @on-item-click="uctabselect" class="uc_tab" active-class="uc_tab_active">活动</tab-item>
        </tab>

        <div class="userPersonal_content_wrap">
            <div class="photo_list" v-show="ucTabIndex==0">
                <ul>
                    <router-link :to="{name:'userPersonalPhoto',query:{id:111}}" tag="li">
                        <div class="pic"><img src="" alt=""><span>39张</span></div>
                        <p>标题标题标题</p>
                        <small>2019-1-1</small>
                    </router-link>
                    <router-link to="" tag="li">
                        <div class="pic"><img src="" alt=""><span>39张</span></div>
                        <p>标题标题标题</p>
                        <small>2019-1-1</small>
                    </router-link>
                    <router-link to="" tag="li">
                        <div class="pic"><img src="" alt=""><span>39张</span></div>
                        <p>标题标题标题</p>
                        <small>2019-1-1</small>
                    </router-link>
                </ul>
            </div>

            <div class="tra_list" v-show="ucTabIndex==1">
                <ul>
                    <router-link :to="{name:'travelShow',query:{id:30}}" tag="li">
                        <div class="pic"><img src="" alt=""></div>
                        <p>标题标题标题</p>
                        <div class="bt">
                            <span><small class="iconfont">&#xe677;  </small>19</span>
                            <span>2018-1-1</span>
                        </div>
                    </router-link>
                    <router-link to="" tag="li">
                        <div class="pic"><img src="" alt=""></div>
                        <p>标题标题标题</p>
                        <div class="bt">
                            <span><small class="iconfont">&#xe677;  </small>19</span>
                            <span>2018-1-1</span>
                        </div>
                    </router-link>
                </ul>
            </div>

            <div class="act_list" v-show="ucTabIndex==2">
                <h4>参与活动</h4>
                <ul class="ins">
                    <router-link class="ins" :to="{name:'groupShow',query:{id:2460}}" tag="li">
                        <div class="pic"><img src="" alt=""></div>
                        <div class="title">
                            <p>标题标题标题</p>
                            <span>剩1名额</span>
                        </div>
                        <div class="des">01月10日周六出发 1天</div>
                    </router-link>
                </ul>
                <h4 class="endHead">已结束</h4>
                <ul class="ends">
                    <router-link to="" tag="li">
                        <div class="pic"><img src="" alt=""></div>
                        <div class="content">
                            <p>标题标题标题</p>
                            <span>2019-1-1</span>
                        </div>
                    </router-link>
                    <router-link to="" tag="li">
                        <div class="pic"><img src="" alt=""></div>
                        <div class="content">
                            <p>标题标题标题</p>
                            <span>2019-1-1</span>
                        </div>
                    </router-link>
                    <router-link to="" tag="li">
                        <div class="pic"><img src="" alt=""></div>
                        <div class="content">
                            <p>标题标题标题</p>
                            <span>2019-1-1</span>
                        </div>
                    </router-link>
                </ul>
            </div>
        </div>
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
                ucTabIndex:0
            }
        },
        methods: {
            uctabselect(){

            }
        },
    }
</script>

<style lang="less">
.userPersonal{
    margin-bottom: 0;

    .header{
        width:100%;
        height:3rem;
        position: relative;

        .coverImg{
            width:100%;
            height:100%;
            text-align:center;
            overflow: hidden;
            background:#ccc;
            img{.imgCenter;}
        }

        .content{
            .boxSizing;
            width:100%;
            height:100%;
            position: absolute;
            left:0;
            top:0;
            .flex;
            flex-direction:column;
            justify-content:space-between;
            align-items:center;
            padding:.3rem 0;
            .headimg{
                width:1rem;
                height:1rem;
                position: relative;
                .pic{
                    width:100%;
                    height:100%;
                    img{
                        width:100%;
                        height:100%;
                        .borderRadius(100%);
                    }
                }
                span{
                    background:rgba(0,0,0,.5);
                    .borderRadius(20%);
                    font-size:.24rem;
                    color:#fff;
                    position:absolute;
                    right:-1.5rem;
                    top:.2rem;
                    padding:0 .15rem;
                }
            }

            .username{
                text-align:center;
                font-size:.28rem;
                color:#fff;
                font-weight:300;
            }

            .userlavel{
                padding:0 .2rem;
                height:.3rem;
                background:rgba(0,0,0,.5);
                .borderRadius(.3rem);
                .flex;
                align-items:center;
                span{
                    font-size:.24rem;
                    color:#fff;
                }
            }

            .bt{
                span{
                    font-size:.24rem;
                    color:#fff;
                    margin:0 .2rem;
                }
            }
        }
    }

    .uc_tab{
        .animate(.3s)
    }
    .uc_tab_active{

    }


    .userPersonal_content_wrap{
        background:#fff;
    }
    .photo_list{
        padding:.2rem;
        ul{
            width:7.4rem;
            overflow: hidden;
        }
        ul li{
            width:3.4rem;
            margin:0 .3rem .2rem 0;
            float:left;
        }
        ul li .pic{
            width:100%;
            height:3.4rem;
            text-align:center;
            overflow: hidden;
            position: relative;
            background:#ccc;
        }
        ul li .pic span{
            width:1rem;
            height:.4rem;
            background:rgba(0,0,0,.5);
            font-size:.28rem;
            color:#fff;
            text-align:center;
            .flex;
            justify-content:center;
            align-items:center;
            position:absolute;
            right:0;
            bottom:0;
        }
        ul li p{
            margin-top:.1rem;
            font-size:.28rem;
            .textOverflow;
        }
        ul li small{
            display:block;
            font-size:.26rem;
        }
    }

    .tra_list{
        padding:.2rem .25rem;
        ul li{
            width:100%;
            margin-top:.2rem;
        }
        ul li:first-child{
            margin-top:0;
        }
        ul li .pic{
            width:100%;
            height:3.5rem;
            text-align:center;
            overflow: hidden;
            background:#ccc;
        }
        ul li .pic img{
            .imgCenter;
        }
        ul li p{
            font-size:.28rem;
            margin-top:.1rem;
        }
        ul li .bt{
            .flex;
            justify-content:space-between;
            margin-top:.1rem;
        }
        ul li .bt span,ul li .bt small{
            font-size:.24rem;
        }
    }

    .act_list{
        padding:.2rem .25rem;
        background:#fff;
        h4{
            font-size:.28rem;
            margin-bottom:.1rem;
        }
        .endHead{
            margin-top:.2rem;
        }

        .ins{
            li{
                width:100%;
                margin-top:.2rem;
            }
            li:first-child{
                margin-top:0;
            }
            li .pic{
                width:100%;
                height:3.5rem;
                overflow: hidden;
                text-align:center;
                background:#ccc;
            }
            li .pic img{
                .imgCenter;
            }
            li .title{
                .flex;
                justify-content:space-between;
                align-items:center;
                margin-top:.1rem;
            }
            li .title p{
                width:5rem;
                .textOverflow;
                font-size:.28rem;
            }
            li .title span{
                background:#FC9C2C;
                color:#fff;
                padding:0 .1rem;
                font-size:.24rem;
            }
            li .des{
                font-size:.24rem;
            }
        }

        .ends{
            li{
                width:100%;
                overflow: hidden;
                margin-top:.2rem;
            }
            li:first-child{
                margin-top:0;
            }
            li .pic{
                width:1.8rem;
                height:1.5rem;
                text-align:center;
                overflow: hidden;
                float:left;
                background:#ccc;
            }
            li .pic img{
                .imgCenter;
            }
            li .content{
                width:4.95rem;
                float:right;
                height:1.5rem;
                overflow: hidden;
            }
            li .content p{
                font-size:.28rem;
            }
            li .content span{
                display:block;
                font-size:.24rem;
                color:#c0c0c0;
            }
        }
    }
}
</style>

