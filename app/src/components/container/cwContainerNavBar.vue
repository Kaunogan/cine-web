<template>
  <div class="cw-container__navbar">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.cw-container__navbar {
  @apply mt-4 flex w-full max-w-screen-2xl items-center justify-between bg-white md:mt-0 md:h-32;
}
</style>
