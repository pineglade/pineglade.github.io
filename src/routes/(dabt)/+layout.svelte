<script lang="ts">
	import "@/scss/index.scss";
	import { afterNavigate } from "$app/navigation";
	import { page } from "$app/state";
	import Layout from "pineglade-tools/components/Layout.svelte";
	import { hitYandexMetrika } from "pineglade-tools/lib/client/yandex-metrika";

	import {
		ALIAS,
		DESCRIPTION,
		PROJECT_NAME,
		TITLES,
	} from "@/routes/(dabt)/constants";
	import * as Main from "@/routes/(main)/constants";
	import { BASE_URL, YANDEX_METRIKA_ID } from "@/routes/constants";

	let { children } = $props();
	let id = $derived(page.params.id ? `/${page.params.id}` : "");
	let heading = $derived(TITLES[id] || "");

	if (import.meta.env.PROD) {
		afterNavigate(({ from }) => {
			hitYandexMetrika(YANDEX_METRIKA_ID, from?.url, page.url);
		});
	}
</script>

<Layout
	ampUrl={page.data.isAmp ? "" : `${BASE_URL}/amp/${ALIAS}${id}`}
	description={heading
		? `Современная бытовая сказка о деде Андрее и бабке Тане «${heading}».`
		: DESCRIPTION}
	faviconsBase="{BASE_URL}/{ALIAS}"
	fonts={["tt-polls-normal-400.woff2"]}
	fontsBase="{BASE_URL}/fonts"
	ogImage={{
		height: 512,
		src: `${BASE_URL}/${ALIAS}/web-app-manifest-512x512.png`,
		width: 512,
	}}
	siteName={PROJECT_NAME}
	title={heading ? `${PROJECT_NAME}. ${heading}` : PROJECT_NAME}
	url="{BASE_URL}/{ALIAS}{id}"
>
	<main>
		<h1>{heading || PROJECT_NAME}</h1>
		{@render children()}

		<nav>
			{#if id}
				<a
					class="toc-link"
					href="{page.data.base}/{ALIAS}"
					aria-label="Содержание"
				></a>
			{:else}
				<a href={page.data.root}>
					© {Main.PROJECT_NAME}
				</a>
			{/if}
		</nav>
	</main>
</Layout>

<style lang="scss">
	:global(html):has(main) {
		font-size: 32px;
		line-height: 1.5rem;
		font-family: "TT Polls", serif;
		color: #0d0d86;

		@include media-breakpoint-up(lg) {
			background-color: #76726e;
			background-image: url("/dabt/back.webp");
			background-attachment: fixed;
		}

		:global {
			a {
				text-decoration: none;

				@include hover {
					color: #0069ff;
				}
			}

			p {
				margin: 0;
				text-indent: 1.25em;
			}

			time,
			.separated {
				margin-top: 48px;
			}
		}
	}

	main {
		padding: 60px 24px 48px;
		background-color: var(--color-white);
		background-image: linear-gradient(
			transparent 47px,
			rgba(0, 0, 128, 0.15) 48px
		);
		background-size: 48px 48px;
		box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);

		@include media-breakpoint-up(md) {
			padding-inline: 48px;
		}
	}

	h1 {
		margin: 0 0 48px;
		font-weight: 400;
		font-size: 40px;
		line-height: 48px;
		text-align: center;
		transform: translateY(-2px);
	}

	nav {
		margin-top: 108px;
		text-align: center;

		&:has(.toc-link) {
			margin-top: 84px;
		}
	}

	.toc-link {
		--icon-size: 48px;

		display: table;
		margin: 0 auto;

		&::before {
			content: "";
			display: block;

			@include mask-icon("toc");
		}
	}
</style>
