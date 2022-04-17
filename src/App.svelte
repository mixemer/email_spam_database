<script>
	import router from "page"
	import { router_names } from "./globals"

	import Home from "./Home.svelte"
	import Report from "./Report.svelte"
	import FAQs from "./FAQs.svelte"

	let page

	router('/', () => page = Home)
	router('/'+router_names.report, () => page = Report)
	router('/'+router_names.FAQs, () => page = FAQs)

	router.start()
</script>

<svelte:component this={page} />