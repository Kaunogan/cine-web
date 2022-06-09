<template>
  <div class="h-screen flex">
    <cw-sidebar></cw-sidebar>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import CwSidebar from '@/components/cwSidebar.vue'
</script>

<style></style>
