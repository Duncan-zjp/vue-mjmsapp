<template>
    <div class="groupStart">
        <calendar
            ref="calendar1"
            :range="calendar1.range" 
            :events="calendar1.events" 
            :lunar="calendar1.lunar" 
            :value="calendar1.value" 
            :begin="calendar1.begin" 
            :end="calendar1.end" 
            :weeks="calendar1.weeks" 
            :months="calendar1.months" 
            :selectnum="calendar1.selectnum" 
            @select="select"
            @selectMonth="selectMonth"
            @selectYear="selectYear">
        </calendar>

        <!-- <div class="selectLeader">
            <p class="selectLeader_title">领队</p>
            <div class="loader_list">
                <ul>
                    <li :class="selectLear == item.user_id ? 'active':''" v-for="(item, index) in learUserList" :key="index" @click="selectLearFn(item.user_id)">
                        <img :src="item.headimg" alt="">
                        <div>
                            <span>{{item.user_name}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div> -->


        <div class="startGroup_btn">
            <span class="back" @click="viewBack" >返回</span>
            <span class="next" @click="signUpFn">下一步，报名</span>
        </div>
    </div>
</template>


<script>
    import calendar from '@/components/calendar/date'
    import { dateFormat,querystring } from 'vux'
    import {learUser} from '@/api/startGroup'
    export default{
        components:{
            calendar
        },
        data(){
            return{
                calendar1:{
                    value:[
                        
                    ], //默认日期
                    range:true,
                    // lunar:true, //显示农历
                    begin:dateFormat(new Date().setDate(new Date().getDate()+1), 'YYYY-MM-DD').split('-'), //可选开始日期
                    end:[2999,8,8], //可选结束日期
                    weeks:['日', '一', '二', '三', '四', '五', '六'],
                    // months:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                    // events:{
                    //     '2018-12-14':'￥3888',
                    //     '2018-12-15':'￥3888',
                    //     '2018-12-16':'￥3888',
                    //     '2018-12-17':'￥3888',
                    // },
                    // 需要选中的天数
                    selectnum:parseInt(this.$route.query.days),
                    timestamp:Date.now()
                },
                // 领队数据
                learUserList:[],
                // 选择的领队
                selectLear:''
            }
        },
        methods:{
            // 设置默认选中的日期
            setDefaultDates(){
                const dateNum = this.calendar1.selectnum
                this.calendar1.value[0] = dateFormat(new Date().setDate(new Date().getDate()+1), 'YYYY-MM-DD').split('-')
                this.calendar1.value[1] = dateFormat(new Date().setDate(new Date().getDate()+dateNum), 'YYYY-MM-DD').split('-')
                this.selectStart = this.calendar1.value[0].toString().replace(/,/g,'-')
                this.selectEnd = this.calendar1.value[1].toString().replace(/,/g,'-')
            },
            //选择日期
            select(begin,end){
                let _start = `${begin[0]}-${begin[1]+1}-${begin[2]}`
                let _end = `${end[0]}-${end[1]+1}-${end[2]}`
                this.selectStart = _start
                this.selectEnd = _end
            },
            selectMonth(month,year){
                console.log(year,month)
            },
            selectYear(year){
                console.log(year)
            },
            // 获取领队信息
            getLearUser(){
                learUser().then(res => {
                    this.learUserList = res.data.data
                })
            },
            // 选择领队
            selectLearFn(uid){
                this.selectLear = uid
            },
            // 下一步
            signUpFn(){
                // if(this.selectLear == ''){
                //     this.$vux.toast.text('请选择领队')
                //     return;
                // }
                this.$router.push({
                    name:'groupSign',
                    query:{
                        id:this.$route.query.id,
                        // learid:this.selectLear,
                        starttime:this.selectStart,
                        endtime:this.selectEnd,
                        isstart:1,
                        supplierid:this.$route.query.supplierid,
                        address:this.$route.query.address,
                        price:this.$route.query.price,
                        child_price:this.$route.query.child_price,
                        baby_price:this.$route.query.baby_price
                    }
                })
            },
            // 返回上一页
            viewBack(){
                this.$router.go(-1)
            }
        },
        created() {
            // console.log(dateFormat(new Date().setDate(new Date().getDate()+1), 'YYYY-MM-DD').split('-'))
            // console.log(new Date().getDate())
            this.setDefaultDates()
            this.getLearUser()
            console.log(this.calendar1.value)
        },
    }
</script>


<style lang="less">
.groupStart{
    margin-bottom:1.2rem;
}
.selectLeader_title{
    padding:0.1rem;
    font-size:0.28rem;
}
.loader_list{
    padding:0.2rem 0.1rem;
    ul li{
        .flex;
        .boxSizing;
        height:1rem;
        justify-content: flex-start;
        align-items:center;
        border-top:0.01rem solid #ccc;

        img{
            width:0.8rem;
            height:0.8rem;
            .borderRadius(.8rem);
        }

        div{
            margin-left:0.2rem;
            .flex;
            flex-wrap:wrap;
        }
        div span{
            width:100%;
            font-size:0.28rem;
        }
        div small{
            width:100%;
            font-size:0.24rem;

        }
    }
    ul li:first-child{
        border-top:0;
    }
    ul .active{
        span{
            color:@theme;
        }
    }
}
.startGroup_btn{
    width:100%;
    height:1.2rem;
    .flex;
    position:fixed;
    left:0;
    bottom:0;

    span{
        height:100%;
        line-height:1.2rem;
        text-align:center;
        font-size:0.32rem;
        color:#fff;
    }
    .back{
        flex:3;
        background:#41a8d3;
    }
    .next{
        flex:4;
        background:@theme;
    }
}
</style>

