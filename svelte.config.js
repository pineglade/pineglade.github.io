import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const { AMP } = process.env;
const base = AMP ? "/amp" : "";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: true,
	},
	kit: {
		adapter: adapter({
			fallback: "404.html",
			pages: `build${base}`,
		}),
		alias: {
			"@": "src",
		},
		inlineStyleThreshold: AMP ? Infinity : 0,
		paths: {
			base,
		},
	},
	preprocess: vitePreprocess(),
};

export default config;
