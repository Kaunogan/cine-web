<template>
  <cw-container v-if="!state.isLoading">
    <cw-container-nav-bar class="relative flex-col md:flex-row">
      <cw-button btn-type="primary-outlined" class="z-10 my-3 w-1/3 md:my-0" @click="goBack">
        <ph-arrow-arc-left class="mr-3"></ph-arrow-arc-left>
        <p class="whitespace-nowrap">Back to app</p>
      </cw-button>
      <div class="z-0 w-full font-header text-xl lg:absolute">
        <h1 class="text-center font-light">
          Category "{{ state.categoryShared.category_name }}" by <span class="text-primary">{{ state.categoryShared.created_by }}</span>
        </h1>
      </div>
    </cw-container-nav-bar>

    <cw-container-content class="flex items-center md:h-full">
      <cw-grid-list :centered="currentPaginateMoviesIsEmpty" :evenly="state.isEvenly" :is-loading="state.isLoading" msg-empty-data="No movies in this category">
        <cw-movie-poster v-for="(movie, index) in state.currentPaginateMovies" :key="index" :tmdb-movie-id="movie.tmdb_movie_id" :poster-url="movie.poster_url" :title="movie.title" />
      </cw-grid-list>
    </cw-container-content>

    <cw-container-footer>
      <cw-pagination v-if="!currentPaginateMoviesIsEmpty" :current-page="state.currentPage" :show-last-paginate="!nextPaginateMoviesIsEmpty" @page-changed="pageChanged" />
    </cw-container-footer>
  </cw-container>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import CwButton from '@/components/cwButton.vue'
import * as CategoryService from '@/services/Category'
import { computed, onMounted, reactive, watch } from 'vue'
import { ICategory, IMovie } from '@/types'
import CwGridList from '@/components/cwGridList.vue'
import CwMoviePoster from '@/components/cwMoviePoster.vue'
import CwContainer from '@/components/container/cwContainer.vue'
import CwContainerContent from '@/components/container/cwContainerContent.vue'
import CwContainerNavBar from '@/components/container/cwContainerNavBar.vue'
import { breakpointsTailwind, useBreakpoints, useWindowSize } from '@vueuse/core'
import CwContainerFooter from '@/components/container/cwContainerFooter.vue'
import paginateArray from '@/features/paginateArray'
import CwPagination from '@/components/cwPagination.vue'

const route = useRoute()
const router = useRouter()
const { sharedId } = <{ sharedId: string }>route.params
const { width } = useWindowSize()
const breakpoints = useBreakpoints(breakpointsTailwind)
const nbOfMoviesDisplayed = 8

// State
const state = reactive({
  categoryShared: <ICategory.Shared>{},
  currentPaginateMovies: <IMovie.ShortDetails[]>[],
  nextPaginateMovies: <IMovie.ShortDetails[]>[],
  currentPage: 1,

  isLoading: true,
  isEvenly: false,
})

// Computed
const currentPaginateMoviesIsEmpty = computed(() => state.currentPaginateMovies.length === 0)
const nextPaginateMoviesIsEmpty = computed(() => state.nextPaginateMovies.length === 0)

// Watch
watch(width, () => {
  if (breakpoints.isSmaller('md')) {
    state.isEvenly = false
    return
  }

  state.isEvenly = state.categoryShared.movies.length <= 4 && state.categoryShared.movies.length !== 0
})

// Functions
const goBack = () => router.push({ path: '/home' })

const pageChanged = async (page: number) => {
  state.currentPage = page
  state.currentPaginateMovies = paginateArray(state.categoryShared.movies, nbOfMoviesDisplayed, state.currentPage)
  state.nextPaginateMovies = paginateArray(state.categoryShared.movies, nbOfMoviesDisplayed, state.currentPage + 1)
  state.isEvenly = state.currentPaginateMovies.length <= 4 && state.currentPaginateMovies.length !== 0
}

onMounted(async () => {
  const decodedSharedId = decodeURIComponent(sharedId)

  try {
    state.categoryShared = await CategoryService.getSharedCategory(decodedSharedId)
  } catch (e) {
    await router.push({ path: '/home' })
  }

  state.currentPaginateMovies = paginateArray(state.categoryShared.movies, nbOfMoviesDisplayed, state.currentPage)
  state.nextPaginateMovies = paginateArray(state.categoryShared.movies, nbOfMoviesDisplayed, state.currentPage + 1)

  state.isEvenly = state.categoryShared.movies.length <= 4 && state.categoryShared.movies.length !== 0

  state.isLoading = false
})
</script>

<style lang="scss" scoped></style>
