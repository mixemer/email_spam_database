<script>
  import { router_names } from "../globals";
  import { navigate, Link } from "svelte-routing";
  import Toast from "./Toast.svelte";
  export let emailData = "";
  export let commentData = "";

  const column_names = [
    "Email",
    "Type of Scam",
    "Number of Reports",
    "First Occurance",
  ];
  let fields = { email: "", username: "", comment: "" };
  let errors = { email: "", username: "", comment: "" };
  let valid = false;
  const submitHandler = () => {
    valid = true;
    //Email field
    if (fields.email.trim().length == 0) {
      fields.email = "Anonymous";
    }

    //username field
    if (fields.username.trim().length == 0) {
      fields.username = "Anonymous";
    }

    //Comments field
    if (fields.comment.length == 0) {
      valid = false;
      errors.comment = "Comment can not be left empty";
    } else {
      errors.comment = "";
    }
    if (valid) {
      submitFields();
    }
  };
  function submitFields() {
    for (let i = 0; i < commentData.length; i++) {
      //If the scam email is not reported
      const newData = {
        username: fields.username,
        email: fields.email,
        comment: fields.comment,
      };
      commentData.push(newData);

      var toastLiveExample = document.getElementById("liveToastSuccess");
      var toast = new bootstrap.Toast(toastLiveExample);
      toast.show();

      fields = {
        email: "",
        username: "",
        comment: "",
      };
    }
  }
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
        <Link
          class="navbar-brand fs-1 text-decoration-none"
          to={router_names.report}
        >
          <button class="btn btn-success" type="submit">
            + Report
          </button></Link
        >
      </tr>
    </tbody>
  </table>
  <h1>Comments</h1>
  {#each commentData as comment}
    <span class="username">{comment.username}</span>
    <div class="comments"> {comment.comment} </div>
  {/each}
  <div class="form">
    <form id="input-area" on:submit|preventDefault={submitHandler}>
      <button class="btn btn-success" type="submit">Add a comment</button>
      <div id="email">
        Email:
        <input
          class="input"
          type="text"
          id="email-input"
          bind:value={fields.email}
        />
      </div>
      <div class="error">{errors.email}</div>
      <div id="username">
        Username:
        <input
          class="input"
          type="text"
          id="username-input"
          bind:value={fields.username}
        />
      </div>
      <div class="error">{errors.username}</div>
      <input
        class="comment-input"
        type="text"
        id="comment-input"
        bind:value={fields.comment}
      />
      <div class="error">{errors.comment}</div>
    </form>
  </div>

  <!-- Toasts -->
  <Toast title="Comment Added" success={true} />
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
  h1 {
    position: relative;
    left: 60px;
  }
  .table {
    color: white;
    position: relative;
    left: 30px;
  }
  td {
    position: relative;
    top: 7px;
    left: 20px;
  }
  th {
    position: relative;
    top: 2px;
    left: 22px;
  }
  .btn-success {
    background: #52ab98;
    position: relative;
    margin-left: 20%;
    top: -15px;
    width: 225px;
    border: solid;
    border-radius: 5px;
  }
</style>
