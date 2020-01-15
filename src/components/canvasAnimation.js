class Ball {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.radius = 10;
    }
    draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.fillStyle = 'red';
        context.beginPath();
        context.arc(0, 0, this.radius, 0, Math.PI*2)
        context.fill();
        context.restore()
    }
}