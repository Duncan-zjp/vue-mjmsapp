<template>
    <div class="productList" ref="productList">
        <div class="public_index_top">
            <h4>随便逛逛</h4>
            <h5>—— 发现精彩 ——</h5>
        </div>

        <div class="productList_wrap">
            <ul>
                <router-link :to="{name:'groupShow',query:{id:item.goods_id}}" tag="li" v-for="(item, index) in list" :key="index">
                    <div class="pic">
                        <img v-lazy="item.goods_thumb" alt="">
                    </div>
                    
                    <div class="content">
                        <div class="title">{{item.goods_name}}</div>
                        <div class="time">{{item.time}}</div>
                        <div class="people">{{item.order_num}}人去过</div>
                    </div>
                </router-link>
            </ul>
        </div>
        <none v-show="noDataShow" />
    </div>
</template>

<script>
    import {productList} from '@/api/index'
    import {scrollBottom,scrollOption} from '@/util/other'
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
            getList(){
                productList(this.page).then(res => {
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
        mounted(){
            window.addEventListener('scroll',this.scroll)
        },
         beforeDestroy(){
            window.removeEventListener('scroll',this.scroll)
        }
    }
</script>

<style lang="less">
.productList{
    position: relative;
}
.productList_wrap{
    padding:0 0.25rem;
    

    ul li{
        overflow: hidden;
        margin-bottom:0.2rem;
    }
    ul li .pic{
        width:1.8rem;
        height:1.5rem;
        float:left;
        text-align:center;
        overflow: hidden;
    }
    ul li img{
        .imgCenter;
    }
    ul li .content{
        width:4.95rem;
        float:right;
        margin-left:0.1rem;
    }
    .content .title{
        font-size:0.28rem;
    }
    .content .time,.content .people{
        font-size:0.24rem;
        color:#c0c0c0;
    }
}
</style>

