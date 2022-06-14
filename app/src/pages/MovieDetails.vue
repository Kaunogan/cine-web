<template>
  <div v-if="movie" class="cw-movie-details-container">
    <div class="cw-movie-details-container__header">
      <img :src="movie.backdrop_url" alt="backdrop-movie" class="backdrop" />
      <div class="cw-movie-details-container__header-content">
        <h1 class="movie-title">{{ movie.title }}</h1>
        <p class="movie-overview">{{ movie.overview }}</p>
      </div>
    </div>
    <div class="cw-movie-details-container__content">
      <div class="cw-movie-details-container__content-trailer">
        <h2 class="max-w-screen-2xl text-center font-header text-2xl font-light text-tertiary md:text-3xl">Trailer</h2>
        <iframe v-if="movie.trailer_url" :src="movie.trailer_url" class="trailer" allowfullscreen></iframe>
        <h2 v-else class="text-xl font-thin text-primary md:text-2xl">No trailer</h2>
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
import { IMovie } from '@/types'

const route = useRoute()
const tmdbMovieId = Number(route.params.id)
const movie = ref<IMovie.Details>()

// Function
onMounted(async () => {
  movie.value = await MovieService.getMoviesDetails(tmdbMovieId)

  movie.value.backdrop_url = movie.value.backdrop_url.includes('null') ? 'https://pbs.twimg.com/profile_images/527991807402328064/LmS_7fXc_400x400.jpeg' : movie.value.backdrop_url
  movie.value.overview = movie.value.overview !== '' ? movie.value?.overview : 'No overview for this movie'
})
</script>

<style lang="scss" scoped>
.cw-movie-details-container {
  @apply flex flex-1 flex-col bg-secondary bg-white;

  &__header {
    @apply relative h-72 w-full md:h-1/3;
    background-color: black;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }

  &__header-content {
    @apply absolute top-0 left-0 flex h-full w-full flex-col items-center justify-evenly px-6 md:px-12 2xl:px-48;
  }

  &__content {
    @apply flex h-full w-full items-center justify-center px-4 lg:px-0;
  }

  &__content-trailer {
    @apply flex h-3/4 w-full max-w-screen-sm flex-col items-center justify-evenly px-4 3xl:max-w-screen-lg;
  }
}

.backdrop {
  @apply h-full w-full object-cover object-center opacity-40;
}

.movie-title {
  @apply max-w-screen-2xl text-center font-header text-2xl text-white md:text-3xl 2xl:text-4xl;
}

.movie-overview {
  @apply w-full max-w-screen-2xl overflow-hidden text-center font-light text-white md:text-lg;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.trailer {
  @apply h-3/4 w-full;
}
</style>
