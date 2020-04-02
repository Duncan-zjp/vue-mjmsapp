<template>
    <div class="container personalFeedBack">
        <x-textarea v-model="content" placeholder="这里输入你的内容..."  :max="120" :rows="20"></x-textarea>
        <div class="contact_us">
            <p>客服电话：13800138000</p>
            <p>公司邮箱：mjms@qq.com</p>
        </div>

        <div class="fee_btn">提交反馈</div>
    </div>
</template>

<script>
    export default {
        components:{

        },
        data(){
            return{
                content:'',
            }
        }
    }
</script>


<style lang="less">
.personalFeedBack{
    margin-bottom:0;

    .contact_us{
        .boxSizing;
        padding:.2rem;
        p{
            font-size:.28rem;
            margin-top:.1rem;
        }
    }

    .fee_btn{
        .btn(6rem,.8rem,@theme,.4rem,#fff,.3rem);
        position:fixed;
        left:50%;
        margin-left: -3rem;
        bottom:.2rem;
    }
}
</style>

