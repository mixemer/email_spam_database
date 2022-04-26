<script>
    import { navigate, Link } from "svelte-routing";
    import { data } from "../dummy_data";
    import { router_names } from "../globals"
    import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

    export let hereFirstTime = false
    let shown_rows = 10;
    $: current_page = search_email.trim() === '' ? 1 : 1;
    $: max_page_count = Math.ceil(filtered_data.length / shown_rows);
    export let search_email = '';
    let loading = true

    onMount(async () => {
        let wait = 0
        if (hereFirstTime) {
            wait = 500
        }else {
            loading = false
        }
        setTimeout(function(){
            loading = false
        }, wait);
	});
	
    $: filtered_data = data.filter(thing => thing.email.toLowerCase().startsWith(search_email.trim().toLowerCase())).sort(sort);
	$: results = filtered_data.slice((current_page - 1) * shown_rows, current_page * shown_rows);

	const column_names = ["#", "Email", "Type of Scam", "Number of Reports", "First Occurance", "Comments", ""]

    const reportsIndex = 3
    const firstIndex = 4
    const commentsIndex = 5
    let sortAsc = false;
    let sortVal = reportsIndex;
    function sort(a, b) {
        if (sortVal == reportsIndex) { // report_count
            return sortAsc ? a.report_count - b.report_count : b.report_count - a.report_count;
        } else if (sortVal == firstIndex) { // first
            return sortAsc ? a.first - b.first : b.first - a.first;
        } else { // comments
            return sortAsc ? a.comments - b.comments : b.comments - a.comments;
        }
    }

    function onClickColumNames(index) {
        if (index < reportsIndex || index > commentsIndex) return;
        if (index == sortVal) sortAsc = !sortAsc
        sortVal = index;
        filtered_data = filtered_data.sort(sort)
    }

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
    function onClickEmail(id) {
        console.log(id)
        navigate("/"+router_names.email+"/"+id, {replace: false, state: {id: id}});
    }
    function isClickable(i) {
        return i >= reportsIndex && i <=commentsIndex
    }
</script>

  <div class="body p-3 rounded">
    {#if loading}
        <div class="progress">
            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
        </div>
        <br>
    {/if}
    
    <table class="table table-bordered">
        <thead>
          <tr>
              {#each column_names as column, i}
                  <th class="{isClickable(i) ? "clickable" : ""}" on:click={() => onClickColumNames(i)} scope="col">{column} 
                    {#if i == sortVal}
                        {#if sortAsc}
                            <i class="fa-solid fa-arrow-down"></i>
                        {:else}
                            <i class="fa-solid fa-arrow-up"></i>
                        {/if}
                    {/if}
                </th>
              {/each} 
          </tr>
        </thead>

        <tbody>
            {#if !loading}
                {#each results as result, i (result.id)}
                <tr in:fade class="clickable" on:click={() => onClickEmail(result.id)}>
                    <td>{i+1}</td>
                    <td>{result.email}</td>
                    <td>{result.type_of_scam}</td>
                    <td>{result.report_count}</td>
                    <td>{result.first}</td>
                    <td>{result.commentLog.length}</td>
                    <td> <i class="fa-solid fa-angle-right"></i> </td>
                </tr>
                {/each}
            {/if}
        </tbody>
      </table>

      {#if results.length === 0}
          <h1 class="text-center text-white"> No Email Found </h1>
      {/if}

      <div class="d-flex justify-content-between">
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

        <select class="form-select" bind:value="{shown_rows}" on:change={() => {current_page = 1}}  aria-label="Default select example">
            <option selected value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
        </select>
      </div>
</div>

<style>
.body {
    padding: 0 3rem;
    background-color: #2b6777;
}
table {
    color: white;
}
tr:hover {
    background-color: #266e82;
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
.clickable {
    cursor: pointer;
}
select {
    width: 100px;
}
</style>