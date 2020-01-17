<template>
  <div>
      <p>canvas实例</p>
      <div class="tools">
          <colorPicker v-model="strokeColor" @change="value => strokeColor = value"></colorPicker>
      </div>
      <ul class="leftBtns">
          <li @click="changeType(btn.type)" v-for="(btn,i) in leftBtns" :key="i">
              <label for="upload">{{btn.name}}</label>
              <input @change="uploadImg" id="upload" type="file" accept="image/*" v-if="btn.type === 'image'" style="display: none">
          </li>
      </ul>
      <ul class="topBtns">
          <li @click="distribute(item.fun)" v-for="(item,i) in btns" :key="i">{{item.name}}</li>
      </ul>
      <img src="../assets/zhoujielun.jpg" ref="image" alt="" style="display: none">
      <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
       
import {fabric} from 'fabric';
import zhuojielun from '../assets/zhoujielun.jpg';



export default {
    data() {
        return {
            btns: [{name:'正方形', fun: 'drawRect'},{name: '圆形', fun: 'drawCircle'},{name:'三角形',fun: 'drawTriangle'},{name:'不规则',fun: 'drawPath'}],
            leftBtns: [{name: '铅笔', type: 'pencil'}, {name: '箭头', type: 'arrow'}, {name: '直线', type: 'line'}, {name: '虚线', type: 'dottedLine'}, {name: '圆形', type: 'circle'}, {name: '正方形', type: 'rect'}, {name: '三角形', type: 'triangle'}, {name: '垃圾桶', type: 'delete'}, {name: '文字', type: 'word'}, {name: '撤回', type: 'back'},{name: '图片',type:'image'},{name: '编辑', type: 'edit'}],            
            canvasInt: null,
            mouseFrom: {x: 0, y: 0},
            mouseTo: {x: 0, y: 0},
            drawingObject: null,
            strokeColor: '#333',
            strokeWidths: 3,
            type: 'pencil',
            canDrawing: false
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
            this.mouseFrom.x = parseInt(options.pointer.x) ;
            this.mouseFrom.y = parseInt(options.pointer.y);
            this.canDrawing = true;
            console.log('起点', this.mouseFrom.x, this.mouseFrom.y)
        })
        // 鼠标移动
        this.canvasInt.on('mouse:move', options => {
            // console.log('options', options.pointer.x, options.pointer.y)
            if(!this.canDrawing) return ;
            this.mouseTo.x = parseInt(options.pointer.x);
            this.mouseTo.y = parseInt(options.pointer.y);
            this.drawing();
        })
        // 鼠标抬起
        this.canvasInt.on('mouse:up', options => {
            // 终点位置
            this.mouseTo.x = parseInt(options.pointer.x);
            this.mouseTo.y = parseInt(options.pointer.y);
            console.log('终点', this.mouseTo.x, this.mouseTo.y)
            this.drawing();
            this.canDrawing = false;
        })
        // 修改拖拽对象过程中透明度
        this.canvasInt.on('object:move', e => {
            e.target.opacity = 0.5
            this.changeType()
        })

        this.canvasInt.on('object:modified', e => {
            e.target.opacity = 1;
            this.drawing()
        })

        this.canvasInt.on('object:added', e => {
            if(!this.controlFlag) {
                this.redo = [] //撤回用的数据
            }
        })

        this.initCanvas()
    },
    methods: {
        resetObj () {
            // 关闭绘图
            this.canvasInt.isDrawingMode = false;
            this.canvasInt.selectable = false;
            this.canvasInt.selection = false;
            // ？
            this.canvasInt.skipTargetFind = true;
        },
        changeType(type) {
            this.type = type;
        },
        drawing() {
            this.resetObj();
            if(this.drawingObject) {
                this.canvasInt.remove(this.drawimgObject)
            }
            let canvasObject = null;
            switch(this.type) {
                case 'pencil':
                    this.canvasInt.isDrawingMode = true;
                    // this.canvasInt.freeDrawigBrush.color = this.strokeColor
                    // this.canvasInt.freeDrawigBrush.width = this.strokeWidths // 画笔宽度
                    // 铅笔
                    break;
                case 'circle':
                    // 圆形
                    break;
                case 'arrow':
                    this.fillColor = this.isFill ? this.strokeInnerColor : '';
                    canvasObject = new fabric.Path(
                        this.drawArrow(this.mouseFrom.x, this.mouseFrom.y, this.mouseTo.x, this.mouseTo.y, 17.5, 17.5),
                        {
                            stroke: this.strokeColor,
                            fill: this.fillColor,
                            strokeWidth: this.strokeWidths
                        }
                    )
                    if(this.isFill)
                    // 箭头
                    break;
                case 'line': 
                    // 直线
                    canvasObject = new fabric.Line(
                        [this.mouseFrom.x, this.mouseFrom.y, this.mouseTo.x , this.mouseTo.y],
                        {stroke: this.strokeColor, strokeWidth: this.strokeWidths}
                    )
                    break;
                case 'dottedLine':
                    // 虚线
                    canvasObject = new fabric.Line(
                        [this.mouseFrom.x, this.mouseFrom.y, this.mouseTo.x, this.mouseTo.y],
                        {
                            stroke: this.strokeColor,
                            strokeWidth: this.strokeWidths,
                            strokeDashArray: [3, 1] // 虚线参数
                        }
                    )
                    break;
                case 'rect':
                    // 矩形
                    this.fillColor = this.isFill ? this.strokeInnerColor : '';
                    canvasObject = new fabric.Rect({
                        left: this.mouseFrom.x,
                        top: this.mouseFrom.y,
                        width: this.mouseTo.x - this.mouseFrom.x,
                        height: this.mouseTo.y - this.mouseFrom.x,
                        stroke: this.strokeColor,
                        fill: this.fillColor
                    })
                    break;
                case 'triangle': 
                    // 三角形
                    canvasObject = new fabric.Triangle()
                    break;
                case 'word':
                    // 文字
                    break;
                case 'delete':
                    // 删除
                    this.canvasInt.clear();
                    this.canvasInt.renderAll();
                    break;
                case 'back':
                    // 撤回
                    break;
                case 'image':
                    // 图片
                    let imgInt = new fabric.Image(this.$refs.image, {
                        left: 100,
                        top: 100,
                        opacity: 0.85
                    })
                    imgInt.hasControls = true;
                    this.canvasInt.add(imgInt)
                    break;
                case 'edit':
                    // 编辑
                    this.canvasInt.isDrawingMode = true;
                    this.canvasInt.selectable = true;
                    this.canvasInt.selection = true;
                    break;
                default :
                    break;
            }
            if(canvasObject) {
                this.canvasInt.add(canvasObject)
                this.canvasInt.renderAll();
                this.drawingObject = canvasObject;
            }
        },
        uploadImg(e) {
            // 上传图片
            console.log(e)
            let file = e.target.files;
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
        },
        drawArrow(fromX, fromY, toX, toY, theta = 30, headlen = 10) {
            theta = theta || 30;
            headlen = headlen || 10
            // 计算各角度和对应的P2，P3坐标
            let angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
                angle1 = (angle + theta) * Math.PI / 180,
                angle2 = (angle - theta) * Math.PI / 180,
                topX = headlen * Math.cos(angle1),
                topY = headlen * Math.sin(angle1),
                botX = headlen * Math.cos(angle2),
                botY = headlen * Math.sin(angle2)
            let arrowX = fromX - topX,
                arrowY = fromY - topY;
            let path = ' M' + fromX + ' ' + fromY;
            path += ' L' + toX + ' ' + toY;
            arrowX = toX + topX;
            arrowY = toY + topY;
            path += ' M' + arrowX + ' ' + arrowY;
            path += ' L' + toX + ' ' + toY;
            arrowX = toX + botX;
            arrowY = toY + botY;
            path += ' L' + arrowX + ' ' + arrowY;
            console.log('path',path)
            return path;
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
/deep/ .m-colorPicker {
    .box{
        z-index: 10
    }
}
</style>