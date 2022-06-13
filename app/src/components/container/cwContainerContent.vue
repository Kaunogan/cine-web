<template>
  <div class="cw-container-content">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.cw-container-content {
  @apply w-full max-w-screen-2xl;
}
</style>
