// https://vitejs.dev/config/
import uni from '@dcloudio/vite-plugin-uni';
import dns from 'dns';
import AutoImport from 'unplugin-auto-import/vite'; // 自动按需引入 API 插件
import { VantResolver } from 'unplugin-vue-components/resolvers'; // vant-UI 插件配置
import Components from 'unplugin-vue-components/vite'; // 自动引入并注册组件插件
import { defineConfig } from 'vite';
import { viteMockServe } from 'vite-plugin-mock'; // mock 服务器

dns.setDefaultResultOrder('verbatim');// 禁用 DNS 解析地址重新排序

export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      imports: ['vue', 'uni-app'],// 自动引入 vue3 和 uni-app 的所有 API
      dts: 'src/auto-import.d.ts',// auto-import.d.ts 生成的位置
      eslintrc: {
        enabled: true// 自动生成'eslintrc-auto-import.json'文件，在'.eslintrc.cjs'的'extends'中引入解决报错
      }
    }),
    Components({
      resolvers: [VantResolver()],// 自动引入 vant 组件
    }),
    viteMockServe({
      mockPath: 'mock',
      enable: true,
      logger: true,
      watchFiles: true
    })
  ],
  css: {
    // * 预编译器配置
    preprocessorOptions: {
      scss: {
        // additionalData: ``,// 注入全局样式
      },
    },
    // 该项配置会覆盖 postcss.config.js 的配置
    postcss: {
      plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer')
      ],
      devSourcemap: false
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

  // *全局依赖
  // transpileDependencies: [],
  
  // *代理服务器
  server: {
    host: 'localhost',
    port: 8000,
    strictPort: true, // 若端口已被占用则会直接退出
    https: false,// 不启用 TLS + HTTP/2
    open: false,// 不自动打开到浏览器（浏览器可通过设置环境变量 process.env.BROWSER配置）
    proxy: {
      '/api': {
        target: 'https://randomuser.me/',
        changeOrigin: true,// 跨源
      }
    },
    cors: true,// 启用配置开发服务器 CORS 策略
  }
})
