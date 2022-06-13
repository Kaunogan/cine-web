<template>
  <div class="cw-container-footer">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.cw-container-footer {
  @apply flex h-16 w-full max-w-screen-2xl items-center justify-center bg-white py-3 md:py-0;
}
</style>
