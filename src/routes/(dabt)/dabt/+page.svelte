<script lang="ts">
	import { page } from "$app/state";

	import { CONTENTS, TITLES } from "@/routes/(dabt)/constants";
</script>

<ol>
	{#each CONTENTS as href (href)}
		<li>
			<a href="{page.data.base}/dabt{href}">
				<span>{TITLES[href]}</span>
			</a>
		</li>
	{/each}
</ol>

<style lang="scss">
	ol {
		margin: 0 0 -12px;
		padding: 0;
		list-style: none;
	}

	li {
		counter-increment: items;
	}

	a {
		display: flex;
		align-items: flex-end;
		gap: 12px;

		&::before {
			content: counter(items);
			order: 3;
		}

		&::after {
			content: "";
			flex-grow: 1;
			order: 2;
			border-bottom: 1px dashed;
			transform: translateY(-12px);
		}
	}

	span {
		max-width: 65%;
		margin-left: 1.25em;
		text-align-last: right;
		text-indent: -1.25em;
	}
</style>
