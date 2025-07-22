<script lang="ts">
	import { page } from "$app/state";

	import { CONTENTS, TITLES } from "@/routes/(raskatov)/constants";
</script>

<ol>
	{#each CONTENTS as href (href)}
		<li>
			<a href="{page.data.base}/raskatov{href}">{TITLES[href]}</a>
		</li>
	{/each}
</ol>

<style lang="scss">
	ol {
		display: grid;
		gap: 1px;
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: 0.9375rem;

		@include media-breakpoint-up(md) {
			gap: 0;
		}
	}

	li {
		counter-increment: items;

		@include media-breakpoint-down(md) {
			a[href] {
				border-radius: 0;
			}

			&:first-child a[href] {
				border-radius: 0.25rem 0.25rem 0 0;
			}

			&:last-child a[href] {
				border-radius: 0 0 0.25rem 0.25rem;
			}
		}
	}

	a {
		display: block;
		padding: 0.5rem 1rem 0.5rem 2rem;
		text-decoration: none;
		text-indent: -1rem;
		background-color: var(--color-back);

		&::before {
			order: 3;
		}

		&::after {
			flex-grow: 1;
			order: 2;
			border-bottom: 1px dotted;
			transform: translateY(-0.375rem);
		}

		&:not(:hover, :focus, :active) {
			color: var(--color-text);
		}

		@include media-breakpoint-up(md) {
			position: relative;
			display: flex;
			align-items: flex-end;
			gap: 0.25rem;
			margin: 0 -0.5rem;
			padding: 0 0.5rem;
			text-indent: 0;

			&:not(:hover, :focus, :active) {
				background-color: var(--color-white);
			}

			&::before {
				content: counter(items);
			}

			&::after {
				content: "";
			}
		}
	}
</style>
