<template>
    <div class="incomeDetails">
        <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
            <thead>
            <tr style="background-color: #F7F7F7">
                <th>用户</th>
                <th>消费</th>
                <th>我的收益</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in list" :key="index">
                <td>{{item.user_name}}</td>
                <td>{{item.consumption}}</td>
                <td>{{item.income}}</td>
            </tr>
            </tbody>
        </x-table>
    </div>
</template>



<script>
    import { XTable } from 'vux'
    import {childrenSy} from '@/api/proxy'
    export default {
        components:{
            XTable
        },
        data(){
            return{
                list:[]
            }
        },
        methods: {
            getData(){
                childrenSy().then(res => {
                    this.list = res.data.data.detail_list
                })
            }
        },
        created() {
            this.getData()
        },
    }
</script>


<style lang="less">

</style>
