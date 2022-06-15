<template>
  <div ref="test" class="cw-grid-list" :class="isCentered + ` cw-grid-list--${props.nbOfRows}-rows`">
    <cw-loader v-if="props.isLoading" />
    <slot v-else> {{ props.msgEmptyData }} </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CwLoader from '@/components/cwLoader.vue'

// Props
const props = defineProps({
  nbOfRows: { type: Number, default: 2 },
  centered: { type: Boolean, default: false },
  msgEmptyData: { type: String, default: 'No data found' },
  isLoading: { type: Boolean, default: false },
})

// Computed
const isCentered = computed(() => (props.centered || props.isLoading ? 'cw-grid-list--centered' : ''))
</script>

<style lang="scss" scoped>
.cw-grid-list {
  @apply mt-6 grid w-full grid-flow-col place-content-around gap-y-4 md:mt-0 md:place-content-between md:gap-y-8;

  &--centered {
    @apply place-content-center;
  }

  &--2-rows {
    @apply grid-rows-4 md:grid-rows-2;
  }

  &--3-rows {
    @apply grid-rows-6 md:grid-rows-3;
  }
}
</style>
