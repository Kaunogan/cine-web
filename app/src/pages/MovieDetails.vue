<template>
  <div v-if="movie" class="cw-movie-details-container">
    <div class="cw-movie-details-container__header">
      <h1 class="cw-movie-details-title">{{ movie.title }}</h1>
      <p class="cw-movie-details-overview">{{ movie.overview }}</p>
    </div>
    <div class="cw-movie-details-container__content">
      <div class="cw-movie-details-container__content-trailer">
        <h2 class="max-w-screen-2xl text-center font-header text-2xl font-light text-tertiary md:text-3xl">Trailer</h2>
        <iframe v-if="movie.trailer_url" :src="movie.trailer_url" class="cw-movie-details-trailer" allowfullscreen></iframe>
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
const getCssBackgroundImage = () => {
  return movie.value?.backdrop_url.includes('null') ? `url(https://pbs.twimg.com/profile_images/527991807402328064/LmS_7fXc_400x400.jpeg)` : `url(${movie.value?.backdrop_url})`
}

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
    @apply flex w-full flex-col items-center justify-evenly bg-cover bg-center px-6 md:h-1/3 md:px-12 2xl:px-48;
    background-image: linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), v-bind('getCssBackgroundImage()');
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }

  &__content {
    @apply flex h-full w-full items-center justify-center px-4 lg:px-0;
  }

  &__content-trailer {
    @apply flex h-3/4 w-full max-w-screen-sm flex-col items-center justify-evenly px-4 3xl:max-w-screen-lg;
  }
}

.cw-movie-details-title {
  @apply max-w-screen-2xl text-center font-header text-2xl text-white md:text-3xl 2xl:text-4xl;
}

.cw-movie-details-overview {
  @apply w-full max-w-screen-2xl overflow-hidden text-center font-light text-white md:text-lg;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.cw-movie-details-trailer {
  @apply h-3/4 w-full rounded-2xl transition ease-in-out;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
}
</style>
