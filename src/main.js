import "tailwindcss/tailwind.css";
import {
	createSSRApp
} from "vue";
import App from "./App.vue";

// #ifdef VUE3
export function createApp() {
	const app = createSSRApp(App);

	return {
		app,
	};
}
// #endif
