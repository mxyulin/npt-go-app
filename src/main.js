import "tailwindcss/tailwind.css";
import {
	createSSRApp
} from "vue";
import App from "./App.vue";

// import '@/mock/socket/server_ws'; // socket 服务器启动！

// #ifdef VUE3
export function createApp() {
	const app = createSSRApp(App);

	return {
		app,
	};
}
// #endif
