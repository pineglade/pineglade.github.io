<script lang="ts">
	import { page } from "$app/state";

	import * as Dabt from "@/routes/(dabt)/constants";
	import * as Raskatov from "@/routes/(raskatov)/constants";

	const projects = [Dabt, Raskatov];
</script>

<svelte:head>
	<meta name="yandex-verification" content="9e902a1944e50481" />
</svelte:head>

<h2>Книги-сайты</h2>
<ul>
	{#each projects as { ALIAS, PROJECT_NAME } (ALIAS)}
		<li>
			<a href="{page.data.base}/{ALIAS}">{PROJECT_NAME}</a>
		</li>
	{/each}
</ul>

<style lang="scss">
	h2 {
		margin: 0 0 25px;
		font-weight: 700;
		font-size: 16px;
		line-height: 19px;
		font-family: var(--font-accent);
		text-align: center;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		border-top: 2px solid var(--color-blacky);
	}

	li {
		counter-increment: items;
		display: grid;
		gap: 10px;
		grid-template-columns: auto 1fr;
		padding: 10px;
		border-bottom: 1px solid var(--color-blacky);

		&::before {
			content: counter(items) ".";
		}

		&:nth-child(2n + 1) {
			background-color: var(--color-back);
		}
	}

	a {
		justify-self: start;
		text-decoration: none;
		color: var(--color-link);

		@include hover {
			text-decoration: underline;
		}
	}
</style>
