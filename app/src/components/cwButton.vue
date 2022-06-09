<template>
  <button class="cw-btn" :class="btnClass">
    <slot v-if="!props.isLoading" />
    <ph-circle-notch v-else size="24" class="animate-spin" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  btnType: 'primary' | 'primary-outlined'
  isLoading?: boolean
}

// Props
const props = defineProps<Props>()

// Computed
const btnClass = computed(() => `cw-btn--${props.btnType}`)
</script>

<style lang="scss" scoped>
.cw-btn {
  @apply w-auto flex items-center py-1 px-3 cursor-pointer font-light text-base rounded;

  &--primary {
    @apply bg-primary text-white;
  }

  &--primary-outlined {
    @apply bg-white border border-primary text-primary;
  }
}
</style>
