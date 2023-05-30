import { createI18n } from 'vue-i18n'
import zh from './zh-CN'
import en from './en-US'
import { SYSTEM_LOCALE_NAME } from '@/config/setting'
const messages = {
	en,
	zh,
}
const language = (navigator.language || 'en').toLocaleLowerCase() //获取浏览器语言
const locale =
	localStorage.getItem(SYSTEM_LOCALE_NAME) || language.split('-')[0] || 'en'
const i18n = createI18n({
	legacy: false,
	locale, //先用缓存的语言，然后用浏览器语言
	fallbackLocale: 'zh', //设置备用语言
	messages,
})

export default i18n
