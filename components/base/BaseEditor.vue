<template>
  <section>
    <ClientOnly>
      <div class="pt-3 pb-3">
        <input
          v-model="title"
          class="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="제목을 입력하세요."
        />
      </div>
      <div>
        <label for="">가게상호명</label>
        <span>{{ placeInfo.name }}</span>
        <label for="">주소</label>
        <span>{{ placeInfo.address }}</span>
      </div>
      <QuillEditor
        ref="quillRef"
        v-model:content="editedContent"
        :options="editorOption"
        class="editor--border relative min-h-[300px]"
        @update:content="debounceTextChange"
      />
      <div class="flex justify-end space-x-2 pt-3">
        <button
          class="px-5 py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition-all"
          @click="uploadPost"
        >
          저장
        </button>

        <button
          class="px-5 py-2.5 text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition-all"
          @click="delPost"
        >
          삭제
        </button>
      </div>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { useDebounceFn } from "@vueuse/core";
import { PlaceInfo } from "@/types/MapTypes";

// Props 정의
const props = defineProps<{
  content: string;
  placeInfo: PlaceInfo;
}>();

const title = ref("");

// 에디터 ref
const quillRef = ref<any>(null);

// Emits 정의
const emit = defineEmits(["text-change"]);

// Quill 에디터 데이터
const editedContent = ref(props.content);

// 이미지 업로드 핸들러 (예제 함수)
const uploadImage = () => {
  if (!quillRef.value) return;

  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = async () => {
    const file = input.files![0];
    if (!file) return;

    const ext = file.name.split(".").pop().toLowerCase();
    const allowedExtensions = ["gif", "jpg", "jpeg", "png", "bmp"];

    //확장자 체크
    if (!ext || !allowedExtensions.includes(ext)) {
      alert("jpg, jpeg, png, bmp, gif 파일만 업로드 가능합니다.");
      return;
    }

    const fileSize = file.size;
    const maxSize = 20 * 1024 * 1024;

    if (fileSize > maxSize) {
      alert("업로드 가능한 최대 이미지 용량은 20MB입니다.");
      return;
    }

    const formData = new FormData();
    formData.append("uploadFile", file);
    formData.append("placeId", props.placeInfo.placeId);

    try {
      const { url } = await $fetch<{ url: string }>("/api/upload/uploadImage", {
        method: "POST",
        body: formData,
      });

      const quill = quillRef.value.getQuill();
      const range = quill.getSelection(true);
      quill.insertEmbed(range.index, "image", url);
    } catch (error) {
      console.log("이미지 업로드 실패:", error);
      alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
    }
  };
};

// Quill 설정
const editorOption = ref({
  theme: "bubble",
  modules: {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike", "code"],
        ["blockquote", "code-block"],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["clean"],
        ["link", "image"],
      ],
      handlers: {
        image: uploadImage,
      },
    },
  },
});

// TODO mergeInto로 변경
const uploadPost = async () => {
  const quill = quillRef.value.getQuill();
  const contentHtml = quill.root.innerHTML;

  if (!title.value.trim() || !contentHtml.trim()) {
    alert("제목과 내용을 모두 입력해주세요.");
    return;
  }

  if (!props.placeInfo.placeId) {
    alert("위치값은 필수 값입니다.");
    return;
  }

  try {
    const response: any = await $fetch("/api/board", {
      method: "POST",
      body: {
        title: title.value,
        content: contentHtml,
        placeId: props.placeInfo.placeId,
      },
    });
    if (response.success) {
      alert("게시글이 저장되었습니다.");
    }
  } catch (error) {
    console.error("게시글 저장 실패:", error);
    alert("게시글 저장 실패");
  }
};

// TODO update로 변경
const delPost = () => {
  console.log("delPost");
};

// 디바운스된 이벤트 핸들러
const debounceTextChange = useDebounceFn(() => {
  emit("text-change", editedContent.value);
}, 2000);

// props.content가 변경될 때 자동 동기화
watch(
  () => props.content,
  (newValue) => {
    editedContent.value = newValue;
  }
);
</script>
