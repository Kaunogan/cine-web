<template>
  <form class="cw-form">
    <slot />
    <cw-button btn-type="primary" class="transition mx-auto hover:opacity-80 mt-6">{{ props.btnText || 'Ok' }}</cw-button>
  </form>
</template>

<script setup lang="ts">
import CwButton from '@/components/cwButton.vue'

interface Props {
  btnText?: string
}

// Props
const props = defineProps<Props>()
</script>

<style scoped>
.cw-form {
  @apply w-full h-full flex flex-col;
}
</style>
