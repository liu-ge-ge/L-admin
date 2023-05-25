import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import eslintPlugin from 'vite-plugin-eslint'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: './src/mock',
      localEnabled: true,
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false,
        }),
      ],
    }),
    eslintPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 路径别名
    },
    extensions: ['.js', '.json', '.ts'], // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import '@/assets/styles/common/var.less';`,
        javascriptEnabled: true,
      },
    },
  },
})
