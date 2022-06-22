<template>
  <button class="cw-btn" :class="btnClass">
    <slot v-if="!props.isLoading" />
    <ph-circle-notch v-else size="24" class="animate-spin" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props
const props = defineProps({
  btnType: { type: String, default: 'primary' },
  isLoading: { type: Boolean, default: false },
})

// Computed
const btnClass = computed(() => `cw-btn--${props.btnType}`)
</script>

<style lang="scss" scoped>
.cw-btn {
  @apply flex w-auto cursor-pointer items-center rounded py-1 px-3 text-base font-light;

  &--primary {
    @apply bg-primary text-white;
  }

  &--primary-outlined {
    @apply border border-primary bg-white text-primary;
  }

  &--danger {
    @apply bg-secondary text-white;
  }

  &--danger-outlined {
    @apply border border-primary bg-secondary text-primary;
  }
}
</style>
