<template>
    <div class="product_list">
        <ul>
            <router-link :to="{name:'groupShow',query:{id:item.goods_id}}" tag="li" v-for="(item, index) in list" :key="index">
                <div class="pic">
                    <img :src="item.goods_thumb" alt="">
                </div>
                <p>{{item.goods_name}}</p>
            </router-link>
        </ul>
        <none v-show="noDataShow" />
    </div>
</template>

<script>
    import {scrollBottom,scrollOption} from '@/util/other'
    import {list,addList,indexList} from '@/api/classInfo'
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
            // 获取普通列表
            getList(){
                let tagid = this.$route.query.tagid
                list(tagid,this.page).then(res => {
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
            // 获取首页列表
            getIndexList(){
                let tagid = this.$route.query.tagid
                indexList(tagid,this.page).then(res => {
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
            // 获取地区列表
            getAddList(){
                let tagid = this.$route.query.tagid
                addList(tagid,this.page).then(res => {
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
                    if(!this.$route.query.type){
                        // 普通列表
                        this.getList()
                    }else{
                        if(this.$route.query.type === 'index'){
                            // 首页列表
                            this.getIndexList()
                        }else{
                            // 地区列表
                            this.getAddList()
                        }
                        
                    }
                }
            }
        },
        created() {

            if(!this.$route.query.type){
                // 普通列表
                this.getList()
            }else{
                if(this.$route.query.type === 'index'){
                    // 首页列表
                    this.getIndexList()
                }else{
                    // 地区列表
                    this.getAddList()
                }
                
            }

            
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
.product_list{
    padding:0.15rem;
    margin-bottom:50px;
    ul li{
        width:100%;
        margin-bottom:0.2rem;
    }
    ul li .pic{
        width:100%;
        height:3.4rem;
        text-align:center;
        overflow: hidden;
        background:#ccc;
    }
    ul li img{
        .imgCenter;
    }
    ul li p{
        font-size:0.28rem;
        margin:0.1rem 0;
        text-align:center;
    }
    ul li span{
        display:block;
        font-size:0.14rem;
        color:#c9c9c9;
    }
}
</style>

