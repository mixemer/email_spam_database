<script>
	import Header from "./components/Header.svelte";
	import TableDataBase from "./components/TableDatabase.svelte";

	let search_email = '';
</script>

<main class="">
	<Header bind:search_email={search_email} />

	<br>

	<TableDataBase bind:search_email={search_email} />
</main>