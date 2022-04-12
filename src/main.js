import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'HCI-Spam Filter'
	}
});

export default app;