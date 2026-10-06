import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "emdash/astro";

// مثال لاستيراد إضافة أصلية (Native Plugin) مثل صفحة 404 المخصصة
import { custom404Plugin } from "@azydeco/emdash-plugin-custom-404";

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
			
			// 1. الإضافات الأصلية (Native Plugins) التي تعمل داخل مسار المشروع وتتطلب npm وتثبيت عبر الكود
			plugins: [
				custom404Plugin(),
			],

			// 2. الإضافات المعزولة (Sandboxed Plugins) التي تُدار عبر الكود أو حزم مخصصة
			sandboxed: [
				// مثال لإضافة معزولة تُسجل من خلال التكوينات البرمجية (إن وجدت)
				// "@example/my-sandboxed-plugin"
			],

			// 3. إعدادات السجل (Registry Configuration) للتحكم في الإضافات المعزولة والمصادر
			registry: {
				enabled: true,
				// يمكنك إضافة خيارات السجل المتقدمة هنا إذا لزم الأمر حسب متطلبات المشروع
			},
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: "Inter",
			cssVariable: "--font-body",
			weights: [400, 500, 600, 700],
			fallbacks: ["sans-serif"],
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
