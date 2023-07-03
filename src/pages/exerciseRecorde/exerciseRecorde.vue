<template>
  <view class="content p-6 flex flex-col justify-star items-center" :style="{ 'min-height': globalState.canUseHeight }">
    <!-- 标题 -->
    <view class="p-3 w-full h-24 rounded-md flex justify-end items-center box-shadow-main relative">
      <image class="absolute h-36" style="top: -1em; left: -5em; z-index: 1;" src="@/static/images/mascot/birthday.png"
        mode="aspectFit" />
      <view class="text-3xl text-center text-linear font-bold antialiased tracking-widest">练习结果</view>
    </view>
    <!-- 宫格列表 -->
    <view class="mt-3 rounded-md w-full bg-whhite">
      <view class="pt-4 pb-4 text-xl font-light v-info-light flex flex-row justify-between">
        <view>得分：{{ state.scores }}分</view>
        <view>正确率：{{ state.chance }}</view>
      </view>
      <view class="grid grid-cols-3 gap-2">
        <view class=" h-24 rounded-md flex flex-col justify-evenly items-center box-shadow-main"
          v-for="(val, idx) of state.value" :key="idx">
          <view class="">第 {{ idx + 1 }} 题</view>
          <view class="">《{{ val.name }}》</view>
          <view v-if="val.result == 'correct'" class="text-xs yulin-button-main">
            正确
          </view>
          <view v-if="val.result == 'error'" class="text-xs yulin-button-error">
            超时
          </view>
          <view v-if="val.result == 'warning'" class="text-xs yulin-button-warning">
            错误
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import globalState from '@/mixins/globalState.js';
import { reactive } from 'vue';

const state = reactive({
  scores: '60',
  chance: '60%',
  value: [
    {
      id: '',
      name: '吃子-1',
      result: 'correct'
    },
    {
      id: '',
      name: '吃子-2',
      result: 'error'
    },
    {
      id: '',
      name: '吃子-3',
      result: 'warning'
    },
    {
      id: '',
      name: '吃子-4',
      result: 'correct'
    },
    {
      id: '',
      name: '吃子-5',
      result: 'error'
    },
    {
      id: '',
      name: '吃子-6',
      result: 'warning'
    },
    {
      id: '',
      name: '吃子-7',
      result: 'correct'
    },
    {
      id: '',
      name: '吃子-8',
      result: 'correct'
    },
    {
      id: '',
      name: '吃子-9',
      result: 'correct'
    },
    {
      id: '',
      name: '吃子-10',
      result: 'correct'
    }
  ]
},)

</script>

<style lang="scss"></style>
