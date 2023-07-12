import "tailwindcss/tailwind.css";
import {
	createSSRApp
} from "vue";
import App from "./App.vue";

// 注册全局 log
window.$clog = function (msg, color = 'red', fontSize) {
	console.log(`%c ${msg}`, `color: ${color}; font-size: ${fontSize}`);
}

// #ifdef VUE3
export function createApp() {
	const app = createSSRApp(App);

	return {
		app,
	};
}
// #endif
