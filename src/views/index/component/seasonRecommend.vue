<template>
    <div class="seasonProduct">
        <div class="public_index_top">
            <h4>最当季 最适合</h4>
            <h5>—— 精选当季热门推荐 ——</h5>
        </div>

        <div class="seasonProduct_list">
            <ul>
                <!-- <router-link :to="{name:'groupShow',query:{id:item.goods_id}}" tag="li" v-for="(item, index) in seasonProductData" :key="index">
                    <img v-lazy="item.menu_img" alt="">
                    <span><small>{{item.menu_name}}</small></span>
                </router-link> -->
                <router-link :to="{name:'groupShow',query:{id:item.goods_id}}" tag="li" v-for="(item, index) in seasonProductData" :key="index">
                    <img v-lazy="item.menu_img" alt="">
                    <span><small>{{item.menu_name}}</small></span>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    import {seasonRecommend} from '@/api/index'
    export default{
        components:{

        },
        data(){
            return{
                seasonProductData:[
                    {
                        name:'商品名字',
                        img:'http://f01.32hike.com/image/2017/05/11/5fdf0cf8a9513056338fb483b06435b3.jpg'
                    },
                    {
                        name:'商品名字',
                        img:'http://f01.32hike.com/image/2017/05/11/5fdf0cf8a9513056338fb483b06435b3.jpg'
                    },
                    {
                        name:'商品名字',
                        img:'http://f01.32hike.com/image/2017/05/11/5fdf0cf8a9513056338fb483b06435b3.jpg'
                    },
                    {
                        name:'商品名字',
                        img:'http://f01.32hike.com/image/2017/05/11/5fdf0cf8a9513056338fb483b06435b3.jpg'
                    },
                    {
                        name:'商品名字',
                        img:'http://f01.32hike.com/image/2017/05/11/5fdf0cf8a9513056338fb483b06435b3.jpg'
                    },
                ]
            }
        },
        methods:{

        },
        created() {
            let that = this
            seasonRecommend().then(res => {
                if(res.status == 200){
                    that.seasonProductData = res.data.data
                }
            })
        },
    }
</script>

<style lang="less">
.seasonProduct{
    margin-top:0.2rem;
}
.seasonProduct_list{
    padding:0 0.25rem;
    ul{
        width:7.2rem;
        overflow: hidden;
    }
    ul li{
        width:1.6rem;
        height:1.6rem;
        float:left;
        margin:0 0.2rem 0.2rem 0;
        position: relative;
    }
    ul li img{
        width:100%;
        height:100%;
    }
    ul li span{
        display:block;
        width:100%;
        height:100%;
        background:rgba(0,0,0,.5);
        position: absolute;
        left:0;
        top:0;
        .flex;
        .boxSizing;
        padding:0.1rem;
        align-content:center;
        align-items:center;
    }
    ul li span small{
        width:100%;
        font-size:0.24rem;
        color:#fff;
        text-align:center;
    }
}
</style>

