<script>
    import { Link } from "svelte-routing";
	import { router_names } from "./globals"

</script>

<h1 class="text-center">Page Not Found  </h1>

<div class="center">
    <div style="width:100%;height:0;padding-bottom:84%;position:relative;">
        <iframe title="404" src="https://giphy.com/embed/H54feNXf6i4eAQubud" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
    </div>
</div>

<div>
    <button class="a btn btn-success btn-lg" >
        <Link to="{router_names.home}" ><div>Go Home</div></Link>
    </button>
</div>

<style>
.center {
  margin: auto;
  width: 50%;
  padding: 10px;
}
button {
    margin:0 auto;
    display:block;
}
div {
    color: white;
    text-decoration: none;
}
.a:hover{
    text-decoration: none;
    color: inherit;
}
</style>