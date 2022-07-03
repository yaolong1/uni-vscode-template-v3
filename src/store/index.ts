import { useTestStore } from './modules/test';
import { createPinia } from "pinia";
import type { App } from 'vue';


const store = createPinia();


function registerStore() {
	store.useTestStore = useTestStore
}

export function setupPinia(app: App) {
	app.use(store);
	registerStore()
}

export { store }
