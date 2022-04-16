<script>
    import { data } from "./dummy_data";

    const shown_rows = 10;
    $: current_page = 2;
    $: max_page_count = results.length / shown_rows + 1;
    export let search_email = '';
    // 0-2, 2-4
	
	$: results = data.filter(thing => thing.email.toLowerCase().startsWith(search_email.trim().toLowerCase()))
        .slice((current_page - 1) * shown_rows, current_page * shown_rows);
    
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

<div class="mx-5">
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
      <nav aria-label="Page navigation example">
        <ul class="pagination pagination-sm">
            <li class="page-item {current_page == 1 ? 'disabled' : ''}"><a class="page-link" href="#"
                 on:click={() => clickedPrevious()}>Previous</a></li>

            {#each Array(max_page_count) as _, i}
                <li class="page-item {i+1 == current_page ? 'active' : ''}"><a class="page-link" href="#" 
                    on:click={() => clickedOnPage(i+1)}>{i+1}</a></li>
            {/each}

          <li class="page-item {current_page == max_page_count ? 'disabled' : ''}"><a class="page-link" href="#" 
            on:click={() => clickedNext()}>Next</a></li>
        </ul>
      </nav>
</div>

<style>
    /* div {
        background-color: #2B6777;
    }
    th, td {
        color: white;
    } */
</style>