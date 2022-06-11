<template>
  <div class="cw-home-container">
    <div class="cw-home-navbar">
      <h1 class="hidden text-2xl font-light lg:block">Hello {{ user.pseudo }} 🍿</h1>
      <cw-search-bar placeholder="Search for a movie" :callback="sendQuery" />
      <cw-settings-dropdown />
    </div>
  </div>
</template>

<script setup lang="ts">
import CwSearchBar from '@/components/cwSearchBar.vue'
import CwSettingsDropdown from '@/components/cwSettingsDropdown.vue'
import useUser from '@/stores/userStore'
import { useThrottleFn } from '@vueuse/core'

// State
const user = useUser()

const sendQuery = useThrottleFn((query: string) => {
  console.log(query)
}, 1000)
</script>

<style lang="scss" scoped>
.cw-home-container {
  @apply flex-1 bg-white;
}

.cw-home-navbar {
  @apply flex h-32 w-full items-center justify-evenly lg:justify-around 3xl:justify-evenly;
}
</style>
