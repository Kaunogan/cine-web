<template>
  <div v-if="props.showModal" class="cw-modal">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
  showModal: { type: Boolean, required: false, default: false },
})
</script>

<style lang="scss" scoped>
.cw-modal {
  @apply fixed z-20 flex h-full w-full items-center justify-center;
  background-color: rgb(30, 45, 47, 0.6);
}
</style>
