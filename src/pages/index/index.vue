<template>
  <Test>
    <view class="content">
      <image class="logo" src="/static/logo.png" />
      <view class="text-area">
        <text class="title"> {{ title }}</text>
        <view class="test">{{ name }}</view>
        {{ counter }}
        <button @tap="add">+</button>
      </view>
    </view>
  </Test>
</template>

<script lang="ts" setup>
import { useTestStore } from '@/store/modules/test';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import Test from '../test/index.vue';
const store = useTestStore();

const { counter } = storeToRefs(store);

function add() {
  store.setCounter();
}

const title = ref('Hello');
const name = ref('name');
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height:2000rpx;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
