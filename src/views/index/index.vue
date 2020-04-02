<template>
    <div class="container">
        <!-- <headerer /> -->
        <banner />
        <buttons />
        <activity />
        <seasonRecommend />
        <specialtyClass />
        <specialtyList />
        <selectLine />
        <productList />
    </div>
</template>


<script>
    import {headerer,banner,buttons,activity,seasonRecommend,selectLine,specialtyClass,specialtyList,productList} from './component'
    export default{
        components:{
            headerer,banner,buttons,activity,seasonRecommend,selectLine,specialtyClass,specialtyList,productList
        },
        data(){
             return{

             }
        }
    }
</script>
<style lang="scss">
    
</style>
