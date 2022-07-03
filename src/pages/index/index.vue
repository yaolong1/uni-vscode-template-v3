<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title"> {{ title }}</text>
      <view class="test">{{ name }}</view>
      {{ counter }}
      <button @tap="add">+</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useTestStore } from '@/store/modules/test';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
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

  .test {
    color: red;
  }
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
