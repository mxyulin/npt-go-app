<template>
  <view class="container inline-block">
    <view class="flex flex-row flex-nowrap">
      <view class="p-1 rounded-l-md basis1/2 font-light"
        style="font-size: .5em; background: linear-gradient(to bottom right, #585858, #262626); color: #ffc98d;">钻石会员
      </view>
      <view class="p-1 rounded-r-md basis1/2 font-light"
        style="font-size: .5em; background: linear-gradient(to top right, #efb87f, #eaaa6b);">免费</view>
    </view>
  </view>
</template>

<script setup>
import { defineProps, reactive } from 'vue';

const props = defineProps({
  vipLevel: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: '免费'
  }
})

const state = reactive({

})
</script>

<style lang="scss"></style>
