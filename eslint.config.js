module.exports = {
  extends: [
    "plugin:vue/vue3-recommended", // Vue 3를 위한 규칙 적용
    "eslint:recommended",
  ],
  rules: {
    "vue/no-multiple-template-root": "off", // Vue 3에서는 불필요한 규칙
  },
};
