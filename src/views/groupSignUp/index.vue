<template>
    <div class="groupSignUp container">

        <x-header title="插入常用人" />
        
        <div class="main">
            <p class="public_msgHeader">请填写真实信息</p>

            <div class="Identity_list">
                <div class="Identity_item" v-for="(item, index) in Identity_list" :key="index">
                    <group class="Identity_item_wrap">
                        <x-input :disabled="Identity_data[index].isUser === '0'" required title="真实姓名" type="text" placeholder="(与证件名字一致)" placeholder-align="right" is-type="china-name" v-model="Identity_data[index].name" :ref="`inputName${index}`"></x-input>
                        <x-input :disabled="Identity_data[index].isUser === '0'" required title="身份证" type="text" placeholder="(与证件信息一致)" placeholder-align="right" :is-type="changeIdCard" v-model="Identity_data[index].idcard" :ref="`inputCard${index}`"></x-input>
                        <x-input :disabled="Identity_data[index].isUser === '0'" required title="电话号码" type="tel" placeholder="(必填)" placeholder-align="right" is-type="china-mobile" v-model="Identity_data[index].phone" :ref="`inputMobile${index}`"></x-input>
                        <checker v-model="Identity_data[index].type" class="select_type" radio-required default-item-class="selectItem" selected-item-class="selectItemActive" @on-change="selectCardType" :ref="`inputType${index}`">
                            <checker-item :disabled="Identity_data[index].isUser === '0' ? true : false" value="0">成人</checker-item>
                            <checker-item :disabled="Identity_data[index].isUser === '0' ? true : false" value="1">儿童</checker-item>
                            <checker-item :disabled="Identity_data[index].isUser === '0' ? true : false" value="2">婴儿</checker-item>
                        </checker>

                        <div class="notInput" v-if="Identity_data[index].notInput"></div>
                    </group>

                    <div v-if="index == 0" class="addIdentity" @click="addIdentity">+</div>
                    <div v-if="index > 0" class="addIdentity DelIdentity" @click="DelIdentity(index)">-</div>
                </div>

                
            </div>


            <p class="public_msgHeader">添加常用人</p>
            <div class="public_msg" @click="selectPeople">
                <span>点击添加常用人</span>
                <span>+</span>
            </div>


            <p class="public_msgHeader">当前选择</p>
            <div class="public_msg">
                <span>{{urlStrCode(this.$route.query.address)}}</span>
                <span>{{this.$route.query.starttime}}</span>
            </div>

            <p class="public_msgHeader">费用详情</p>
            <div class="public_msg">
                <span>成人价格</span>
                <span><small>{{this.$route.query.price}}</small>元/人</span>
                <span>1人</span>
            </div>
            <div class="public_msg">
                <span>儿童价格</span>
                <span><small>{{this.$route.query.child_price}}</small>元/人</span>
                <span>1人</span>
            </div>
            <div class="public_msg">
                <span>婴儿价格</span>
                <span><small>{{this.$route.query.baby_price}}</small>元/人</span>
                <span>1人</span>
            </div>

            <p class="public_msgHeader">支付方式</p>
            <!-- <checklist v-model="payType.type" :options="payType.options" label-position="left" :min="1" :max="1" @on-change="payTypeChange" /> -->
            <div class="public_msg">
                <span>支付方式</span>
                <span>微信支付</span>
            </div>

            <!-- <check-icon class="isProtocol" type="plain" :value.sync="isProtocol">
                <span>我已阅读并同意 </span>
                <small>《 xxxxx协议 》</small>
            </check-icon> -->
        </div>

        <div class="groupSignUp_bt">
            <div class="label">
                <span>总费用：</span>
                <span><small>{{allPrice}}</small> 元</span>
            </div>
            <div @click="payFn" class="btn">支付</div>
        </div>
        

        <!-- 选择常用人 -->
        <popup v-model="selectPeopleShow" position="right" width="100%">
            <div class="people_list">
                <div class="item" v-for="(item, index) in peopleList" :key="index" @click="addPeopleIn(index)">
                    <div class="content">
                        <p>联系人：{{item.real_name}}</p>
                        <p>身份证：{{item.idcard}}</p>
                        <p>联系方式：{{item.phonenumber}}</p>
                        <p>身份类型：{{item.type === '0' ? '成人': item.type === '1' ? '儿童' : '婴儿'}}</p>
                    </div>
                </div>
            </div>
            <div class="peopleGoAdd" v-if="peopleList.length < 1">
                你还没有添加常用人，点击<span @click="peopleGoAdd">立刻添加</span>去添加常用人
            </div>
            <div class="people_btns">
                 <div class="addSelectPeople" @click="peopleGoAdd" v-if="peopleList.length > 0">添加联系人</div>
                <div class="closeSelectPeople" @click="selectPeople">关闭</div>
            </div>
        </popup>
        <!-- 选择常用人 end -->
    </div>
</template>


<script>
    import {pay} from '@/api/groupPay'
    import {list} from '@/api/people'
    import {heckIdCard} from '@/api/other'
    import { Checker, CheckerItem } from 'vux'
    export default{
        components:{
            Checker, CheckerItem
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
                allPrice:this.$route.query.price,
                // 是否显示选择常用人
                selectPeopleShow:false,
                // 联系人列表
                peopleList:[]
            }
        },
        methods:{
            // 添加身份信息
            addIdentity(){
                
                let Identity_obj = {
                    // 姓名
                    name:'',
                    // 身份证
                    idcard:'',
                    // 联系方式
                    phone:'',
                    // 身份类型
                    type:'0',
                    // 是否可以修改 1：可以修改 0：不可以修改
                    isUser:'1'   
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
                // console.log(this.payType)
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
                        is_open:this.$route.query.isstart,
                        group_place_id:this.$route.query.jhid
                    }
                    
                    if(this.$route.query.isstart == '1'){
                        // posData['leader_user_id'] = this.$route.query.learid
                        posData['start_time'] = this.$route.query.starttime
                        posData['end_time'] = this.$route.query.endtime
                    }
                    pay(posData,res => {
                        this.$vux.toast.text('支付成功')
                        this.$router.push({name:'orderList',query:{id:0}})
                    },res => {
                        this.$vux.toast.text('支付失败')
                        // this.$router.go(-1)
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
            },
            // 选择身份类型
            selectCardType(){
                 this.calculatePrice()
            },
            // 显示/关闭选择常用人
            selectPeople(){
                this.selectPeopleShow = !this.selectPeopleShow
            },
            // 计算总价
            calculatePrice(){
                let [crPrice,etPrice,yePrice] = [parseFloat(this.$route.query.price),parseFloat(this.$route.query.child_price),parseFloat(this.$route.query.baby_price)]
                let all_price = 0
                this.Identity_data.forEach(item => {
                    if(item.type === '0'){
                        all_price+=crPrice
                    }
                    if(item.type === '1'){
                        all_price+=etPrice
                    }
                    if(item.type === '2'){
                        all_price+=yePrice
                    }
                })
                this.allPrice = all_price
                console.log(`总价${all_price}`)
            },
            // 获取联系人列表
            getPeopleList(){
                list().then(res => {
                    this.peopleList = res.data.data
                })
            },
            // 跳转添加常用人
            peopleGoAdd(){
                this.$router.push({name:'personalPeopleSet'})
            },
            // 添加联系人到列表
            addPeopleIn(index){
                let _data = {
                    // 姓名
                    name:this.peopleList[index].real_name,
                    // 身份证
                    idcard:this.peopleList[index].idcard,
                    // 联系方式
                    phone:this.peopleList[index].phonenumber,
                    // 身份类型
                    type:this.peopleList[index].type,
                    // 是否可以修改 1：可以修改 0：不可以修改
                    isUser:'1',
                    notInput : true
                }
                let u_data = this.Identity_data;
                let _num = this.Identity_list
                if(u_data[0].name == '' && u_data[0].idcard == '' && u_data[0].phone == ''){
                    this.Identity_data[0] = _data
                }else{
                    if(this.$refs[`inputName${_num - 1}`][0].valid && this.$refs[`inputCard${_num - 1}`][0].valid && this.$refs[`inputMobile${_num - 1}`][0].valid){
                        this.Identity_list += 1
                        this.Identity_data.push(_data);
                    }else{
                        this.$vux.toast.text('请输入正确的报名信息')
                    }
                    
                }
                this.selectPeopleShow = false
            }
        },
        created() {
            // 初始化一个身份信息字段
            this.addIdentity()
            console.log(window.location.href.split('#/')[0].replace(/\?/g,'') + '?#' + window.location.href.split('#/')[1])
            location.replace(window.location.href.split('#/')[0].replace(/\?/g,'') + '?#' + window.location.href.split('#/')[1]);
            // 计算价格
            this.calculatePrice()
            // 联系人列表
            this.getPeopleList()
        },
        watch: {
            Identity_list(newval,pldval){
                this.calculatePrice()
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

    .people_list{
        padding:.2rem;
        overflow: hidden;
        margin-bottom:2.2rem;
        
        .item{
            .boxSizing;
            .flex;
            justify-content:space-between;
            align-items:center;
            border:.01rem solid #ccc;
            padding:.1rem .2rem;
            margin-top:.2rem;
            .borderRadius(.1rem);
        }
        .item:first-child{
            margin-top:0;
        }

        .item .content{
            width:100%;
            p{
                font-size:.32rem;
                color:#999999;
                margin:.1rem 0;
            }
        }
    }
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
    position: relative;

    .select_type{
        padding: 10px 0;
        border-top:0.5px solid rgb(217, 217, 217);
        margin:0 0 0 15px;
        font-size:0;
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

    .notInput{
        width:100%;
        height:100%;
        position:absolute;
        left:0;
        top:0;
    }
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

.peopleGoAdd{
    padding:.2rem;
    font-size:.28rem;
    text-align:center;
    span{
        font-size:.28rem;
        color:@theme;
    }
}
.people_btns{
    width:100%;
    background:#fff;
    position:fixed;
    left:0;
    bottom:0;
    padding:.2rem 0;
}
.addSelectPeople,.closeSelectPeople{
    .btn(6rem,.8rem,none,.4rem,@theme,.2rem);
    border:.02rem solid @theme;
    margin:0 auto
}
.closeSelectPeople{
    margin:.1rem auto 0;
}
</style>

