<template>
  <div class="cw-home-container">
    <div class="cw-home-navbar">
      <h1 class="hidden text-2xl lg:block">{{ user.pseudo }}</h1>
      <cw-search-bar />
      <div class="w-1/4 md:w-auto">
        <ph-gear size="24" class="mx-auto" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CwSearchBar from '@/components/cwSearchBar.vue'
import useUser from '@/stores/userStore'

// State
const user = useUser()
</script>

<style lang="scss" scoped>
.cw-home-container {
  @apply flex-1 bg-white;
}

.cw-home-navbar {
  @apply flex h-32 w-full items-center justify-evenly lg:justify-around 3xl:justify-evenly;
}
</style>
