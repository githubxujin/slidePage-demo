<template>
  <div>
      <p>canvas实例</p>
      <ul class="leftBtns">
          <li @click="changeType(btn.type)" v-for="(btn,i) in leftBtns" :key="i">{{btn.name}}</li>
      </ul>
      <ul class="topBtns">
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
            leftBtns: [{name: '铅笔', type: 'pencer'}, {name: '箭头', type: 'arrow'}, {name: '直线', type: 'line'}, {name: '虚线', type: 'dottedLine'}, {name: '圆形', type: 'circle'}, {name: '正方形', type: 'rect'}, {name: '三角形', type: 'triangle'}, {name: '垃圾桶', type: 'delete'}, {name: '文字', type: 'word'}, {name: '撤回', type: 'back'}],            
            canvasInt: null,
            mouseFrom: {x: 0, y: 0},
            mouseTo: {x: 0, y: 0}
        }
    },
    mounted() {
        let self = this;
        $(window).resize(function () {          //当浏览器大小变化时
            self.initCanvas()
        });
        let options = {
            isDrawingMode: true, // 设置是否可以绘制
            selectable: false, // 设置是否可以选中拖动
            selection: false
        }
        this.canvasInt = new fabric.Canvas(this.$refs.canvas, options);

        // 鼠标点击
        this.canvasInt.on('mouse:down', options => {
            // 起点位置
            this.mouseFrom.x = options.pointer.x;
            this.mouseFrom.y = options.pointer.y;
            console.log('options', options)
            console.log('options', options.pointer.x, options.pointer.y)
        })
        // 鼠标移动
        this.canvasInt.on('mouse:move', options => {
            console.log('options', options.pointer.x, options.pointer.y)
        })
        // 鼠标抬起
        this.canvasInt.on('mouse:up', options => {
            // 终点位置
            this.mouseTo.x = options.pointer.x;
            this.mouseTo.y = options.pointer.y;
        })
        // 修改拖拽对象过程中透明度
        this.canvasInt.on('object:move', e => {
            e.target.opacity = 0.5
        })

        this.canvasInt.on('object:modified', e => {
            e.target.opacity = 1
        })

        this.canvasInt.on('object:added', e => {
            if(!this.controlFlag) {
                this.redo = [] //撤回用的数据
            }
        })

        this.initCanvas()
    },
    methods: {
        changeType(type) {
            switch(type) {
                case 'pencer':
                    // 铅笔
                    break;
                case 'circle':
                    // 圆形
                    break;
                case 'arrow': 
                    // 箭头
                    break;
                case 'line': 
                    // 直线
                    break;
                case 'dottedLine':
                    // 虚线
                    break;
                case 'rect':
                    // 正方形
                    break;
                case 'triangle': 
                    // 三角形
                    break;
                case 'word':
                    // 文字
                    break;
                case 'delete':
                    // 删除
                    break;
                case 'back':
                    // 撤回
                    break;
                default :
                    break;
            }
        },
        initCanvas() {
            let width = window.innerWidth;
            let height = window.innerHeight;
            this.canvasInt.setWidth(width);
            this.canvasInt.setHeight(height);
            
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
.leftBtns{
    top: 40px;
    position: absolute;
    width: 40px;
    z-index: 1;
    background: #fff;
    li{
        font-size: 12px;
        text-align: center;
        height: 40px;
        border-bottom: 1px solid #efefef;
    }
}
.topBtns{
    display: flex;
}
.topBtns li{
    flex: 1;
    display: inline-block;
}
</style>