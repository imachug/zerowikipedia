import Home from "./home/home.vue";
import NewLanguage from "./new-language.vue";
import InitHub from "./init-hub/init-hub.vue";

import * as config from "../config.js";
import {loadAdditional} from "../common/startup.js";

export default (vue, zeroPage) => [
	{
		path: "",
		controller: () => {
			vue.currentView = Home;
		}
	},
	{
		path: "new-language",
		controller: async () => {
			vue.currentView = NewLanguage;

			await loadAdditional();
			zeroPage.cmd("siteClone", [config.templateAddress]);
		}
	},
	{
		path: "init-hub",
		controller: () => {
			vue.currentView = InitHub;
		}
	}
];