<template>
    <div class="selectLine">
        <div class="public_index_top">
            <h4>精选线路</h4>
            <h5>—— 精心设计 极致体验 ——</h5>
        </div>

        <div class="selectLine_list">
            <ul>
                <router-link :to="{name:'groupShow',query:{id:item.goods_id}}" tag="li" v-for="(item, index) in selectLineData" :key="index">
                    <div class="pic">
                        <img v-lazy="item.goods_thumb" alt="">
                    </div>
                    
                    <div class="content">
                        <div class="l">
                            <div>{{item.goods_name}}</div>
                            <span>{{item.click_count}}人去过</span>
                        </div>
                        <div class="r">查看</div>
                    </div>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    import {selectLine} from '@/api/index'
    export default{
        components:{

        },
        data(){
            return{
                selectLineData:[
                    {
                        title:'商品名字商品名字',
                        img:'http://f01.32hike.com/image/2016/10/12/1d145ff3f391fe3577e47a2f05bcbcae.jpg',
                        errimg:require('@/assets/images/mjms_ico.jpg'),
                        buyNum:65535
                    },
                    {
                        title:'商品名字商品名字',
                        img:'http://f01.32hike.com/image/2016/10/12/1d145ff3f391fe3577e47a2f05bcbcae.jpg',
                        errimg:require('@/assets/images/mjms_ico.jpg'),
                        buyNum:65535
                    },
                    {
                        title:'商品名字商品名字',
                        img:'http://f01.32hike.com/image/2016/10/12/1d145ff3f391fe3577e47a2f05bcbcae.jpg',
                        errimg:require('@/assets/images/mjms_ico.jpg'),
                        buyNum:65535
                    },
                ]
            }
        },
        methods:{
            success(src){
                console.log(src)
            }
        },
        created() {
            let that = this;
            selectLine().then(res => {
                if(res.status == 200){
                    that.selectLineData = res.data.data
                }
            })
        },
    }
</script>



<style lang="less">
.selectLine{
    margin-top:0.2rem;
}
.selectLine_list{
    padding:0 0.25rem;
    ul li{
        width:100%;
        margin-bottom:0.2rem;
    }
    ul li .pic{
        width:100%;
        height:3.5rem;
        text-align:center;
        overflow: hidden;
    }
    ul li img{
        .imgCenter;
    }
    ul li .content{
        overflow: hidden;
        margin-top:.1rem;
    }
    .l{
        width:6rem;
        float:left;
        div{
            font-size:0.28rem;
            .textOverflow;
        }
        span{
            font-size:0.24rem;
        }
    }
    .r{
        float:right;
        font-size:0.28rem;
        color:@fontActive;
    }
}
</style>
