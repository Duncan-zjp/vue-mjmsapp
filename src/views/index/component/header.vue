<template>
    <header class="header">
        <span class="iconfont">{{thisAddress}}</span>
        <input @change="searchFinish" class="iconfont" type="text" :placeholder="searchText">
        <a href="#" class="iconfont">&#xe6fa;</a>
    </header>
</template>



<script>
    export default{
        data(){
            return{
                thisAddress : '佛山 \ue6b9',
                searchText : `\ue693 线路/领队/游记`
            }
        },
        methods:{
            //输入完成
            searchFinish(e){
                console.log(e)
            }
        }
    }
</script>


<style lang="less">

.iconfont{
    font-family:"iconfont";
    font-size:0.24rem;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale; 
}
.header{
    .flex;
    justify-content:space-between;
    padding:0.1rem 0.3rem;
    height:0.8rem;
    line-height:0.8rem;
    *{
        height:100%;
    }
    span{
        width:1rem;
        text-align:center;
    }
    input{
        width:5rem;
    }
    a{
        width:0.8rem;
        text-align:center;
        font-size:0.36rem;
    }
}
</style>



