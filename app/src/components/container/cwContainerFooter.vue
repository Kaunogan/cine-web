<template>
  <div class="cw-container-footer">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.cw-container-footer {
  @apply flex h-16 w-full items-center justify-center py-3 md:py-0;
}
</style>
