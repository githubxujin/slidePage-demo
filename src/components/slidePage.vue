<template>
<div>
    <div class="begin-page" ref="start">
        <button @touchstart="start">开始</button>
    </div>
    <div ref="container" class="audio" @touchstart="change">
          <!-- <audio controls> -->
              <!-- <source src="song2.ogg" type="audio/*"> -->
          <!-- </audio> -->
          <img ref="img" class="animate" src="../assets/zhoujielun.jpg" alt="">
      </div>
  <div class="slidePage-container" id="slidePage-container">
      
      <div class="item item1">
          <div>第一页</div>
          <div class="step step1 fadeIn hide"></div>
          <div class="step step2 fadeIn hide"></div>
      </div>
      <div class="item item2">
          <div>第二页</div>
        <div class="step step1 slideRight hide" data-delay="1000"></div>
        <div class="step step3 zoomIn hide" data-delay="1000"></div>
        <div class="step step2 slideLeft hide" data-delay="1000"></div>
      </div>
      <div class="item item3">
         <a class="play" href="javascript:slidePage.fire(3)">点击播放动画</a>
        <div class="lazy step1 slideUp hide"></div>
        <div class="lazy step2 slideDown hide"></div>
      </div>
      <div class="item item4">
          <div class="container">
				<h2>Page2 - 单屏内容滚动</h2>
				<p>当内容长度超过屏幕<br>会自动变成原生滚动条方式</p>
				<ul>
						<li>滚动内容 - 第1条</li>
						<li>滚动内容 - 第2条</li>
						<li>滚动内容 - 第3条</li>
						<li>滚动内容 - 第4条</li>
						<li>滚动内容 - 最后1条内容</li>
					</ul>
			</div>
      </div>
      <div class="item item5">
        <div>
            <h2>Page5 - 更多动画</h2>
            <div class="step step1 rollInLeft hide"></div>
            <div class="step step2 forceDown hide" data-delay="1000"></div>
            <div class="step step3 fadeFlash infinite hide" data-delay="1500"></div>
        </div>
      </div>
      <div class="item item6">
          <span>立即体验</span>
      </div>
  </div>
  </div>
</template>

<script>
require('@/util/slidePage-touch.js')
// require('@/util/slidePage.js')
export default {
    data() {
        return {
            playing: true
        }
    },
    mounted() {
        import ('@/util/slidePage.js').then(_ => {
            slidePage.init({
            // 'index': 0,
                before:function(index,direction,target){
                    console.log('before',{index: index,direction:direction,target:target})
                    if(direction=='next'){
                        if(target==1){
                            slidePage.fire(2)   //-- 手动控制播放第几页的lazy动画
                        }
                        // $('.item' + index + ' .step').addClass('fadeIn')
                        // $('#pagination').find('a').removeClass('active').eq(index).addClass('active')
                    }else if(direction=='prev'){
                        // $('#pagination').find('a').removeClass('active').eq(target-1).addClass('active')
                    }
                },
                after:function(index,direction,target){
                    console.log('after',{index: index,direction:direction,target:target})
                },
                'useAnimation': true,
                'refresh': true,
                'speed': false,
            });
            setTimeout(_ => {
                // 默认进入首页，动画页动画都关闭
                $('.item1').find('.step').addClass('hide')
            }, 100)
            
        })

    },
    methods: {
        start(){
            let start = this.$refs.start;
            start.classList.add('opacityAnimation');
            // 监听动画结束
            start.addEventListener('webkitAnimationEnd', function() {
                start.classList.add('displayNone');
                slidePage.fireNow(1)
            })
        },
        change(e) {
            console.log(e)
            this.playing = !this.playing;
            let image = this.$refs.img;
            let container = this.$refs.container;
            
            function pause() {
                // isPlaying = false;
                var iTransform = getComputedStyle(image).transform;
                var cTransform = getComputedStyle(container).transform;
                container.style.transform = cTransform === 'none'
                    ? iTransform
                    : iTransform.concat(' ', cTransform);
                image.classList.remove('animate');
            }

            function play() {
                // isPlaying = true;
                image.classList.add('animate');
            }
            this.playing ? play() : pause();
        },
        
    }
}
</script>

<style lang="scss" scoped>
// @import '';
        // IOS不支持animation-play-state
        .begin-page{
            position: absolute;
            height: 100vh;
            width: 100%;
            z-index: 11;
            background: grey;
        }
        .displayNone {
            display: none;
        }
        .item4 ul li{
            width: 100%;
            padding: 100px 10px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            border-bottom: 1px solid rgb(83, 83, 83);
            background: rgba(255, 255, 255, .5);
            text-align: center;
        }
        .opacityAnimation{
            animation: opacityAnimation .5s linear;
        }
        @keyframes opacityAnimation {
            100% {
                opacity: 0;
            }
        }  
        .animate {
            animation: round 10s linear infinite;
        }

        @keyframes round {
            100% {
                transform: rotate(1turn);
            }
        }
        .rotate-pause {
            animation-play-state:paused;
            -webkit-animation-play-state:paused; /* Safari 和 Chrome */
        }
        .audio{
            position: absolute;
            
            width: 20vw;
            height: 20vw;
            border-radius: 50%;
            right: 5vw;
            top: 5vw;
            audio{
                display: none;
            }
            // background: url(../assets/zhoujielun.jpg) no-repeat;
            background-size: 100% 100%; 
            z-index: 10;
            img{
                width: 20vw;
                height: 20vw;
                border-radius: 50%;
            }
        }

        html, body {
            margin: 0;
            width: 100%;
            height: 100%;
            font-family: arial;
            text-align: center;
        }

        body {
            margin: 0;
            padding: 0;
            background: #000;
        }

        ul {
            list-style: none;
        }



        .prev-page,.next-page{
            display: block;
            width: 25px;
            height: 25px;
            line-height: 26px;
            position: absolute;
            right: 2px;
            z-index: 9999;
            background: rgba(255,255,255,.5);
            border-radius: 50%;
            font-size: 14px;
            color: #666;
            text-align:center;
        }

        .prev-page{
            top: 0;
        }
        .next-page{
            bottom: 0;
        }
        .prev-page:active{
            background: rgba(155,155,155,.5);
        }
        .next-page:active{
            background: rgba(155,155,155,.5);
        }
        .pagination{
            width: 30px;
            height: auto;
            position: fixed;
            top: 50%;
            right: 5px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding: 40px 0;
            margin-top: -150px;
        }
        .pagination a{
            width: 25px;
            height: 25px;
            display: block;
            line-height: 28px;
            text-align: center;
            padding-left: 3px;
        }
        .pagination a:after{
            content: "";
            width: 15px;
            height: 15px;
            border-radius: 50%;
            display: inline-block;
            background: rgba(0,0,0,.5);
            -webkit-transition: background .3s ease;
            -moz-transition: background .3s ease;
            -ms-transition: background .3s ease;
            -o-transition: background .3s ease;
            transition: background .3s ease;
        }
        .pagination a.active:after{
            background: rgba(255,255,255,.5);
        }

        .item h2{
            margin:0;
            padding:20px 0;
        }

        .play{
            display: block;
            position: absolute;
            top:50%;
            left:50%;
            margin-top:-20px;
            margin-left: -50px;
            width:100px;
            height:100px;
            -webkit-border-radius:50%;
            -moz-border-radius:50%;
            border-radius:50%;
            line-height: 100px;
            background-color: rgb(178, 79, 65);
            color: #fff;
            text-align: center;
            font-size: 14px;
            text-decoration: none;
        }
        .play:hover{
            background-color: rgb(189, 80, 66);
        }
        .play:active{
            background-color: rgb(141, 60, 50);
        }

        .goto{
            display: block;
            position: absolute;
            top:50%;
            left:50%;
            margin-top:-20px;
            margin-left: -50px;
            width:100px;
            height:100px;
            webkit-border-radius:50%;
            -moz-border-radius:50%;
            border-radius:50%;
            line-height: 100px;
            background-color: rgb(47, 95, 178);
            color: #fff;
            text-align: center;
            font-size: 14px;
            text-decoration: none;
        }
        .goto:hover{
            background-color: rgb(57, 123, 219);
        }
        .goto:active{
            background-color: rgb(31, 79, 134);
        }

        .item1 {
            background-color: #99CC33;
        }

        .item2 {
            background-color: #99CC66;
        }

        .item3 {
            background-color: #99CCCC;
        }

        .item4 {
            background-color: #CCCC33;
        }

        .item5 {
            background-color: #CCCC99;
        }

        .item6 {
            background-color: #CCCC66;
        }

        .item1 .step1 {
            position: absolute;
            top: 100px;
            left: 19%;
            text-align: center;
            width: 100px;
            height: 100px;
            background-color: rgb(178, 116, 57);
            border-radius: 50%;

        }

        .item1 .step2 {
            position: absolute;
            bottom: 100px;
            right: 19%;
            text-align: center;
            width: 100px;
            height: 100px;
            background-color: rgb(116, 178, 9);
        }

        .item2 .step1 {
            position: absolute;
            top: 100px;
            right: 5%;
            text-align: center;
            width: 100px;
            height: 100px;
            background-color: rgb(82, 110, 178);
            border-radius: 50%;
        }

        .item2 .step3 {
            position: absolute;
            bottom: 60px;
            left: 19%;
            text-align: center;
            width: 150px;
            height: 150px;
            background-color: rgb(178, 79, 54);
        }

        .item2 .step2 {
            position: absolute;
            top: 100px;
            left: 19%;
            text-align: center;
            width: 100px;
            height: 100px;
            background-color: rgb(116, 178, 9);
        }

        .item3 .step1 {
            position: absolute;
            top: 100px;
            left: 19%;
            text-align: center;
            width: 100px;
            height: 100px;
            background-color: rgb(178, 79, 65);
            border-radius: 50%;
        }


        .item3 .step2 {
            position: absolute;
            bottom: 100px;
            right: 19%;
            text-align: center;
            width: 100px;
            height: 100px;
            background-color: rgb(52, 178, 89);
        }


        .item4 .container{
            padding-bottom: 20px;
        }

        .item4 ul{
            margin:0;
            padding:0;
            width:90%;
            margin-left: 5%;
        }

        .item4 ul li{
            width: 100%;
            padding: 100px 10px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            border-bottom: 1px solid rgb(83, 83, 83);
            background: rgba(255, 255, 255, .5);
            text-align: center;
        }





        .item5 .step2 {
            position: absolute;
            top: 100px;
            left: 19%;
            text-align: center;
            width: 150px;
            height: 100px;
            background-color: rgb(178, 159, 44);
        }

        .item5 .step1 {
            position: absolute;
            bottom: 100px;
            left: 19%;
            text-align: center;
            width: 100px;
            height: 100px;
            background-color: rgb(178, 72, 91);
        }

        .item5 .step3 {
            position: absolute;
            bottom: 100px;
            left: 60%;
            text-align: center;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-color: rgb(93, 163, 178);
        }



    
</style>