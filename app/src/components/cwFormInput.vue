<template>
  <div class="cw-form__input-container">
    <label class="font-header font-light md:text-lg" :for="props.for">{{ props.label }}</label>
    <div class="cw-form__input">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
  for: { type: String, required: true },
  label: { type: String, required: true },
})
</script>

<style scoped>
.cw-form__input-container {
  @apply mt-6 flex flex-col;
}

.cw-form__input {
  @apply mt-2 inline-flex items-center rounded-xl border border-tertiary p-2;
}
</style>
