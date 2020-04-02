<template>
    <div class="buttons">
        <ul>
            <router-link :to="{name:'classinfo',query:{tagid:'368',type:'index'}}" tag="li">
                <i><img src="@/assets/images/icon/index_ico1.png" alt=""></i>
                <span>周边短线</span>
            </router-link>
            <li @click="showewm">
                <i><img src="@/assets/images/icon/index_ico2.png" alt=""></i>
                <span>活动定制</span>
            </li>
            <router-link :to="{name:'classinfo',query:{tagid:'369',type:'index'}}" tag="li">
                <i><img src="@/assets/images/icon/index_ico3.png" alt=""></i>
                <span>长线游</span>
            </router-link>
            <router-link :to="{name:'classinfo',query:{tagid:'370',type:'index'}}" tag="li">
                <i><img src="@/assets/images/icon/index_ico4.png" alt=""></i>
                <span>爆款专线</span>
            </router-link>
            <router-link :to="{name:'classinfo',query:{tagid:'371',type:'index'}}" tag="li">
                <i><img src="@/assets/images/icon/index_ico10.png" alt=""></i>
                <span>境外游</span>
            </router-link>
            <li onclick="location.href='http://m.ctrip.com/html5/car/yongche/?allianceid=928362&sid=1501849&popup=close&autoawaken=close'">
                <i><img src="@/assets/images/icon/index_ico5.png" alt=""></i>
                <span>租赁服务</span>
            </li>
            <li onclick="location.href='http://m.ctrip.com/webapp/Hotel/?allianceid=928362&sid=1501849&popup=close&autoawaken=close'">
                <i><img src="@/assets/images/icon/index_ico6.png" alt=""></i>
                <span>酒店</span>
            </li>
            <li onclick="location.href='http://m.ctrip.com/html5/Flight/?allianceid=928362&sid=1501849&popup=close&autoawaken=close'">
                <i><img src="@/assets/images/icon/index_ico7.png" alt=""></i>
                <span>机票</span>
            </li>
            <li onclick="location.href='http://m.ctrip.com/webapp/train/?allianceid=928362&sid=1501849&popup=close&autoawaken=close&hiderecommapp=1'">
                <i><img src="@/assets/images/icon/index_ico8.png" alt=""></i>
                <span>火车票</span>
            </li>
            <li onclick="location.href='http://m.ctrip.com/webapp/bus/?allianceid=928362&sid=1501849&popup=close&autoawaken=close'">
                <i><img src="@/assets/images/icon/index_ico9.png" alt=""></i>
                <span>汽车票</span>
            </li>
            
        </ul>

        <x-dialog v-model="dialog" hide-on-blur>
            <div class="kfewm">
                <img src="@/assets/images/kf_ewm.jpg" alt="">
            </div>
        </x-dialog>
    </div>
</template>

<script>
    export default{
        components:{

        },
        data(){
            return{
                dialog:false
            }
        },
        methods: {
            showewm(){
                this.dialog = true
            }
        },
    }
</script>


<style lang="less">
.buttons{
    padding:0.2rem 0.25rem;
    ul{
        width:8rem;
        overflow: hidden;
    }
    ul li{
        width:1rem;
        margin:0 .5rem 0.2rem 0;
        float:left;
    }
    ul li *{
        display:block;
        width:100%;
        text-align:center;
    }
    ul li i{
        height:1rem;
    }
    ul li span{
        margin-top:0.1rem;
        font-size:0.24rem;
    }


    .kfewm{
        width:4rem;
        height:4rem;
        margin:0 auto
    }
    .kfewm img{
        width:100%;
        height:100%;
    }
}
</style>
