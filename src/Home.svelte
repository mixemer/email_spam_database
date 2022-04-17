<script>
	import { onMount } from "svelte";
	import Header from "./components/Header.svelte";
	import TableDataBase from "./components/TableDatabase.svelte";

	export let search_email = '';

	onMount(async () => {
		if (history.state) {
			search_email = history.state.search ? history.state.search : ''
		}
	});
</script>

<main class="">
	<Header bind:search_email={search_email} />
	
	<TableDataBase bind:search_email={search_email} />
</main>