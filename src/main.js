import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { LoadingPlugin } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { date, currency } from './methods/filters'
import CKEditor from '@ckeditor/ckeditor5-vue'
import 'sweetalert2/src/sweetalert2.scss'
import 'bootstrap'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(LoadingPlugin)
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})
setLocale('zh_TW')
app.component('VField', Field)
app.component('VForm', Form)
app.component('ErrorMessage', ErrorMessage)
app.config.globalProperties.$filters = {
  date,
  currency
}
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
app.use(CKEditor)
app.mount('#app')
