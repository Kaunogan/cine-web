<template>
  <div class="cw-container-navbar md:h-32">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.cw-container-navbar {
  @apply mt-4 flex w-full max-w-screen-2xl items-center justify-between bg-white md:mt-0;
}
</style>
