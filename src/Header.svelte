<script>
    export let search_email = '';
</script>

<div class="header bg-light">
	<nav class="navbar navbar-expand-lg navbar-light ">
		<div class="container-fluid">
		  <a class="navbar-brand" href="/">Scam Email Finder </a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		  </button>

		  <div class="end-lined collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav mb-2 mb-lg-0">
				
				<li class="nav-item">
				  <a class="nav-link active" href="/">Home</a>
				</li>
  
				<li class="nav-item">
				  <a class="nav-link" href="#">Report</a>
				</li>
			   
				<li class="nav-item d-flex">
				  <a class="nav-link" href="#">FAQs</a>
				</li>
			  </ul>
			</div>
		</div>
	  </nav>

	  <div class="container-fluid">
		<form class="d-flex">
		  <input class="form-control me-2" type="search" placeholder="Search Email" autofocus aria-label="Search" bind:value={search_email}>
		  <button class="btn btn-outline-success" type="submit">Search</button>
		</form>
	  </div>
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