<template>
  <div class="cw-g-card cw-loader">
    <ph-circle-notch size="44" class="animate-spin text-primary" />
    <p class="mt-2 text-lg text-tertiary">Loading</p>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.cw-loader {
  @apply flex w-32 flex-col items-center justify-center p-2;
}
</style>
