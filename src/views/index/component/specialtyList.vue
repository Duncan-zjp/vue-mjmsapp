<template>
    <div class="specialtyList">
        <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) in specialtyListData" :key="index" class="item">
                <router-link :to="{name:'productShow',query:{id:item.goods_id}}" tag="div">
                    <img v-lazy="item.goods_thumb" alt="">
                    <span>{{item.goods_name}}</span>
                    <p>每日特价：<small>￥{{item.shop_price}}</small></p>
                </router-link>
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import {specialty} from '@/api/index'
    const swiperOption = {
        autoplay:false,
        slidesPerView: 3,//一行显示3个
        pagination:{
            el:'.swiper-pagination',
            bulletClass:'swiperColor',
            bulletActiveClass: 'swiperAticveColor',
        }
    }

    export default{
        components:{
            swiper,swiperSlide
        },
        data(){
            return{
                swiperOption:swiperOption,
                specialtyListData:[
                    {
                        title:'商品名字',
                        img:'http://f01.32hike.com/image/2018/06/28/6e152b9fc640cf8c7a144e9589346c4f.gif',
                        errimg:require('@/assets/images/mjms_ico.jpg'),
                    },
                    {
                        title:'商品名字商品名字',
                        img:'http://f01.32hike.com/image/2018/06/28/6e152b9fc640cf8c7a144e9589346c4f.gif',
                        errimg:require('@/assets/images/mjms_ico.jpg'),
                    },
                    {
                        title:'商品名字商品名字',
                        img:'http://f01.32hike.com/image/2018/06/28/6e152b9fc640cf8c7a144e9589346c4f.gif',
                        errimg:require('@/assets/images/mjms_ico.jpg'),
                    },
                    {
                        title:'商品名字商品名字',
                        img:'http://f01.32hike.com/image/2018/06/28/6e152b9fc640cf8c7a144e9589346c4f.gif',
                        errimg:require('@/assets/images/mjms_ico.jpg'),
                    },
                ]
            }
        },
        methods: {
            getSpecialty(){
                specialty().then(res => {
                    this.specialtyListData = res.data.data
                })
            }
        },
        created() {
            this.getSpecialty()
        },
    }
</script>

<style lang="less">
.specialtyList{
    padding:0 0.25rem;
    
    .item{
       margin-top:0.2rem !important;
    }
    .item div{
       margin:0 auto;
    }
    .item img{
        .imgBox(2.2rem,2.2rem);
    }
    .item span{
        display:block;
        font-size:0.22rem;
        margin-top:0.1rem;
        .textOverflow;
    }
    .item p{
        font-size:.22rem;
        small{
            font-size:.22rem;
            color:brown;
        }
    }
}
.swiper-wrapper{
    padding-bottom:0.4rem;
}
</style>

