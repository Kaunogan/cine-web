<template>
  <div v-if="movie" class="cw-movie-details-container">
    <div class="cw-movie-details-container__header">
      <img :src="movie.backdrop_url" alt="backdrop-movie" class="backdrop" />
      <div class="cw-movie-details-container__header-content">
        <h1 class="movie-title">{{ movie.title }}</h1>
        <p class="movie-overview">{{ movie.overview }}</p>
      </div>
    </div>
  </div>
  <div v-else class="flex h-full w-full items-center justify-center">
    <cw-loader />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import * as MovieService from '@/services/Movies'
import CwLoader from '@/components/cwLoader.vue'

const route = useRoute()
const tmdbMovieId = Number(route.params.id)
const movie = ref()

onMounted(async () => {
  movie.value = await MovieService.getMoviesDetails(tmdbMovieId)
})
</script>

<style lang="scss" scoped>
.cw-movie-details-container {
  @apply h-full flex-1 bg-white;

  &__header {
    @apply relative h-72  w-full md:h-1/3;
    background-color: black;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }

  &__header-content {
    @apply absolute top-0 left-0 flex h-full w-full flex-col items-center justify-evenly px-6 md:px-12 2xl:px-48;
  }
}

.backdrop {
  @apply h-full w-full object-cover object-left-top opacity-40;
}

.movie-title {
  @apply max-w-screen-2xl text-center font-header text-2xl text-white md:text-3xl 2xl:text-4xl;
}

.movie-overview {
  @apply w-full max-w-screen-2xl overflow-hidden text-center text-white md:text-lg;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
}
</style>
