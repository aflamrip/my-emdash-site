import cloudflare, { sandbox } from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "emdash/astro";

export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			database: d1({ binding: "DB", session: "auto" }),
			storage: r2({ binding: "MEDIA" }),
			
			// 1. تشغيل مشغل بيئة العزل (مطلوب لتفعيل السجل والإضافات المعزولة)
			sandboxRunner: sandbox(),

			// 2. تفعيل وإعداد السجل الرسمي لـ EmDash
			registry: {
				aggregatorUrl: "https://registry.emdashcms.com",
			},
			
			// الإضافات المعزولة المضافة محلياً (إن وجدت)
			sandboxed: [
				// "@example/my-sandboxed-plugin"
			],
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: "Inter",
			cssVariable: "--font-body",
			weights: [400, 500, 600, 700],
			fallfalls: ["sans-serif"],
		},
		{
			provider: fontProviders.google(),
			name: "JetBrains Mono",
			cssVariable: "--font-mono",
			weights: [400, 500],
			fallbacks: ["monospace"],
		},
	],
	devToolbar: { enabled: false },
});
