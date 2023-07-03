<template>
  <view class="content p-6 flex flex-col justify-star items-center" :style="{ 'min-height': globalState.canUseHeight }">
    <!-- 标题 -->
    <view class="p-3 w-full h-24 rounded-md flex justify-end items-center box-shadow-main relative">
      <image class="absolute h-36" style="top: -1em; left: -5em; z-index: 1;" src="@/static/images/mascot/peace.png"
        mode="aspectFit" />
      <view class="text-3xl text-center text-linear font-bold antialiased tracking-widest">在线课程</view>
    </view>
    <!-- 列表 -->
    <view class="mt-3 rounded-md w-full bg-whhite">
      <view v-for="(val_lev1, idx_lev1) of levels" :key="idx_lev1">
        <view class="pt-4 pb-4 text-xl font-light">{{ val_lev1.title }}</view>
        <view class="grid grid-cols-1 gap-2">
          <view class="p-6 w-full h-32 rounded-md flex flex-row justify-around box-shadow-main relative"
            v-for="(val_lev2, idx_lev2) of val_lev1.value" :key="idx_lev2">
            <view class=" basis-2/3 flex flex-col justify-start items-start">
              <view class="">第{{ idx_lev2 + 1 }}课 《{{ val_lev2.name }}》</view>
              <view class="yulin-line-hidden-2">简介：{{ val_lev2.desc }}</view>
            </view>
            <view class=" basis-1/3 flex justify-center items-center">
              <view class="w-16 h-16 bg-test rounded-md">cover img</view>
            </view>
            <view class="absolute right-0 top-0">
              <vip-label></vip-label>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import VipLabel from '@/components/VipLabel/VipLabel';
import globalState from '@/mixins/globalState.js';
import { reactive } from 'vue';

const levels = reactive([
  {
    title: '启蒙',
    value: [
      {
        id: 'qm-qipan',
        name: '棋盘',
        desc: '介绍围棋的胜负判定规则，棋盘的构成。了解气是棋子的生命并学会如何'
      },
      {
        id: 'qm-jibengainian',
        name: '基本概念',
        desc: '围棋的基本概念'
      },
      {
        id: 'qm-chizi',
        name: '基本规则',
        desc: '介绍围棋的胜负判定规则，棋盘的构成。了解气是棋子的生命并学会如何'
      }
    ]
  },
  {
    title: '基本技能',
    value: [
      {
        id: 'qm-qipan',
        name: '棋盘',
        desc: '介绍围棋的胜负判定规则，棋盘的构成。了解气是棋子的生命并学会如何'
      },
      {
        id: 'qm-jibengainian',
        name: '基本概念',
        desc: '围棋的基本概念'
      },
      {
        id: 'qm-chizi',
        name: '基本规则',
        desc: '介绍围棋的胜负判定规则，棋盘的构成。了解气是棋子的生命并学会如何'
      }
    ]
  },
  {
    title: '基本手筋',
    value: [
      {
        id: 'qm-qipan',
        name: '棋盘',
        desc: '介绍围棋的胜负判定规则，棋盘的构成。了解气是棋子的生命并学会如何'
      },
      {
        id: 'qm-jibengainian',
        name: '基本概念',
        desc: '围棋的基本概念'
      },
      {
        id: 'qm-chizi',
        name: '基本规则',
        desc: '介绍围棋的胜负判定规则，棋盘的构成。了解气是棋子的生命并学会如何'
      }
    ]
  },
])

</script>

<style lang="scss"></style>
