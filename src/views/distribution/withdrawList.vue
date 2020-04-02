<template>
    <div class="container withdrawList">
        <ul>
            <!-- <router-link :to="{name:'withdrawShow'}" tag="li">
                <p>
                    <span>提现-微信</span>
                    <small>2018-10-20  11：40</small>
                </p>
                <p>
                    <span>-200</span>
                    <small>提现成功</small>
                </p>
            </router-link> -->
            <router-link to="" tag="li" v-for="(item, index) in list" :key="index">
                <p>
                    <span>提现-微信</span>
                    <small>{{item.change_time}}</small>
                </p>
                <p>
                    <span>{{item.user_money}}</span>
                    <small>提现成功</small>
                </p>
            </router-link>
        </ul>
    </div>
</template>

<script>
    import {withdrawalRecord} from '@/api/proxy'
    export default{
        components:{

        },
        data(){
            return{
                list:[]
            }
        },
        methods: {
            withdrawalRecord(){
                withdrawalRecord().then(res => {
                    if(res.status == 200){
                        this.list = res.data.data
                    }
                })
            }
        },
        created() {
            this.withdrawalRecord()
        },
    }
</script>

<style lang="less">
.withdrawList{
    margin-bottom:0;

    ul li{
        .boxSizing;
        .flex;
        width:100%;
        height:1.2rem;
        padding:0.25rem 0.4rem;
        border-bottom:0.01rem solid #ccc;
        justify-content:space-between;
        align-items:center;
        background:#fff;
    }
    ul li:first-child{
        border-top:0;
    }
    ul li p{
        span,small{
            display:block;
        }
        span{
            font-size:0.36rem;
        }
        small{
            font-size:0.24rem;
            color:#ccc;
        }
    }
}
</style>

