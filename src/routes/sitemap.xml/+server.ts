import { createSitemapXml } from "pineglade-tools/lib/sitemap";

import * as Dabt from "@/routes/(dabt)/constants";
import * as Raskatov from "@/routes/(raskatov)/constants";
import { BASE_URL } from "@/routes/constants";

export const prerender = true;

function getPages({ ALIAS, CONTENTS }: typeof Dabt | typeof Raskatov) {
	return [`/${ALIAS}`, ...CONTENTS.map((page) => `/${ALIAS}${page}`)];
}

const ALL_PAGES = ["", ...getPages(Dabt), ...getPages(Raskatov)];

export function GET() {
	return createSitemapXml(
		ALL_PAGES.map((page) => ({ loc: `${BASE_URL}${page}` })),
	);
}
