<template>
  <div>
    <div class="jc-component__range">
      <div class="jc-range" :class="rangeStatus ? 'success' : '' ">
        <div class="draggable_bg" ref="bg" :style="{ width: draggable }" ></div>
        <i @mousedown="rangeMove" :class="rangeStatus ? successIcon : startIcon "></i>
        {{rangeStatus ? successText :startText}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SlidingValidationComponent",
  props: {
    //成功图标
    successIcon: {
      type: String,
      default: "el-icon-success"
    },
    //成功文字
    successText: {
      type: String,
      default: "验证通过"
    },
    //开始的图标
    startIcon: {
      type: String,
      default: "el-icon-d-arrow-right"
    },
    //开始的文字
    startText: {
      type: String,
      default: "请按住滑块，拖动到最右边"
    }
  },
  data(){
    return {
      rangeStatus: "",
      draggable: 0
    }
  },

  methods:{
    rangeMove(e) {
      let ele = e.target;
      let startX = e.clientX;
      let eleWidth = ele.offsetWidth;
      let parentWidth = ele.parentElement.offsetWidth;
      let MaxX = parentWidth - eleWidth;
      if (this.rangeStatus) {
        //不运行
        return false;
      }
      document.onmousemove = e => {
        let endX = e.clientX;
        this.disX = endX - startX;
        if (this.disX <= 0) {
          this.disX = 0;
        }
        if (this.disX >= MaxX - eleWidth) {
          //减去滑块的宽度
          this.disX = MaxX;
        }
        this.$refs.bg.style.transition = ".0s all";
        this.draggable = this.disX + 'px'; // 滑块中的背景
        ele.style.transform = "translateX(" + this.disX + "px)";
        ele.style.transition = ".0s all";
        e.preventDefault();
      };
      document.onmouseup = () => {
        if (this.disX !== MaxX) {
          ele.style.transition = ".5s all";
          ele.style.transform = "translateX(0)";
          this.$refs.bg.style.transition = ".5s all";
          this.draggable = 0 + 'px'; // 滑块中的背景
          //执行成功的函数
          this.$emit("errorFun", false);
        } else {
          this.rangeStatus = true;
          this.draggable = 0; // 滑块中的背景
          //执行成功的函数
          this.$emit("successFun", true);
        }
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
}
</script>

<style scoped>
.jc-range {
  background-color: #e8e8e8;
  position: relative;
  transition: 1s all;
  user-select: none;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  border-radius: 1px;
  z-index: 9999;
  /*no*/
}

.draggable_bg {
  position: absolute;
  left: 0;
  height: 100%;
  background-color: #7ac23c;
  z-index: -1;
}

.jc-range i {
  position: absolute;
  left: 0;
  width: 60px;
  /*no*/
  height: 100%;
  color: #919191;
  background-color: #fff;
  border: 1px solid #bbb;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.jc-range.success {
  background-color: #7ac23c;
  color: #fff;
  border-radius: 1px;
  z-index: 99999;
}

.jc-range.success i {
  color: #7ac23c;
}
</style>