<template>
  <div class="cw-container__content">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.cw-container__content {
  @apply w-full max-w-screen-2xl bg-white;
}
</style>
