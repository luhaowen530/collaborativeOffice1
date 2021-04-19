<template>
  <div class="s-canvas">
    <canvas
      id="s-canvas"
      :width="contentWidth"
      :height="contentHeight"
    ></canvas>
  </div>
</template>
<script>
export default {
  name: "SIdentify",
  props: {
    identifyCode: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      contentWidth: 120,
      contentHeight: 47,
    };
  },
  methods: {
    // 生成一个随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 生成一个随机的颜色
    randomColor(min, max) {
      let r = this.randomNum(min, max);
      let g = this.randomNum(min, max);
      let b = this.randomNum(min, max);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    drawPic() {
      let canvas = document.getElementById("s-canvas");
      let ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, this.contentWidth, this.contentHeight); //绘制一个填充的矩形 0 0 width height x起点 y起点  宽 高
      // 绘制文字
      for (let i = 0; i < this.identifyCode.length; i++) {
        this.drawText(ctx, this.identifyCode[i], i);
      }
    },
    drawText(ctx, txt, i) {
      ctx.fillStyle = "#1821FF";
      ctx.font = "bold 25px SimHei"; //字体大小
      ctx.textBaseline = "alphabetic"; //基线对齐
      let x =
        (i + 1) * (this.contentWidth / (this.identifyCode.length + 1)) - 10;
      // 修改坐标原点和旋转角度
      ctx.translate(x, 30); //移动不同位置  参数偏移量
      ctx.rotate((15 * Math.PI) / 180); //旋转 参数角度
      ctx.fillText(txt, 0, 0);
      // 恢复坐标原点和旋转角度
      ctx.rotate((-15 * Math.PI) / 180);
      ctx.translate(-x, -30);
    },
  },
  watch: {
    identifyCode() {
      this.drawPic();
    },
  },
  mounted() {
    this.drawPic();
  },
};
</script>