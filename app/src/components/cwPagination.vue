<template>
  <div class="cw-pagination">
    <div v-if="!isFirstPage" class="cw-pagination__item" @click="decreasePage">
      <ph-caret-left size="24" class="" />
    </div>
    <h2 class="mx-4 font-header text-xl">{{ props.currentPage }}</h2>
    <div v-if="props.showLastPaginate" class="cw-pagination__item" @click="incrementPage">
      <ph-caret-right size="24" class="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props
const props = defineProps({
  currentPage: { type: Number, required: true },
  showLastPaginate: { type: Boolean, default: true },
})

// Emits
const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'pageChanged', value: number): void
}>()

// Computed
const isFirstPage = computed(() => <Number>props.currentPage === 1)

// Function
const decreasePage = () => {
  emit('pageChanged', props.currentPage - 1)
}

const incrementPage = () => {
  emit('pageChanged', props.currentPage + 1)
}
</script>

<style lang="scss" scoped>
.cw-pagination {
  @apply inline-flex items-center;

  &__item {
    @apply flex w-7 items-center justify-center rounded-lg bg-tertiary px-1 py-0.5 text-white transition duration-300 ease-in-out hover:opacity-80;
  }
}
</style>
