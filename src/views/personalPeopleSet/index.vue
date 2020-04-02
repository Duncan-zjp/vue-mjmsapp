<template>
    <div class="personalPeopleSet">
        <group class="Identity_item_wrap">
            <x-input required title="真实姓名：" type="text" placeholder="(与证件名字一致)" placeholder-align="right" is-type="china-name" v-model="data.name" ref="name"></x-input>
            <x-input required title="身份证：" type="text" placeholder="(与证件信息一致)" placeholder-align="right" :is-type="changeIdCard" v-model="data.idcard" ref="idcard"></x-input>
            <x-input required title="电话号码：" type="tel" placeholder="(必填)" placeholder-align="right" is-type="china-mobile" v-model="data.phone" ref="phone"></x-input>
            <checker v-model="data.type" class="select_type" radio-required default-item-class="selectItem" selected-item-class="selectItemActive" @on-change="selectCardType">
                <checker-item value="0">成人</checker-item>
                <checker-item value="1">儿童</checker-item>
                <checker-item value="2">婴儿</checker-item>
            </checker>
        </group>

        <div class="setBtn" @click="setPeopleFn">{{this.$route.query.id?'保存联系人':'添加联系人'}}</div>
    </div>
</template>


<script>
    import { Checker, CheckerItem } from 'vux'
    import {get,add,update} from '@/api/people'
    export default {
        components:{
            Checker, CheckerItem
        },
        data(){
            return{
                data:{
                    // 姓名
                    name:'',
                    // 身份证
                    idcard:'',
                    // 联系方式
                    phone:'',
                    // 身份类型
                    type:'0',
                }
            }
        },
        methods:{
            // 身份证正则
            changeIdCard(val){
                let change = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                let obj = {
                    valid:true,
                    msg:'身份证格式错误'
                }
                if(!change.test(val)){
                    obj.valid = false
                }else{
                    obj.valid = true
                }
                return obj;
            },
            // 监听身份类型改变
            selectCardType(){

            },
            // 添加/修改联系人
            setPeopleFn(){
                if(!this.$refs.name.valid || this.$refs.name == '' || !this.$refs.idcard.valid || this.$refs.idcard == '' || !this.$refs.phone.valid || this.$refs.phone == ''){
                    this.$vux.toast.text('请输入正确的联系人信息');
                    return;
                }
                if(this.$route.query.id){
                    this.updatePeople()
                }else{
                    this.addPeople()
                }

            },
            // 获取联系人信息
            getData(){
                let id = this.$route.query.id
                get(id).then(res => {
                    this.data.name = res.data.data.real_name
                    this.data.idcard = res.data.data.idcard
                    this.data.phone = res.data.data.phonenumber
                    this.data.type = res.data.data.type
                })
            },
            // 添加联系人
            addPeople(){
                let posData = {
                    real_name : this.data.name,
                    idcard : this.data.idcard,
                    phone : this.data.phone,
                    type : this.data.type
                }
                add(posData).then(res => {
                    if(res.status != 200){
                        this.$vux.toast.text(`添加失败 ${res.data.message}`);
                        return;
                    }
                    this.$vux.toast.text('添加成功');
                    this.$router.go(-1);
                })
            },
            // 编辑联系人
            updatePeople(){
                let posData = {
                    real_name : this.data.name,
                    idcard : this.data.idcard,
                    phone : this.data.phone,
                    type : this.data.type,
                    log_id : this.$route.query.id
                }
                update(posData).then(res => {
                    if(res.status != 200){
                        this.$vux.toast.text(`修改失败 ${res.data.message}`);
                        return;
                    }
                    this.$vux.toast.text('修改成功');
                    this.$router.go(-1);
                })
            }
        },
        created() {
            if(this.$route.query.id){
                this.getData()
            }
        },
    }
</script>

<style lang="less">
.personalPeopleSet{
    .Identity_item_wrap{
        width:100%;
    }
    .select_type{
        padding:.2rem 0 .2rem 15px;
        border-top:.1px solid #D9D9D9;
    }
    .selectItem{
        font-size:14px;
        padding:.1rem .3rem;
        border:.01rem solid #fff;
        .borderRadius(.1rem);
        .animate(.1s);
    }
    .selectItemActive{
        background:@theme;
        color:#fff;
    }

    .setBtn{
        .btn(100%,1rem,@theme,.4rem,#fff,0);
        position:fixed;
        left:0;
        bottom:0;
    }
}

</style>
