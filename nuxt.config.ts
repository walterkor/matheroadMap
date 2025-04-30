export default defineNuxtConfig({
  runtimeConfig: {
    // 서버 전용 변수
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbDatabase: process.env.DB_DATABASE,
    dbPort: process.env.DB_PORT,

    // 공개적으로 접근 가능한 변수
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      googleMapsApiKey: process.env.NUXT_GOOGLE_MAP_KEY,
      envMode: process.env.NUXT_ENV_MODE,
    },
  },
  modules: ["@nuxtjs/tailwindcss"],
  plugins: ["~/plugins/router.js"],
  devtools: { enabled: true },
  compatibilityDate: "2025-02-16",
  typescript: {
    strict: true,
  },
  build: {
    transpile: ["vue", "entities", "estree-walker"],
  },
  nitro: {
    externals: {
      inline: ["entities", "estree-walker"],
    },
  },
  alias: {
    "entities/lib/esm/decode.js": "entities/lib/decode.js",
  },
  vite: {
    ssr: {
      noExternal: ["@vueup/vue-quill", "entities", "estree-walker"],
    },
  },
});
