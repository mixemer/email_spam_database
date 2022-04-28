<script>
	import { navigate, Link } from "svelte-routing";
	import { router_names } from "../globals"
	import { data } from "../dummy_data";

	import Toast from "./Toast.svelte"
    export let search_email = '';

	export let current = "";
	const shownDataCount = 5;
	$: shownData = data.filter(thing => thing.email.toLowerCase().startsWith(search_email.trim().toLowerCase())).slice(0, shownDataCount);
	$: showDropdown = search_email.trim().length > 0 && (current !== router_names.home);

	let onClick = () => {
		if (search_email.trim() === "") {
			var toastLiveExample = document.getElementById('liveToast')
			var toast = new bootstrap.Toast(toastLiveExample)
			toast.show()
			return
		} 

		if (current !== router_names.home) {
			navigate("/"+router_names.home, {replace: true, state: {search: search_email}});
		}
	}

	//TODO: few issues
	function onClickEmail(id) {
        navigate("/"+router_names.email+"/"+id, {replace: false, state: {id: id}});
		location.reload();
    }
</script>

<div class="header">
	<nav class="navbar navbar-expand-lg navbar-light ">
		<div class="container-fluid">
		  <Link class="navbar-brand fs-1 text-decoration-none" to="{router_names.home}" on:click={() => current = router_names.home}>Scam Email Finder </Link>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		  </button>
		
		  <div class="end-lined collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav mb-2 mb-lg-0">
				
				<li class="nav-item">
					<Link class="nav-link {current === router_names.home ? 'active' : ''}" 
					to="{router_names.home}" replace="{true}"  state={{search: ''}} on:click={() => current = router_names.home}>Home</Link>
				  <!-- <a class="nav-link {current === router_names.home ? 'active' : ''}" 
				  href="/{router_names.home}" on:click={() => current = router_names.home}>Home</a> -->
				</li>
  
				<li class="nav-item">
				  <Link class="nav-link {current === router_names.report ? 'active' : ''}" 
				  to="{router_names.report}" on:click={() => current = router_names.report}>Report</Link>
				</li>
			   
				<li class="nav-item d-flex">
				  <Link class="nav-link {current === router_names.FAQs ? 'active' : ''}" 
				  to="{router_names.FAQs}" on:click={() => current = router_names.FAQs}>FAQs</Link>
				</li>
			  </ul>
			</div>
		</div>
	  </nav>


	  <div class="container-fluid">
		<form class="d-flex">
		  <input class="form-control me-2" type="search" placeholder="Search Email" aria-label="Search" on:input={() => console.log()} bind:value={search_email}>
		  <button class="btn btn-outline-success" type="submit" id="liveToastBtn" on:click|preventDefault={onClick}>Search</button>
		</form>

		<ul class="dropdown-menu  {showDropdown ? "show" : ""}">
			{#each shownData as scam}
				<li on:click={() => onClickEmail(scam.id)} ><p class="dropdown-item" >{scam.email}</p></li>
			{:else}
				<li><p class="dropdown-item">No Match Found</p></li>
			{/each}
		</ul>
	  </div>

	  <!-- Toasts -->
	  <Toast title="Seach Field Empty" success={false} />

	  <br>
</div>

<style>
.end-lined {
	flex-grow: 0;
}
.header {
    padding: 0 2rem;
}
p {
	margin-bottom: 0;
}
.dropdown-menu {
	width: 500px;
}
.dropdown-item {
	cursor:default;
}
@media (max-width: 978px) {
    .header {
      padding:0;
      margin:0;
    }
}
</style>