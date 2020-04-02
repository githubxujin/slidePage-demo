<template>
  <div>
      <!-- <link rel="stylesheet" media="all and (orientation:portrait)" href="portrait.css">    竖放加载 -->
	  <!-- <link rel="stylesheet" media="all and (orientation:landscape)" href="landscape.css">   横放加载 -->
  </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style scoped >
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