<script>	
	import { router_names } from "./globals"
    import { data } from "./dummy_data"
	import Header from "./components/Header.svelte";
    import Emails from "./components/Emails.svelte"
    // This is id of the email in the dummydata
    export let id = ""
    export let emailData = data.find(d => d.id == id)
    
</script>

<div>
	<Header current="{router_names.email}/{id}"/>
    <Emails bind:emailData = {emailData}></Emails>
</div>

<style>
</style>