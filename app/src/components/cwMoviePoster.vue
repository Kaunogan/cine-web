<template>
  <div class="cw-movie-poster">
    <img :src="props.posterUrl" alt="movie-poster" />
    <p class="text-center font-light">{{ props.title }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  posterUrl: string
  title: string
}

// Props
const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.cw-movie-poster {
  @apply flex w-52 flex-col items-center;

  & img {
    @apply rounded-xl  transition duration-300 ease-in-out hover:-translate-y-1;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  }

  & img:hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
}
</style>
