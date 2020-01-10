<template>
  <div id="fullPage">
    <div class="section section1">
      <h3>第一屏</h3>
      <!-- <p>fullPage.js — 回调函数演示（配合jquery.easing.js使用）</p> -->
    </div>
    <div class="section section2">
      <h3>第二屏</h3>
      <p>滚动到第二屏后的回调函数执行的效果</p>
    </div>
    <div class="section section3">
      <h3>第三屏</h3>
      <p>滚动到第三屏后的回调函数执行的效果</p>
    </div>
    <div class="section section4">
      <h3>第四屏</h3>
      <p>滚动到第四屏后的回调函数执行的效果</p>
    </div>
  </div>
</template>

<script>

// import $ from '@/util/jquery.js';

// import $ from '@/util/jquery.easing.min.js';

require('@/util/jquery.fullPage.js')
require('@/util/jquery.easing.min.js');
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    /***
     * jquery 1.7及之前版本配合jquery.easing.js animate没问题，之后版本通过addClass实现动画
     * 
     */
    console.log($('#fullPage'))
    $(function(){
      $('#fullPage').fullpage({
        sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90'],
        afterLoad: function(anchorLink, index){
          console.log("anchorLink", anchorLink)
          console.log("index", index)
          if(index == 2){
            $('.section2').find('p').addClass('left_in_animation');
          }
          if(index == 3){
            $('.section3').find('p').delay(500).animate({
              bottom: '0'
            }, 1500, 'easeOutExpo');
          }
          if(index == 4){
            $('.section4').find('p').fadeIn(2000);
          }
        },
        onLeave: function(index, direction){
          if(index == '2'){
            $('.section2').find('p').delay(500).animate({
              left: '-120%'
            }, 1500, 'easeOutExpo');
          }
          if(index == '3'){
            $('.section3').find('p').delay(500).animate({
              bottom: '-120%'
            }, 1500, 'easeOutExpo');
          }
          if(index == '4'){
            $('.section4').find('p').fadeOut(2000);
          }
        }
      });
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@mixin base_animation (){
  // animation-duration: 1.5s;
  // animation-delay: 300ms;
  // animation-timing-function: 'linear';
  // animation-iteration-count: infinite;
  // animation-direction: alternate;
  // animation-play-state: running;
}
.section { text-align: center; font: 50px "Microsoft Yahei"; color: #fff;}
.section p{ font: 30px "Microsoft Yahei";}
.section2 p { position: relative; transform: translateX(-120%);}
.section3 p { position: relative; bottom: -120%;}
.section4 p { display: none;}
.section2 p.left_in_animation{ 
  transform: translateX(0);
  animation: all 1.5s linear;
  @include base_animation();
}
</style>
