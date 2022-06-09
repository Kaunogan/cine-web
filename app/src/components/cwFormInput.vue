<template>
  <div class="flex flex-col mt-6">
    <label class="md:text-lg font-header font-light" :for="props.for">{{ props.label }}</label>
    <div class="cw-form-input-container">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  for: string
  label: string
}

// Props
const props = defineProps<Props>()
</script>

<style scoped>
.cw-form-input-container {
  @apply border border-tertiary mt-2 p-2 inline-flex items-center rounded-xl;
}
</style>
