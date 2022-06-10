<template>
  <div class="w-full flex-1 bg-primary bg-white">
    <h1 class="text-center">Hello {{ user.pseudo }}</h1>
  </div>
</template>

<script setup lang="ts">
import useUser from '@/stores/userStore'

// State
const user = useUser()
</script>

<style lang="scss" scoped></style>
