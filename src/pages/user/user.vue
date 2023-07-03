<template>
  <view class="content p-3 relative">
    <!-- 用户卡片 -->
    <view class="m-3 p-10 h-42 rounded-md shadow bg-white">
      <view class="flex flex-row flex-nowrap justify-between">
        <view class="w-2/6 flex flex-row justify-start items-center">
          <image class="rounded-full w-14 h-14" src="@/static/images/common/avatar.png" mode="scaleToFill" />
        </view>
        <view class="w-4/6 text-base">
          <view class="yulin-line-hidden">用户_9748</view>
          <view class="yulin-line-hidden v-info-light">ID:
            1231238124932794123123812493279412312381249327941231238124932794</view>
        </view>
      </view>
    </view>
    <!-- 会员卡 -->
    <view class="h-20 rounded-md box-shadow-main bg-white absolute top-32" style="width: 700rpx;">
      VIPcard
    </view>
    <!-- 胜率统计 -->
    <view class="mt-14 p-6 text-lg font-light rounded-md box-shadow-main bg-white">
      <view class="pb-3 border-b border-solid">练习胜率统计</view>
      <view class="pt-3 flex flex-row justify-between">
        <view class="basis-2/5 flex flex-row justify-between items-center">
          <view>
            <view class="text-sm">总胜率</view>
            <view class="text-sm v-info-light">0/2</view>
          </view>
          <view class="font-medium text-2xl">0%</view>
        </view>
        <view class="basis-2/5 flex flex-row justify-between items-center">
          <view>
            <view class="text-sm">当前级别胜率</view>
            <view class="text-sm v-info-light">0/2</view>
          </view>
          <view class="font-medium text-2xl">0%</view>
        </view>
      </view>
    </view>
    <!-- 宫格块按钮 -->
    <view class="mt-3 grid grid-cols-2 gap-3 text-lg">
      <view class="bg-white rounded-md p-6 box-shadow-main">
        <view class="flex flex-row justify-between">
          <view class="flex flex-row items-center">
            <image class="w-6 h-6" src="@/static/images/user/user-star.svg" mode="scaleToFill" />
            <view class="ml-1 font-light text-base">我的收藏</view>
          </view>
          <view>
            <uni-icons class="v-info-light" type="forward" color="" size="24" />
          </view>
        </view>
      </view>
      <!-- <view class="bg-white rounded-md p-6 box-shadow-main">
        <view class="flex flex-row justify-between">
          <view class="flex flex-row items-center">
            <image class="w-6 h-6" src="@/static/images/user/user-modify.svg" mode="scaleToFill" />
            <view class="ml-1 font-light text-base">我的错题</view>
          </view>
          <view>
            <uni-icons class="v-info-light" type="forward" color="" size="24" />
          </view>
        </view>
      </view>
      <view class="bg-white rounded-md p-6 box-shadow-main">
        <view class="flex flex-row justify-between">
          <view class="flex flex-row items-center">
            <image class="w-6 h-6" src="@/static/images/user/user-note.svg" mode="scaleToFill" />
            <view class="ml-1 font-light text-base">我的作业</view>
          </view>
          <view>
            <uni-icons class="v-info-light" type="forward" color="" size="24" />
          </view>
        </view>
      </view> -->
      <view class="bg-white rounded-md p-6 box-shadow-main">
        <view class="flex flex-row justify-between">
          <view class="flex flex-row items-center">
            <image class="w-6 h-6" src="@/static/images/user/user-communication.svg" mode="scaleToFill" />
            <view class="ml-1 font-light text-base">问题反馈</view>
          </view>
          <view>
            <uni-icons class="v-info-light" type="forward" color="" size="24" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive } from 'vue';

const state = reactive({

})
</script>

<style lang="scss">
.bg-white {
  background-color: rgb(255 255 255);
}
</style>
