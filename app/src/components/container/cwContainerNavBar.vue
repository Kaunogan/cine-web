<template>
  <div class="cw-container-navbar">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.cw-container-navbar {
  @apply mt-4 flex h-32 w-full max-w-screen-2xl items-center justify-between md:mt-0;
}
</style>
