<template>
  <div class="flex flex-col">
    <label class="font-light" :for="props.id">{{ props.label }}</label>
    <div class="cw-input-container">
      <input :id="props.id" class="w-full font-light focus:outline-none" :type="props.inputType" :name="props.id" :placeholder="props.placeholder" />
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string
  label: string
  placeholder: string
  inputType: 'text' | 'password'
}

// Props
const props = defineProps<Props>()
</script>

<style scoped>
.cw-input-container {
  @apply border border-tertiary mt-2 p-2 inline-flex items-center rounded-xl;
}
</style>
