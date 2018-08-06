import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import './assets/iconfont/iconfontutils.css'
import './assets/common.css'
import App from './App.vue'
import store from './vuex/store'
import Vuex from 'vuex'
import router from './routers'
import EventFlag from './eventFlag'

Vue.use(ElementUI);
Vue.use(Vuex);


// 给Vue扩展属性
Vue.prototype.$eventBus = Vue.prototype.$eventBus ||  new Vue();
Vue.prototype.$eventFlag = Vue.prototype.$eventFlag || EventFlag;

global.vm = new Vue({
	el: '#app',
	router,
	store,//使用store
	render: h => h(App)
});
