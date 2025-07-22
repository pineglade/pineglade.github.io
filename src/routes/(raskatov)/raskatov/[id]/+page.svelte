<script lang="ts">
	import { page } from "$app/state";
	import { minifyInternally } from "pineglade-tools/lib/minify";

	let data = $derived(page.params.id ? page.data[`/${page.params.id}`] : "");
</script>

<div>
	{@html minifyInternally(data)}
</div>

<style lang="scss">
	div {
		display: table;
		margin: 1.5rem auto 0;

		:global {
			p {
				margin: 0;
				padding-left: 2rem;
				font-size: 1.125rem;
				font-family: var(--font-serif);
				text-indent: -2rem;
			}

			time {
				margin-top: 1.5rem;
			}

			.separated {
				margin-top: 1.5rem;
			}
		}
	}
</style>
