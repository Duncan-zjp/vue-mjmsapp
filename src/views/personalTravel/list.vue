<template>
    <div class="container personalTravel">
        <div class="personalTravel_list">
            <ul>
                <router-link :to="{name:'travelShow',query:{id:item.id}}" tag="li" v-for="(item, index) in list" :key="index">
                    <div class="pic">
                        <img :src="item.cover_img" alt="">
                    </div>
                    <div class="title">{{item.title}}</div>
                    <div class="bt">
                        <span class="iconfont">&#xe677; {{item.like_count}}</span>
                        <span>{{item.time}}</span>
                    </div>
                </router-link>
            </ul>
        </div>

        <none v-show="noDataShow" />

        <router-link :to="{name:'travelWrite'}" tag="div" class="writeTravelBtn">+</router-link>
    </div>
</template>

<script>
    import {scrollBottom,scrollOption} from '@/util/other'
    import {list} from '@/api/travel'
    import none from '@/components/noAnyData/none'
    export default{
        components:{
            none
        },
        data(){
            return{
                page:1,
                list:[],
                noDataShow:false
            }
        },
        methods:{
            // 获取游记列表
            getList(){
                list(1,this.page,5).then(res => {
                    if(res.status == 200){
                        if(res.data.data.length < 1){
                            this.page = this.page - 1;
                            this.noDataShow = true
                        }
                        res.data.data.forEach(item => {
                            this.list.push(item)
                        });
                    }
                })
            },
            scroll(){
                if(scrollOption.getScrollTop() + scrollOption.getWindowHeight() == scrollOption.getScrollHeight()){
                    console.log('滚动到底部')
                    this.page = this.page + 1;
                    this.getList()
                }
            }
        },
        created() {
            this.getList()
        },
        mounted() {
             window.addEventListener('scroll',this.scroll)
        },
        beforeDestroy(){
            window.removeEventListener('scroll',this.scroll)
        }
    }
</script>

<style lang="less" scoped>
.personalTravel{
    margin-bottom:0;
}
.personalTravel_list{
    background:none !important;
    ul li{
        padding:0.2rem;
        margin-top:0.1rem;
        background:#fff;
    }
    ul li:first-child{
        margin-top:0;
    }
    ul li .pic{
        width:100%;
        height:4rem;
        text-align:center;
        overflow: hidden;
    }
    ul li .pic img{
        max-width:100%;
        .imgCenter
    }
    ul li .title{
        margin-top:0.1rem;
        font-size:0.28rem;
    }
    ul li .bt{
        .flex;
        justify-content:space-between;
        font-size:0.2rem;
    }
    ul li .bt span{
        font-size:.28rem;
    }
}
.writeTravelBtn{
   .btn(.8rem,.8rem,@theme,.3rem,#fff,.8rem);
   background:@theme !important;
   position:fixed;
   left:50%;
   margin-left:-0.25rem;
   bottom:0.2rem;
   z-index:9999;
}
</style>



