<template>
  <div class="cw-container">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.cw-container {
  @apply flex flex-1 flex-col items-center justify-between bg-white px-4 md:px-12;
}
</style>
