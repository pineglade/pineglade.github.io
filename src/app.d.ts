// See https://svelte.dev/docs/kit/types#app.d.ts

declare global {
	namespace App {
		interface PageData {
			base: string;
			isAmp: boolean;
			root: string;
		}
	}
}

export {};
