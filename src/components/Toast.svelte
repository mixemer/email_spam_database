<script>
  export let title;
  export let success = false;
</script>

<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
  <div id="{success ? 'liveToastSuccess' : 'liveToast'}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header p-3">
      {#if success}
      <i class="fa-solid fa-circle-check px-2 text-success"></i>
      {:else}
        <i class="fa-solid fa-circle-exclamation px-2 text-danger"></i>
      {/if}
      
      <strong class="me-auto">{title}</strong>
      <!-- <small>11 mins ago</small> -->
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <!-- <div class="toast-body">
      <i class="fa-solid fa-circle-exclamation"></i>
      Search field is empty
    </div> -->
  </div>
</div>