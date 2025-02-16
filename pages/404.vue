<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-center"
  >
    <!-- 404 애니메이션 -->
    <h1 class="text-9xl font-extrabold animate-bounce">404</h1>

    <!-- 에러 메시지 -->
    <h2 class="mt-6 text-3xl md:text-5xl font-bold">
      페이지를 찾을 수 없습니다 😢
    </h2>
    <p class="mt-4 text-lg md:text-xl opacity-80">
      요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.
    </p>

    <!-- 홈으로 돌아가기 버튼 -->
    <NuxtLink
      to="/"
      class="mt-6 px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out"
    >
      🏡 홈으로 돌아가기
    </NuxtLink>

    <!-- 하단 장식 -->
    <div class="absolute bottom-5 text-sm opacity-60">
      © 2024 Matheroad. All rights reserved.
    </div>
  </div>
</template>
