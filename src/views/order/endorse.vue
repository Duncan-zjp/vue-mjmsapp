<template>
    <div class="container activeEndorse">
        <h4>选择改签时间</h4>
        <div class="acitvityList">
            <ul>
                <li @click="timeItemSelect(index,item.group_id)" v-for="(item, index) in data.grouplist" :key="index">
                    <p>
                        <span>{{item.start_time}}</span>
                        <span>{{item.place}}</span>
                    </p>
                    <p>
                        <span v-if="timeListSelect.group_id == item.group_id" class="right iconfont">&#xe6ab;</span>
                    </p>
                </li>
            </ul>
        </div>
        <h4>选择改签人员</h4>

        <div class="activityUserList">
            <ul>
                <li @click="userItemSelect(index,item.log_id)" v-for="(item, index) in data.memberlist" :key="index">
                    <p>
                        <span>{{item.real_name}}</span>
                    </p>
                    <p>
                        <span v-if="userListSelect.log_id == item.log_id" class="right iconfont">&#xe6ab;</span>
                    </p>
                </li>
            </ul>
        </div>


        <div class="endorse_btns">
            <!-- <span>直接退出</span> -->
            <span @click="onEndorseFn">确定改签</span>
        </div>
    </div>
</template>

<script>
    import { Radio } from 'vux'
    import {endorseData,onEndorse} from '@/api/order'
    export default {
        components:{
            Radio
        },
        data(){
            return{
                data:{
                    timeList:[
                        {
                           time:'01月1日周二',
                           add:'8:45海珠公园',
                           id:'1'
                        },
                        {
                           time:'01月1日周二',
                           add:'8:45海珠公园',
                           id:'2'
                        },
                        {
                           time:'01月1日周二',
                           add:'8:45海珠公园',
                           id:'3'
                        },
                    ],
                    userList:[
                        {
                           id:'1',
                           name:'小明'
                        },
                        {
                           id:'2',
                           name:'小红'
                        },
                    ]
                },
                timeListSelect:{
                    index:0,
                    key:''
                },
                userListSelect:{
                    index:1,
                    key:''
                }
            }
        },
        methods: {
            // 获取改签详情
            endorseData(){
                let oid = this.$route.query.id
                endorseData(oid).then(res => {
                    this.data = res.data.data;
                    let selected = this.data.grouplist.findIndex(item => item.is_selected == 1)
                    this.timeListSelect = this.data.grouplist[selected]
                    this.userListSelect = this.data.memberlist[0]

                    
                })
            },
            timeItemSelect(index,id){
                this.timeListSelect = this.data.grouplist[index]
            },
            userItemSelect(index,id){
                this.userListSelect = this.data.memberlist[index]
            },
            // 改签
            onEndorseFn(){
                let gid = this.timeListSelect.group_id
                let lid = this.userListSelect.log_id
                let old = this.data.grouplist[this.data.grouplist.findIndex(item => item.is_selected == 1)].group_id
                
                onEndorse(gid,lid,old).then(res => {
                    if(res.status == 200){
                        this.$vux.toast.text('改签成功')
                        this.endorseData()
                    }else{
                        this.$vux.toast.text('改签失败')
                    }
                })
            }
        },
        created() {
            this.endorseData()
        },
    }
</script>

<style lang="less">
.activeEndorse{
    margin-bottom:0;
    padding:.2rem;
    .boxSizing;

    h4{
        font-size:.32rem;
        margin:.2rem 0;
        color:@theme;
    }

    .endorse_btns{
        width:100%;
        height:.8rem;
        .flex;
        position:fixed;
        left:0;
        bottom:0;

        span{
            .btn(100%,.8rem,@theme,.36rem,#fff,0)
        }
        span:first-child{
            background:#41a8d3;
        }
    }
}
.acitvityList,.activityUserList{
    ul li{
        .flex;
        width:100%;
        .boxSizing;
        height:1rem;
        padding:.2rem .15rem;
        justify-content:space-between;
        align-items:center;
    }
    ul li span{
        display:block;
        font-size:.28rem;
        .textOverflow;
    }
    ul li .right{
        color:@theme;
    }
}
</style>

