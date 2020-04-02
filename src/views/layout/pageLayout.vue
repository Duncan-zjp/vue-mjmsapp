<template>
    <div>
        <router-view />
        <buyCar />
    </div>
</template>

<script>
    import buyCar from '@/components/buyCar/buyCar';
    export default{
        components:{
            buyCar
        },
        data(){
            return{

            }
        }
    }
</script>

<style lang="less">

</style>

