<template>
  <div class="cw-home-container">
    <div class="cw-home-navbar">
      <h1 class="hidden text-2xl font-light lg:block">Hello {{ user.pseudo }} 🍿</h1>
      <ph-list size="28" class="lg:hidden" @click="components.slideSideBar()" />
      <cw-search-bar placeholder="Search for a movie" :callback="sendQuery" />
      <cw-settings-dropdown />
    </div>
    <div class="cw-home-content">
      <cw-movie-poster v-for="movie in movies" :key="movie.tmdb_movie_id" class="" :poster-url="movie.poster_url" :title="movie.title" />
    </div>
    <div class="cw-home-footer"></div>
  </div>
</template>

<script setup lang="ts">
import CwSearchBar from '@/components/cwSearchBar.vue'
import CwSettingsDropdown from '@/components/cwSettingsDropdown.vue'
import CwMoviePoster from '@/components/cwMoviePoster.vue'

import useUser from '@/stores/userStore'
import { useThrottleFn } from '@vueuse/core'
import useComponents from '@/stores/componentsStore'
import { onMounted, ref } from 'vue'
import * as MovieService from '@/services/Movies'
import { IMovie } from '@/types'

// State
const user = useUser()
const components = useComponents()

const movies = ref<IMovie.ShortDetails[]>()

movies.value = [
  { tmdb_movie_id: 639933, title: 'The Northman', poster_url: 'https://themoviedb.org/t/p/original/zhLKlUaF1SEpO58ppHIAyENkwgw.jpg' },
  { tmdb_movie_id: 507086, title: 'Jurassic World Dominion', poster_url: 'https://themoviedb.org/t/p/original/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg' },
  { tmdb_movie_id: 453395, title: 'Doctor Strange in the Multiverse of Madness', poster_url: 'https://themoviedb.org/t/p/original/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg' },
  { tmdb_movie_id: 361743, title: 'Top Gun: Maverick', poster_url: 'https://themoviedb.org/t/p/original/wxP2Mzv9CdjOK6t4dNnFGqIQl0V.jpg' },
  { tmdb_movie_id: 936074, title: 'Tenor', poster_url: 'https://themoviedb.org/t/p/original/t8ShCiZxrbiy7kuO06OilLI3PeL.jpg' },
  { tmdb_movie_id: 532710, title: 'Firestarter', poster_url: 'https://themoviedb.org/t/p/original/2MTGip0nfahQ1jPQCZSfCsPBZes.jpg' },
  { tmdb_movie_id: 819876, title: 'Crimes of the Future', poster_url: 'https://themoviedb.org/t/p/original/5DuwY8TXNMOegpi2yXVk7giPGe5.jpg' },
  { tmdb_movie_id: 780609, title: 'Men', poster_url: 'https://themoviedb.org/t/p/original/jo1Kv3P3UgDVk7JnUFr2Cl8WWUM.jpg' },
]

// Function
const sendQuery = useThrottleFn((query: string) => {
  console.log(query)
}, 1000)

onMounted(async () => {
  // movies.value = await MovieService.getMovies()
})
</script>

<style lang="scss" scoped>
.cw-home-container {
  @apply flex flex-1 flex-col items-center justify-between bg-white px-4 md:px-12;
}

.cw-home-navbar {
  @apply mt-4 flex h-32 w-full max-w-screen-2xl items-center justify-between md:mt-0;
}
.cw-home-content {
  @apply my-6 grid w-full max-w-screen-2xl grid-flow-col grid-rows-4 place-content-around gap-y-4 md:my-0 md:grid-rows-2 md:place-content-between md:gap-y-8;
}

.cw-home-footer {
  @apply flex justify-center;
}

.card {
  background-color: dodgerblue;
  color: white;
  padding: 1rem;
  height: 4rem;
}
</style>
