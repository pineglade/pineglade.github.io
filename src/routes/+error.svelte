<script lang="ts">
	import "@/scss/index.scss";
	import { afterNavigate } from "$app/navigation";
	import { page } from "$app/state";
	import Layout from "pineglade-tools/components/Layout.svelte";
	import { hitYandexMetrika } from "pineglade-tools/lib/client/yandex-metrika";

	import { PROJECT_NAME } from "@/routes/(main)/constants";
	import { BASE_URL, YANDEX_METRIKA_ID } from "@/routes/constants";

	if (import.meta.env.PROD) {
		afterNavigate(({ from }) => {
			hitYandexMetrika(YANDEX_METRIKA_ID, from?.url, page.url);
		});
	}
</script>

<Layout
	class="layout"
	faviconsBase={BASE_URL}
	fonts={["times-new-roman-normal-400.woff2", "verdana-normal-700.woff2"]}
	fontsBase="{BASE_URL}/fonts"
	title={PROJECT_NAME}
	url={BASE_URL}
>
	<main>
		<h1><a href={page.data.root}>{PROJECT_NAME}</a></h1>

		<h2>Страница не найдена</h2>
	</main>
</Layout>

<style lang="scss">
	:global(html):has(main) {
		--color-back: #faf5ee;
		--color-back-base: #ecd6b2;
		--color-blacky: #555555;
		--color-link: #000080;
		--font-accent: "Verdana", serif;

		font-size: 18px;
		line-height: 1.1667;
		background-color: var(--color-back-base);
	}

	:global(.layout) {
		padding: 10px;
	}

	main {
		padding: 30px 20px 40px;
		font-family: "Times New Roman", serif;
		background-color: var(--color-white);
		border: 1px solid;
		border-right: var(--color-blacky) 2px outset;
		border-bottom: var(--color-blacky) 2px outset;

		@include media-breakpoint-up(md) {
			padding-inline: 40px;
		}
	}

	h1 {
		margin: 0 0 30px;
		padding: 10px;
		font-weight: 700;
		font-size: 19px;
		line-height: 23px;
		font-family: var(--font-accent);
		text-align: center;
		background-color: var(--color-back);
		border-top: 1px solid var(--color-blacky);
		border-bottom: 1px solid var(--color-blacky);
	}

	h2 {
		margin: 0 0 25px;
		font-weight: 700;
		font-size: 16px;
		line-height: 19px;
		font-family: var(--font-accent);
		text-align: center;
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
