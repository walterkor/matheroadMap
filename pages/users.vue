<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">👥 사용자 관리 시스템</h2>

    <!-- 사용자 등록 -->
    <div class="flex gap-4 mb-6">
      <input v-model="username" placeholder="이름" class="border p-2" />
      <input v-model="email" placeholder="이메일" class="border p-2" />
      <button @click="createUser" class="bg-blue-600 text-white px-4 py-2">
        등록
      </button>
    </div>

    <!-- 사용자 목록 -->
    <ul class="list-disc">
      <li
        v-for="user in users"
        :key="user.id"
        class="flex justify-between p-2 border-b"
      >
        {{ user.username }} - {{ user.email }}
        <button
          @click="deleteUser(user.id)"
          class="bg-red-500 text-white px-2 py-1"
        >
          삭제
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const users = ref([]);
const username = ref("");
const email = ref("");

// 사용자 목록 조회
const fetchUsers = async () => {
  const { data, error } = await useFetch("/api/users");
  if (error.value) {
    alert(`⚠️ API 호출 실패: ${error.value.message}`);
  } else {
    users.value = data.value.users;
  }
};
fetchUsers();

// 사용자 생성
const createUser = async () => {
  await $fetch("/api/users", {
    method: "POST",
    body: { username: username.value, email: email.value },
  });
  fetchUsers();
  username.value = "";
  email.value = "";
};

// 사용자 삭제
const deleteUser = async (id: number) => {
  await $fetch(`/api/users`, {
    method: "DELETE",
    body: { id },
  });
  fetchUsers();
};
</script>
