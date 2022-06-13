<template>
  <div class="cw-searchbar">
    <ph-magnifying-glass size="24" class="test mr-2" />
    <input v-model="query" type="text" name="search-bar" class="cw-g-input" :placeholder="props.placeholder" @keyup.enter="props.querySearched(query)" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const query = ref()

// Props
const props = defineProps({
  placeholder: { type: String, default: '' },
  querySearched: { type: Function, required: true },
})
</script>

<style lang="scss" scoped>
.cw-searchbar {
  @apply inline-flex w-60 items-center rounded-3xl border border-tertiary py-1.5 px-2 md:w-80;
}
</style>
