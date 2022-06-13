<template>
  <div class="cw-pagination">
    <div v-if="!isFirstPage" class="cw-pagination__item" @click="decreasePage">
      <ph-caret-left size="24" class="" />
    </div>
    <h2 class="mx-4 text-xl">{{ props.currentPage }}</h2>
    <div v-if="props.showLastPaginate" class="cw-pagination__item" @click="incrementPage">
      <ph-caret-right size="24" class="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentPage: number
  showLastPaginate: boolean | true
  onPageChanged: Function
}

// Props
const props = defineProps<Props>()

// Computed
const isFirstPage = computed(() => props.currentPage === 1)

// Function
const decreasePage = () => {
  props.onPageChanged(props.currentPage - 1)
}

const incrementPage = () => {
  props.onPageChanged(props.currentPage + 1)
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
