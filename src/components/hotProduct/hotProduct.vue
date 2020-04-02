<template>
    <div class="app_public_hot">
        <div class="public_top">
            <span>热门推荐</span>
        </div>

        <div class="pos_list">
            <ul>
                <router-link v-if="item.days != null" :to="{name:'groupShow',query:{id:item.goods_id}}" @click.native="refresh" tag="li" v-for="(item, index) in hotList" :key="index">
                    <div class="pic">
                        <img :src="item.goods_thumb" alt="">
                        <span>{{item.days}}天</span>
                    </div>
                    <div class="title">
                        <span>{{item.goods_name}}</span>
                        <small>￥{{item.price}}</small>
                    </div>
                </router-link>
                <router-link v-if="item.days == null" :to="{name:'productShow',query:{id:item.goods_id}}" tag="li" v-for="(item, index) in hotList" :key="index">
                    <div class="pic">
                        <img :src="item.goods_thumb" alt="">
                    </div>
                    <div class="title">
                        <span>{{item.goods_name}}</span>
                        <small>￥{{item.price}}</small>
                    </div>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    import {personalHotList} from '@/api/classification'
    export default {
        components:{

        },
        data(){
            return{
                // 热门推荐
                hotList:[]
            }
        },
        methods: {
            // 获取热门推荐 
            getHotList(){
                personalHotList().then(res => {
                    this.hotList = res.data.data
                })
            },
            refresh:function(){
    　　　　　　this.$router.go(0);  
    　　　　}
        },
        created() {
            this.getHotList()
        },
    }
</script>


<style lang="less">
.app_public_hot{
    .public_top{
        .flex;
        justify-content:space-between;
        padding:.1rem .2rem;
        border-bottom:.01rem solid #ccc;
        align-items:center;

        span{
            font-size:.32rem;
            color:@theme;
        }
    }

    .pos_list{
        padding:.2rem;

        ul{
            width:7.2rem;
        }
        ul li{
            width:3.5rem;
            margin:0 .1rem .2rem 0;
            float:left;
        }
        ul li .pic{
            width:100%;
            height:2.8rem;
            text-align:center;
            overflow: hidden;
            position: relative;
            .borderRadius(.1rem);
        }
        ul li img{
            .imgCenter;
        }
        ul li .pic span{
            line-height:.35rem;
            padding:0 .2rem;
            background:rgba(225,142,141,.8);
            position:absolute;
            left:0;
            top:0;
            font-size:.28rem;
            color:#fff;
            border-bottom-right-radius:.1rem;
        }
        ul li .title{
            position: relative;
            margin-top:.1rem;
        }
        ul li .title *{
            font-size:.28rem;
        }
        ul li .title span{
            display:block;
            height:.7rem;
            line-height:.35rem;
            overflow: hidden;
            color:#030303;
            background:#fff;
        }
        ul li small{
            line-height:.35rem;
            background:#fff;
            position:absolute;
            top:.35rem;
            right:0;
            color:#E75D63;
            text-indent:1em;
        }
    }
}
</style>

