<template>
  <form class="cw-form">
    <slot />
    <cw-button :is-loading="props.isLoading" btn-type="primary" class="mx-auto mt-6 transition lg:hover:opacity-80">
      <span class="md:text-lg">{{ props.btnText }}</span>
    </cw-button>
  </form>
</template>

<script setup lang="ts">
import CwButton from '@/components/cwButton.vue'

// Props
const props = defineProps({
  btnText: { type: String, default: 'Ok' },
  isLoading: { type: Boolean, default: false },
})
</script>

<style scoped>
.cw-form {
  @apply flex h-full w-full flex-col;
}
</style>
