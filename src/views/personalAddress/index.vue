<template>
    <div class="container personalAddress">
        <div class="p_add_list">
            <ul>
                <li v-for="(item, index) in list" :key="index">
                    <div>
                        <p>
                            <span>{{item.consignee}}   {{item.mobile}}</span>
                            <small v-if="item.default == '1'">默认收货地址</small>
                        </p>
                        <p><span>收货地址：{{item.province_name}}  {{item.city_name}}  {{item.district_name}}  {{item.address}}</span></p>
                    </div>
                    <div>
                        <router-link class="iconfont" :to="{name:'addAddress',query:{id:item.address_id}}" tag="b">&#xe635;</router-link>
                        <b class="iconfont del" @click="delAddress(item.address_id)">&#xe68e;</b>
                    </div>
                </li>
            </ul>
        </div>
        <router-link class="personalAddress_add" :to="{name:'addAddress'}" tag="div">添加收货地址</router-link>
    </div>
</template>


<script>
    import {list,del} from '@/api/address'
    export default{
        components:{
            
        },
        data(){
            return{
                list:[]
            }
        },
        methods:{
            // 获取用户地址列表
            getList(){
                list({}).then(res => {
                    if(res.status == 200){
                        this.list = res.data.data.consignee_list
                    }
                })
            },
            // 删除用户收货地址
            delAddress(id){
                let that = this;
                this.$vux.confirm.show({
                    content:'是否删除？',
                    onConfirm () {
                        del(id).then(res => {
                            if(res.status == 200){
                                that.$vux.toast.text('删除成功')
                                that.getList()
                            }else{
                                that.$vux.toast.text(res.data.message)
                            }
                        })
                    }
                })
            }
        },
        created() {
            this.getList()
        },
    }
</script>


<style lang="less">
.personalAddress{
    margin-bottom:0;
}
.p_add_list{
    width:100%;

    ul li{
        .flex;
        .boxSizing;
        width:100%;
        justify-content:space-between;
        align-items:center;
        padding:0.2rem 0.2rem;
        border-top:0.01rem solid #ccc;
    }
    ul li:first-child{
        margin-top:0;
    }
    ul li div{
        flex:1.5
    }
    ul li div:first-child{
        flex:6;
    }
    ul li div p{
        padding:0.1rem 0;
        width:80%;
        .boxSizing;
        span{
            font-size:0.28rem;
            color:#4c4c4c;
        }
        small{
            font-size:.18rem;
            color:#f7a405;
            margin-left:0.2rem;
        }
    }
    ul li div b{
        font-size:0.42rem;
        color:#ccc;
    }
    ul li div .del{
        color:#ef9999;
        margin-left:0.2rem;
    }
}
.personalAddress_add{
    .btn(6rem,1rem,@theme,0.42rem,#fff,1rem);
    background:@theme !important;
    position:fixed;
    bottom:0.4rem;
    left:50%;
    margin-left:-3rem;
}
</style>

