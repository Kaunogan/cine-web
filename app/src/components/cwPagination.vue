<template>
  <div class="cw-pagination">
    <div v-if="!isFirstPage" class="cw-pagination__item" @click="decreasePage">
      <ph-caret-left size="24" class="" />
    </div>
    <h2 class="mx-4 text-xl">{{ page }}</h2>
    <div class="cw-pagination__item" @click="incrementPage">
      <ph-caret-right size="24" class="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  onPageChanged: Function
}

const page = ref(1)

// Props
const props = defineProps<Props>()

// Computed
const isFirstPage = computed(() => page.value === 1)

// Function
const decreasePage = () => {
  page.value -= 1
  props.onPageChanged(page.value)
}

const incrementPage = () => {
  page.value += 1
  props.onPageChanged(page.value)
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
