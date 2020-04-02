<template>
    <div class="container travelAlbum">
        <header class="travelAlbum_header">
            <img src="http://b2-q.mafengwo.net/s12/M00/05/74/wKgED1vyJKOAHWvhAAzOZ_uK-_M34.jpeg?imageMogr2%2Fstrip" alt="">

            <div class="header_content">
                <div class="title iconfont">&#xe652; {{albumData.title}}</div>
                <div class="msg">
                    <span class="iconfont">&#xe67f; 照片：{{albumData.picNum}}张</span>
                    <span class="iconfont">&#xe65e; 浏览：{{albumData.see}}次</span>
                </div>
                <router-link to="" class="u_activity">查看关联活动</router-link>
            </div>
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
                            img:'http://p4-q.mafengwo.net/s12/M00/3C/3A/wKgED1v-QfWAcoFGABF0Po6Ngp443.jpeg?imageMogr2%2Fthumbnail%2F1360x%2Fstrip%2Fquality%2F90',
                            likeNum:1
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
            }
        }
    }
</script>


<style lang="less" scoped>
.travelAlbum_header{
    width:100%;
    position: relative;
    img{
       max-width:100%;
       height:auto;
    }
}
.header_content{
    width:100%;
    height:100%;
    background:rgba(0,0,0,.5);
    position:absolute;
    left:0;
    top:0;
    .flex;
    justify-content:center;
    flex-wrap:wrap;
    align-content:center;
    div{
        width:100%;
        text-align:center;
        color:#fff;
        margin-bottom:0.15rem;
    }

    .title{
        font-size:0.24rem;
    }
    .msg{
        span{
            font-size:0.2rem;
            margin:0 0.05rem;
        }
    }
}
.u_activity{
    .btn(2.1rem,0.6rem,@theme,0.3rem,#fff,0.6rem);
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
    @msgHeight:0.3rem;
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
    }
    .msg .u span,.msg .likeNum{
        font-size:0.14rem;
        color:rgb(153,153,153);
    }
}
</style>

