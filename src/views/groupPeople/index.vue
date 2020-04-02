<template>
    <div class="container groupPeople">
        <x-header title="已参加的人" />

        <!-- <h5>活动领队</h5>

        <div class="people_list leader_list">
            <div class="people_item" >
                <div class="pic">
                    <img v-lazy="data.members[0].headimg" alt="">
                </div>
                <span>{{data.members[0].user_name}}</span>
            </div>
        </div> -->

        <h5>已报名</h5>

        <div class="people_list">
            <div class="people_item" v-for="(item, index) in data.members" :key="index" v-if="item.is_leader != '1'">
                <div class="pic">
                    <img v-lazy="item.headimg" alt="">
                    <small>{{item.num}}</small>
                </div>
                
                <span>{{item.user_name}}</span>
            </div>
        </div>
    </div>
</template>


<script>
    import {groupData} from '@/api/groupPeople'
    export default {
        components:{

        },
        data(){
            return{
                data:{}
            }
        },
        methods: {
            getData(){
                groupData(this.$route.query.groupid).then(res => {
                    this.data = res.data.data
                })
            }
        },
        created() {
            this.getData()
        },
    }
</script>

<style lang="less">
.groupPeople{
    margin-bottom:0;
    .boxSizing;

    h5{
        font-size:.32rem;
        border-bottom:.01rem solid #ccc;
        padding:.1rem .2rem;
        margin-top:.2rem;
        background:#fff;
    }

    .people_list{
        padding:.2rem;
        .flex;
        justify-content: flex-start;
        flex-wrap:wrap;
    }
    .people_item{
        width:20%;
        margin-top:.2rem;
        *{
            display:block;
            text-align:center;
            margin:0 auto;
        }
    }
    .people_item .pic{
        width:1rem;
        height:1rem;
        .borderRadius(1rem);
        position: relative;
    }
    .people_item .pic img{
        width:100%;
        height:100%;
        .borderRadius(1rem);
    }
    .people_item .pic small{
        .btn(100%,.4rem,rgba(0,0,0,.5),.28rem,#fff,0);
        position:absolute;
        left:0;
        bottom:0;
    }
    .people_item span{
        font-size:.28rem;
        .textOverflow;
        margin-top:.1rem;
    }
}
</style>

