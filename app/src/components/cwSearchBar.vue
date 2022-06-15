<template>
  <div class="cw-searchbar">
    <ph-magnifying-glass size="24" class="test mr-2" />
    <input v-model="query" type="text" name="search-bar" class="cw-g-input" :placeholder="props.placeholder" @keyup.enter="emit('querySearched', query)" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const query = ref()

// Props
const props = defineProps({
  placeholder: { type: String, default: '' },
})

// Emits
const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'querySearched', value: string): void
}>()

// Watch
watch(query, () => {
  if (query.value !== '') return
  emit('querySearched', query.value)
})
</script>

<style lang="scss" scoped>
.cw-searchbar {
  @apply inline-flex w-60 items-center rounded-3xl border border-tertiary py-1.5 px-2 md:w-80;
}
</style>
