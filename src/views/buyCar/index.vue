<template>
    <div class="container buyCarCon">
        <!-- 商铺列表 -->
        <div class="list">
            <div class="storeitem" v-for="(store, index) in carData.carts_list" :key="index">
                <div class="top">
                    <span @click="storeSelect(index)" :class="store.select_goods_count == store.goods_list.length?'selected':''"></span>
                    <p>{{store.supplier_name}}</p>
                </div>
                <!-- 每一个商品的商品列表 -->
                <div class="shoplist">
                    
                    <swipeout class="shoplist_wrap" v-for="(item, index2) in store.goods_list" :key="index2">
                         <swipeout-item :threshold="0.4" @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="reveal">
                            <div slot="right-menu">
                                <swipeout-button @click.native="delFn(item.rec_id)" type="warn">删除</swipeout-button>
                            </div>
                            <div slot="content" class="demo-content vux-1px-t">
                                <div class="item">
                                    <span @click="goodSelect(item.goods_id,item.rec_id,item.is_selected=='1'?'0':'1')" :class="`select ${item.is_selected == '1'?'selected':''}`"></span>
                                    <div class="pic"><img :src="item.goods_thumb" alt=""></div>
                                    <div class="r">
                                        <p>{{item.goods_name}}</p>
                                        <div class="b">
                                            <span class="price">￥{{item.goods_price}}</span>
                                        </div>
                                        <div class="num">
                                            <x-number align="left" :min="1" v-model="item.goods_number" width="20px" @on-change="updateNumFn(item.rec_id,item.goods_id,item.goods_number,item.supplier_id)"></x-number>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </swipeout-item>
                    </swipeout>
                   
                </div>
                <!-- 每一个商品的商品列表 end -->
            </div>
            
        </div>
        <!-- 商铺列表 end -->

        <div class="shopCar_bt">
            <div class="label">
                <span>总费用：</span>
                <span><small>{{carData.total?carData.total.goods_price:''}}</small> 元</span>
            </div>
            <div @click="payFn" class="btn">支付</div>
        </div>
    </div>
</template>

<script>
    import { XNumber,Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
    import {list,select,updateNum,del,pay} from '@/api/shopCar'
    export default{
        components:{
            XNumber,Swipeout, SwipeoutItem, SwipeoutButton
        },
        data(){
            return{
                carData:{},
                goodsList:[]
            }
        },
        methods: {
            // 获取购物车数据
            getShopList(){
                list().then(res => {
                    if(res.status == 200){
                        this.carData = res.data.data;
                        // 保存全部商品数据
                        this.goodsList = []
                        Object.keys(res.data.data.carts_list).forEach((k,v) => {
                            res.data.data.carts_list[k].goods_list.forEach(item2 => {
                                this.goodsList.push(item2)
                            });
                        })
                    }
                })
            },
            handleEvents(){

            },
            onButtonClick(){

            },
            // 选中商品
            goodSelect(id,recid,type){
                select(id,recid,type).then(res => {
                    if(res.status == 200){
                        // 刷新数据
                        this.getShopList()
                    }
                })
            },
            // 修改商品数量
            updateNumFn(recid,goodsid,number,suppid){
                updateNum(recid,goodsid,number,suppid).then(res => {
                    if(res.status == 200){
                        this.getShopList()
                        return;
                    }
                })
            },
            // 单个商铺全选
            storeSelect(key){
                let carData = this.carData
                let _type = carData.carts_list[key].select_goods_count == carData.carts_list[key].goods_list.length ? '0' : '1'
                carData.carts_list[key].goods_list.forEach(item => {
                    this.goodSelect(item.goods_id,item.rec_id,_type)
                });
            },
            //  删除购物车商品
            delFn(recid){
                del(recid).then(res => {
                    this.getShopList()
                    return;
                })
            },
            // 支付
            payFn(){
                let _data = this.goodsList
                let posData = {
                    'sel_cartgoods':[],
                    'goods_number':[],
                    'flow_type':0
                }
                _data.forEach(item => {
                    if(item.is_selected == '1'){
                        posData['sel_cartgoods'].push(item.rec_id);
                        let obj = {};
                        obj[item.rec_id] = item.goods_number;
                        console.log(obj)
                        posData['goods_number'].push(obj)
                    }
                    
                });
                // 支付
                pay(posData,res=>{
                    this.$vux.toast.text('支付成功')
                    this.$router.push({name:'orderList',query:{id:3}})
                },res => {
                    this.$vux.toast.text('支付失败')
                    // 刷新数据
                    this.getShopList()
                    this.$router.go(-1)
                });
                
            }
        },
        created() {
            this.getShopList()
            let config = {};
            config.url = window.location.href;
            // 判断当前url是否存在?参数匹配符
            if(!config.url.match(/\?/)) {
                // history.replaceState(null, null,window.location.href.split('#')[0] + '?' + window.location.hash);
                location.replace(window.location.href.split('#')[0] + '?' + window.location.hash);
                return ;
            }
        },
    }
</script>


<style lang="less">
.buyCarCon{

}
.buyCarCon .list{
    padding:0.2rem;
}
.storeitem .top{
    .flex;
    align-items:center;
    border-bottom:0.01rem solid #ccc;
    padding-bottom:.1rem;
    span{
        width:.5rem;
        height:.5rem;
        .borderRadius(.5rem);
        border:0.02rem solid #ccc;
    }
    p{
        font-size:0.32rem;
        font-weight:bold;
        margin-left:0.2rem;
    }
    .selected{
        background:@theme;
    }
}
.shoplist{
    width:100%;
    @itemHeight:1.8rem;
    .item{
        width:100%;
        .flex;
        padding:.15rem 0;
    }
    .item .pic{
        width:3rem;
        height:@itemHeight;
        overflow: hidden;
        margin-left: .1rem;
        background:#ccc;
        text-align:center;
        img{
            .imgCenter;
        }
    }
    .item .select{
        width:.5rem;
        height:.5rem;
        .borderRadius(.5rem);
        border:0.02rem solid #ccc;
        margin-top:.65rem; 
    }
    .item .selected{
        background:@theme;
    }
    .item .r{
        width:3.3rem;
        height:@itemHeight;
        margin-left:.1rem;
        .flex;
        flex-wrap:wrap;
        align-content:space-between;
    }
    .item .r p{
        font-size:.32rem;
        .textOverflow;
    }
    .item .r .price{
        font-size:.32rem;
        color:#ef5555;
    }
}
.shopCar_bt{
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
.vux-swipeout-button{
    border-image-source:0 !important;
}

</style>

