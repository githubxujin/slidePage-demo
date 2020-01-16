// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vconsole from 'vconsole'
Vue.config.productionTip = false
require('@/util/jquery.fullPage.css')
require('@/util/slidePage.css')
require('@/util/page-animation.css')
import vcolorpicker from 'vcolorpicker'
let isPrd = process.env.NODE_ENV === 'production';
// !isPrd && new vconsole()
Vue.use(vcolorpicker)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
