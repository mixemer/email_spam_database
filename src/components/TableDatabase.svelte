<script>
    import { data } from "../dummy_data";

    const shown_rows = 10;
    $: current_page = search_email.trim() === '' ? 1 : 1;
    $: max_page_count = Math.round(filtered_data.length / shown_rows);
    export let search_email = '';

	
    $: filtered_data = data.filter(thing => thing.email.toLowerCase().startsWith(search_email.trim().toLowerCase()));
	$: results = filtered_data.slice((current_page - 1) * shown_rows, current_page * shown_rows);

	const column_names = ["#", "Email", "Type of Scam", "Number of Reports", "First Occurance", "Comments"]

    function clickedPrevious() {
        if (current_page == 1) return;
        current_page -= 1
    }
    function clickedNext() {
        if (current_page == max_page_count) return;
        current_page += 1
    }
    function clickedOnPage(page_number) {
        if (page_number < 1 || page_number > max_page_count) return;
        current_page = page_number
    }
</script>

<div class="body">
    <table class="table table-bordered table-hover table-striped">
        <thead>
          <tr>
              {#each column_names as column}
                  <th scope="col">{column}</th>
              {/each}
            
          </tr>
        </thead>

        <tbody>
            {#each results as result (result.id)}
                <tr>
                    <td>{result.id}</td>
                    <td>{result.email}</td>
                    <td>{result.type_of_scam}</td>
                    <td>{result.report_count}</td>
                    <td>{result.first}</td>
                    <td>{result.comments}</td>
                </tr>
            {/each}
        </tbody>
      </table>

      {#if results.length === 0}
          <h1 class="text-center"> No Email Found </h1>
      {/if}

      <nav aria-label="Page navigation example">
        <ul class="pagination pagination-sm">
            <li class="page-item {current_page <= 1 ? 'disabled' : ''}"><span class="page-link"
                 on:click={() => clickedPrevious()}>Previous</span></li>
            
            {#each Array((max_page_count)) as _, i}
                <li class="page-item {i+1 == current_page ? 'active' : ''}"><span class="page-link" 
                    on:click={() => clickedOnPage(i+1)}>{i+1}</span></li>
            {/each}

          <li class="page-item {current_page >= max_page_count ? 'disabled' : ''}"><span class="page-link" 
            on:click={() => clickedNext()}>Next</span></li>
        </ul>
      </nav>
</div>

<style>
.body {
    padding: 0 3rem;
}
@media (max-width: 978px) {
    .body {
      padding:0;
      margin:0;
    }
}
span {
    cursor: pointer;
}
</style>