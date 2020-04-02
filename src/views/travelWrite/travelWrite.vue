<template>
    <div class="travelWrite container">

        <div class="cover" @click="iploadCover">
            <span v-if="writeData.coverSrc==''">+ 添加封面</span>
            <div v-else class="cover_wrap">
                <img :src="writeData.coverSrc" alt="">
            </div>
            <image-upload
                class="image-upload uploadCover"
                :touch-size = 1
                :lrz-options = {width:1024}
                :max-count = 1
                @chooseImages='iploadCover'
            />
        </div>
        

        <div class="input_title">
            <input v-model="writeData.title" type="text" placeholder="标题...">
        </div>


        <div class="writeContent">
            <div class="w_con_item" @click="findIndex(index)" v-for="(item, index) in writeData.contents" :key="index">
                <div v-if="item.type == 0" class="pic">
                    <img :src="item.img" alt="" v-if="item.img!=''">
                    <span v-else>添加图片+</span>
                    <image-upload
                        class="image-upload uploadContentImg"
                        :touch-size = 1
                        :lrz-options = {width:1024}
                        :max-count = 1
                        @chooseImages='uploadContentImg'
                    />
                </div>
                <div class="text">
                    <x-textarea :placeholder="item.type==0?'图片描述...':'插入文本信息...'" :rows="1" autosize v-model="writeData.contents[index].text"></x-textarea>
                </div>
                <p class="optioon iconfont" @click="delWriteData(index)">&#xe68e;</p>
            </div>
        </div>


        <div class="add_options">
            <div class="item" @click="add_content(0)">
                <span class="ico iconfont">&#xe67f;</span>
                <span class="text">添加照片</span>
            </div>
            <div class="item" @click="add_content(1)">
                <span class="ico iconfont">&#xe8cc;</span>
                <span class="text">添加文字</span>
            </div>
        </div>

        <div class="btns">
            <!-- <span class="draft">存为草稿</span>
            <span class="preview">预览</span> -->
            <span @click="releaseTravel" class="release">发布</span>
        </div>

        <div class="test">
            <!-- <p>以下是测试数据</p> -->
            <p></p>
        </div>
    </div>
</template>

<script>
    import {ImageUpload} from 'vue-image-upload-preview'
    import { AlertModule } from 'vux'
    import {release} from '@/api/travel'
    export default{
        components:{
            ImageUpload
        },
        data(){
            return{
                // 写游记数据
                writeData:{
                    coverSrc:'',
                    title:'',
                    contents:[]
                    
                },
                // 保存当前内容块点击的索引
                blockIndex:0,
                testData:''
            }
        },
        methods:{
            // 封面上传
            iploadCover(data){
                if(data[0]){
                    this.writeData.coverSrc = data[0].src
                }
                console.log(data)
            },
            //添加数据     0 为图文数据   1  为文本数据
            add_content(type){
                let _type = type;
                let obj = {
                    img:'',
                    text:'',
                    type:_type
                }
                this.writeData.contents.push(obj)
            },
            // 上传内容图片
            uploadContentImg(data){
                let _index = this.blockIndex;
                if(data[0]){
                    this.writeData.contents[_index].img = data[0].src
                }
                
            },
            //点击输入图文文本或纯文本
            wContentText(){
                console.log(222)
            },
            //获取当前点击索引
            findIndex(i){
                this.blockIndex = i;
            },
            releaseTravel(){
                
                let _data = this.writeData;
                console.log(_data)
                if(_data.title == ''){
                    this.$vux.toast.text('请输入游记标题')
                    return;
                }
                if(_data.coverSrc == ''){
                    this.$vux.toast.text('请选择游记封面');
                    return;
                }
                if(!_data.contents[0] || (_data.contents[0].img == '' && _data.contents[0].text == '')){
                    this.$vux.toast.text('至少添加一个内容');
                    return;
                }

                release(_data).then(res => {
                    if(res.status == 200){
                        this.$vux.toast.text('上传成功');
                    }
                })
            },
            // 删除
            delWriteData(i){
                let _data = this.writeData.contents
                _data.splice(i,1)
                this.writeData.contents = _data
            }
        },
    }
</script>


<style lang="less">
.travelWrite{
    width:100%;
    overflow: hidden;
    min-height:calc(100vh);
    margin-bottom:0;
}
.travelWrite .cover{
    width:100%;
    position: relative;
    span{
        display:block;
        height:4rem;
        line-height:4rem;
        text-align:center;
        font-size:0.32rem;
    }
    .cover_wrap{
        width:100%;
        height:4rem;
        text-align:center;
        overflow: hidden;
        img{
            .imgCenter;
        }
    }
    
    .uploadCover{
        width:100%;
        height:100%;
        position:absolute;
        left:0;
        top:0;
        input{width:100%;height:100%;}
    }
}
.input_title{
    border-bottom:0.01rem solid #ccc;
    input{
        .boxSizing;
        width:100%;
        padding:0.2rem;
        font-size:0.28rem;
        color:rgb(153,153,153);
    }
}
.add_options{
    .flex;
    justify-content:flex-start;
    margin-top:0.4rem;
    background:none !important;
    padding:0.2rem;
    .item{
        width:2.3rem;
        height:1.8rem;
        background:#fff;
        .flex;
        align-content:center;
        .boxSizing;
        margin-right:0.2rem;
    }
    .item span{
        width:100%;
        text-align:center;
    }
    .item .ico{
        font-size:0.5rem;
        color:@theme;
    }
    .item .text{
        font-size:0.24rem;
        margin-top:0.1rem;
    }
}
.btns{
    background:none !important;
    .flex;
    padding:0 0.2rem;
    margin-top:0.2rem;
    span{
        .btn(2rem,.6rem,#fff,0.28rem,#fff,.1rem);
        margin-right:0.2rem;
    }
    .draft{
        color:#000;
    }
    .preview{
        background:rgb(29, 135, 223)
    }
    .release{
        background:@theme
    }
}
.writeContent{
    padding:0.2rem;
}
.w_con_item{
    .pic{
        width:100%;
        text-align:center;
        min-height:3rem;
        position: relative;
    }
    .pic img{
        max-width:100%;
        height:auto;
    }
    .pic span{
        font-size:0.28rem;
        width:100%;
        line-height:3rem;
        text-align:center;
    }
    .text{
        margin-top:0.1rem;
    }
    .text textarea{
        width:100%;
        .boxSizing;
        border-bottom:0.01rem solid #ccc;
        padding:0.05rem;
        font-size:0.24rem;
        line-height:0.35rem;
        
    }
    .uploadContentImg{
        width:100%;
        height:100%;
        position:absolute;
        left:0;
        top:0;
        input{width:100%;height:100%}
    }
    .optioon{
        margin-top:.1rem;
        text-align:right;
        font-size:.36rem;
    }
}
.weui-cell{
    padding:0 !important;
}
</style>

