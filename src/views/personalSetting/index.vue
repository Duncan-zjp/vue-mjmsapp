<template>
    <div class="container personalSetting">
        <group class="personalSetting_wrap">
            <!-- <cell title="我的收藏" is-link :link="{name:'personalCollection'}"></cell> -->
            <!-- <cell title="收货地址管理" is-link :link="{name:'personalAddress'}"></cell> -->
            <cell title="常用人管理" is-link :link="{name:'personalPeople'}"></cell>
        </group>

    </div>
</template>

<script>
    import { Cell } from 'vux'
    export default{
        components:{
            Cell
        },
        data(){
            return{

            }
        },
        methods: {
            
        },
    }
</script>

<style lang="less">
.personalSetting{
    margin-bottom:0;


    .weui-cells{
        margin-top:0;
    }
    .vux-no-group-title::before{
        display:none;
    }
    .vux-cell-bd .vux-label{
        font-size:0.42rem;
    }
}

</style>

