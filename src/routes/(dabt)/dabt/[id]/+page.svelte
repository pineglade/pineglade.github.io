<script lang="ts">
	import { page } from "$app/state";
	import { minifyInternally } from "pineglade-tools/lib/minify";

	let data = $derived(page.params.id ? page.data[`/${page.params.id}`] : "");
</script>

{@html minifyInternally(data)}
