<template>
    <div class="speclialtyClass">
        <ul>
            <router-link :to="{name:'specialty',query:{id:item.tag_id}}" tag="li" v-for="(item, index) in list" :key="index">
                <i><img v-lazy="item.tag_img" alt=""></i>
                <span>{{item.tag_name}}</span>
            </router-link>
        </ul>
    </div>
</template>

<script>
    import {specialtyClass} from '@/api/index'
    export default{
        components:{

        },
        data(){
            return{
                list:[]
            }
        },
        methods: {
            getClass(){
                specialtyClass().then(res => {
                    this.list = res.data.data
                })
            }
        },
        created() {
            this.getClass()
        },
    }
</script>


<style lang="less">
.speclialtyClass{
    margin-top:0.2rem;
    padding:0.2rem 0.25rem;
    overflow: hidden;
    ul{
        width:8rem;
        overflow: hidden;
    }
    ul li{
        width:1rem;
        margin:0 1rem 0.2rem 0;
        float:left;
    }
    ul li *{
        display:block;
        width:100%;
        text-align:center;
    }
    ul li i{
        height:1rem;
    }
    ul li span{
        margin-top:0.1rem;
        font-size:0.24rem;
    }
}
</style>
