<template>
  <div class="cw-searchbar">
    <ph-magnifying-glass size="24" class="test mr-2" />
    <input type="text" name="search-bar" class="cw-g-input" placeholder="Search for a movie" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.cw-searchbar {
  @apply inline-flex w-60 items-center rounded-3xl border border-tertiary py-1.5 px-2 md:w-80;
}
</style>
