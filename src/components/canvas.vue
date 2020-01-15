<template>
  <div>
      <p>canvas实例</p>
      <ul>
          <li @click="distribute(item.fun)" v-for="(item,i) in btns" :key="i">{{item.name}}</li>
      </ul>
      <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
       
import {fabric} from 'fabric'
export default {
    data() {
        return {
            btns: [{name:'正方形', fun: 'drawRect'},{name: '圆形', fun: 'drawCircle'},{name:'三角形',fun: 'drawTriangle'},{name:'不规则',fun: 'drawPath'}],
            canvasInt: null
        }
    },
    mounted() {
        let self = this;
        $(window).resize(function () {          //当浏览器大小变化时
            self.initCanvas()
        });
        this.canvasInt = new fabric.Canvas(this.$refs.canvas,{height: 500})
        this.canvasInt.on('mouse:down', function(options) {
            console.log('options', options)
            console.log('options', options.pointer.x, options.pointer.y)
        })
        this.canvasInt.on('mouse:move', function(options){
            console.log('options', options.pointer.x, options.pointer.y)
        })
        this.initCanvas()
    },
    methods: {
        initCanvas() {
            let width = window.innerWidth;
            this.canvasInt.setWidth(width)
            
        },
        distribute(type) {
            this[type]();
        },
        drawRect() {
            let rect = new fabric.Rect({
                left: 100,
                top: 100,
                fill: 'red',
                width: 30,
                height: 30
            })
            this.canvasInt.add(rect)
        },
        drawCircle() {

        },
        drawTriangle() {

        },
        drawPath() {
            let path = new fabric.Path('M 0 0 L 200 100 L 170 200 z');
            path.set({left: 120, top: 120, fill: 'orange'})
            this.canvasInt.add(path)
        }
    }
}
</script>

<style lang="scss" scoped>

li,ul,ol{
    list-style: none;
}
ul{
    display: flex;
}
ul li{
    flex: 1;
    display: inline-block;
}
</style>