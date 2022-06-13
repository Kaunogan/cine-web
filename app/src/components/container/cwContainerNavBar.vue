<template>
  <div class="cw-container-navbar" :class="`h-${props.height}`">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  height: { type: Number, default: 32 },
})
</script>

<style lang="scss" scoped>
.cw-container-navbar {
  @apply mt-4 flex w-full max-w-screen-2xl items-center justify-between bg-white md:mt-0;
}
</style>
