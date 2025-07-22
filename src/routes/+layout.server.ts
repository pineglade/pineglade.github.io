const { AMP } = process.env;

export const csr = !AMP;
export const prerender = true;

export function load() {
	const base = AMP ? "/amp" : "";

	return {
		base,
		isAmp: Boolean(AMP),
		root: base || "/",
	};
}
