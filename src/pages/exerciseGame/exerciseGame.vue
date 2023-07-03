<template>
  <view class="content p-6 flex flex-col justify-star items-center" :style="{ 'min-height': globalState.canUseHeight }">
    <!-- 标题 -->
    <view class="p-3 w-full h-24 rounded-md flex justify-end items-center box-shadow-main relative">
      <image class="absolute h-36" style="top: -1em; left: -5em; z-index: 1;" src="@/static/images/mascot/fun.png"
        mode="aspectFit" />
      <view class="text-3xl text-center text-linear font-bold antialiased tracking-widest">按课程练习</view>
    </view>
    <!-- 宫格列表 -->
    <view class="mt-3 rounded-md w-full bg-whhite">
      <view v-for="(val_lev1, idx_lev1) of wrongs" :key="idx_lev1">
        <view class="pt-4 pb-4 text-xl font-light">{{ val_lev1.title }}</view>
        <view class="grid grid-cols-3 gap-2">
          <view class=" h-24 rounded-md flex flex-col justify-evenly items-center box-shadow-main"
            v-for="(val_lev2, idx_lev2) of val_lev1.value" :key="idx_lev2">
            <view class="">《{{ val_lev2.name }}》</view>
            <view class="text-xs yulin-button-main" @click="useJumpTo('/pages/exerciseRecorde/exerciseRecorde')">
              开始
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
import { useJumpTo } from '../../mixins/methods';

const wrongs = reactive([
  {
    title: '阶段',
    value: [
      {
        id: '1-buju',
        name: '布局'
      },
      {
        id: '1-zhongpan',
        name: '中盘'
      },
      {
        id: '1-gongzi',
        name: '官子'
      },
    ]
  },
  {
    title: '基本吃子',
    value: [
      {
        id: '2-12K',
        name: '双吃'
      },
      {
        id: '2-11K',
        name: '抱/门吃'
      },
      {
        id: '2-10K',
        name: '征子'
      },
      {
        id: '2-9K',
        name: '枷吃'
      },
      {
        id: '2-8K',
        name: '倒扑'
      },
      {
        id: '2-7K',
        name: '接不归'
      },
      {
        id: '',
        name: '收气'
      },
      {
        id: '',
        name: '挖吃'
      },
      {
        id: '',
        name: '连接'
      },
      {
        id: '',
        name: '分断'
      },
      {
        id: '',
        name: '延气'
      },
      {
        id: '',
        name: '提子'
      },
      {
        id: '',
        name: '打吃'
      }
    ]
  },
  {
    title: '基本死活',
    value: [
      {
        id: '3-6K',
        name: '测试'
      },
      {
        id: '3-5K',
        name: '测试'
      },
      {
        id: '3-4K',
        name: '测试'
      },
      {
        id: '3-3K',
        name: '测试'
      },
      {
        id: '3-2K',
        name: '测试'
      },
      {
        id: '3-1K',
        name: '测试'
      }
    ]
  },
  {
    title: '死活',
    value: [
      {
        id: '',
        name: '测试'
      },
      {
        id: '',
        name: '测试'
      },
    ]
  },
  {
    title: '基本手筋',
    value: [
      {
        id: '',
        name: '测试'
      },
    ]
  },
  {
    title: '手筋',
    value: [
      {
        id: '',
        name: '测试'
      },
    ]
  },
  {
    title: '宫子',
    value: [
      {
        id: '',
        name: '测试'
      },
    ]
  },
])

</script>

<style lang="scss"></style>
