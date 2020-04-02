<template>
    <div class="container personalPeople">
        <div class="list">
            <div class="item" v-for="(item, index) in list" :key="index">
                <div class="content">
                    <p>联系人：{{item.real_name}}</p>
                    <p>身份证：{{item.idcard}}x</p>
                    <p>联系方式：{{item.phonenumber}}</p>
                    <p>身份类型：{{item.type === '0' ? '成人': item.type === '1' ? '儿童' : '婴儿'}}</p>
                </div>
                <div class="options">
                    <router-link :to="{name:'personalPeopleSet',query:{id:item.log_id}}" tag="span" class="iconfont set">&#xe635;</router-link>
                    <span class="iconfont del" @click="delPeople(item.log_id)">&#xe68e;</span>
                </div>
            </div>
        </div>

        <router-link :to="{name:'personalPeopleSet'}" class="addBtn" tag="div">添加联系人</router-link>
    </div>
</template>


<script>
    import {list,del} from '@/api/people'
    export default {
        components:{

        },
        data(){
            return{
                list:[]
            }
        },
        methods: {
            getData(){
                list().then(res => {
                    this.list = res.data.data
                })
            },
            // 删除联系人
            delPeople(id){
                let that = this;
                this.$vux.confirm.show({
                    content:'是否删除？',
                    onConfirm () {
                        del(id).then(res => {
                            if(res.status == 200){
                                that.$vux.toast.text('删除成功')
                                that.getData()
                            }else{
                                that.$vux.toast.text(`删除失败 ${res.data.message}`)
                            }
                        })
                    }
                })
            }
        },
        created() {
            this.getData()
        },
    }
</script>


<style lang="less">
.personalPeople{
    margin-bottom:1rem;

    .list{
        padding:.2rem;
        overflow: hidden;
    }

    .item{
        .boxSizing;
        .flex;
        justify-content:space-between;
        align-items:center;
        border-top:.01rem solid #ccc;
        padding-top:.1rem;
    }
    .item:first-child{
        border-top:0;
        padding-top:0;
    }

    .item .content{
        width:70%;
        p{
            font-size:.32rem;
            color:#999999;
            margin:.1rem 0;
        }
    }
    .item .options{
        width:30%;
        text-align:center;
        span{
            font-size:.36rem;
            margin:0 .1rem;
        }
        .del{
            color:#ef9999;
        }
    }

    .addBtn{
        .btn(100%,1rem,@theme,.4rem,#fff,0);
        position:fixed;
        left:0;
        bottom:0;
    }
}
</style>
