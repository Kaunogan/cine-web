<template>
  <div ref="test" class="cw-grid-list" :class="isCentered + ` cw-grid-list__${props.nbOfRows}-rows`">
    <cw-loader v-if="props.isLoading" />
    <slot v-else> {{ props.msgEmptyData }} </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CwLoader from '@/components/cwLoader.vue'

interface Props {
  nbOfRows: 2 | 3
  centered: boolean
  msgEmptyData: string
  isLoading: boolean
}

// Props
const props = defineProps<Props>()

// Computed
const isCentered = computed(() => (props.centered || props.isLoading ? 'cw-grid-list--centered' : ''))
</script>

<style lang="scss" scoped>
.cw-grid-list {
  @apply mt-6 grid w-full grid-flow-col place-content-around gap-y-4 md:mt-0 md:place-content-between md:gap-y-8;

  &--centered {
    @apply place-content-center;
  }

  &__2-rows {
    @apply grid-rows-4 md:grid-rows-2;
  }

  &__3-rows {
    @apply grid-rows-6 md:grid-rows-3;
  }
}
</style>
