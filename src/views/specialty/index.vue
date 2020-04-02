<template>
    <div class="specialty container">
        <div class="specialty_search">
            <x-input class="iconfont" v-model="searchKeyWrod" text-align="center" :placeholder="searchplaceholder" @on-enter="searchFn"></x-input>
        </div>

        <div class="specialty_pic">
            <!-- <img v-lazy="banner[0] ? banner[0].ad_code : ''" alt="" /> -->
            <swiper :list="banner" dots-position="center" />
        </div>

        <div class="specialty_main">
            <tab v-model="specialtyIndex" class="personal_order_tab" :scroll-threshold="5" :line-width="0" >
                <tab-item @on-item-click="specialtySelect(0)">全部</tab-item>
                <tab-item :selected="tag_id == item.tag_id"  @on-item-click="specialtySelect(index+1,item.tag_id)" :id="item.tag_id" v-for="(item, index) in classList" :key="index">{{item.tag_name}}</tab-item>
            </tab>

            <div class="specialty_content">
                <ul>
                    <router-link :to="{name:'productShow',query:{id:item.goods_id}}" tag="li" v-for="(item, index) in list" :key="index">
                        <div class="pic">
                            <img v-lazy="item.goods_thumb" alt="">
                        </div>
                        <div class="title">{{item.goods_name}}</div>
                        <div class="price">￥{{item.shop_price}}</div>
                    </router-link>
                </ul>
            </div>

            <none v-show="noneShow" />
        </div>
    </div>
</template>

<script>
    import { Tab, TabItem } from 'vux'
    import {classList,list,banner} from '@/api/specialty'
    import {scrollBottom,scrollOption} from '@/util/other'
    import none from '@/components/noAnyData/none'
    export default{
        components:{
            Tab, TabItem,none
        },
        data(){
            return{
                searchKeyWrod:'',
                searchplaceholder:'\ue693 点我搜索土特产',
                specialtyIndex:0,
                // 土特产分类
                classList:[],
                // 所有土特产
                list:[],
                // 分页
                page:1,
                // 分类id
                tag_id:'',
                noneShow:false,
                banner:[],
            }
        },
        methods: {
            getClassList(){
                classList().then(res => {
                    if(res.status == 200){
                        this.classList = res.data.data;
                    }
                })
            },
            getList(){
                list(this.tag_id,this.page,this.searchKeyWrod).then(res => {
                    if(res.status == 200){
                        if(res.data.data.length < 1){
                            this.page -= 1
                            this.noneShow = true
                        }
                        res.data.data.forEach(item => {
                            this.list.push(item)
                        });
                    }
                })
            },
            // 分类选择
            specialtySelect(i,tag_id){
                // 每次点击分类重置页数
                this.page = 1
                // 重置数据
                this.list = []
                // 重置none
                this.noneShow = false
                // 清空关键词
                this.searchKeyWrod = ''
                this.tag_id = tag_id ? tag_id : null
                this.getList()
            },
            scroll(){
                if(scrollOption.getScrollTop() + scrollOption.getWindowHeight() == scrollOption.getScrollHeight()){
                    console.log('滚动到底部')
                    this.page += 1;
                    this.getList()
                }
            },
            // 搜索
            searchFn(){
                this.list = [];
                this.specialtyIndex = 0;
                this.page = 1;
                this.tag_id = ''
                this.noneShow = false
                this.getList()
            },
            // banner
            getBanner(){
                banner().then(res => {
                    let list = res.data.data;
                    list.forEach(item => {
                        if(item.type){
                            if(item.type === '0'){
                                item.url = `http://${location.host}/mobile/apptest/#/group/show?id=${item.goods_id}`
                            }else{
                                item.url = `http://${location.host}/mobile/apptest/#/product/show?id=${item.goods_id}`
                            }
                        }else{
                            item.url = 'javascript:'
                        }
                        item.img = item.ad_code
                    });
                    
                    this.banner = list
                })
            }
        },
        created() {
            this.getBanner()
            if(this.$route.query.id){
                this.tag_id = this.$route.query.id
            }
            this.getClassList()
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
.specialty{
    width:100%;
    overflow: hidden;
}
.specialty_pic{
    width:100%;
    height:4rem;
    text-align:center;
    overflow: hidden;
    margin-top:1.2rem;
    img{
        max-width:100%;
        .imgCenter;
    }
}
.specialty_main{
    background:none !important;
}
.specialty_search{
    width:100%;
    height:.8rem;
    line-height:.8rem;
    text-align:center;
    background:#fff;
    font-size:0.32rem;
    .boxShadow(0,0.05rem,0.1rem,rgb(218,218,218));
    position:fixed;
    left:0;
    top:0;
    z-index:999;
    input{
        width:100%;
        height:100%;
        font-size:0.32rem;
        font-family:"iconfont";
        font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale; 
    }
    .weui-cell{
        padding:0 !important;
    }

}
.weui-cell__bd{
    width:100%;
    height:.8rem;
}


.specialty_content{
    overflow: hidden;
    padding:.2rem .4rem;
    ul{
        width:7.8rem;
        overflow: hidden;
    }
    ul li{
        width:3.2rem;
        float:left;
        margin:0 .3rem .2rem 0;
        background:#fff;
    }
    ul li div{
        width:100%;
        overflow: hidden;
    }
    ul li .pic{
        width:100%;
        height:3.2rem;
        text-align:center;
    }
    ul li .pic img{
        width:100%;
        height:100%;
    }
    ul li .title{
        .boxSizing;
        font-size:.28rem;
        line-height:.35rem;
        height:.7rem;
        overflow: hidden;
        padding:0 0.1rem;
        margin:0.1rem 0;
    }
    ul li .price{
        font-size:.28rem;
        color:#ef9999;
        padding:0.1rem;
    }
}
</style>


