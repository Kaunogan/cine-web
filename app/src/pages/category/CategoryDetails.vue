<template>
  <cw-container v-if="!state.isLoading">
    <cw-container-nav-bar class="flex-col lg:flex-row">
      <div class="cw-category-details-nav-bar-left">
        <ph-list size="28" class="lg:hidden" @click="components.slideSideBar()" />
        <h2 class="text-lg md:text-2xl">Category name "{{ state.category.name }}"</h2>
        <h3 class="text-lg font-light">
          Visibility: <span class="text-primary">{{ state.category.visibility.type }}</span>
        </h3>
      </div>
      <div class="cw-category-details-nav-bar-right">
        <cw-button btn-type="primary-outlined">Settings</cw-button>
        <ph-pencil size="30" class="mx-16 text-primary" />
        <cw-settings-dropdown />
      </div>
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
  <div v-else class="flex h-full w-full items-center justify-center">
    <cw-loader />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, reactive, watch } from 'vue'
import * as CategoryService from '@/services/Category'
import { ICategory, IMovie } from '@/types'
import CwContainer from '@/components/container/cwContainer.vue'
import CwContainerNavBar from '@/components/container/cwContainerNavBar.vue'
import CwLoader from '@/components/cwLoader.vue'
import CwContainerContent from '@/components/container/cwContainerContent.vue'
import CwButton from '@/components/cwButton.vue'
import CwSettingsDropdown from '@/components/cwSettingsDropdown.vue'
import useComponents from '@/stores/componentsStore'
import CwGridList from '@/components/cwGridList.vue'
import CwMoviePoster from '@/components/cwMoviePoster.vue'
import { breakpointsTailwind, useBreakpoints, useWindowSize } from '@vueuse/core'
import paginateArray from '@/features/paginateArray'
import CwContainerFooter from '@/components/container/cwContainerFooter.vue'
import CwPagination from '@/components/cwPagination.vue'

// State
const route = useRoute()
const router = useRouter()
const { width } = useWindowSize()
const breakpoints = useBreakpoints(breakpointsTailwind)
const categoryId = Number(route.params.id)
const components = useComponents()
const nbOfMoviesDisplayed = 8

const state = reactive({
  currentPage: 1,
  currentPaginateMovies: <IMovie.ShortDetails[]>[],
  nextPaginateMovies: <IMovie.ShortDetails[]>[],
  category: <ICategory.Details>{},
  isEvenly: false,
  isLoading: true,
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

  state.isEvenly = state.currentPaginateMovies.length <= 4
})

// Function
const pageChanged = async (page: number) => {
  state.currentPage = page
  state.currentPaginateMovies = paginateArray(state.category.movies, nbOfMoviesDisplayed, state.currentPage)
  state.nextPaginateMovies = paginateArray(state.category.movies, nbOfMoviesDisplayed, state.currentPage + 1)
  state.isEvenly = state.currentPaginateMovies.length <= 4
}

onMounted(async () => {
  if (Number.isNaN(categoryId)) {
    await router.push({ path: '/home' })
    return
  }

  state.category = await CategoryService.getCategory(categoryId)

  state.currentPaginateMovies = paginateArray(state.category.movies, nbOfMoviesDisplayed, state.currentPage)

  state.nextPaginateMovies = paginateArray(state.category.movies, nbOfMoviesDisplayed, state.currentPage + 1)
  state.isEvenly = state.currentPaginateMovies.length <= 4

  state.isLoading = false
})
</script>

<style lang="scss" scoped>
.cw-category-details-nav-bar-left {
  @apply flex h-full w-full items-center justify-between text-2xl lg:w-1/2 lg:flex-col lg:items-start lg:justify-center;
}

.cw-category-details-nav-bar-right {
  @apply mt-6 flex h-full w-full items-center justify-between lg:mt-0 lg:w-1/2 lg:justify-end;
}
</style>
