<template>
  <div class="m-5 z-10">
    <cw-button btn-type="primary-outlined" @click="clicked">
      <ph-arrow-arc-left class="mr-2"></ph-arrow-arc-left>
      Back to app
    </cw-button>
  </div>
  <div class="w-full h-full fixed z-0 p-3 flex flex-col items-center justify-center">
    <div class="flex">
      <h1 class="not-found">4</h1>
      <h1 class="not-found not-found--color">0</h1>
      <h1 class="not-found">4</h1>
    </div>
    <p class="text-xl font-light mt-1 text-tertiary">Not found</p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import CwButton from '@/components/cwButton.vue'

const router = useRouter()

// Functions
const clicked = () => router.back()
</script>

<style lang="scss" scoped>
.not-found {
  @apply text-5xl font-bold text-tertiary font-header;

  &--color {
    @apply mx-1.5 text-primary font-bold;
  }
}
</style>
