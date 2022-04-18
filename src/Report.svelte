<script>	
	import { router_names } from "./globals"
	import Header from "./components/Header.svelte";
	import Ticket from "./components/Ticket.svelte";
</script>

<div>
	<Header current="{router_names.report}"/>

	<Ticket/>
</div>

<style>
</style>