<template>
    <Tabbar>
        <tabbar-item :selected="select==0" :link="'/index'">
            <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item :selected="select==1" :link="'/classification'">
            <span slot="label">分类</span>
        </tabbar-item>
        <tabbar-item :selected="select==2" :link="'/travel'">
            <span slot="label">轻记</span>
        </tabbar-item>
        <tabbar-item :selected="select==3" :link="'/specialty'">
            <span slot="label">土特产</span>
        </tabbar-item>
        <tabbar-item :selected="select==4" :link="'/personal'">
            <span slot="label">我的</span>
        </tabbar-item>
    </Tabbar>
</template>

<script>
    import { Tabbar, TabbarItem } from 'vux'

    const components = {
        Tabbar,TabbarItem
    }

    export default{
        components:components,
        data(){
            return{
                
            }
        },
        computed:{
            select(){
                let path = this.$route.path;
                let index = 0;
                switch(path){
                    case '/index':
                        index = 0;
                    break;
                    case '/classification/index':
                        index = 1;
                    break;
                    case '/classification/info':
                        index = 1;
                    break;
                    case '/travel/index':
                        index = 2;
                    break;
                    case '/specialty/index':
                        index = 3;
                    break;
                    case '/personal/index':
                        index = 4;
                    break;
                }
                return index;
            }
        }
    }
</script>
<style>
.weui-tabbar{
    position:fixed !important;
}
.weui-tabbar__label span{
    font-size:14px;
}
</style>
