<script>
    import { data } from "../dummy_data";

    let emailData = data.find(d => d.id == id)
    const column_names = ["Email", "Type of Scam", "Number of Reports", "First Occurance"]

</script>

<div class="body">
    <h1 id="header">Scam Email Ticket</h1>
    <table class="table">
        <thead>
          <tr>
            {#each column_names as column}
            <th scope="col"> {column} </th>
            {/each} 
          </tr>

        </thead>
        <tbody>
          <tr>
            <th scope="row"></th>
            <td>{emailData.email}</td>
            <td>{emailData.type_of_scam}</td>
            <td>{emailData.type_of_scam}</td>
            <td>{emailData.first}</td>
          </tr>
        </tbody>
      </table>
      

      <div class="d-flex justify-content-between">
    
      </div>
</div>

<style>
 .body {
        width: 700px;
        height: auto + 30px;
        border: solid;
        border-radius: 5px;
        padding: 25px 50px;
        margin: 15px auto 0 auto;
        background-color: #2B6777;
        color: white;
        font-size: 16px;
    }

    #header {
        text-align: center;
        margin-bottom: 20px;
    }

</style>