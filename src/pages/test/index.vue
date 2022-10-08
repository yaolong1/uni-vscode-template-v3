<template>
  <view class="lst">
    <view
      @touchmove="move"
      @touchstart="moveStart"
      @touchend="moveEnd"
      class="warp"
      :style="{
        transform: 'translate(0px, ' + scl.tranNum + '%) translateZ(0px)',
      }"
    >
      <view class="list end">
        <slot></slot>
      </view>
      <view class="scorll" v-text="scl.sate ? '释放查看1' : '查看更多'"></view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref, reactive, getCurrentInstance } from 'vue';
const _this = getCurrentInstance()?.proxy;

const scl = reactive({
  right: 0, //容器距离，判断是否达到最右侧
  bottom: 0, //容器距离，判断是否达到最右侧
  width: 0, //右滑块的width
  tranNum: 0,
  tx: 0, //滑动位置
  lastX: 0,
  lastY: 0,
  inter: 0,
  sate: false, //状态
});

function getDom(dom: string, callback: Function) {
  let query = uni.createSelectorQuery().in(_this);
  query
    .select(dom)
    .boundingClientRect((res) => {
      callback(res);
    })
    .exec();
}

function move(event: TouchEvent) {
  let currentX = event.changedTouches[0].pageX;
  let currentY = event.changedTouches[0].pageY;
  let ty = currentX - scl.lastX; //向左滑动:tx<0 ,向右滑动tx > 0
  let tx = currentY - scl.lastY;

  if (Math.abs(tx) <= Math.abs(ty)) {
    //上下方向滑动
    return;
  }
  getDom('.list', (res: UniApp.NodeInfo) => {
    scl.right = Number(res.bottom?.toFixed(0));
  });
  if (scl.width == 0) {
    getDom('.scorll', (res: UniApp.NodeInfo) => {
      scl.width = Number(res.height?.toFixed(0));
    });
  }
  getDom('.end', (res: UniApp.NodeInfo) => {
    if (scl.right == Number(res.bottom?.toFixed(0))) {
      scl.tx = scl.tx + tx;
      let scale = -(scl.right / scl.width) * 100; //计算占比
      scl.tx = scl.tx < scale ? scale : scl.tx;
      if (scl.tx < 0) {
        if (-(scale - scl.tx) < 10) {
          //这里的10按需求定(手指滑动多少距离执行)
          scl.sate = true;
          console.log(-(scale - scl.tx));
        } else {
          scl.sate = false;
        }
        scl.tranNum = scl.tx * 0.1;
      }
    }
  });
  //将当前坐标进行保存以进行下一次计算
  scl.lastX = currentX;
  scl.lastY = currentY;
}

function moveEnd(event: TouchEvent) {
  if (scl.tx <= 0) {
    scl.inter = setInterval(() => {
      scl.tx = scl.tx + 10;
      scl.tx = scl.tx >= 0 ? 0 : scl.tx;
      scl.tranNum = scl.tx * 0.1;
      if (scl.tx == 0) {
        clearInterval(scl.inter);
      }
    }, 10);
  } else {
    scl.tx = 0;
    scl.inter && clearInterval(scl.inter);
  }
  if (scl.sate) {
    //执行操作
    scl.sate = false;
    console.log('执行操作！');
  }
}

function moveStart(event: TouchEvent) {
  scl.lastX = event.changedTouches[0].pageX;
  scl.lastY = event.changedTouches[0].pageY;
}
</script>

<style lang="scss" scoped>
.warp {
  position: relative;
  width: 100%;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  transform: translate(0px, 0px) translateZ(0px); /*使用该属性来实现*/
  .list {
    border: 1px solid;
  }
  .scorll {
    display: inline-block;
    vertical-align: middle;
    font-size: 24rpx;
    color: #999;
    width: 100%;
    text-align: center;
    position: absolute;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: -1;
  }
}
</style>
