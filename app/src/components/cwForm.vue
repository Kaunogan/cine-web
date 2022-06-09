<template>
  <form class="cw-form">
    <slot />
    <cw-button :is-loading="props.isLoading" btn-type="primary" class="transition mx-auto hover:opacity-80 mt-6">
      <span class="md:text-lg">{{ props.btnText || 'Ok' }}</span>
    </cw-button>
  </form>
</template>

<script setup lang="ts">
import CwButton from '@/components/cwButton.vue'

interface Props {
  btnText?: string
  isLoading?: boolean
}

// Props
const props = defineProps<Props>()
</script>

<style scoped>
.cw-form {
  @apply w-full h-full flex flex-col;
}
</style>
