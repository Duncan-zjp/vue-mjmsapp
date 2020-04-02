<template>
    <div v-if="!isShow" class="xuanfu" id="moveDiv"
        @mousedown="down" @touchstart="down"
        @mousemove="move" @touchmove="move"
        @mouseup="end" @touchend="end"
        >
        <router-link class="yuanqiu iconfont" :to="{name:'buyCar'}" tag="div">&#xe607;</router-link>
    </div>
</template>


<script>
    export default{
        components:{

        },
        data(){
            return{
                isShow:false,
                flags: false,
                position: { x: 0, y: 0 },
                nx: '', ny: '', dx: '', dy: '', xPum: '', yPum: '',
            }
        },
        methods:{
            // 实现移动端拖拽
            down(){
                this.flags = true;
                var touch;
                if(event.touches){
                    touch = event.touches[0];
                }else {
                    touch = event;
                }
                this.position.x = touch.clientX;
                this.position.y = touch.clientY;
                this.dx = moveDiv.offsetLeft;
                this.dy = moveDiv.offsetTop;
            },
            move(){
                if(this.flags){
                    var touch ;
                    if(event.touches){
                        touch = event.touches[0];
                    }else {
                        touch = event;
                    }
                    this.nx = touch.clientX - this.position.x;
                    this.ny = touch.clientY - this.position.y;
                    this.xPum = this.dx+this.nx;
                    this.yPum = this.dy+this.ny;
                    moveDiv.style.left = this.xPum+"px";
                    moveDiv.style.top = this.yPum +"px";
                    moveDiv.style.transition = 'all 0s';
                    document.addEventListener("touchmove",function(e){
                        window.event.returnValue = false;
                        e.preventDefault();
                    },false);
                }
            },
            //鼠标释放时候的函数
            end(){
                this.flags = false;
                // 释放之后恢复页面滚动
                document.addEventListener('touchmove', function (event) {
                    window.event.returnValue = true;
                }, false)
                let _x = event.changedTouches[0].clientX;
                let _boxw = moveDiv.offsetWidth
                moveDiv.style.transition = 'all .3s';
                if(_x > window.innerWidth / 2){
                    moveDiv.style.left = '6.3rem';
                }else{
                    moveDiv.style.left = '.2rem';
                }
            },
        }
    }
</script>

<style lang="less">
 .xuanfu {
    height: 1rem;
    width: 1rem;
    z-index: 999;
    position: fixed;
    top: 70%;
    left: 6.3rem;
    border-radius: 1rem;
    background-color: rgba(0, 0, 0, 0.55);
    
 }
 .yuanqiu {
    height: .8rem;
    width: .8rem;
    border: 0.1rem solid rgba(140, 136, 136, 0.5);
    margin: 0 auto;
    color: #000000;
    font-size: .4rem !important;
    line-height: .8rem;
    text-align: center;
    border-radius: 100%;
    background-color: #ffffff;
 }
</style>

