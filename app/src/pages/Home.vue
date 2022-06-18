<template>
  <cw-container>
    <cw-container-nav-bar>
      <h2 class="hidden font-header text-2xl font-light text-tertiary lg:block">Hello {{ user.pseudo }} 🍿</h2>
      <ph-list size="28" class="lg:hidden" @click="components.slideSideBar()" />
      <cw-search-bar placeholder="Search for a movie" @query-searched="querySearched" />
      <cw-settings-dropdown />
    </cw-container-nav-bar>

    <cw-container-content>
      <cw-grid-list :evenly="state.isEvenly" :is-loading="state.isLoading" :centered="currentPaginateMoviesIsEmpty" msg-empty-data="No movies found">
        <cw-movie-poster v-for="(movie, index) in state.currentPaginateMovies" :key="index" :tmdb-movie-id="movie.tmdb_movie_id" :poster-url="movie.poster_url" :title="movie.title" />
      </cw-grid-list>
    </cw-container-content>

    <cw-container-footer>
      <cw-pagination v-if="!currentPaginateMoviesIsEmpty" :current-page="state.currentPage" :show-last-paginate="!nextPaginateMoviesIsEmpty" @page-changed="pageChanged" />
    </cw-container-footer>
  </cw-container>
</template>

<script setup lang="ts">
import CwSearchBar from '@/components/cwSearchBar.vue'
import CwSettingsDropdown from '@/components/cwSettingsDropdown.vue'
import CwMoviePoster from '@/components/cwMoviePoster.vue'
import CwPagination from '@/components/cwPagination.vue'
import CwContainer from '@/components/container/cwContainer.vue'
import CwContainerNavBar from '@/components/container/cwContainerNavBar.vue'
import { IMovie } from '@/types'
import useUser from '@/stores/userStore'
import { breakpointsTailwind, useBreakpoints, useThrottleFn, useWindowSize } from '@vueuse/core'
import useComponents from '@/stores/componentsStore'
import { computed, onMounted, reactive, watch } from 'vue'
import * as MovieService from '@/services/Movies'
import paginateArray from '@/features/paginateArray'
import CwContainerContent from '@/components/container/cwContainerContent.vue'
import CwContainerFooter from '@/components/container/cwContainerFooter.vue'
import CwGridList from '@/components/cwGridList.vue'

let movies = <IMovie.ShortDetails[]>[]
let pageReq = 1
let query = ''
const nbOfMoviesDisplayed = 8
const nbOfMoviesPerRequest = 20

// State
const state = reactive({
  currentPage: 1,
  currentPaginateMovies: <IMovie.ShortDetails[]>[],
  nextPaginateMovies: <IMovie.ShortDetails[]>[],
  isLoading: true,
  isEvenly: false,
})
const user = useUser()
const components = useComponents()
const { width } = useWindowSize()
const breakpoints = useBreakpoints(breakpointsTailwind)

// Computed
const currentPaginateMoviesIsEmpty = computed(() => state.currentPaginateMovies.length === 0)
const nextPaginateMoviesIsEmpty = computed(() => state.nextPaginateMovies.length === 0)

// Watch
watch(width, () => {
  if (breakpoints.isSmaller('md')) {
    state.isEvenly = false
    return
  }

  state.isEvenly = state.currentPaginateMovies.length <= 4
})

// Function
const querySearched = useThrottleFn(async (newQuery: string) => {
  state.isLoading = true
  pageReq = 1
  state.currentPage = 1

  if (newQuery !== query) {
    query = newQuery
    movies = await MovieService.getMovies(query, pageReq)
  }

  state.currentPaginateMovies = paginateArray(movies, nbOfMoviesDisplayed, state.currentPage)
  state.nextPaginateMovies = paginateArray(movies, nbOfMoviesDisplayed, state.currentPage + 1)
  state.isLoading = false
}, 1000)

const pageChanged = async (page: number) => {
  state.currentPage = page
  state.currentPaginateMovies = paginateArray(movies, nbOfMoviesDisplayed, state.currentPage)

  const totalMoviesViewed = (state.currentPage - 1) * 8 + state.currentPaginateMovies.length

  if (totalMoviesViewed === nbOfMoviesPerRequest * pageReq) {
    state.isLoading = true
    pageReq += 1
    const newMovies = await MovieService.getMovies(query, pageReq)
    movies = [...movies, ...newMovies]
    state.currentPaginateMovies = paginateArray(movies, nbOfMoviesDisplayed, state.currentPage)
  }

  state.nextPaginateMovies = paginateArray(movies, nbOfMoviesDisplayed, state.currentPage + 1)
  state.isEvenly = state.currentPaginateMovies.length <= 4

  state.isLoading = false
}

onMounted(async () => {
  movies = await MovieService.getMovies(query, pageReq)
  state.currentPaginateMovies = paginateArray(movies, nbOfMoviesDisplayed, state.currentPage)

  state.nextPaginateMovies = paginateArray(movies, nbOfMoviesDisplayed, state.currentPage + 1)
  state.isEvenly = state.currentPaginateMovies.length <= 4

  state.isLoading = false
})
</script>

<style lang="scss" scoped></style>
