// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    site: "https://yushindensetsu.co.jp", // ← ここに独自ドメインを記述
    integrations: [react(), sitemap()],

    vite: {
        plugins: [tailwindcss()],
    },
});
