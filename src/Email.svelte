<script>	
	import { router_names } from "./globals"
    import { data } from "./dummy_data"
	import Header from "./components/Header.svelte";

    // This is id of the email in the dummydata
    export let id = ""
    let emailData = data.find(d => d.id == id)
</script>

<div>
	<Header current="{router_names.email}/{id}"/>
    <h1>Email Page id: {id}, email: {emailData.email}</h1>
</div>

<style>
</style>