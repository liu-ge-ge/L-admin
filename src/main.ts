import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import pinia from './store'
import i18n from './locale'
import * as antIcons from '@ant-design/icons-vue'
import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
// highlightjs
import hljs from 'highlight.js'
import js from 'highlight.js/lib/languages/javascript'
import 'echarts-wordcloud'

hljs.registerLanguage('javascript', js)
VMdEditor.use(githubTheme, {
	Hljs: hljs,
})

const app = createApp(App)
// antdvue icon注册
Object.keys(antIcons).forEach((key) => {
	app.component(key, antIcons[key as keyof typeof antIcons])
})

app.use(pinia).use(router).use(i18n).use(VMdEditor).mount('#app')
