import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import axios from "axios";
import VueAxios from "vue-axios";
axios.defaults.withCredentials=true
axios.defaults.baseURL="http://localhost:8088/HexiProject/"
Vue.use(ElementUI);
Vue.use(VueAxios,axios);
Vue.config.productionTip = false

new Vue({
  router,
  el: '#app',
  render: h => h(App)
}).$mount('#app')
