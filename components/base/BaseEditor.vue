<script setup lang="ts">
const content = ref(null);

const emits = defineEmits(["change"]);

const clickButton = () => {
  emits("change", content.value.getHTML());
};
</script>

<template>
  <div>
    <quill-editor ref="content" theme="snow" @text-change="clickButton" />
  </div>
</template>
