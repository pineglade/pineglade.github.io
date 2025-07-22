import { createPinegladePlugin } from "pineglade-tools/configs/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [createPinegladePlugin({ watchedModules: ["pineglade-tools"] })],
	server: {
		port: 1997,
	},
});
