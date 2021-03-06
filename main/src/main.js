import "./sass/main.sass";
import "./sass/styles.sass";
import "katex/dist/katex.css";

import Vue from "vue/dist/vue.min.js";

import AsyncComputed from "vue-async-computed";
Vue.use(AsyncComputed);

Vue.prototype.$eventBus = new Vue();

import root from "./vue_components/root.vue";
var app = new Vue({
	el: "#app",
	render: h => h(root),
	data: {
		currentView: null,
		zeroPage: null
	}
});

import Setting from "./vue_components/setting/setting.vue";
Vue.component("setting", Setting);

import SButton from "./vue_components/s-button/s-button.vue";
Vue.component("s-button", SButton);

import Loading from "./vue_components/loading/loading.vue";
Vue.component("loading", Loading);

import HubHeader from "./vue_components/hub-header/hub-header.vue";
Vue.component("hub-header", HubHeader);

import {route, zeroPage} from "./route.js";
route(app);

Vue.prototype.$zeroPage = zeroPage;

(async function() {
	const siteInfo = await zeroPage.getSiteInfo();
	app.$eventBus.$emit("setSiteInfo", siteInfo);
})();
zeroPage.on("setSiteInfo", msg => {
	app.$eventBus.$emit("setSiteInfo", msg.params);
});