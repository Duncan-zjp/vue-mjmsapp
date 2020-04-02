<template>
    <div class="container groupShow" v-if="viewShow">

        <router-link class="showHeader" to="">
            <div class="pic">
                <img :src="data.goods_thumb" alt="">
            </div>
            <div class="title">
                <span>{{data.goods_name}}</span>
            </div>
            <!-- <div class="picNum">
                <span class="iconfont">&#xe67f;</span>
                <span> 125张</span>
            </div> -->
        </router-link>

        <!-- 基本信息 -->
        <div class="group_idn">
            <div class="u">
                <img :src="data.leader_headimg" alt="">
                <div class="r">
                    <p>{{data.leader_user_name}}</p>
                    <!-- <span>评分：x.xx（xx人评）</span> -->
                </div>
                <p class="price"><span>{{data.shop_price}}</span>元1人</p>
            </div>
            <div class="msg">
                <!-- <span>{{data.rank_integral}}学分</span> -->
                <span>4.95学分</span>
            </div>
            <div class="add_and_price">
                <p v-for="(item, index) in data.group_places" :key="index" @click="selectjhFn(index,item.log_id,data.goods_id,data.select_openGroups.group_id)">
                    <span :class="selectjh == index ? 'on' : ''">集合点{{index+1}}：{{item.place}}</span>
                    <small v-if="selectjh == index" class="iconfont">&#xe6ab;</small>
                </p>
                <!-- <p><span>{{data.shop_price}}</span>元1人</p> -->
            </div>
        </div>
        <!-- 基本信息 end -->


        <!-- 拼团 -->
        <!-- <div class="teamGroup_list">
            <ul>
                <li>
                    <div class="head"><img src="@/assets/images/mjms_ico.jpg" alt=""></div>
                    <div class="msg">
                        <p>用户名用户名</p>
                        <span>还差1人，距离结束剩1天</span>
                    </div>
                    <router-link v-if="!data.openGroups" :to="{name:'groupStart',query:{id:data.goods_id,days:data.days,supplierid:data.supplier_id,address:urlCode(),price:data.shop_price,child_price:data.child_price,baby_price:data.baby_price}}" tag="span" class="joinBtn">参加拼团</router-link>
                    <router-link v-else :to="{name:'groupSign',query:{price:data.select_openGroups.money,id:data.goods_id,groupid:data.select_openGroups.group_id,isstart:0,supplierid:data.supplier_id,starttime:data.select_openGroups.start_time,endtime:data.select_openGroups.end_time,address:urlCode(),child_price:data.child_price,baby_price:data.baby_price}}" tag="span" class="joinBtn">参加拼团</router-link>
                </li>
                <li>
                    <div class="head"><img src="@/assets/images/mjms_ico.jpg" alt=""></div>
                    <div class="msg">
                        <p>用户名用户名</p>
                        <span>还差1人，距离结束剩1天</span>
                    </div>
                    <router-link v-if="!data.openGroups" :to="{name:'groupStart',query:{id:data.goods_id,days:data.days,supplierid:data.supplier_id,address:urlCode(),price:data.shop_price,child_price:data.child_price,baby_price:data.baby_price}}" tag="span" class="joinBtn">参加拼团</router-link>
                    <router-link v-else :to="{name:'groupSign',query:{price:data.select_openGroups.money,id:data.goods_id,groupid:data.select_openGroups.group_id,isstart:0,supplierid:data.supplier_id,starttime:data.select_openGroups.start_time,endtime:data.select_openGroups.end_time,address:urlCode(),child_price:data.child_price,baby_price:data.baby_price}}" tag="span" class="joinBtn">参加拼团</router-link>
                </li>
            </ul>
        </div> -->
        <!-- 拼团 end -->


        <!-- 时间 -->
        <div class="group_time">
            <div class="top">
                <span>{{data.start_time}}</span>
                <span @click="showewm">我要定制 ></span>
            </div>
            <swiper class="tl" :options="timeListOption" ref="timeListSwiper">
                <swiper-slide class="item" v-for="(item, index) in data.openGroups" :key="index">
                    <div @click="selectGroup(data.goods_id,item.group_id)" :class="`item_wrap ${item.is_selected == 1 ? 'active': ''}`">
                        <p>{{item.start_time}}</p>
                        <span>{{item.stauts}}</span>
                        <i v-if="item.is_selected == 1" class="iconfont">&#xe654;</i>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
        <!-- 时间 end -->

        <!-- 已参加的人 -->
        <div class="group_joined" v-if="data.select_openGroups">
            <div class="top">
                <span>已参团的人（{{data.select_openGroups.group_number}}人成行）</span>
                <router-link :to="{name:'groupPeople',query:{groupid:data.select_openGroups.group_id}}" tag="span">总共<small>{{data.select_openGroups.memberlist.members_num}}</small>/{{data.max_number}}人 ></router-link>
            </div>
            <div class="list">
                <ul>
                    <li v-for="(item, index) in data.select_openGroups.memberlist.members" :key="index">
                        <div class="pic">
                            <img :src="item.headimg" alt="">
                            <small v-if="parseInt(item.num) > 1">{{item.num}}</small>
                        </div>
                        
                        <span>{{item.user_name}}</span>
                    </li>



                    <!-- <li v-if="item.is_leader === '1'" v-for="(item, index) in data.select_openGroups.memberlist.members" :key="index">
                        <div class="pic">
                            <img :src="item.headimg" alt="">
                        </div>
                        
                        <span>{{item.user_name}}</span>
                    </li>
                    <router-link v-if="item.is_leader === '0'" :to="{name:'userPersonalIndex',query:{uid:111}}" tag="li" v-for="(item, index) in data.select_openGroups.memberlist.members" :key="index">
                        <div class="pic">
                            <img :src="item.headimg" alt="">
                            <small>{{item.num}}</small>
                        </div>
                        
                        <span>{{item.user_name}}</span>
                    </router-link> -->
                    
                </ul>
            </div>
        </div>
        <!-- 已参加的人 end -->

        <!-- 主体内容 -->
        <div class="group_content" ref="group_content">
            <tab class="groupCon_tab " v-model="groupContentIndex" :line-width="1" ref="groupCon_tab">
                <tab-item @on-item-click="groupContentSelect" class="group_content_item" active-class="group_content_item_active">活动详情</tab-item>
                <tab-item @on-item-click="groupContentSelect" class="group_content_item" active-class="group_content_item_active">行程与准备</tab-item>
                <tab-item @on-item-click="groupContentSelect" class="group_content_item" active-class="group_content_item_active">费用说明</tab-item>
                <tab-item @on-item-click="groupContentSelect" class="group_content_item" active-class="group_content_item_active">评价</tab-item>
            </tab>

            <div class="publicGroupShowContent group_show_content" ref="group_show_content">
                <div class="content_wrap" v-html="data.goods_desc"></div>
            </div>
            <div class="publicGroupShowContent group_stroke" ref="group_stroke">
                <div class="content_wrap" v-html="data.trip_desc"></div>
            </div>
            <div class="publicGroupShowContent group_description" ref="group_description">
               <div class="content_wrap" v-html="data.cost_desc"></div>
            </div>
            <div class="publicGroupShowContent group_evaluation" ref="group_evaluation">
                <div class="content_wrap">

                    <div class="eva_list">
                        <h4>最新评价</h4>
                        <ul>
                            <li v-for="(item, index) in data.commentList" :key="index">
                                <div class="u">
                                    <img v-lazy="item.headimg" alt="">
                                    <span>{{item.user_name}}</span>
                                </div>
                                <div class="des">
                                    <div class="title">{{item.content}}</div>
                                    <rater class="p" disabled active-color="#FFA000" :font-size="14" v-model="item.comment_rank"></rater>
                                    <div class="bt">{{item.add_time}}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 主体内容 end -->


        <!-- 底部安妮 -->
        <div class="show_btns">
            <router-link class="item home" :to="{name:'index'}" tag="div">
                <span class="iconfont">&#xe610;</span>
                <span>更多</span>
            </router-link>
            <!-- <div class="item in" @click="showewm">
                <span class="iconfont">&#xe622;</span>
                <span>进群</span>
            </div> -->
            <router-link v-if="!data.openGroups" class="item go" :to="{name:'groupStart',query:{id:data.goods_id,days:data.days,supplierid:data.supplier_id,address:urlCode(),price:data.shop_price,child_price:data.child_price,baby_price:data.baby_price,jhid:selectjhId}}" tag="div">
                <span>选择时间</span>
            </router-link>
            <router-link v-if="data.openGroups && data.select_openGroups.is_full != '1'" class="item go" :to="{name:'groupSign',query:{price:data.shop_price,id:data.goods_id,groupid:data.select_openGroups.group_id,isstart:0,supplierid:data.supplier_id,starttime:data.select_openGroups.start_time,endtime:data.select_openGroups.end_time,address:urlCode(),child_price:data.child_price,baby_price:data.baby_price,jhid:selectjhId}}" tag="div">
                <span>立刻报名</span>
            </router-link>
            <div v-if="data.openGroups && data.select_openGroups.is_full === '1'" class="item go full">
                <span>已满员</span>
            </div>
        </div>
        <!-- 底部安妮 end -->


        <!-- 弹窗二维码 -->
        <x-dialog v-model="dialog" hide-on-blur>
            <div class="kfewm">
                <img src="@/assets/images/kf_ewm.jpg" alt="">
            </div>
        </x-dialog>
        <!-- 弹窗二维码 end -->

        <!-- 引导关注公众号 -->
        <x-dialog v-model="focusEwm" hide-on-blur class="focusDialog">
            <div class="kfewm" @click="openGzh">
                <img v-lazy="gzhimg" alt="">
            </div>
            <div class="msg">
                <p>点击二维码，长按关注蜂足公众号，多种线路等你来玩。</p>
            </div>
        </x-dialog>
        <!-- 引导关注公众号end -->

       <hotProduct />

    </div>
</template>

<script>
    import { Tab, TabItem,Rater } from 'vux'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import {show,selectGroup,selectJh} from '@/api/group'
    import {bind} from '@/api/bindUser'
    import {changeFocus} from '@/api/user'
    import { Checker, CheckerItem } from 'vux'
    import {scrollBottom,scrollOption} from '@/util/other'
    import hotProduct from '@/components/hotProduct/hotProduct'
    const timeListOption = {
        autoplay:false,
        slidesPerView: 2,
        spaceBetween:10
    }
    export default{
        components:{
            swiper,swiperSlide,Tab,TabItem,Rater,Checker, CheckerItem,hotProduct
        },
        data(){
            return{
                dialog:false,
                focusEwm:false,
                viewShow:false,
                timeListOption:timeListOption,
                groupContentIndex:0,
                data3:'5',
                // 商品数据
                data:{},
                // 公众号二维码
                gzhimg:'http://shop.cnmjms.com/wechatlogo.png',
                // 选中的集合地点
                selectjh:0,
                // 选中的集合地点id
                selectjhId:null
            }
        },
        methods:{
            // 获取商品详情数据
            showData(){
                let vm = this;
                let _id = this.$route.query.id
                show(_id).then(res => {
                    if(res.status == 200){
                        this.data = res.data.data
                        this.viewShow = true
                        // 设置默认选中集合地点的id
                        this.selectjhId = res.data.data.group_places[0] ? res.data.data.group_places[0].log_id : ''
                        console.log(this.data)
                    }
                }).then(()=>{
                    let userid = window.localStorage.getItem('appUser') ? JSON.parse( window.localStorage.getItem('appUser')).user_id : ''
                    // 自定义分享内容
                    let [_title,_img,_goosid] = [this.data.goods_name,this.data.goods_thumb,this.data.goods_id]
                    this.$wechat.ready(function(){
                        // alert('jssdk ready')
                        vm.$wechat.onMenuShareAppMessage({
                            title: _title, // 分享标题
                            desc: `http://shop.cnmjms.com/mobile/apptest/#/group/show?id=${_goosid}&userid=${userid}`, // 分享描述
                            link: `http://shop.cnmjms.com/mobile/apptest/#/group/show?id=${_goosid}&userid=${userid}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: _img, // 分享图标
                            type: '', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                                // 用户点击了分享后执行的回调函数
                                // alert(`分享出去的${location.href}&userid=${userid}`)
                            },
                            fail:function(res){
                                // alert(JSON.stringify(res))
                            }
                        });
                        // 自定义盆友圈分享
                        vm.$wechat.onMenuShareTimeline({
                            title: _title, // 分享标题
                            link: `http://shop.cnmjms.com/mobile/apptest/#/group/show?id=${_goosid}&userid=${userid}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: _img, // 分享图标
                            success: function () {
                                // 用户点击了分享后执行的回调函数
                            }
                        })
                    })

                    
                })
            },
            groupContentSelect(i){
                // 波动值
                let sm = 0
                if($(this.$refs.groupCon_tab.$el).hasClass('groupCon_tabFixed')){
                    sm = 44
                }else{
                    sm = 44*2
                }
                console.log(sm)
                if(i == 0){
                    $('body,html').animate({  
                            scrollTop: parseInt($(this.$refs.group_show_content).offset().top)
                        }, 500  
                    );  
                }
                if(i == 1){
                    $('body,html').animate({  
                            scrollTop: parseInt($(this.$refs.group_stroke).offset().top  - sm)
                        }, 500  
                    );  
                }
                if(i == 2){
                    $('body,html').animate({  
                            scrollTop: parseInt($(this.$refs.group_description).offset().top  - sm)
                        }, 500  
                    );  
                }
                if(i == 3){
                    $('body,html').animate({  
                            scrollTop: parseInt($(this.$refs.group_evaluation).offset().top  - sm)
                        }, 500  
                    );  
                    console.log($(window).scrollTop())
                    console.log(parseInt($(this.$refs.group_evaluation).offset().top  - sm))
                }
            },
            // 选择行程
            selectGroup(goodsid,groupid){
                selectGroup(goodsid,groupid).then(res => {
                    if(res.status == 200){
                        this.data = res.data.data
                        // 每次选行程刷新选择第一个集合地点
                        this.selectjh = 0
                    }
                })
            },
            // 对中文参数进行编码
            urlCode(){
                let codeStr = ''
                if(!this.data.openGroups){
                    codeStr = escape(this.data.place)
                }else{
                    codeStr = escape(this.data.select_openGroups.place)
                }
                return codeStr
            },
            // 显示二维码
            showewm(){
                this.dialog = true
            },
            // 滚动
            scroll(e){
                // 波动值
                let sm = 0
                // 滚到一定距离固定tab
                if($(window).scrollTop() - $(this.$refs.group_content).offset().top > -10){
                    $(this.$refs.groupCon_tab.$el).addClass('groupCon_tabFixed')
                    sm = 44
                }else{
                    $(this.$refs.groupCon_tab.$el).removeClass('groupCon_tabFixed')
                    sm = 0
                }


                if($(window).scrollTop()+sm >= parseInt($(this.$refs.group_show_content).offset().top)  && $(this.$refs.group_show_content).offset().top){
                    this.groupContentIndex = 0
                }
                if($(window).scrollTop()+sm >= parseInt($(this.$refs.group_stroke).offset().top)  && $(this.$refs.group_stroke).offset().top){
                    this.groupContentIndex = 1
                }
                if($(window).scrollTop()+sm >= parseInt($(this.$refs.group_description).offset().top)  && $(this.$refs.group_description).offset().top){
                    this.groupContentIndex = 2
                }
                if($(window).scrollTop()+sm >= parseInt($(this.$refs.group_evaluation).offset().top)  && $(this.$refs.group_evaluation).offset().top){
                    this.groupContentIndex = 3
                }
            },
            // 放大公众号
            openGzh(){
                let img = this.gzhimg
                this.$wechat.previewImage({
                    current:img,
                    urls:[img]
                })
            },
            // 选择集合地点
            selectjhFn(i,id,goodsid,groupid){
                this.selectjh = i;
                this.selectjhId = id;
                selectJh(goodsid,groupid,id).then(res => {
                    if(res.status == 200){
                        this.data = res.data.data
                    }
                })
            }
        },
        created() {
            this.showData();
            let vm = this;            
            

            
            if(this.$route.query.userid){
                bind(this.$route.query.userid).then(res => {
                    if(res.status == 200){
                        // alert('绑定成功')
                    }else{
                        // alert(JSON.stringify(res.data))
                    }
                })
                // 判断是否关注了公众号
                changeFocus().then(res => {
                    if(res.status != 200){
                        this.focusEwm = true
                    }
                })
            }
        },
        mounted(){
            window.addEventListener('scroll',this.scroll)
        },
         beforeDestroy(){
            window.removeEventListener('scroll',this.scroll)
        }
    }
</script>

<style lang="less">
.groupShow{
    *{
        font-size:.28rem;
    }
    section{
        max-width:100% !important;
    }
    width:100%;
    overflow: hidden;

    .groupCon_tabFixed{
        width:100%;
        position:fixed;
        left:0;
        top:0;
        z-index:9999;
    }

    .group_contentFixed{
        width:100%;
        position:fixed;
        left:0;
        top:0;
        z-index:9999;
    }

    .teamGroup_list{
        margin-bottom:.2rem;
        padding:0 .2rem;

        ul li{
            .flex;
            padding:.2rem 0;
            justify-content:space-between;
            align-items:center;
            border-top:.01rem solid #ccc;
        }
        ul li:first-child{
            border-top:0;
        }
        ul li .head{
            .imgBox(.8rem,.8rem)
        }
        ul li .head img{
            width:100%;
            height:100%;
            .borderRadius(.8rem);
        }
        ul li .msg{
            width:4.5rem;
            margin-left:.2rem;
        }
        ul li .msg *{
            display:block;
        }
        ul li .msg p{
            font-size:.28rem;
        }
        ul li .msg span{
            font-size:.24rem;
        }
        ul li .joinBtn{
            .btn(1.4rem,.6rem,#e87c42,.24rem,#fff,.6rem);
        }
    }

}
.showHeader{
    width:100%;
    position: relative;
    display:block;
    .pic{
        .imgBox(100%,3.45rem);
        img{
            max-width:100%;
            height:auto;
        }
    }
    .title{
        width:100%;
        .boxSizing;
        padding:.2rem;
        color:#fff;
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.7) 100%);
        position:absolute;
        left:0;
        bottom:0;
        span{
            font-size:0.32rem;
        }
    }
    .picNum{
        .btn(auto,0.4rem,rgba(0,0,0,.4),0.24rem,#fff,0.05rem);
        position:absolute;
        top:0.2rem;
        right:0.2rem;
        padding:.1rem 0.2rem;
        span{
            font-size:0.28rem;
        }
    }
    .iconfont{
        color:@theme;
    }
}

.group_idn,.group_time,.group_joined{
    padding:0.1rem 0.15rem 0.2rem;
    margin-bottom:0.15rem;
}
.group_idn{
    .u{
        overflow: hidden;
        // .flex;
        // align-items:center;
    }
    .u img{
        width:1rem;
        height:1rem;
        .borderRadius(.6rem);
        float:left;
    }
    .r{
        float:left;
        margin-left:0.1rem;
        line-height:1rem;
    }
    .r p{
        font-size:0.32rem;
    }
    .r span{
        display:block;
        font-size:0.28rem;
    }
    .price{
        float:right;
        line-height:1rem;
    }
    .price *{
        font-size:.28rem;
    }
    .price span{
        color:#fa6b6b;
    }

    .add_and_price{
        // .flex;
        // justify-content:space-between;
        .on{
            color:@theme;
        }
        p{
            font-size:0.28rem;
            .flex;
            justify-content:space-between;
            align-items:center;
            padding:.15rem 0;
        }
        p *{
            font-size:.28rem;
        }
        p span{
            // color:rgb(250,107,107);
            font-size:0.28rem;
        }
        p small{
            color:@theme;
        }
    }
    
    .msg{
        margin:0.1rem 0;
    }
    .msg span{
        color:rgb(255,181,56);
        font-size:.28rem;
    }
}
.group_time{
    .top{
        .flex;
        justify-content:space-between;
        padding-bottom:0.1rem;
        border-bottom:0.01rem solid #ccc;
    }
    .top span{
        font-size:0.28rem;
        color:@theme;
    }
    .top span:first-child{
        color:rgb(183,183,183)
    }
    .tl{
        padding:0.2rem;
        padding-bottom:0;
    }
    .tl .item_wrap{
        .boxSizing;
        width:100%;
        height:1.2rem;
        .flex;
        align-content:center;
        flex-wrap:wrap;
        background:rgb(250,250,250);
        border:0.01rem solid #ccc;
        .borderRadius(.1rem);
        p,span{
            width:100%;
            text-align:center;
        }
        p{
            font-size:0.28rem;
        }
        span{
            font-size:0.24rem;
            color:rgb(250,107,107)
        }
    }
    .tl .active{
        background:rgb(245,252,248);
        border-color:@theme;
        position: relative;
        i{
            display:block;
            position:absolute;
            right:0;
            bottom:0;
            font-size:0.3rem;
            color:@theme;
        }
    }
}
.group_joined{
    .top{
         .flex;
        justify-content:space-between;
        padding-bottom:0.1rem;
        border-bottom:0.01rem solid #ccc;
        span{
            font-size:0.28rem;
            color:rgb(183,183,183);
        }
        small{
            color:@theme;
        }
    }
    .list{
        padding:0.2rem 0.2rem 0;
        ul{
            overflow: hidden;
        }
        ul li{
            width:20%;
            float:left;
            margin-bottom:.15rem;
        }
        ul li *{
            display:block;
            text-align:center;
            margin:0 auto;
        }
        ul li .pic{
            width:0.8rem;
            height:0.8rem;
            .borderRadius(.8rem);
            position: relative;
        }
        ul li .pic img{
            width:100%;
            height:100%;
            .borderRadius(.8rem);
        }
        ul li .pic small{
            .btn(100%,.4rem,rgba(0,0,0,.5),.28rem,#fff,0);
            position:absolute;
            left:0;
            bottom:0;
        }
        ul li span{
            width:100%;
            height:.5rem;
            line-height:.5rem;
            font-size:0.24rem;
            .textOverflow;
            overflow: hidden;
        }
    }
}
.content_wrap{
    padding:0 .2rem;
    overflow: hidden;
    
    img{
        max-width:100%;
        height:auto;
    }
}
.eva_list{
    padding:0.1rem;
    h4{
        font-size:0.24rem;
        color:@theme;
        margin-bottom:0.1rem;
    }
    ul li{
        padding:0.2rem 0;
        border-top:0.01rem solid #ccc;
        overflow: hidden;
    }
    ul li .u{
        width:1.5rem;
        text-align:center;
        float:left;
    }
    ul li .u *{
        display:block;
        margin:0 auto;
    }
    ul li .u img{
        width:0.8rem;
        height:0.8rem;
        .borderRadius(.8rem);
    }
    ul li .u span{
        font-size:0.24rem;
        margin-top:0.05rem;
    }
    ul li .des{
        width:5.2rem;
        float:left;
    }
    ul li .des .title{
        font-size:0.24rem;
    }
    ul li .des .p{
        span{
            font-size:.24rem;
        }
        
    }
    ul li .des .bt{
        font-size:0.24rem;
        color:rgb(183,183,183);
    }
}
.show_btns{
    width:100%;
    height:50px;
    .flex;
    justify-content: flex-start;
    position:fixed;
    left:0;
    bottom:0;
    z-index:999;
    .item{
        height:100%;
        .flex;
        flex-wrap:wrap;
        align-content:center;
    }
    .item span{
        width:100%;
        font-size:0.24rem;
        text-align:center;
    }
    .home{
        width:40%;
        background:#fff;
        span{
            color:rgb(248,136,52)
        }
    }
    .in{
        width:30%;
        background:rgb(65,168,211);
        span{
            color:#fff
        }
    }
    .go{
        width:60% !important;
        background:@theme;
        span{
            font-size:0.3rem;
            color:#fff;
            line-height:50px;
        }
    }
    .full{
        background:#d97ffb;
    }

    
}
.groupShow{
    .kfewm{
        width:4rem;
        height:4rem;
        margin:0 auto;
    }
    .kfewm img{
        width:100%;
        height:100%;
    }

    .focusDialog{
        .msg{
            margin-top:.1rem;
            padding-bottom:.2rem;
        }
        .msg p{
            font-size:.26rem;
            padding:0 .2rem;
            text-align:center;
        }
    }
}
</style>



