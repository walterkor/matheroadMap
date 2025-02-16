<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white"
  >
    <h1 class="font-bold mb-4 text-blue">🚀 Nuxt + Tailwind CSS</h1>
    <p class="text-3xl font-bold">Tailwind CSS가 정상적으로 작동합니다!</p>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
// console.log("Nuxt 3 is running!");
// console.log("API URL:", config.public.apiUrl); // 클라이언트 공개
// console.log("Secret Key:", config.secretKey); // 서버 전용
</script>
