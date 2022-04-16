<script>
    import { data } from "./dummy_data";
    export let search_email = '';
	
	$: results = data.filter(thing => thing.email.toLowerCase().startsWith(search_email.trim().toLowerCase()));

	const column_names = ["#", "Email", "Type of Scam", "Number of Reports", "First Occurance", "Comments"]
</script>

<div class="px-5">
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
</div>