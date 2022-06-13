<template>
  <div class="cw-home-container">
    <div class="cw-home-navbar">
      <h1 class="hidden text-2xl font-light lg:block">Hello {{ user.pseudo }} 🍿</h1>
      <ph-list size="28" class="lg:hidden" @click="components.slideSideBar()" />
      <cw-search-bar placeholder="Search for a movie" :query-searched="querySearched" />
      <cw-settings-dropdown />
    </div>
    <div class="cw-home-content">
      <cw-movie-poster v-for="movie in state.paginateMovies" :key="movie.tmdb_movie_id" class="" :poster-url="movie.poster_url" :title="movie.title" />
    </div>
    <div class="cw-home-footer">
      <cw-pagination :current-page="state.currentPage" :show-last-paginate="showLastPaginate" :on-page-changed="pageChanged" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CwSearchBar from '@/components/cwSearchBar.vue'
import CwSettingsDropdown from '@/components/cwSettingsDropdown.vue'
import CwMoviePoster from '@/components/cwMoviePoster.vue'
import CwPagination from '@/components/cwPagination.vue'
import { IMovie } from '@/types'
import useUser from '@/stores/userStore'
import { useThrottleFn } from '@vueuse/core'
import useComponents from '@/stores/componentsStore'
import { computed, onMounted, reactive } from 'vue'
import * as MovieService from '@/services/Movies'
import paginateArray from '@/features/paginateArray'

let movies = <IMovie.ShortDetails[]>[]
let pageReq = 1
let query = ''

// State
const state = reactive({
  currentPage: 1,
  paginateMovies: <IMovie.ShortDetails[]>[],
})
const user = useUser()
const components = useComponents()

// Computed
const showLastPaginate = computed(() => state.paginateMovies?.length === 8)

// Function
const querySearched = useThrottleFn(async (newQuery: string) => {
  pageReq = 1
  query = newQuery
  state.currentPage = 1
  movies = await MovieService.getMovies(query, pageReq)
  state.paginateMovies = paginateArray(movies, 8, state.currentPage)
}, 1000)

onMounted(async () => {
  movies = await MovieService.getMovies(query, pageReq)
  state.paginateMovies = paginateArray(movies, 8, state.currentPage)
})

const pageChanged = async (page: number) => {
  state.currentPage = page
  state.paginateMovies = paginateArray(movies, 8, state.currentPage)

  if (state.paginateMovies?.length !== 8) {
    pageReq += 1
    const newMovies = await MovieService.getMovies(query, pageReq)
    movies = [...movies, ...newMovies]
    state.paginateMovies = paginateArray(movies, 8, state.currentPage)
  }
}
</script>

<style lang="scss" scoped>
.cw-home-container {
  @apply flex flex-1 flex-col items-center justify-between bg-white px-4 md:px-12;
}

.cw-home-navbar {
  @apply mt-4 flex h-32 w-full max-w-screen-2xl items-center justify-between md:mt-0;
}
.cw-home-content {
  @apply mt-6 grid w-full max-w-screen-2xl grid-flow-col grid-rows-4 place-content-around gap-y-4 md:mt-0 md:grid-rows-2 md:place-content-between md:gap-y-8;
}

.cw-home-footer {
  @apply flex h-16 w-full justify-center py-3 md:py-0;
}

.card {
  background-color: dodgerblue;
  color: white;
  padding: 1rem;
  height: 4rem;
}
</style>
