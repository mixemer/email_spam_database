<script>
  	import { Router, Link, Route, navigate } from "svelte-routing";
	import { router_names } from "./globals"

	import Home from "./Home.svelte"
	import Report from "./Report.svelte"
	import FAQs from "./FAQs.svelte"
	import Email from "./Email.svelte"
	import NotFound from "./NotFound.svelte";

	// TODO: make it "" later, for now "/" works for github pages
	export let url = "/";
	console.log(window.location.href)
</script>

<Router url={url}>
	<div>
	  <Route path="{router_names.email}/:id" let:params > 
		<Email id={params.id} />
	  </Route>
	  <Route path="{router_names.FAQs}" component="{FAQs}" />
	  <Route path="{router_names.report}" component="{Report}" />
	  <Route path="/" >
		<Home search_email={""} />
	  </Route>

	  <!-- TODO: github pages -->
	  <Route component={NotFound} />
	</div>
  </Router>