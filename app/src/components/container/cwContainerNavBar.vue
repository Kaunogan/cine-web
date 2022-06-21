<template>
  <div class="cw-container__navbar" :class="props.centered ? 'cw-container__navbar--centered' : ''">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
  centered: { type: Boolean, required: false, default: false },
})
</script>

<style lang="scss" scoped>
.cw-container__navbar {
  @apply mt-4 flex w-full max-w-screen-2xl items-center justify-between bg-white md:mt-0 md:h-32;

  &--centered {
    @apply justify-center;
  }
}
</style>
