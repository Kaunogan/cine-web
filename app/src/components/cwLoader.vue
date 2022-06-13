<template>
  <div class="cw-loader">
    <ph-circle-notch size="44" class="animate-spin text-primary" />
    <p class="mt-2 text-lg text-tertiary">Loading</p>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.cw-loader {
  @apply flex w-32 flex-col items-center justify-center rounded-lg p-2;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}
</style>
