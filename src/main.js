import { createApp } from 'vue'

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
const app = createApp(App)

app.use(router)
app.use(VueAxios, axios)
app.use(LoadingPlugin)

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
app.use(CKEditor)
app.mount('#app')
