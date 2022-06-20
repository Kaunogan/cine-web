<template>
  <div class="z-10 m-5">
    <cw-button btn-type="primary-outlined" @click="goBack">
      <ph-arrow-arc-left class="mr-2"></ph-arrow-arc-left>
      <p>Back to app</p>
    </cw-button>
  </div>
  <div class="fixed z-0 flex h-full w-full flex-col items-center justify-center p-3">
    <div class="flex">
      <h1 class="cw-not-found">4</h1>
      <h1 class="cw-not-found cw-not-found--color">0</h1>
      <h1 class="cw-not-found">4</h1>
    </div>
    <p class="mt-1 text-xl font-light text-tertiary">Not found</p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import CwButton from '@/components/cwButton.vue'

const router = useRouter()

// Functions
const goBack = () => router.back()
</script>

<style lang="scss" scoped>
.cw-not-found {
  @apply font-header text-5xl font-bold text-tertiary;

  &--color {
    @apply mx-1.5 font-bold text-primary;
  }
}
</style>
