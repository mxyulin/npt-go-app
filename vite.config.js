import uni from '@dcloudio/vite-plugin-uni';
import AutoImport from 'unplugin-auto-import/vite'; // 自动按需引入 API
import { defineConfig } from 'vite';
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      imports: ['vue', 'uni-app'],
      dts: 'src/auto-import.d.ts',// auto-import.d.ts生成的位置
      eslintrc: {
        enabled: true// 自动生成'eslintrc-auto-import.json'文件，在'.eslintrc.cjs'的'extends'中引入解决报错
      }
    })
  ],
  css: {
    // 预编译器
    preprocessorOptions: {
      scss: {
        additionalData: ``,// 全局注入样式
      },
    },
    // *该项配置会覆盖 postcss.config.js 的配置
    postcss: {
      plugins: [
        require('tailwindcss'),// 安装 tailwindcss
        require('autoprefixer')// 安装 autoprefixer
      ],
      devSourcemap: true
    }
  },
  resolve: {
    // 路径别名
    alias: [
      {
        find: '@/',
        replacement: '/src/'
      },
      {
        find: '#/',
        replacement: '/node_modules/'
      }
    ]
  },
  // 全局依赖
  transpileDependencies: []
})
