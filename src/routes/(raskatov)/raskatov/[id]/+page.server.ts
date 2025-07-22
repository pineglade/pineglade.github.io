import { getData } from "pineglade-tools/lib/server/get-data-html";

export async function load({ params }) {
	return await getData([`/${params.id}`], "raskatov");
}
