<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white"
  >
    <!-- 방명록 헤더 -->
    <h1 class="text-4xl font-bold mb-6">📖 Guestbook(방명록)</h1>

    <!-- 방명록 입력 폼 -->
    <div class="w-full max-w-md mb-6">
      <input
        v-model="name"
        type="text"
        placeholder="이름"
        class="w-full mb-3 p-3 rounded text-black"
      />
      <textarea
        v-model="message"
        placeholder="메시지를 입력하세요"
        class="w-full mb-3 p-3 rounded text-black"
        rows="4"
      ></textarea>
      <button
        @click="addEntry"
        class="w-full bg-green-500 p-3 rounded hover:bg-green-600 transition"
      >
        ➕ 방명록 작성
      </button>
    </div>

    <!-- 방명록 목록 -->
    <div class="w-full max-w-md">
      <div v-if="loading" class="text-center text-lg">⏳ 로딩 중...</div>
      <div v-else-if="guestbook.length === 0" class="text-center text-lg">
        📭 아직 방명록이 없습니다.
      </div>
      <div v-else>
        <ul class="space-y-4">
          <li
            v-for="entry in guestbook"
            :key="entry.id"
            class="p-4 bg-white bg-opacity-20 rounded flex justify-between items-center"
          >
            <div>
              <div class="font-bold">{{ entry.name }}</div>
              <div class="text-sm">{{ entry.message }}</div>
              <div class="text-xs opacity-70">
                {{ formatDate(entry.created_at) }}
              </div>
            </div>
            <button
              @click="deleteEntry(entry.id)"
              class="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
            >
              🗑️ 삭제
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 방명록 데이터
const guestbook = ref<
  { id: number; name: string; message: string; created_at: string }[]
>([]);
const name = ref("");
const message = ref("");
const loading = ref(true);

// 날짜 포맷 함수
const formatDate = (date: string) => new Date(date).toLocaleString();

// 방명록 목록 불러오기
const fetchGuestbook = async () => {
  loading.value = true;
  try {
    const { data, error } = await useFetch("/api/guestbook");
    if (!error.value && data.value) {
      guestbook.value = data.value.guestbook;
    } else {
      alert(`⚠️ 데이터 로딩 실패: ${error.value?.message}`);
    }
  } catch (err) {
    console.error("API 요청 실패:", err);
    alert("❌ 방명록을 불러오지 못했습니다.");
  }
  loading.value = false;
};

// 방명록 추가
const addEntry = async () => {
  if (!name.value || !message.value) {
    alert("⚠️ 이름과 메시지를 모두 입력해주세요.");
    return;
  }

  try {
    await $fetch("/api/guestbook", {
      method: "POST",
      body: { name: name.value, message: message.value },
    });
    await fetchGuestbook();
    name.value = "";
    message.value = "";
  } catch (error) {
    console.error("방명록 추가 실패:", error);
    alert("❌ 방명록을 추가하지 못했습니다.");
  }
};

// 방명록 삭제
const deleteEntry = async (id: number) => {
  try {
    await $fetch("/api/guestbook", {
      method: "DELETE",
      body: { id },
    });
    await fetchGuestbook();
  } catch (error) {
    console.error("방명록 삭제 실패:", error);
    alert("❌ 방명록을 삭제하지 못했습니다.");
  }
};

// 페이지 로드 시 데이터 로드
fetchGuestbook();
</script>

<style scoped>
input,
textarea {
  border: none;
  outline: none;
}
</style>
