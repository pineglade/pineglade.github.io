import { html } from "pineglade-tools/lib/mark-template";
import { type Data, getData } from "pineglade-tools/lib/server/get-data-html";
import { createTurboRss } from "pineglade-tools/lib/turbo-rss";

import * as Dabt from "@/routes/(dabt)/constants";
import * as Main from "@/routes/(main)/constants";
import * as Raskatov from "@/routes/(raskatov)/constants";
import { BASE_URL } from "@/routes/constants";

let data: Data | null = null;

function getPages({ ALIAS, CONTENTS, TITLES }: typeof Dabt | typeof Raskatov) {
	return CONTENTS.map((page) => ({
		content: html`
			<header><h1>${TITLES[page]}</h1></header>
			${data![page]}
		`,
		pubDate: "2025-03-10 19:00:00.000",
		url: `${BASE_URL}/${ALIAS}${page}`,
	}));
}

export const prerender = true;

export async function GET() {
	if (!data) {
		const [DabtData, RaskatovData] = await Promise.all([
			getData(Dabt.CONTENTS, Dabt.ALIAS),
			getData(Raskatov.CONTENTS, Raskatov.ALIAS),
		]);
		data = { ...DabtData, ...RaskatovData };
	}

	return createTurboRss({
		description: Main.DESCRIPTION,
		pages: [...getPages(Dabt), ...getPages(Raskatov)],
		title: Main.PROJECT_NAME,
		url: BASE_URL,
	});
}
