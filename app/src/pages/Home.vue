<template>
  <cw-container>
    <cw-container-nav-bar>
      <h2 class="hidden font-header text-2xl font-light text-tertiary lg:block">Hello {{ user.pseudo }} 🍿</h2>
      <ph-list size="28" class="lg:hidden" @click="components.slideSideBar()" />
      <cw-search-bar placeholder="Search for a movie" :query-searched="querySearched" />
      <cw-settings-dropdown />
    </cw-container-nav-bar>

    <cw-container-content>
      <cw-grid-list :is-loading="state.isLoading" :centered="paginateMoviesIsEmpty" msg-empty-data="No movies found">
        <cw-movie-poster v-for="(movie, index) in state.paginateMovies" :key="index" :tmdb-movie-id="movie.tmdb_movie_id" :poster-url="movie.poster_url" :title="movie.title" />
      </cw-grid-list>
    </cw-container-content>

    <cw-container-footer>
      <cw-pagination v-if="!paginateMoviesIsEmpty" :current-page="state.currentPage" :show-last-paginate="showLastPaginate" :on-page-changed="pageChanged" />
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
import { useThrottleFn } from '@vueuse/core'
import useComponents from '@/stores/componentsStore'
import { computed, onMounted, reactive } from 'vue'
import * as MovieService from '@/services/Movies'
import paginateArray from '@/features/paginateArray'
import CwContainerContent from '@/components/container/cwContainerContent.vue'
import CwContainerFooter from '@/components/container/cwContainerFooter.vue'
import CwGridList from '@/components/cwGridList.vue'

let movies = <IMovie.ShortDetails[]>[]
let pageReq = 1
let query = ''
const nbOfMoviesDisplayed = 8

// State
const state = reactive({
  currentPage: 1,
  paginateMovies: <IMovie.ShortDetails[]>[],
  isLoading: true,
})
const user = useUser()
const components = useComponents()

// Computed
const showLastPaginate = computed(() => state.paginateMovies?.length === nbOfMoviesDisplayed)
const paginateMoviesIsEmpty = computed(() => state.paginateMovies.length === 0)

// Function
const querySearched = useThrottleFn(async (newQuery: string) => {
  state.isLoading = true
  pageReq = 1
  query = newQuery
  state.currentPage = 1
  movies = await MovieService.getMovies(query, pageReq)
  state.paginateMovies = paginateArray(movies, nbOfMoviesDisplayed, state.currentPage)
  state.isLoading = false
}, 1000)

onMounted(async () => {
  movies = await MovieService.getMovies(query, pageReq)
  state.paginateMovies = paginateArray(movies, nbOfMoviesDisplayed, state.currentPage)
  state.isLoading = false
})

const pageChanged = async (page: number) => {
  state.currentPage = page
  state.paginateMovies = paginateArray(movies, nbOfMoviesDisplayed, state.currentPage)

  if (state.paginateMovies?.length !== 8) {
    state.isLoading = true
    pageReq += 1
    const newMovies = await MovieService.getMovies(query, pageReq)
    movies = [...movies, ...newMovies]
    state.paginateMovies = paginateArray(movies, nbOfMoviesDisplayed, state.currentPage)
    state.isLoading = false
  }
}
</script>

<style lang="scss" scoped></style>
