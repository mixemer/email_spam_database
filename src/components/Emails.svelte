<script>
  import { router_names, sounds } from "../globals";
  import { navigate, Link } from "svelte-routing";
  import { Anonymous } from "../globals"
  import { data } from "../dummy_data"
  
  import { fade } from 'svelte/transition';

  import Toast from "./Toast.svelte";

  export let id;
  export let emailData;
  export let commentData;

  var successSound = new Audio(sounds.success)
  var warningSound = new Audio(sounds.warning)

  const column_names = [
    "Email",
    "Type of Scam",
    "Number of Reports",
    "First Occurance",
  ];
  let fields = { email: Anonymous, username: Anonymous, comment: "" };
  let errors = { email: "", username: "", comment: "" };
  let valid = false;
  const submitHandler = () => {
    valid = true;
    //Email field
    if (fields.email.trim().length == 0) {
      fields.email = Anonymous;
    }

    //username field
    if (fields.username.trim().length == 0) {
      fields.username = Anonymous;
    }

    //Comments field
    if (fields.comment.trim().length == 0) {
      valid = false;
      errors.comment = "Comment can not be left empty!!";
    } else {
      errors.comment = "";
    }
    if (valid) {
      submitFields();
    } else {
      warningSound.play();
    }
  };
  function submitFields() {
    
      //If the scam email is not reported
      const newData = {
        id: Math.random().toString(16).slice(2),
        username: fields.username,
        email: fields.email,
        comment: fields.comment,
      };
      // commentData.push(newData);
      commentData = [newData, ...commentData]
      const index = data.findIndex(d => d.id === parseInt(id));
      if (index !== -1) {
        data[index].commentLog = commentData
      }
      console.log(newData)


      var toastLiveExample = document.getElementById("liveToastSuccess");
      var toast = new bootstrap.Toast(toastLiveExample);
      toast.show();
      successSound.play();

      fields = {
        email: Anonymous,
        username: Anonymous,
        comment: "",
      };
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
  <h4>Comments</h4>
  <div id="com_container" class="overflow-scroll card sticky-top">
    {#each commentData as comment (comment.id)}
      <div in:fade >
        <div><span class="btn btn-primary" >{comment.username}</span></div>
      <div>
        <span id="comments" class="btn btn-primary">{comment.comment}</span>
      </div>
      </div>
    {/each}
  </div>
  <div class="formContainer">
    <form id="input-area" on:submit|preventDefault={submitHandler}>
      <button class="btn btn-success comment_button" type="submit"
        >Add a comment</button
      >
      <div class="container">
        <div id="email">
          Email:
          <input
            class="input text-white"
            type="text"
            id="email-input"
            bind:value={fields.email}
          />
        </div>
        <div class="error">{errors.email}</div>
        <div id="username">
          Username:
          <input
            class="input text-white"
            type="text"
            id="username-input"
            bind:value={fields.username}
          />
        </div>
      </div>
      <div class="error">{errors.username}</div>
      <label for="comment-input"> Comments: (required) </label>
      <textarea
        class="comment-input text-white"
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
    height: 600px;
    border: solid;
    border-radius: 5px;
    /* padding: 25px 50px; */
    margin: 15px auto 0 auto;
    background-color: #2b6777;
    color: white;
    font-size: 16px;
  }
  h4 {
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
  span {
    background: rgba(242, 242, 242, 0.18);
    border-radius: 10px;
    text-decoration: none;
    color: white;
    padding: 2px 6px 4px 6px;
    border-top: 1px solid #cccccc;
    border-right: 1px solid #333333;
    border-bottom: 1px solid #333333;
    border-left: 1px solid #cccccc;
    margin-left: 180px;
    pointer-events: none;
  }
  #comments {
    text-align: left;
    margin-top: 5px;
    margin-left: 185px;
    margin-bottom: 10px;
    padding-top: 2px;
    padding-bottom: 2px;
    width: 700px;
    height: 50px;
  }
  #com_container {
    display: flex;
    border: 0px;
    background-color: #2b6777;
    height: 190px;
    width: 1000px;
    margin-bottom: 10px;
    margin-top: 5px;
  }
  .formContainer {
    display: inline-flex;
    align-items: center;
    position: relative;
    top: 20px;
    margin-left: 120px;
    /* margin-top: 10px; */
    border: 2px solid #5ebec4;
    box-sizing: border-box;
    width: 900px;
    height: 180px;
  }
  .comment_button {
    display: flex;
    align-items: center;
    margin-top: 62px;
    margin-left: 18px;
    text-align: center;
    height: 35px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 30px;
    
  }
  .container {
    display: inline-flex;
    position: relative;
    top: -55px;
    left: 250px;
  }
  #username {
    margin-left: 4px;
  }
  label{
    position: relative;
    margin-top: 10px;
    top: -50px;
    left: 25px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-weight: 200;
  }
  input, textarea {
    margin-left: 4px;
    margin-right: 3px;
    margin-top: 10px;
    border-radius: 20px;
    background: rgba(242, 242, 242, 0.29);
    width: 204px;
    height: 30px;
  }

  .comment-input {
    height: 70px;
    width: 800px;
    text-align: left;
    position: relative;
    top: -40px;
    margin-left: 20px;
    margin-top: -10px;
    padding-top: 0;
  }
  .error{
    position: relative;
    top:-43px;
    font-family: 'Times New Roman', Times, serif;
    font-weight: bold;
    font-size: 20px;
    font-weight: 100;
    left: 25px;
    color:rgb(255, 174, 174);
  }
</style>
