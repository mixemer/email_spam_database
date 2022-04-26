<script>
	import { onMount } from "svelte";
	import Header from "./components/Header.svelte";
	import TableDataBase from "./components/TableDatabase.svelte";

	export let search_email = '';
	export let hereFirstTime = false
	
	onMount(async () => {
		if (history.state) {
			search_email = history.state.search ? history.state.search : ''
		}
		hereFirstTime = false
	});
</script>

<main class="">
	<Header bind:search_email={search_email} />
	
	<TableDataBase bind:hereFirstTime={hereFirstTime} bind:search_email={search_email} />
</main>