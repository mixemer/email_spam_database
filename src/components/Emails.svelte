<script>
  import { router_names } from "../globals"
  import { navigate, Link } from "svelte-routing"
  export let emailData = "";
  const column_names = [
    "Email",
    "Type of Scam",
    "Number of Reports",
    "First Occurance"
  ];
</script>

<div class="body">
  <table class="table table-borderless">
    <thead>
      <tr>
        {#each column_names as column}
          <td> {column} </td>
        {/each}
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>{emailData.email}</th>
        <th>{emailData.type_of_scam}</th>
        <th>{emailData.report_count}</th>
        <th>{emailData.first}</th>
        <Link class="navbar-brand fs-1 text-decoration-none" to="{router_names.report}" on:click={() => current = router_names.report}> <button class="btn btn-success" type="submit"> + Report </button></Link>
      </tr>
    </tbody>
  </table>

  <div class="d-flex justify-content-between" />
</div>

<style>
  .body {
    width: auto;
    height: 500px;
    border: solid;
    border-radius: 5px;
    /* padding: 25px 50px; */
    margin: 15px auto 0 auto;
    background-color: #2b6777;
    color: white;
    font-size: 16px;
  }

  .table{
    color: white;
    position: relative;
    left: 30px;
  }
  td{
    position: relative;
    top: 7px;
    left: 20px
  }
  th{
    position: relative;
    top: 2px;
    left: 22px
  }
  .btn-success {
        background: #52AB98;
        position: relative;
        margin-left: 20%;
        top: -15px;
        width: 225px;
        border: solid;
        border-radius: 5px;
    }
</style>
