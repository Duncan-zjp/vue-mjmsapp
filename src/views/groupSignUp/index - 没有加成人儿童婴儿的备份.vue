<template>
    <div class="groupSignUp container">

        <x-header title="插入常用人" />
        
        <div class="main">
            <p class="public_msgHeader">请填写真实信息</p>

            <div class="Identity_list">
                <div class="Identity_item" v-for="(item, index) in Identity_list" :key="index">
                    <group class="Identity_item_wrap">
                        <x-input required title="真实姓名" type="text" placeholder="(与证件名字一致)" placeholder-align="right" is-type="china-name" v-model="Identity_data[index].name" :ref="`inputName${index}`"></x-input>
                        <x-input required title="身份证" type="text" placeholder="(与证件信息一致)" placeholder-align="right" :is-type="changeIdCard" v-model="Identity_data[index].idcard" :ref="`inputCard${index}`"></x-input>
                        <x-input required title="电话号码" type="tel" placeholder="(必填)" placeholder-align="right" is-type="china-mobile" v-model="Identity_data[index].phone" :ref="`inputMobile${index}`"></x-input>
                    </group>

                    <div v-if="index == 0" class="addIdentity" @click="addIdentity">+</div>
                    <div v-if="index > 0" class="addIdentity DelIdentity" @click="DelIdentity(index)">-</div>
                </div>
            </div>

            <p class="public_msgHeader">当前选择</p>
            <div class="public_msg">
                <span>{{urlStrCode(this.$route.query.address)}}</span>
                <span>{{this.$route.query.starttime}}</span>
            </div>

            <p class="public_msgHeader">费用详情</p>
            <div class="public_msg">
                <span>基础价格</span>
                <span><small>{{this.$route.query.price}}</small>元/人</span>
                <span>{{Identity_list}}人</span>
            </div>

            <p class="public_msgHeader">支付方式</p>
            <checklist v-model="payType.type" :options="payType.options" label-position="left" :min="1" :max="1" @on-change="payTypeChange" />

            <check-icon class="isProtocol" type="plain" :value.sync="isProtocol">
                <span>我已阅读并同意 </span>
                <small>《 xxxxx协议 》</small>
            </check-icon>
        </div>

        <div class="groupSignUp_bt">
            <div class="label">
                <span>总费用：</span>
                <span><small>{{allPrice}}</small> 元</span>
            </div>
            <div @click="payFn" class="btn">支付</div>
        </div>
    </div>
</template>


<script>
    import {pay} from '@/api/groupPay'
    import {heckIdCard} from '@/api/other'
    export default{
        components:{

        },
        data(){
            return{
                // 基本数据
                data:{

                },
                //控制身份信息输入的个数
                Identity_list:0,
                //身份信息列表
                Identity_data:[],
                // 支付方式
                payType:{
                    type:['微信支付'],
                    options:['微信支付']
                },
                // 是否同意协议
                isProtocol:false,
                // 是否可以支付
                isPay:false,
                // 身份证信息是否正确
                isIdentity:false,
                // 总共的价格
                allPrice:this.$route.query.price
            }
        },
        methods:{
            // 添加身份信息
            addIdentity(){
                
                let Identity_obj = {
                    name:'',
                    idcard:'',
                    phone:''
                }
                let _num = this.Identity_list
                if(this.Identity_data.length < 1){
                    this.Identity_list = _num+1;
                    this.Identity_data.push(Identity_obj)
                }else{
                    if(this.Identity_data[_num-1].name == '' || this.Identity_data[_num-1].idcard == '' || this.Identity_data[_num-1].phone == ''){
                        this.$vux.toast.text('请完善信息后操作')
                    }else{
                        this.Identity_list = _num+1;
                        this.Identity_data.push(Identity_obj)
                    }
                }
                
                
            },
            // 删除身份信息
            DelIdentity(index){
                this.Identity_list = this.Identity_list-1;
                this.Identity_data.splice(index,1)
                console.log(this.Identity_data)
            },
            payTypeChange(){
                console.log(this.payType)
            },
            // 支付
            payFn(){
                let u_data = this.Identity_data;
                u_data.forEach((item,i) => {
                    if(this.$refs[`inputName${i}`][0].valid && this.$refs[`inputCard${i}`][0].valid && this.$refs[`inputMobile${i}`][0].valid && item.name != '' && item.idcard != '' && item.phone != ''){
                        this.isPay = true
                        return;
                    }
                    this.$vux.toast.text('请输入正确的报名信息')
                    this.isPay = false
                });
                



                if(this.isPay){
                    console.log('可以支付')
                    let posData = {
                        pay_ship:[`${this.$route.query.supplierid}_1`],
                        payment:'11',
                        goods_id:this.$route.query.id,
                        flow_type:'0',
                        memberlist:this.Identity_data,
                        group_id:this.$route.query.groupid?this.$route.query.groupid:null,
                        is_open:this.$route.query.isstart
                    }
                    
                    if(this.$route.query.isstart == '1'){
                        posData['leader_user_id'] = this.$route.query.learid
                        posData['start_time'] = this.$route.query.starttime
                        posData['end_time'] = this.$route.query.endtime
                    }
                    pay(posData,res => {
                        this.$vux.toast.text('支付成功')
                    },res => {
                        this.$vux.toast.text('支付失败')
                    })
                }else{

                }
            },
            // url中文参数解码
            urlStrCode(str){
                return unescape(unescape(str));
            },
            // 验证身份证格式
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
            }
        },
        created() {
            // 初始化一个身份信息字段
            this.addIdentity()
            console.log(window.location.href.split('#/')[0].replace(/\?/g,'') + '?#' + window.location.href.split('#/')[1])
            location.replace(window.location.href.split('#/')[0].replace(/\?/g,'') + '?#' + window.location.href.split('#/')[1]);
        },
        watch: {
            Identity_list(newval,pldval){
                this.allPrice = parseFloat(this.$route.query.price) * newval
            }
        },
    }
</script>


<style lang="less">
.weui-cell__bd{
    font-size:0.28rem;
}
.groupSignUp{
    // margin-bottom:0;
}
.xheader_right{
    color:@theme !important;
}
.main{
    padding:0.2rem;
    background:none !important;
}
.public_msgHeader{
    font-size:0.28rem;
    color:@theme;
    margin:0.1rem 0;
}
.Identity_item{
    .flex;
    justify-content:space-between;
    align-items:center;
}
.Identity_item_wrap{
    width:5.8rem;
}
.addIdentity{
    .btn(1.2rem,1.5rem,#fff,0.8rem,rgb(132,117,164),0);
    font-weight:bold;
    
}
.DelIdentity{
    color:red
}
.public_msg{
    .boxSizing;
    width:100%;
    background:#fff;
    padding:10px 15px;
    .flex;
    justify-content:space-between;
    span{
        font-size:12px;
    }
    small{
        color:@theme;
    }
}
.isProtocol{
    margin-top:0.15rem;

    span,small{
        font-size:12px;
    }
    small{
        color:@theme;
    }
}
.groupSignUp_bt{
    .flex;
    .boxSizing;
    justify-content:space-between;
    align-items:center;
    padding-left:0.2rem;
    width:100%;
    height:50px;
    position:fixed;
    left:0;
    bottom:0;

    .label{
        span{
            font-size:0.32rem;
        }
        small{
            color:@theme;
            font-size:0.32rem;
        }
    }

    .btn{
        .btn(2.65rem,50px,@theme,.4rem,#fff,0)
    }
}
.weui-cell__bd p{
    font-size:0.28rem;
}
</style>

