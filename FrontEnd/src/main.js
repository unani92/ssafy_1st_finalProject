import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueCookies from 'vue-cookies'
import VueScrollMonitor from 'vue-scrollmonitor'

Vue.use(VueCookies)
Vue.use(VueScrollMonitor)

Vue.config.productionTip = false

import moment from 'moment'

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY년 MM월 DD일 HH:mm')
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
