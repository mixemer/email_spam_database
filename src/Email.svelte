<script>	
	import { router_names } from "./globals"
	import Header from "./components/Header.svelte";

    // This is id of the email in the dummydata
    export let id = ""
</script>

<div>
	<Header current="{router_names.email}/{id}"/>
    <h1>Email Page id: {id}</h1>
</div>

<style>
</style>