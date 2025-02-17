<template>
  <form
    @submit.prevent="submitMessage"
    class="w-full max-w-md bg-white text-black p-6 rounded-lg shadow-lg mb-6"
  >
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2">이름</label>
      <input
        v-model="name"
        type="text"
        placeholder="이름을 입력해주세요"
        class="w-full border border-gray-300 p-2 rounded-md"
        required
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2">메시지</label>
      <textarea
        v-model="message"
        placeholder="메시지를 입력해주세요"
        class="w-full border border-gray-300 p-2 rounded-md"
        rows="4"
        required
      ></textarea>
    </div>

    <button
      type="submit"
      class="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
    >
      🚀 메시지 등록
    </button>
  </form>
</template>

<script lang="ts">
export default defineComponent({
  data() {
    return {
      name: "",
      message: "",
    };
  },
  methods: {
    async submitMessage() {
      if (!this.name || !this.message) {
        alert("이름과 메시지를 모두 입력해주세요.");
        return;
      }

      try {
        await $fetch("/api/guestbook", {
          method: "POST",
          body: {
            name: this.name,
            message: this.message,
          },
        });
        this.$emit("new-message");
        this.name = "";
        this.message = "";
      } catch (error) {
        console.error("메시지 전송 실패:", error);
      }
    },
  },
});
</script>
