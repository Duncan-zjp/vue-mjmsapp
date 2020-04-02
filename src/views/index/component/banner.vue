<template>
    <div class="banner">
        <swiper :list="bannerList" dots-position="center" />
    </div>
</template>

<script>
    import {banner} from '@/api/index'
    export default{
        components:{

        },
        data(){
            return{
                bannerList:[
                    {
                        url : 'javascript:',
                        img : 'http://f01.32hike.com/image/2017/01/11/f36e000a55e43cf6fbd2045630b6ad33.jpg',
                        title : '送你一次旅行'
                    },
                    {
                        url : 'javascript:',
                        img : 'http://f01.32hike.com/image/2018/10/11/a472b2ba15357fb7fbd3f0d8f33be09a.jpg',
                        title : '送你一次旅行'
                    }
                ]
            }
        },
        methods: {
            getBannerList(){
                banner('0').then(res => {
                    let list = res.data.data;
                    list.forEach(item => {
                        if(item.type){
                            if(item.type === '0'){
                                item.url = `http://shop.cnmjms.com/mobile/apptest/#/group/show?id=${item.goods_id}`
                            }else{
                                item.url = `http://shop.cnmjms.com/mobile/apptest/#/product/show?id=${item.goods_id}`
                            }
                        }else{
                            item.url = 'javascript:'
                        }
                        item.img = item.ad_code
                    });
                    
                    this.bannerList = list
                })
            }
        },
        created() {
            this.getBannerList()
        },
    }
</script>

<style lang="less">
.banner{
    width:100%;
    overflow: hidden;
}
</style>
