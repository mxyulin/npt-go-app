<template>
  <view class="content p-6 flex flex-col justify-star items-center" :style="{ 'min-height': globalState.canUseHeight }">
    <!-- 标题 -->
    <view class="p-3 w-full h-24 rounded-md flex justify-end items-center box-shadow-main relative">
      <image class="absolute h-36" style="top: -1em; left: -5em; z-index: 1;" src="@/static/images/mascot/sad.png"
        mode="aspectFit" />
      <view class="text-3xl text-center text-linear font-bold antialiased tracking-widest">错误习题本</view>
    </view>
    <!-- 宫格列表 -->
    <view class="mt-3 rounded-md w-full bg-whhite">
      <view v-for="(val_lev1, idx_lev1) of list" :key="idx_lev1">
        <view class="pt-4 pb-4 text-xl font-light v-info-light flex flex-row justify-between">
          <view>知识点：{{ val_lev1.title }}</view>
          <view>正确率：{{ val_lev1.chance }} </view>
        </view>
        <view class="grid grid-cols-3 gap-2">
          <view class=" h-24 rounded-md flex flex-col justify-evenly items-center box-shadow-main"
            v-for="(val_lev2, idx_lev2) of val_lev1.value" :key="idx_lev2">
            <view class="">《{{ val_lev2.name }}》</view>
            <view class="text-xs yulin-button-error" v-if="val_lev2.result == 'error'">
              错误
            </view>
            <view class="text-xs yulin-button-warning" v-if="val_lev2.result == 'time-out'">
              超时
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import globalState from '@/mixins/globalState.js';
import { reactive } from 'vue';

const list = reactive([
  {
    title: '双吃',
    chance: '30%',
    value: [
      {
        id: '',
        name: '双吃-1',
        result: 'error',
      },
      {
        id: '',
        name: '双吃-2',
        result: 'error',
      },
      {
        id: '',
        name: '双吃-3',
        result: 'time-out',
      },
      {
        id: '',
        name: '双吃-4',
        result: 'time-out',
      },
      {
        id: '',
        name: '双吃-5',
        result: 'time-out',
      },
      {
        id: '',
        name: '双吃-6',
        result: 'error',
      },
      {
        id: '',
        name: '双吃-7',
        result: 'error',
      }
    ]
  },
  {
    title: '抱吃',
    chance: '60%',
    value: [
      {
        id: '',
        name: '抱吃-1',
        result: 'error',
      },
      {
        id: '',
        name: '抱吃-2',
        result: 'error',
      },
      {
        id: '',
        name: '抱吃-3',
        result: 'error',
      },
      {
        id: '',
        name: '抱吃-4',
        result: 'time-out',
      },
      {
        id: '',
        name: '抱吃-5',
        result: 'time-out',
      },
      {
        id: '',
        name: '抱吃-6',
        result: 'error',
      },
      {
        id: '',
        name: '抱吃-7',
        result: 'error',
      }
    ]
  }
])
</script>

<style lang="scss"></style>
