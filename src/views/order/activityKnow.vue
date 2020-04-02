<template>
    <div class="activityKnow">
        <div class="wrap" v-html="data.trip_desc">
            <div class="content" v-html="data.trip_desc"></div>
        </div>
    </div>
</template>

<script>
    import {selectGroup} from '@/api/group'
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
                selectGroup(this.$route.query.id,this.$route.query.groupid).then(res => {
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
.activityKnow{
    margin-bottom:0;

    .wrap{
        padding:.2rem;
        overflow: hidden;
    }
    .wrap .content{
        overflow: hidden;
        img{
            max-width:100%;
            height:auto;
        }
    }
}
</style>

