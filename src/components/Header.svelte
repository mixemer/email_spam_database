<script>
	import { router_names } from "../globals"
	import Toast from "./Toast.svelte"
    export let search_email = '';

	export let current = "";

	let onClick = () => {
		if (search_email.trim() === "") {
			var toastLiveExample = document.getElementById('liveToast')
			var toast = new bootstrap.Toast(toastLiveExample)
			toast.show()
		}
	}
</script>

<div class="header bg-light">
	<nav class="navbar navbar-expand-lg navbar-light ">
		<div class="container-fluid">
		  <a class="navbar-brand" href="/" on:click={() => current = router_names.home}>Scam Email Finder </a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		  </button>
		
		  <div class="end-lined collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav mb-2 mb-lg-0">
				
				<li class="nav-item">
				  <a class="nav-link {current === router_names.home ? 'active' : ''}" 
				  href="/" on:click={() => current = router_names.home}>Home</a>
				</li>
  
				<li class="nav-item">
				  <a class="nav-link {current === router_names.report ? 'active' : ''}" 
				  href="/{router_names.report}" on:click={() => current = router_names.report}>Report</a>
				</li>
			   
				<li class="nav-item d-flex">
				  <a class="nav-link {current === router_names.FAQs ? 'active' : ''}" 
				  href="/{router_names.FAQs}" on:click={() => current = router_names.FAQs}>FAQs</a>
				</li>
			  </ul>
			</div>
		</div>
	  </nav>


	  <div class="container-fluid">
		<form class="d-flex">
		  <input class="form-control me-2" type="search" placeholder="Search Email" autofocus aria-label="Search" bind:value={search_email}>
		  <button class="btn btn-outline-success" type="submit" id="liveToastBtn" on:click|preventDefault={onClick}>Search</button>
		</form>
	  </div>

	  <!-- Toasts -->
	  <Toast />
</div>

<style>
.end-lined {
	flex-grow: 0;
}
.header {
    padding: 0 2rem;
}
@media (max-width: 978px) {
    .header {
      padding:0;
      margin:0;
    }
}
</style>