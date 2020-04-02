<template>
    <div class="container userPersonalPhoto">
        
        <header class="photoHeader">
            <div class="coverPic"><img src="" alt=""></div>
            <div class="msg">
                <div class="title">标题标题标题</div>
                <div class="labels">
                    <div class="label see"><small class="iconfont">&#xe65e;</small><span>浏览：32次</span></div>
                    <div class="label time"><small class="iconfont">&#xe64d;</small><span>2019-1-1</span></div>
                    <div class="label pic"><small class="iconfont">&#xe67a;</small><span>照片：17张</span></div>
                    <div class="label peo"><small class="iconfont">&#xe622;</small><span>45人</span> <router-link class="seePeople" :to="{name:'groupPeople',query:{groupid:58}}" tag="span">查看名单</router-link></div>
                </div>
            </div>

            <div class="iconfont goBtn goBack" @click="goback">&#xe6b6;</div>
            <div class="iconfont goBtn goHome" @click="gohome">&#xe610;</div>
        </header>


        <div class="travelAlbum_list">
            <div class="travelAlbum_item" v-for="(item, index) in albumData.list" :key="index">
                <div class="travelAlbum_itemContent">
                    <div class="imgBox" @click="imgView(item.img)">
                        <img v-lazy="item.img" alt="">
                    </div>
                    <div class="msg">
                        <div class="u">
                            <img :src="albumData.userhead" alt="">
                            <span>{{albumData.username}}</span>
                        </div>
                        <div class="likeNum iconfont">&#xe643; {{item.likeNum}}</div>
                    </div>
                </div>
            </div>
        </div>

        
        
    </div>
</template>

<script>
    export default{
        comments:{

        },
        data(){
            return{
                albumData:{
                    title:'标题标题标题',
                    picNum:150,
                    see:4388,
                    username:'用户名',
                    userhead:require('@/assets/images/mjms_ico.jpg'),
                    list:[
                        {
                            img:'http://b4-q.mafengwo.net/s12/M00/B4/6D/wKgED1vtaP2AJwukABAoGlP0mxc07.jpeg?imageMogr2%2Fthumbnail%2F1360x%2Fstrip%2Fquality%2F90',
                            likeNum:0
                        },
                        {
                            img:'http://n4-q.mafengwo.net/s12/M00/36/DF/wKgED1v-PrKAWL3CABFajm6EBLs80.jpeg?imageMogr2%2Fthumbnail%2F1360x%2Fstrip%2Fquality%2F90',
                            likeNum:25
                        },
                        {
                            img:'http://p3-q.mafengwo.net/s12/M00/49/25/wKgED1v-SYqAA0ecAAnRdKWrsWE18.jpeg?imageMogr2%2Fthumbnail%2F1360x%2Fstrip%2Fquality%2F90',
                            likeNum:3
                        },
                        {
                            img:'http://b4-q.mafengwo.net/s12/M00/E3/CB/wKgED1v-AQiAEqFNABBMyh1YSPU98.jpeg?imageMogr2%2Fthumbnail%2F1360x%2Fstrip%2Fquality%2F90',
                            likeNum:0
                        },
                        {
                            img:'http://n4-q.mafengwo.net/s12/M00/E3/D3/wKgED1v-AQuASJuHABDrJOyOl-w03.jpeg?imageMogr2%2Fthumbnail%2F1360x%2Fstrip%2Fquality%2F90',
                            likeNum:0
                        },
                        {
                            img:'http://shop.cnmjms.com/mobile/WXAPI/../../ueditor/php/upload/image/20190124/1548320925763598.jpg',
                            likeNum:0
                        },
                    ]
                }
            }
        },
        methods:{
            // 调用wx jssdk 预览图片
            imgView(img){
                let arr = []
                let pics = this.albumData.list.forEach(item => arr.push(item.img))
                this.$wechat.previewImage({
                    current:img,
                    urls:arr
                })
            },
            // 返回上一页
            goback(){
                this.$router.go(-1)
            },
            // 返回首页
            gohome(){
                this.$router.push({name:'index'})
            }
        },
    }
</script>


<style lang="less" scoped>
.userPersonalPhoto{
    margin-bottom:0;

    .photoHeader{
        width:100%;
        height:4rem;
        position: relative;
    }
    .photoHeader .coverPic{
        width:100%;
        height:100%;
        text-align:center;
        overflow: hidden;
        background:#ccc;
    }
    .photoHeader .coverPic img{
        .imgCenter;
    }
    .photoHeader .msg{
        .boxSizing;
        width:100%;
        padding:.2rem;
        background:rgba(255,255,255,.5);
        position:absolute;
        left:0;
        bottom:0;
    }
    .photoHeader .msg .title{
        font-size:.28rem;
        font-weight:bold;
    }
    .photoHeader .msg .labels{
        overflow: hidden;
        .label{
            width:50%;
            float:left;
            margin-top:.2rem;
            .flex;
            align-items:center;
            height:.4rem;
        }
        .label small{
            .btn(.4rem,.4rem,none,.26rem,#fff,.1rem);
        }
        .label span{
            font-size:.26rem;
            color:#8892A0;
            margin-left:.1rem;
        }
        .label .seePeople{
            color:@theme;
            text-decoration:underline;
        }
        .see small{
            background:#FFAA0A;
        }
        .time small{
            background:#69C3E8;
        }
        .pic small{
            background:#63D4B5;
        }
        .peo small{
            background:#FA6B6B;
        }
    }

    .photoHeader .goBtn{
        .btn(.5rem,.5rem,rgba(0,0,0,.5),.26rem,#fff,.5rem);
        position:absolute;
        top:.2rem;
    }
    .photoHeader .goBack{
        left:.2rem;
    }
    .photoHeader .goHome{
        right:.2rem;
    }

    .travelAlbum_list{
        column-count:2;
        column-gap:0;
        padding:0.1rem;
    }
    .travelAlbum_item{
        .boxSizing;
        width:100%;
        transition: opacity .4s ease-in-out; // 检索或设置对象变换时的过渡
        display: inline-block;
        padding:0.1rem;
        overflow: hidden;
    }
    .travelAlbum_itemContent{
        width:100%;

        .imgBox{
            width:100%;
            min-height:2rem;
            text-align:center;
        }
        .imgBox img{
            width:100%;
            height:auto;
        }
        @msgHeight:0.6rem;
        .msg{
            height:@msgHeight;
            .flex;
            justify-content:space-between;
            align-items:center;
            margin-top:0.1rem;
        }
        .msg .u{
            height:@msgHeight;
            .flex;
            align-items:center;
        }
        .msg .u img{
            width:@msgHeight;
            height:@msgHeight;
            .borderRadius(@msgHeight);
        }
        .msg .u span{
            margin-left:.1rem;
        }
        .msg .u span,.msg .likeNum{
            font-size:0.24rem;
            color:rgb(153,153,153);
        }
    }
}


</style>

