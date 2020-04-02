<template>
  <div class="app" ref="app">
      <!-- <link rel="stylesheet" media="all and (orientation:portrait)" href="portrait.css">    竖放加载 -->
	  <!-- <link rel="stylesheet" media="all and (orientation:landscape)" href="landscape.css">   横放加载 -->
      <div class="content" ref="content">
          <h1>内容</h1>
          <p  @click="show = true" v-for="i in 12" :key="i">内容{{i}}</p>
      </div>
      <div ref='model' v-show="show" @click="show = false" class="model"></div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            top: 0
        }
    },
    mounted() {
        let appdom = document.getElementsByClassName('app')[0];
        appdom.addEventListener('scroll', function(e) {
            e.preventDefault;
            console.log(e.target.scrollTop);
            this.top = e.target.scrollTop
        })
    },
    watch: {
        show(val) {
            let model = this.$refs.model;
            // let model = document.body;
            console.log(model)
             if(val){ //禁止滚动
                // 移动端才生效
                model.addEventListener('touchmove', function(e) {console.log(e);e.preventDefault()}, { passive: false });
              }else { //开启滚动
                model.removeEventListener('touchmove', function(e) {e.preventDefault()}, {passive: false});
              }
            let app = this.$refs.app;
            let appdom = document.getElementsByClassName('app')[0];

            console.log(app.scrollY)
            console.log('appdom', appdom)
            // 移动端，PC端都能生效
            // if (val) {
                

            //     app.style.position = 'fixed';

            //     app.style.top = -this.top + 'px'
            // } else {
            //     app.style.position = ''
            //     app.style.top = ''

            //     window.scrollTo(0, this.top) // 回到原先的top
            // }
        }
    },
    methods: {

    }
}
</script>

<style scoped >
.app{
    height: 100vh;
    width: 100vw;
    overflow: auto;
}
.model{
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .6);
    z-index: 10;
}
p{
    height: 20vw;
    line-height: 20vw;
    border-bottom: 1px solid #efefef;
}
/* 消除transition闪屏 */
-webkit-transform-style: preserve-3d;
/*设置内嵌的元素在 3D 空间如何呈现：保留 3D*/
-webkit-backface-visibility: hidden;
/*（设置进行转换的元素的背面在面对用户时是否可见：隐藏）*/
</style>
<style media="all and (orientation:portrait)" type="text/css">
    #landscape { display: none; }
    /* 竖屏使用 */
</style>
<style media="all and (orientation:landscape)" type="text/css">
    #portrait { display: none; }
    /* 横屏使用 */
    
</style>