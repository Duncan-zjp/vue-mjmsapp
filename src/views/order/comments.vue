<template>
    <div class="orderComments">
        <div class="orderComments_wrap">
            <group>
                <x-textarea v-model="content" placeholder="这里输入你的评价..."  :max="120" :rows="15"></x-textarea>
            </group>

            <div class="score">
                <p>为本次服务打分：</p>
                <rater v-model="score"></rater>
            </div>

            <div @click="commentsFn" class="comments_btn">发表评论</div>
        </div>
    </div>
</template>

<script>
    import { Rater } from 'vux'
    import {comments} from '@/api/order'
    export default {
        components:{
            Rater
        },
        data(){
            return{
                content:'',
                score:5
            }
        },
        methods: {
            commentsFn(){
                if(this.content == ''){
                    this.$vux.toast.text('评论内容不能为空')
                    return;
                }
                comments(this.$route.query.id,this.content,this.score).then(res => {
                    if(res.status == 200){
                        this.$vux.toast.text('评论成功')
                    }else{
                        this.$vux.toast.text(res.data.message)
                    }
                })
            }
        },
    }
</script>

<style lang="less">
.orderComments{
    .boxSizing;
    margin-bottom:0;
    padding:.2rem;
    

    .weui-textarea{
        font-size:.32rem;
    }

    .score{
        margin-top:.2rem;
        p{
            font-size:.32rem;
             margin-bottom:.2rem;
        }
    }

    .vux-rater-box{
        margin-right:.2rem !important;
    }
    .vux-rater-inner{
        span{
            font-size:.6rem
        }
    }

    .comments_btn{
        .btn(6rem,.8rem,@theme,.4rem,#fff,.3rem);
        position:fixed;
        left:50%;
        margin-left: -3rem;
        bottom:.2rem;
    }
}
.weui-cell__bd{
    height:auto !important
}
</style>

