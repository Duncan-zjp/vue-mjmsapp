<template>
    <div v-wechat-title="'自定义标题'" class="container classification">
        <div class="class_action">
            <div class="title">花样撒野</div>
            <div class="list">
                <ul>
                    <router-link :to="{name:'classinfo',query:{tagid:item.tag_id}}" tag="li" v-for="(item, index) in ortherlist" :key="index">
                        <img v-lazy="item.tag_img" alt="">
                        <span>{{item.tag_name}}</span>
                    </router-link>
                </ul>
            </div>
        </div>
        <div class="class_action">
            <div class="title">时间跨度</div>
            <div class="list">
                <ul>
                    <router-link :to="{name:'classinfo',query:{tagid:item.tag_id}}" tag="li" v-for="(item, index) in timelist" :key="index">
                        <img v-lazy="item.tag_img" alt="">
                        <span>{{item.tag_name}}</span>
                    </router-link>
                </ul>
            </div>
        </div>

        <div class="class_action add_class">
            <div class="title">发现目的地</div>
            <div class="public_action_top">
                <p>境内游</p>
                <span>__</span>
            </div>
            <div class="add_list">
                <ul>
                    <router-link :to="{name:'classinfo',query:{tagid:item.region_id,type:'add'}}" tag="li" v-for="(item, index) in addList.domestic_list" :key="index">
                        <img :src="item.region_thumb" alt="">
                        <span>{{item.region_name}}</span>
                    </router-link>
                </ul>
            </div>
            <div class="public_action_top">
                <p>境外游</p>
                <span>__</span>
            </div>
            <div class="add_list">
                <ul>
                    <router-link :to="{name:'classinfo',query:{tagid:item.region_id,type:'add'}}" tag="li" v-for="(item, index) in addList.foreign_list" :key="index">
                        <img :src="item.region_thumb" alt="">
                        <span>{{item.region_name}}</span>
                    </router-link>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {classList,addList} from '@/api/classification';
    export default{
        components:{
           
        },
        data(){
            return{
                 // 花样撒野
                ortherlist:[],
                // 时间跨度
                timelist:[],
                // 地区分类
                addList:[]
            }
        },
        created() {
            classList().then(res => {
                if(res.status == 200){
                    this.ortherlist = res.data.data.ortherlist
                    this.timelist = res.data.data.timelist
                }
            })
            addList().then(res => {
                if(res.status == 200){
                    this.addList = res.data.data
                    console.log(this.addList)
                }
            })
        },
    }
</script>

<style lang="less">
.classification{
    
}
.class_action{
    margin-bottom:0.15rem;

    .title{
        font-size:0.28rem;
        padding:0.1rem 0 0 0.1rem;
        margin-bottom:0.15rem;
    }
    .list{
        padding:0 0.5rem 0.1rem;

        ul{
            width:7rem;
            overflow: hidden;
        }
        ul li{
            width:0.9rem;
            margin-right:0.5rem;
            float:left;
        }
        ul li *{
            display:block;
            width:100%;
            text-align:center;
        }
        ul li img{
            height:100%;
            .borderRadius(100%);
        }
        ul li span{
            margin-top:0.05rem;
            font-size:0.24rem;
        }
    }
    
}
.public_action_top{
    p,span{
        display:block;
        text-align:center;
    }
    p{
        font-size:0.28rem;
    }
}
.add_class{
    margin-bottom:0;
}
.add_list{
    margin-top:0.2rem;
    padding:0 0.2rem;
    ul{
        width:7.2rem;
        overflow: hidden;
    }
    ul li{
        width:1.7rem;
        height:1.7rem;
        margin:0 0.1rem 0.1rem 0;
        float:left;
        position: relative;
    }
    ul li img{
        width:100%;
        height:100%;
    }
    ul li span{
        width:100%;
        height:100%;
        line-height:1.7rem;
        text-align:center;
        background:rgba(0,0,0,.5);
        font-size:0.24rem;
        color:#fff;
        position: absolute;
        left:0;
        top:0;
    }
}
</style>
