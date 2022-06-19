<template>
  <cw-container v-if="!state.isLoading" class="relative">
    <cw-modal :show-modal="state.showModal">
      <div v-if="!state.isSettingsModal" class="cw-g-card cw-category-details-modal-content">
        <h1 class="font-header text-xl text-tertiary">Are you sure ?</h1>
        <div class="mt-6 flex items-center justify-center">
          <cw-button btn-type="primary" @click="changeModalVisibility">Cancel</cw-button>
          <cw-button btn-type="danger" class="ml-6" @click="deleteMovie">Delete</cw-button>
        </div>
      </div>
      <div v-else class="cw-g-card cw-category-details-modal-content mx-4 h-auto w-full max-w-xl">
        <div class="flex h-full w-full flex-col justify-around">
          <cw-form-input for="shared" label="Shared">
            <input id="shared" class="cw-g-input" type="text" name="shared" :value="`http://localhost:3000/category/shared/${state.category.shared_id}`" />
            <cw-button class="ml-4">Copy</cw-button>
          </cw-form-input>

          <cw-form-input for="category-name" label="Name">
            <input id="category-name" v-model="state.category.name" class="cw-g-input" type="text" name="category-name" />
          </cw-form-input>

          <h3 class="my-6 text-center font-header text-lg">Visibility</h3>
          <div class="mx-auto flex w-24 flex-col">
            <span class="flex items-center">
              <input id="vs-all" v-model="state.visibility" type="radio" value="All" />
              <label for="vs-all" class="ml-2 text-lg font-light">All</label>
            </span>

            <span class="flex items-center">
              <input id="vs-friends" v-model="state.visibility" type="radio" value="Friends" />
              <label for="vs-friends" class="ml-2 text-lg font-light">Friends</label>
            </span>

            <span class="flex items-center">
              <input id="vs-only-you" v-model="state.visibility" type="radio" value="Only you" />
              <label for="vs-only-you" class="ml-2 text-lg font-light">Only you</label>
            </span>
          </div>
        </div>
        <div class="mt-6 flex items-center justify-center">
          <cw-button btn-type="primary" @click="changeModalVisibility">Ok</cw-button>
          <cw-button btn-type="danger" class="ml-6">Delete</cw-button>
        </div>
      </div>
    </cw-modal>
    <cw-container-nav-bar class="flex-col lg:flex-row">
      <div class="cw-category-details-nav-bar-left">
        <ph-list size="28" class="lg:hidden" @click="components.slideSideBar()" />
        <h2 class="font-header text-lg md:text-2xl">{{ state.category.name }}</h2>
        <h3 class="font-header text-lg font-light">
          Visibility: <span class="text-primary">{{ state.visibility }}</span>
        </h3>
      </div>
      <div class="cw-category-details-nav-bar-right">
        <cw-button btn-type="primary-outlined" @click="changeModalVisibility('settings')">Settings</cw-button>
        <ph-pencil size="30" class="mx-16 cursor-pointer transition duration-300 ease-in-out" :class="state.deleteMode ? 'text-secondary' : 'text-primary'" @click="changeDeleteMode" />
        <cw-settings-dropdown />
      </div>
    </cw-container-nav-bar>

    <cw-container-content>
      <cw-grid-list :evenly="state.isEvenly" :is-loading="state.isLoading" :centered="currentPaginateMoviesIsEmpty" msg-empty-data="No movies in this category">
        <cw-movie-poster
          v-for="(movie, index) in state.currentPaginateMovies"
          :key="index"
          :show-delete="state.deleteMode"
          :tmdb-movie-id="movie.tmdb_movie_id"
          :poster-url="movie.poster_url"
          :title="movie.title"
          @delete="changeModalVisibility('delete', movie.id)"
        />
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
import { breakpointsTailwind, useBreakpoints, useThrottleFn, useWindowSize } from '@vueuse/core'
import paginateArray from '@/features/paginateArray'
import CwContainerFooter from '@/components/container/cwContainerFooter.vue'
import CwPagination from '@/components/cwPagination.vue'
import { useToast } from 'vue-toastification'
import CwModal from '@/components/cwModal.vue'
import CwFormInput from '@/components/cwFormInput.vue'

// State
const route = useRoute()
const router = useRouter()
const toast = useToast()
const { width } = useWindowSize()
const breakpoints = useBreakpoints(breakpointsTailwind)
const categoryId = Number(route.params.id)
const components = useComponents()
const nbOfMoviesDisplayed = 8
let tmdbMovieIdToDelete = 0

const state = reactive({
  currentPage: 1,
  currentPaginateMovies: <IMovie.ShortDetails[]>[],
  nextPaginateMovies: <IMovie.ShortDetails[]>[],
  category: <ICategory.Details>{},
  isEvenly: false,
  isLoading: true,
  deleteMode: false,
  showModal: false,
  isSettingsModal: false,
  visibility: '',
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

  state.isEvenly = state.currentPaginateMovies.length <= 4 && state.currentPaginateMovies.length !== 0
})

// Function
const pageChanged = async (page: number) => {
  state.currentPage = page
  state.currentPaginateMovies = paginateArray(state.category.movies, nbOfMoviesDisplayed, state.currentPage)
  state.nextPaginateMovies = paginateArray(state.category.movies, nbOfMoviesDisplayed, state.currentPage + 1)
  state.isEvenly = state.currentPaginateMovies.length <= 4 && state.currentPaginateMovies.length !== 0
}

const changeDeleteMode = () => {
  state.deleteMode = !state.deleteMode
}

const changeModalVisibility = (modalType: string, tmdbMovieId: number = 0) => {
  if (!state.showModal) {
    state.showModal = true
    state.isSettingsModal = modalType === 'settings'
    tmdbMovieIdToDelete = tmdbMovieId
    return
  }

  state.showModal = false
  state.isSettingsModal = false
  tmdbMovieIdToDelete = tmdbMovieId
}

const deleteMovie = useThrottleFn(async () => {
  if (tmdbMovieIdToDelete === 0) return

  const message = await CategoryService.deleteMovieInCategory(categoryId, tmdbMovieIdToDelete)
  state.currentPage = 1
  state.category.movies = state.category.movies.filter((movie) => movie.id !== tmdbMovieIdToDelete)
  state.currentPaginateMovies = paginateArray(state.category.movies, nbOfMoviesDisplayed, state.currentPage)
  state.nextPaginateMovies = paginateArray(state.category.movies, nbOfMoviesDisplayed, state.currentPage + 1)
  state.isEvenly = state.currentPaginateMovies.length <= 4 && state.currentPaginateMovies.length !== 0
  state.showModal = false
  toast.success(message)
}, 2000)

onMounted(async () => {
  if (Number.isNaN(categoryId)) {
    await router.push({ path: '/home' })
    return
  }

  state.category = await CategoryService.getCategory(categoryId)

  state.currentPaginateMovies = paginateArray(state.category.movies, nbOfMoviesDisplayed, state.currentPage)

  state.nextPaginateMovies = paginateArray(state.category.movies, nbOfMoviesDisplayed, state.currentPage + 1)
  state.isEvenly = state.currentPaginateMovies.length <= 4 && state.currentPaginateMovies.length !== 0

  state.visibility = state.category.visibility.type
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

.cw-category-details-modal-content {
  @apply z-10 flex flex-col items-center justify-evenly;
}
</style>
