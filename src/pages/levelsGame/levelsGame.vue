<template>
  <view class="content p-6 flex flex-col justify-star items-center" :style="{ 'min-height': globalState.canUseHeight }">
    <!-- 标题 -->
    <view class="p-3 w-full h-24 rounded-md flex justify-end items-center box-shadow-main relative">
      <image class="absolute h-36" style="top: -1em; left: -5em; z-index: 1;" src="@/static/images/mascot/yoga.png"
        mode="aspectFit" />
      <view class="text-3xl text-center text-linear font-bold antialiased tracking-widest">按级别练习</view>
    </view>
    <!-- 列表 -->
    <view class="mt-3 p-6 rounded-md w-full bg-whhite box-shadow-main">
      <view v-for="(val_lev1, idx) of levels" :key="idx">
        <view class="pt-4 pb-4 text-xl font-light">{{ val_lev1.title }}</view>
        <view class="grid grid-cols-4 gap-2">
          <view class="h-14 flex justify-center items-center"
            style="background: url('../../static/images/common/level-bg.png'); background-size: cover;"
            v-for="val_lev2 of val_lev1.value" :key="val_lev2.id">
            <view class="">{{ val_lev2.name }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import globalState from '@/mixins/globalState.js';
import { reactive } from 'vue';

const levels = reactive([
  {
    title: '初级',
    value: [
      {
        id: '1-18K',
        name: '18k'
      },
      {
        id: '1-17K',
        name: '17k'
      },
      {
        id: '1-16K',
        name: '16k'
      },
      {
        id: '1-15K',
        name: '15k'
      },
      {
        id: '1-14K',
        name: '14k'
      },
      {
        id: '1-13K',
        name: '13k'
      }
    ]
  },
  {
    title: '中级',
    value: [
      {
        id: '2-12K',
        name: '12k'
      },
      {
        id: '2-11K',
        name: '11k'
      },
      {
        id: '2-10K',
        name: '10k'
      },
      {
        id: '2-9K',
        name: '9k'
      },
      {
        id: '2-8K',
        name: '8k'
      },
      {
        id: '2-7K',
        name: '7k'
      }
    ]
  },
  {
    title: '高级',
    value: [
      {
        id: '3-6K',
        name: '6k'
      },
      {
        id: '3-5K',
        name: '5k'
      },
      {
        id: '3-4K',
        name: '4k'
      },
      {
        id: '3-3K',
        name: '3k'
      },
      {
        id: '3-2K',
        name: '2k'
      },
      {
        id: '3-1K',
        name: '1k'
      }
    ]
  },
  {
    title: '段位',
    value: [
      {
        id: '4-1D',
        name: '1D'
      },
      {
        id: '4-2D',
        name: '2D'
      },
      {
        id: '4-3D',
        name: '3D'
      },
      {
        id: '4-4D',
        name: '4D'
      },
      {
        id: '4-5D',
        name: '5D'
      },
      {
        id: '4-6D',
        name: '6D'
      },
      {
        id: '4-7D',
        name: '7D'
      },
      {
        id: '4-8D',
        name: '8D'
      }
    ]
  },
])

</script>

<style lang="scss"></style>
