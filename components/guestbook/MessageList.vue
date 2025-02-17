<template>
  <div class="w-full max-w-md bg-white text-black p-6 rounded-lg shadow-lg">
    <h2 class="text-xl font-bold mb-4">💬 방명록 메시지</h2>
    <ul v-if="messages.length > 0" class="space-y-4">
      <li
        v-for="(msg, index) in messages"
        :key="index"
        class="p-4 border-b border-gray-300"
      >
        <p class="text-lg font-semibold">🧑‍💬 {{ msg.name }}</p>
        <p class="text-sm mt-2">{{ msg.message }}</p>
        <p class="text-xs text-gray-500 mt-2">
          {{ new Date(msg.createdAt).toLocaleString() }}
        </p>
      </li>
    </ul>
    <p v-else class="text-gray-500">아직 등록된 메시지가 없습니다.</p>
  </div>
</template>

<script lang="ts">
import { GuestbookEntry } from "@/types/Guestbook";

export default defineComponent({
  props: {
    messages: {
      type: Array as () => GuestbookEntry[],
      required: true,
    },
  },
});
</script>
