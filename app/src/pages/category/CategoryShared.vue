<template>
  <div>{{ sharedId }}</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const { sharedId } = route.params
</script>

<style lang="scss" scoped></style>
