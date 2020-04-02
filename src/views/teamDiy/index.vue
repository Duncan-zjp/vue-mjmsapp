<template>
    <div class="container teamDiy">
        <div class="teamBanner">
            <img src="@/assets/images/mjms_ico.jpg" alt="">
        </div>

        <div class="teamClass">
            <ul>
                <router-link :to="{name:'teamList',query:{id:111}}" tag="li" style="background:#49D2B8;">
                    <i class="iconfont">&#xe653;</i>
                    <span>公司团建</span>
                </router-link>
                <router-link to="" tag="li" style="background:#FEA666;">
                    <i class="iconfont">&#xe647;</i>
                    <span>亲子定制</span>
                </router-link>
                <router-link to="" tag="li" style="background:#69C3E8;">
                    <i class="iconfont">&#xe64a;</i>
                    <span>团队旅行</span>
                </router-link>
                <router-link :to="{name:'teamCaseList'}" tag="li" style="background:#FB7D7D;">
                    <i class="iconfont">&#xe6df;</i>
                    <span>活动案例</span>
                </router-link>
            </ul>
        </div>

        <div class="line_list">
            <h4>线路推荐</h4>

            <ul>
                <li>
                    <div class="line_head">
                        <img src="@/assets/images/mjms_ico.jpg" alt="">
                        <div class="wrap">
                            <div>标题标题标题</div>
                            <p>￥3500/人起</p>
                            <span>东北 雪乡</span>
                        </div>
                    </div>
                    <div class="label_list">
                        <div class="label_item">
                            <div class="content">
                                <div class="title">
                                    <span class="iconfont">&#xe73d;</span>标题标题标题
                                </div>
                                <div class="des">
                                    简介简介简介简介
                                </div>
                            </div>
                            <div class="pic"><img src="@/assets/images/mjms_ico.jpg" alt=""></div>
                        </div>
                        <div class="label_item">
                            <div class="content">
                                <div class="title">
                                    <span class="iconfont">&#xe73d;</span>标题标题标题
                                </div>
                                <div class="des">
                                    简介简介简介简介 简介简介简介简介 简介简介简介简介 简介简介简介简介 简介简介简介简介 简介简介简介简介 简介简介简介简介 简介简介简介简介 简介简介简介简介 简介简介简介简介 简介简介简介简介
                                </div>
                            </div>
                            <div class="pic"><img src="@/assets/images/mjms_ico.jpg" alt=""></div>
                        </div>
                    </div>
                    <router-link to="" tag="div" class="line_more">查看详情 ></router-link>
                </li>
                <li>
                    <div class="line_head">
                        <img src="@/assets/images/mjms_ico.jpg" alt="">
                        <div class="wrap">
                            <div>标题标题标题</div>
                            <p>￥3500/人起</p>
                            <span>东北 雪乡</span>
                        </div>
                    </div>
                    <div class="label_list">
                        <div class="label_item">
                            <div class="content">
                                <div class="title">
                                    <span class="iconfont">&#xe73d;</span>标题标题标题
                                </div>
                                <div class="des">
                                    简介简介简介简介
                                </div>
                            </div>
                            <div class="pic"><img src="@/assets/images/mjms_ico.jpg" alt=""></div>
                        </div>
                        <div class="label_item">
                            <div class="content">
                                <div class="title">
                                    <span class="iconfont">&#xe73d;</span>标题标题标题
                                </div>
                                <div class="des">
                                    简介简介简介简介 简介简介简介简介 简介简介简介简介 简介简介简介简介 简介简介简介简介 简介简介简介简介 简介简介简介简介 简介简介简介简介 简介简介简介简介 简介简介简介简介 简介简介简介简介
                                </div>
                            </div>
                            <div class="pic"><img src="@/assets/images/mjms_ico.jpg" alt=""></div>
                        </div>
                    </div>
                    <router-link to="" tag="div" class="line_more">查看详情 ></router-link>
                </li>
            </ul>
        </div>

        <div class="planners">
            <h4>联系我们</h4>
            <h5>全站活动均可联系团建策划师进行个性化定制<br>长按识别二维码，添加微信</h5>

            <swiper class="planner_list" :options="plannerOption" ref="traveSwiper">
                <swiper-slide class="planner_item">
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
                </swiper-slide>
            </swiper>
           
        </div>
    </div>
</template>


<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    const plannerSwiperOption = {
        autoplay:false
    }
    export default {
        components:{
            swiper, swiperSlide
        },
        data(){
            return{
                plannerOption:plannerSwiperOption
            }
        }
    }
</script>

<style lang="less">
.teamDiy{
    margin-bottom:0;

    .teamBanner{
        width:100%;
        height:4rem;
        text-align:center;
        img{
            .imgCenter;
        }
    }

    .teamClass{
        padding:.4rem .4rem .2rem;

        ul{
            .flex;
            justify-content:space-between;
        }
        ul li{
            width:1.5rem;
            height:1.7rem;
            .boxSizing;
            .flex;
            align-content:center;
            text-align:center;
            .borderRadius(.1rem);
        }
        ul li *{
            width:100%;
        }
        ul li i{
            font-size:.5rem;
            width:100%;
            color:#fff;
        }
        ul li span{
            font-size:.28rem;
            color:#fff;
            margin-top:.1rem;
        }
    }

    .line_list{
        margin-top:.2rem;
        padding:.2rem;
        background:none;

        h4{
            font-size:.32rem;
            text-align:center;
            padding-top:.2rem;
            background:#fff;
        }

        ul li{
            margin-bottom:.2rem;
            background:#fff;
            padding:.2rem 0;
        }

        .line_head{
            width:100%;
            height:2.7rem;
            position: relative;
            text-align:center;
            overflow: hidden;
        }
        .line_head img{
            .imgCenter;
        }
        .line_head .wrap{
            width:100%;
            height:100%;
            position:absolute;
            left:0;
            top:0;
            background:-webkit-gradient(linear,0% 0%, 100% 100%, from(rgba(0,0,0,.5)), to(rgba(255,255,255,.2)), color-stop(0.4,rgba(255,255,255,.2)));
            .flex;
            flex-wrap:wrap;
            align-content:center;
        }
        .line_head .wrap *{
            width:100%;
            color:#fff;
            text-align:left;
            padding:0 .15rem;
        }
        .line_head .wrap div{
            font-size:.32rem;
        }
        .line_head .wrap p{
            font-size:.28rem;
        }
        .line_head .wrap span{
            font-size:.28rem;
        }

        .label_list{
            margin-top:.2rem;
        }
        .label_item{
            .flex;
            justify-content:space-between;
            margin-top:.2rem;
        }
        .label_item .content{
            width:4rem;
            .title{
                .flex;
                align-items:center;
                font-size:.28rem;
                .textOverflow;
            }
            .title span,.title p{
                font-size:.28rem;
            }
            .title span{
                color:#FF551E;
                width:.4rem;
            }
            .des{
                padding-left:.4rem;
                margin-top:.1rem;
                font-size:.26rem;
                color:#A3A3A3;
                line-height:20px;
                height:60px;
                overflow: hidden;
            }
        }
        .label_item .pic{
            width:3rem;
            height:1.8rem;
            text-align:center;
            overflow: hidden;
        }
        .label_item .pic img{
            .imgCenter;
        }

        .line_more{
            width:100%;
            font-size:.32rem;
            text-align:center;
            color:@theme;
            margin-top:.2rem;
        }
    }

    .planners{
        padding-top:.4rem;
        h4,h5{
            text-align:center;
        }
        h4{
            font-size:.4rem;
        }
        h5{
            color:#A3A3A3;
            font-size:.32rem;
            margin:.3rem 0 .4rem;
        }
    }

    .planner_list{
        width:6rem;
        margin:0 auto;
    }
    .planner_item{
        .boxSizing;
        border:.01rem solid #ccc;
        padding:.3rem .2rem;
    }
    .planner_item .head{
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
        }
        .r p{
            font-size:.32rem;
        }
        .r span{
            font-size:.28em;
        }
    }
    .planner_item .planner_ewm{
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
</style>
