<template>
    <div>
        <router-view />
        <tabBar />
        <buyCar />
        
    </div>
</template>

<script>
    import tabBar from '@/components/tabBar/tabBar';
    import buyCar from '@/components/buyCar/buyCar';

    const components = {
        tabBar,buyCar
    }

    export default{
        components:components
    }
</script>

<style>
.v-enter{
  opacity:0;
}
  .v-enter-to{
    opacity:1;
  }
  .v-enter-active{
    transition:1s;
  }
.v-leave{
  opacity:1;
}
.v-leave-to{
  opacity:0;
}
.v-leave-active{
  transition:.1s;
}


</style>

