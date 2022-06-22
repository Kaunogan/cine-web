<template>
  <div class="flex h-screen">
    <cw-sidebar></cw-sidebar>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import CwSidebar from '@/components/cwSidebar.vue'
</script>

<style></style>
