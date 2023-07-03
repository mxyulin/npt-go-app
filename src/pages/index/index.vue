<template>
  <view class="content p-3">
    <!-- 用户卡片 -->
    <view class="p-10 h-44 rounded-md box-shadow-main bg-white">
      <view class="flex flex-row flex-nowrap justify-start">
        <view class="w-2/6 flex flex-row justify-start items-center">
          <image class="rounded-full w-14 h-14" src="@/static/images/common/avatar.png" mode="scaleToFill" />
        </view>
        <view class="w-4/6 text-base">
          <view class="yulin-line-hidden">{{ state.nickName }}</view>
          <view class="yulin-line-hidden v-info-light">ID: {{ state.userId }}</view>
        </view>
      </view>
      <view class="yulin-line-hidden mt-3 text-lg rounded-md text-center">围棋少年，勇往直前！</view>
    </view>
    <!-- 机械臂连接信息 -->
    <view class="mt-3 h-20 rounded-md p-3 box-shadow-main bg-white">
      机械臂info/连接info
    </view>
    <!-- 宫格块按钮 -->
    <view class="mt-3 grid grid-cols-2 gap-3 text-lg">
      <view class="bg-white flex flex-col justify-between h-32 rounded-md p-6 box-shadow-main"
        @click="showPopup('chess-go')">
        <view class="flex flex-row justify-between">
          <view>
            <image class="w-8 h-8" src="@/static/images/chess/chess-go.png" mode="scaleToFill" />
          </view>
          <view>
            <uni-icons class="v-info-light" type="forward" color="" size="24" />
          </view>
        </view>
        <view class="v-info font-light text-base">围棋</view>
      </view>
      <view class="bg-white flex flex-col justify-between h-32 rounded-md p-6 box-shadow-main"
        @click="showPopup('chess-ch')">
        <view class="flex flex-row justify-between">
          <view>
            <image class="w-8 h-8" src="@/static/images/chess/chess-ch.png" mode="scaleToFill" />
          </view>
          <view>
            <uni-icons class="v-info-light" type="forward" color="" size="24" />
          </view>
        </view>
        <view class="v-info font-light text-base">象棋</view>
      </view>
      <view class="bg-white flex flex-col justify-between h-32 rounded-md p-6 box-shadow-main"
        @click="showPopup('chess-five')">
        <view class="flex flex-row justify-between">
          <view>
            <image class="w-8 h-8" src="@/static/images/chess/chess-five.png" mode="scaleToFill" />
          </view>
          <view>
            <uni-icons class="v-info-light" type="forward" color="" size="24" />
          </view>
        </view>
        <view class="v-info font-light text-base">五子棋</view>
      </view>
      <view class="bg-white flex flex-col justify-between h-32 rounded-md p-6 box-shadow-main">
        <view class="flex flex-row justify-between">
          <view>
            <image class="w-8 h-8" src="" mode="scaleToFill" />
          </view>
          <view>
            <uni-icons class="v-info-light" type="forward" color="" size="24" />
          </view>
        </view>
        <view class="v-info font-light text-base">更多</view>
      </view>
    </view>
  </view>
  <!-- 弹窗 -->
  <uni-popup ref="menu" type="center" mode="base">
    <view class="bg-white rounded-md relative">
      <!-- 标题 -->
      <view class="pt-1 pb-1 text-center font-light text-lg">{{ state.menuTitle }}</view>
      <!-- 宫格块按钮 -->
      <view class="p-3 grid grid-cols-2 gap-3 text-lg">
        <view class="bg-white flex flex-col justify-between h-28 rounded-md p-6 box-shadow-main"
          v-for="item of state.menuItems" :key="item.name" @click="useJumpTo(item.route), closePopup()">
          <view class="flex flex-row justify-center">
            <image class="w-10 h-10" :src="item.icon" mode="scaleToFill" />
          </view>
          <view class="v-info font-light text-base text-center">{{ item.desc }}</view>
        </view>
      </view>
      <image class="absolute" style="top: -10em; left: -5em; z-index: -1;" src="@/static/images/mascot/hello.png"
        mode="aspectFit" />
    </view>
  </uni-popup>
</template>

<script setup>
import { useJumpTo } from '@/mixins/methods.js';
import { reactive, ref } from 'vue';

const state = reactive({
  title: '标题',
  nickName: '棋手_17469',
  userId: '1q2w3e4r5t',
  menuTitle: '',
  menuItems: []
})

/* static data */
const menuItems = [
  {
    name: 'chess-go',
    desc: '围棋',
    items: [
      {
        name: 'chess-go:levels-practice',
        desc: '级别练习',
        icon: '../../static/images/chess/chess-game.png',
        route: '/pages/levelsGame/levelsGame'
      },
      {
        name: 'chess-go-l:course-practice',
        desc: '课程练习',
        icon: '../../static/images/chess/training.png',
        route: '/pages/exerciseGame/exerciseGame'
      },
      {
        name: 'chess-go:course',
        desc: '知识课程',
        icon: '../../static/images/chess/tutorials.png',
        route: '/pages/courseLearn/courseLearn'
      },
      {
        name: 'chess-go:wrong-set',
        desc: '错题集',
        icon: '../../static/images/chess/lose.png',
        route: '/pages/failureRecord/failureRecord'
      },
    ]
  },
  {
    name: 'chess-ch',
    desc: '象棋',
    items: [
      {
        name: 'chess-ch:levels-practice',
        desc: '级别练习',
        icon: '../../static/images/chess/chess-game.png',
        route: '/pages/levelsGame/levelsGame'
      },
      {
        name: 'chess-ch-l:course-practice',
        desc: '课程练习',
        icon: '../../static/images/chess/training.png',
        route: '/pages/exerciseGame/exerciseGame'
      },
      {
        name: 'chess-ch:course',
        desc: '知识课程',
        icon: '../../static/images/chess/tutorials.png',
        route: '/pages/courseLearn/courseLearn'
      },
      {
        name: 'chess-ch:wrong-set',
        desc: '错题集',
        icon: '../../static/images/chess/lose.png',
        route: '/pages/failureRecord/failureRecord'
      },
    ]
  },
  {
    name: 'chess-five',
    desc: '五子棋',
    items: [
      {
        name: 'chess-five:levels-practice',
        desc: '级别练习',
        icon: '../../static/images/chess/chess-game.png',
        route: '/pages/levelsGame/levelsGame'
      },
      {
        name: 'chess-five:course-practice',
        desc: '课程练习',
        icon: '../../static/images/chess/training.png',
        route: '/pages/exerciseGame/exerciseGame'
      },
      {
        name: 'chess-five:course',
        desc: '知识课程',
        icon: '../../static/images/chess/tutorials.png',
        route: '/pages/courseLearn/courseLearn'
      },
      {
        name: 'chess-five:wrong-set',
        desc: '错题集',
        icon: '../../static/images/chess/lose.png',
        route: '/pages/failureRecord/failureRecord'
      },
    ]
  }
]

let menu = ref(null);

/* methods */
function showPopup(name) {
  menuItems.forEach(menus => {
    if (menus.name === name) {
      state.menuTitle = menus.desc;
      state.menuItems = menus.items;
    }
  })
  menu.value.open();
}

function closePopup() {
  menu.value.close();
}
</script>

<style lang="scss"></style>
