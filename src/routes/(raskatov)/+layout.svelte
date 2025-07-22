<script lang="ts">
	import "@/scss/index.scss";
	import { afterNavigate } from "$app/navigation";
	import { page } from "$app/state";
	import Layout from "pineglade-tools/components/Layout.svelte";
	import { hitYandexMetrika } from "pineglade-tools/lib/client/yandex-metrika";

	import * as Main from "@/routes/(main)/constants";
	import {
		ALIAS,
		DESCRIPTION,
		HEADING,
		PROJECT_NAME,
		TITLES,
	} from "@/routes/(raskatov)/constants";
	import { BASE_URL, YANDEX_METRIKA_ID } from "@/routes/constants";

	let { children } = $props();
	let id = $derived(page.params.id ? `/${page.params.id}` : "");
	let heading = $derived(TITLES[id] || "");
	let headingUrl = $derived.by(() => {
		const baseHref = `${page.data.base}/${ALIAS}`;
		return page.url.pathname === baseHref ? undefined : baseHref;
	});

	if (import.meta.env.PROD) {
		afterNavigate(({ from }) => {
			hitYandexMetrika(YANDEX_METRIKA_ID, from?.url, page.url);
		});
	}
</script>

<Layout
	ampUrl={page.data.isAmp ? "" : `${BASE_URL}/amp/${ALIAS}${id}`}
	description={heading
		? `Стихотворение Андрея Раскатова «${heading}».`
		: DESCRIPTION}
	faviconsBase="{BASE_URL}/{ALIAS}"
	fonts={["tt-polls-normal-400.woff2"]}
	fontsBase="{BASE_URL}/fonts"
	ogImage={{
		height: 512,
		src: `${BASE_URL}/${ALIAS}/web-app-manifest-512x512.png`,
		width: 512,
	}}
	scrollbar
	siteName={PROJECT_NAME}
	title={heading ? `${PROJECT_NAME}. ${heading}` : PROJECT_NAME}
	url="{BASE_URL}/{ALIAS}{id}"
	webAppTitle={HEADING}
>
	<header>
		<a class="index-link" href={page.data.root} aria-label={Main.PROJECT_NAME}
		></a>
	</header>

	<main>
		<h1>
			<a class="heading-link" href={headingUrl}>Стихо&shy;творения</a>
		</h1>
		<p class="author">{HEADING}</p>
		<h2>{heading || "Содержание"}</h2>
		{@render children()}
	</main>
</Layout>

<style lang="scss">
	:global(html):has(main) {
		--color-back: #ececec;
		--color-main-lite: #b2dfdb;
		--color-main-semitransparent: rgba(0, 121, 107, 0.7);
		--color-main: #00796b;
		--color-scrollbar-back: var(--color-main-lite);
		--color-text: #323232;
		--font-sans-serif: "Verdana", sans-serif;
		--font-serif: "Georgia", serif;

		font-size: 14px;
		background-color: var(--color-back);

		@include media-breakpoint-up(md) {
			font-size: 16px;
		}

		:global {
			a {
				border-radius: 0.25rem;
				outline: none;
				box-shadow: inset 0 0 0 2px transparent;

				&[href] {
					@include hover-focus-active {
						text-decoration: none;
						transition-duration: 0.2s;
					}

					@include hover-focus {
						color: var(--color-main);
						background-color: var(--color-main-lite);
						box-shadow: inset 0 0 0 2px var(--color-main);
					}

					@include active {
						color: var(--color-white);
						background-color: var(--color-main);
						box-shadow: inset 0 2px #0000004d;
					}
				}
			}

			::selection {
				background-color: var(--color-main-lite);
			}
		}
	}

	header {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		color: var(--color-white);
		background-image: linear-gradient(
			to right,
			var(--color-main) 0,
			var(--color-main-semitransparent) 40%,
			var(--color-main-semitransparent) 60%,
			var(--color-main) 100%
		);
		box-shadow: 0 2px 10px #00000080;
		user-select: none;
	}

	.index-link {
		--icon-size: 2.5rem;

		display: table;
		padding: 0.25rem 0.5rem;

		@include active {
			background-color: transparent !important;
			box-shadow:
				inset -2px 2px #0000004d,
				-1px 1px 1px #ffffff80 !important;
		}

		&::before {
			content: "";
			display: block;

			@include mask-icon("toc");
		}
	}

	main {
		padding: 6rem 1.5rem 4.5rem;
		line-height: 1.5rem;
		font-family: var(--font-sans-serif);
		color: var(--color-text);
		background-color: var(--color-white);

		@include media-breakpoint-up(sm) {
			padding: 6rem 3rem;
		}

		@include media-breakpoint-up(md) {
			padding: 6rem;
			box-shadow:
				0 0 2px #0000001f,
				0 2px 4px #0000003d;
		}
	}

	h1 {
		margin: 0 0 3rem;
		font: italic 2.5rem/3rem var(--font-serif);
		text-align: center;
		color: var(--color-main);
	}

	h2 {
		margin: 3rem 0 1.5rem;
		font-weight: 400;
		font-style: italic;
		font-size: 1.75rem;
		line-height: 2rem;
		font-family: var(--font-serif);
		text-align: center;
	}

	.heading-link {
		display: inline-block;
		padding: 0 0.75rem;
		vertical-align: baseline;
		text-decoration: none;
	}

	.author {
		margin: 3rem 0;
		font-style: italic;
		font-size: to-rem(17);
		text-align: right;
	}
</style>
