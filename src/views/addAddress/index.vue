<template>
    <div class="container addAddress">
        <group>
            <x-input type="text" title="联系人" is-type="china-name" v-model="addDataed.consignee" ref="inputconsignee"></x-input>
            <x-input type="tel" is-type="china-mobile" title="手机号码" v-model="addDataed.mobile" ref="inputmobile"></x-input>
            <x-address title="选择地区" :list="addList" v-model="addDataed.district" @on-shadow-change="selectChange"></x-address>
            <x-textarea title="详细地址" show-counter :rows="1" autosize v-model="addDataed.address"></x-textarea>
            <x-switch title="设为默认地址" v-model="addDataed.default"></x-switch>
        </group>

        <div class="userSettingBtn" @click="setAddress">保存地址</div>
    </div>
</template>

<script>
    import { XAddress, ChinaAddressV4Data } from 'vux'
    import {addressList,add,info} from '@/api/address'
    export default{
        components:{
            XAddress
        },
        data(){
            return{
                addList:[],
                addData:{
                    consignee:'',
                    mobile:'',
                    district:'',
                    address:'',
                    default:'0'
                }
            }
        },
        computed:{
            addDataed(){
                let obj = {
                    consignee:this.addData.consignee,
                    mobile:this.addData.mobile,
                    district:this.dataAddress(this.addData.district),
                    address:this.addData.address,
                    default:this.addData.default == '1' ? true : false
                }
                return obj
            }
        },
        methods:{
            // 选择地址
            selectChange(e){
                
            },
            // 设置或者添加地址
            setAddress(){
                
                let _data = this.addDataed;
                _data.province = _data.district[0] ? _data.district[0] : '';
                _data.city = _data.district[1] ? _data.district[1] : '';
                _data.district = _data.district[2] ? _data.district[2] : '';
                _data.default = _data.default ? '1' : '0'
                if(this.$route.query.id){
                    _data.address_id = this.$route.query.id
                }
                console.log(_data)
                if(_data.consignee == ''){
                    this.$vux.toast.text('联系人不能为空')
                    return;
                }
                if(!this.$refs.inputconsignee.valid){
                    this.$vux.toast.text('请输入正确的联系人')
                    return;
                }
                if(_data.consignee == ''){
                    this.$vux.toast.text('手机号码不能为空')
                    return;
                }
                if(!this.$refs.inputmobile.valid){
                    this.$vux.toast.text('请输入正确的手机号码')
                    return;
                }
                if(_data.district == ''){
                    this.$vux.toast.text('地区不能为空')
                    return;
                }
                if(_data.address == ''){
                    this.$vux.toast.text('详细地址不能为空')
                    return;
                }
                add(_data).then(res => {
                    if(res.status == 200){
                        this.$vux.toast.text('保存地址成功')
                        this.$router.go(-1);
                    }
                })
            },
            // 渲染地址格式
            dataAddress(data){
                let _data = [];
                if(data == ''){
                    _data = []
                }else{
                    _data = [];
                    _data[0] = `${data.substring(0,2)}0000`;
                    _data[1] = `${data.substring(0,2)}${data.substring(2,4)}00`;
                    _data[2] = data
                }
                return _data;
            },
            // 获取用户地址详情
            getAddInfo(id){
                info(id).then(res => {
                    if(res.status == 200){
                        this.addData = res.data.data
                        console.log(this.addData)
                        console.log(this.addDataed)
                    }
                })
            }
            
        },
        created() {
            // 获取省市区数据
            addressList().then(res => {
                if(res.status == 200){
                    this.addList = res.data.data
                }
            })

            // 获取用户地址详情
            if(this.$route.query.id)this.getAddInfo(this.$route.query.id)
            
        },
    }
</script>

<style lang="less">
.addAddress{
    margin-bottom:0;
}
.weui-label,.weui-input,.vux-cell-value,.weui-textarea{
    font-size:16px !important;
}
.userSettingBtn{
    .btn(6rem,1rem,@theme,0.32rem,#fff,1rem);
    background:@theme !important;
    margin:.4rem auto 0;
}
.weui-cell{
        padding: 10px 15px !important;
}
.weui-cell__bd{
    input{
        height:100% !important;
    }
}
</style>

