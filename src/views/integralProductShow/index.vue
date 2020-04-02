<template>
    <div class="container productShow" v-if="viewShow">

        <router-link class="showHeader" to="">
            <div class="pic">
                <img :src="data.goods_thumb" alt="">
            </div>
        </router-link>

        

        <div class="productShow_price">
            <p>{{data.buy_for_integral}}</p>
            <div @click="collectFn">
                <span :class="`iconfont ${data.is_collect == '0'?'':'collected'}`">{{data.is_collect == '0'?'&#xe643;':'&#xe684;'}}</span>
                <small>{{data.is_collect == '0'?'收藏':'已收藏'}}</small>
            </div>
        </div>


        <div class="productShow_title">
            {{data.goods_name}}
        </div>

        <!-- 主体内容 -->
        <div class="group_content">
            <tab class="groupCon_tab" v-model="groupContentIndex" :line-width="1" >
                <tab-item @on-item-click="groupContentSelect">商品详情</tab-item>
                <tab-item @on-item-click="groupContentSelect">评价</tab-item>
            </tab>

            <div v-show="groupContentIndex==0" class="group_show_content">
                <div class="show_content_wrap"  v-html="data.goods_desc"></div>
            </div>
            <div v-show="groupContentIndex==1" class="group_evaluation">
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
        <div class="shopShow_btns">
            <router-link class="item home" :to="{name:'index'}" tag="div">
                <span class="iconfont">&#xe610;</span>
                <span>更多</span>
            </router-link>
            <!-- <router-link class="item in" to="" tag="div">
                <span class="iconfont">&#xe622;</span>
                <span>进群</span>
            </router-link> -->
            <!-- <router-link class="item go" :to="{name:'groupSign'}" tag="div">
                <span>立刻报名</span>
            </router-link> -->
            <div class="item go">
                <!-- <span>加入购物车</span> -->
                <router-link :to="{name:'IntegralCalculation'}" tag="span">立刻换购</router-link>
            </div>
        </div>
        <!-- 底部安妮 end -->

        <!-- 热门推荐 -->
        <hotProduct />
        <!-- 热门推荐 end -->
        


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


    </div>
</template>

<script>
    import { Tab, TabItem,Rater } from 'vux'
    import {show,collect,joinCar} from '@/api/productShow'
    import {changeFocus} from '@/api/user'
    import {bind} from '@/api/bindUser'
    import hotProduct from '@/components/hotProduct/hotProduct'
    export default{
        components:{
            Tab,TabItem,Rater,hotProduct
        },
        data(){
            return{
                focusEwm:false,
                groupContentIndex:0,
                data3:'5',
                // 商品数据
                data:{},
                viewShow:false,
                // 公众号二维码
                gzhimg:'http://shop.cnmjms.com/wechatlogo.png'
            }
        },
        methods:{
            // 获取商品详情数据
            showData(){
                let _id = this.$route.query.id
                show(_id).then(res => {
                    if(res.status == 200){
                        this.data = res.data.data
                        this.viewShow = true
                        let vm = this;            
                        let userid = window.localStorage.getItem('appUser') ? JSON.parse( window.localStorage.getItem('appUser')).user_id : ''
                        // 自定义分享内容
                        let [_title,_img,_goosid] = [this.data.goods_name,this.data.goods_thumb,this.data.goods_id]
                        this.$wechat.ready(function(){
                            // alert('jssdk ready')
                            vm.$wechat.onMenuShareAppMessage({
                                title: _title, // 分享标题
                                desc: `http://shop.cnmjms.com/mobile/apptest/#/product/show?id=${_goosid}&userid=${userid}`, // 分享描述
                                link: `http://shop.cnmjms.com/mobile/apptest/#/product/show?id=${_goosid}&userid=${userid}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
                            // 自定义分享到盆友圈
                            vm.$wechat.onMenuShareTimeline({
                                title: _title, // 分享标题
                                link: `http://shop.cnmjms.com/mobile/apptest/#/product/show?id=${_goosid}&userid=${userid}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl: _img, // 分享图标
                                success: function () {
                                // 用户点击了分享后执行的回调函数
                                }
                            })
                        })
                    }
                })
            },
            // 收藏
            collectFn(){
                if(this.data.is_collect == '0'){
                    collect(this.data.goods_id).then(res => {
                        this.showData()
                        return;
                    })
                }
            },
            // 加入购物车
            joinCarFn(){
                joinCar(this.data.goods_id).then(res => {
                    if(res.status == 200){
                        // this.$vux.toast.text('加入购物车成功')
                        this.$router.push({name:'buyCar'})
                    }
                })
            },
            groupContentSelect(){

            },
            // 放大公众号
            openGzh(){
                let img = this.gzhimg
                this.$wechat.previewImage({
                    current:img,
                    urls:[img]
                })
            }
        },
        created() {
            this.showData()

            
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
    }
</script>

<style lang="less">
.productShow{
    width:100%;
    overflow: hidden;
    *{
        font-size:.28rem;
    }

    .focusDialog{
        .ewm{
            width:4rem;
            height:4rem;
            margin:0 auto
        }
        .ewm img{
            width:100%;
            height:100%;
        }
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

    .showHeader{
        width:100%;
        position: relative;
        display:block;
        .pic{
            .imgBox(7.5rem,7.5rem);
            img{
            width:100%;
            height:100%;
            }
        }
    }
}



.productShow_price{
    padding:.2rem;
    .flex;
    justify-content:space-between;
    align-items:center;
    p{
        font-size:.6rem;
        color:#ef9999;
        font-weight:bold;
    }
    div{
        text-align:center;
        margin-right:.2rem;
    }
    div *{
        display:block;
    }
    div span{
        font-size:.5rem;
    }
    div .collected{
        color:@theme;
    }
    div small{
        font-size:.28rem;
    }
}

.productShow_title{
    padding:.2rem;
    font-size:.36rem;
    font-weight:400
}




.show_content_wrap{
    padding:.2rem .1rem;
    img{
        max-width:100% !important;
    }
}

.content_wrap{
    padding:0.2rem;
    overflow: hidden;
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
.shopShow_btns{
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
        width:60% ;
        background:@theme;
        span{
            font-size:0.3rem;
            color:#fff;
            line-height:50px;
        }
    }
}
</style>

