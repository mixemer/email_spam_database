<script>
  	import { Router, Link, Route } from "svelte-routing";
	import { router_names } from "./globals"

	import Home from "./Home.svelte"
	import Report from "./Report.svelte"
	import FAQs from "./FAQs.svelte"
	import NotFound from "./NotFound.svelte";

	export let url = router_names.home;
</script>

<Router url="{url}">
	<div>
	  <Route path="{router_names.FAQs}" component="{FAQs}" />
	  <Route path="{router_names.report}" component="{Report}" />
	  <Route path="/" ><Home search_email={""} /></Route>
	  <!-- <Route path="/*" component={NotFound} /> -->
	</div>
  </Router>