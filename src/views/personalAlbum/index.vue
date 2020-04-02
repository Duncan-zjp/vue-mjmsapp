<template>
    <div class="personalAlbum">
        <button-tab v-model="personalAlbumIndex">
            <button-tab-item selected>活动共享相册</button-tab-item>
            <button-tab-item>个人相册</button-tab-item>
        </button-tab>

        <div class="personalAlbum_main">
            <div v-show="personalAlbumIndex==0" class="activity_album">
                <div class="personalAlbum_item" v-for="(item, index) in list" :key="index">
                    <div class="personalAlbum_itemContent">
                        <div class="imgBox" @click="imgView(item.img)">
                            <img v-lazy="item.img" alt="">
                        </div>
                        <div class="msg">
                            <div class="u">
                                <img src="@/assets/images/mjms_ico.jpg" alt="">
                                <span>用户名</span>
                            </div>
                            <div class="likeNum iconfont">&#xe643; {{item.likeNum}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="personalAlbumIndex==1" class="p_album">222</div>
        </div>
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
                personalAlbumIndex:0,
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
        },
        methods:{
            // 调用wx jssdk 预览图片
            imgView(img){
                let arr = []
                let pics = this.list.forEach(item => arr.push(item.img))
                this.$wechat.previewImage({
                    current:img,
                    urls:arr
                })
            }
        }
    }
</script>

<style lang="less">
.activity_album{
    column-count:2;
    column-gap:0;
    padding:0.1rem;
}
.personalAlbum_item{
    .boxSizing;
    width:100%;
    transition: opacity .4s ease-in-out; // 检索或设置对象变换时的过渡
    display: inline-block;
    padding:0.1rem;
    overflow: hidden;
}
.personalAlbum_itemContent{
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

