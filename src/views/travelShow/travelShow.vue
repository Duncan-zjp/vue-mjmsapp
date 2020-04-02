<template>
    <div class="travelShow" v-if="viewShow">
        <div class="showPic">
            <img :src="infoData.cover_img" alt="">
        </div>

        <div class="travelShow_wrap">
            <div class="title">{{infoData.title}}</div>
            <div class="user">
                <div class="user_wrap">
                    <img :src="infoData.headimg" alt="">
                    <div class="r">
                        <div class="name">{{infoData.user_name}}</div>
                        <div class="bt">
                            <span class="iconfont">&#xe64d; {{infoData.time}}</span>
                            <span class="iconfont">&#xe65e; {{infoData.click_count}} 阅读</span>
                        </div>
                    </div>
                </div>
                <div @click="userLike" :class="`like iconfont ${infoData.islike=='1'?'liking':''}`">{{infoData.islike=='1'?'&#xe684;':'&#xe643;'}}</div>
            </div>
            <div v-html="infoData.travel_desc" class="content"></div>
        </div>

        <!-- <div class="travelShow_comments">
            <h4>全部评论（43条）</h4>
            <ul>
                <li>
                    <div class="head"><img src="@/assets/images/mjms_ico.jpg" alt=""></div>
                    <div class="r">
                        <div class="t">
                            <p>用户名</p>
                            <div>
                                <span>我戳</span>
                                <span>回复</span>
                            </div>
                        </div>
                        <div class="time">3月20日15：00</div>
                        <div class="con">评论内容评论内容</div>
                        <div class="replys">
                            <p><span>用户名</span> 回复 <span>用户名</span>：回复内容回复内容</p>
                            <p><span>用户名</span> 回复 <span>用户名</span>：回复内容回复内容</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div> -->

        <!-- 固定评论区 -->
        <!-- <div class="travelShow_comment_bt">
            <div @click="openComment">说点什么吧~</div>
            <p class="iconfont">&#xe634;<span>43</span></p>
        </div> -->
        <!-- 固定评论区 end -->

        <!-- 评论/回复 -->
        <popup v-model="comment.show" position="top" class="travelShow_comment_box">
            <group>
            <x-textarea v-model="comment.val" :placeholder="comment.default"  :max="120" :rows="15"></x-textarea>                
            </group>
            <div class="btns">
                <span v-show="comment.type == 0">发送</span>
                <span @click="commentCancel">取消</span>
            </div>
        </popup>
        <!-- 评论/回复 end -->
    </div>
</template>


<script>
    import {show,like} from '@/api/travel'
    import {bind} from '@/api/bindUser'
    export default{
        components:{

        },
        data(){
            return{
                infoData:{
                    
                },
                viewShow:false,
                comment:{
                    type:0,     //类型：0为评论，1为回复
                    show:false,
                    default:'',
                    val:''
                }
            }
        },
        methods:{
            getData(){
                let vm = this;
                show(this.$route.query.id).then(res => {
                    if(res.status == 200){
                        this.infoData = res.data.data
                        this.viewShow = true
                    }
                })
                .then(()=>{
                    let userid = window.localStorage.getItem('appUser') ? JSON.parse( window.localStorage.getItem('appUser')).user_id : ''
                    // 自定义分享内容
                    let [_title,_img,_goosid] = [this.infoData.title,this.infoData.cover_img,this.infoData.id]
                    this.$wechat.ready(function(){
                        // alert('jssdk ready')
                        vm.$wechat.onMenuShareAppMessage({
                            title: _title, // 分享标题
                            desc: `http://shop.cnmjms.com/mobile/apptest/#/travel/travelShow?id=${_goosid}&userid=${userid}`, // 分享描述
                            link: `http://shop.cnmjms.com/mobile/apptest/#/travel/travelShow?id=${_goosid}&userid=${userid}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
                            link: `http://shop.cnmjms.com/mobile/apptest/#/travel/travelShow?id=${_goosid}&userid=${userid}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: _img, // 分享图标
                            success: function () {
                                // 用户点击了分享后执行的回调函数
                            }
                        })
                    })


                })
            },
            // 点赞
            userLike(){
                let id = this.$route.query.id
                if(this.infoData.islike == '0'){
                    like(id).then(res => {
                        if(res.status == 200){
                            this.infoData.islike = '1'
                        }
                    })
                }
                
            },
            // 打开评论/回复
            openComment(){
                this.comment.show = true
                this.comment.default = "说点儿什么吧..."

            },
            // 取消评论/回复
            commentCancel(){
                this.comment.show = false
            }
        },
        created() {
            this.getData()

            if(this.$route.query.userid){
                bind(this.$route.query.userid).then(res => {
                    if(res.status == 200){
                        // alert('绑定成功')
                    }else{
                        // alert(JSON.stringify(res.data))
                    }
                })
            }
        },
    }
</script>

<style lang="less">
.travelShow{
    width:100%;
    overflow: hidden;
    margin-bottom:1rem;
}
.showPic{
    width:100%;
    height:4rem;
    overflow: hidden;
    text-align:center;
    img{
        max-width:100%;
        .imgCenter;
    }
}
.travelShow_wrap{
    padding:0 0.2rem;

    .title{
        font-size:0.4rem;
        padding-top:.2rem;
    }
    @userheight:0.8rem;
    .user{
        .flex;
        justify-content: space-between;
        align-items:center;
        margin-top:0.1rem;
    }
    .user_wrap{
        height:@userheight;
        .flex;
        justify-content: space-between;
        align-items:center;
    }
    .user img{
        width:@userheight;
        height:100%;
        .borderRadius(@userheight);
    }
    .user .r{
        margin-left:0.1rem;
    }
    .user .r .name{
        font-size:0.4rem;
    }
    .user .r .bt span{
        font-size:0.28rem;
        color:rgb(153,153,153);
        
    }
    .user .like{
        font-size:0.65rem;
        color:rgb(153,153,153);
    }
    .user .liking{
        color:@theme;
    }

    .content{
        margin-top:0.1rem;
        *{
            font-size:0.14rem;
            line-height:0.3rem;
        }
        img{
            max-width:100%;
            height:auto;
        }
    }
}

.travelShow_comments{
    background:#fff;
    padding:.2rem;
    h4{
        font-size:.32rem;
    }
    ul{
        margin-top:.2rem;
    }
    ul li{
        .flex;
        justify-content:space-between;
    }
    ul li .head img{
        width:1.2rem;
        height:1.2rem;
        .borderRadius(1.2rem)
    }
    ul li .r{
        width:5.6rem;
    }
    ul li .r *{
        font-size:.28rem;
    }
    ul li .r .t{
        .flex;
        justify-content:space-between;
        align-items:center;
    }
    ul li .r .t div span{
        font-size:.24rem;
        display:inline-block;
        color:@theme;
        border:1px solid @theme;
        padding:.05rem .1rem;
        .borderRadius(.05rem);
    }
    ul li .r .t div span:first-child{
        margin-right:.2rem;
        color:#72dfec;
        border-color:#72dfec;
    }
    ul li .r .time{
        font-size:.24rem;
        color:#999;
        margin:.1rem 0;
    }
    ul li .r .replys{
        background:#e4e9f0;
        margin-top:.1rem;
    }
    ul li .r .replys p{
        padding:.15rem;
        font-size:.24rem;
        padding-bottom:0;
    }
    ul li .r .replys p span{
        font-size:.24rem;
        color:#4175c3;
    }
}

.travelShow_comment_bt{
    .boxSizing;
    width:100%;
    height:1rem;
    padding:.2rem;
    background:#fff;
    .flex;
    justify-content:space-between;
    border-top:1px solid #ccc;
    position:fixed;
    left:0;
    bottom:0;

    div{
        background:#f1f1f1;
        width:6rem;
        height:100%;
        line-height:.6rem;
        padding-left:.2rem;
        color:#999;
    }
    p{
        font-size: .48rem;
        line-height:.6rem;
        margin-left:.2rem;
        margin-right:.2rem;
        position: relative;
    }
    p span{
        font-size:.2rem;
        position:absolute;
        right:-.2rem;
        top:0;
        line-height:0;
    }
}
.travelShow_comment_box{
    padding-bottom:.2rem;
    background:#fff !important;
    .btns{
        overflow: hidden;
        padding-right:.2rem;
    }
    .btns span{
        .btn(1.2rem,.6rem,#fff,.28rem,#333,.1rem);
        float:right;
        margin-right:.2rem;
    }
    .btns span:first-child{
        background:@theme;
        margin-right:0;
        color:#fff;
    }

    .weui-textarea{
        font-size:.28rem;
    }
}
</style>

