<script>
  	import { Router, Link, Route, navigate } from "svelte-routing";
	import { router_names } from "./globals"

	import Home from "./Home.svelte"
	import Report from "./Report.svelte"
	import FAQs from "./FAQs.svelte"
	import Email from "./Email.svelte"
	import NotFound from "./NotFound.svelte";

	export let url = "/";

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

	  <Route component={NotFound} />
	</div>
  </Router>