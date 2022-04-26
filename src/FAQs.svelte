<script>	
	import { router_names } from "./globals"
	import Header from "./components/Header.svelte";
	import FAQs from "./components/FAQs.svelte"
</script>

<div >
	<Header current="{router_names.FAQs}" />
	<h1 id="FAQHeader">Frequently Asked Questions</h1>
	<FAQs/>
</div>

<style>
	#FAQHeader {
		margin-bottom: 40px;
		margin-left: 30px;
	}
</style>