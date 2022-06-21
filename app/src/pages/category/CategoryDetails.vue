<template>
  <cw-container v-if="!state.isLoading" class="relative">
    <cw-modal :show-modal="state.showModal">
      <div v-if="!state.isSettingsModal" class="cw-g-card cw-category-details-modal-content">
        <h1 class="text-center font-header text-xl text-tertiary">Are you sure ?</h1>
        <div class="mt-6 flex items-center justify-center">
          <cw-button btn-type="primary" @click="changeModalVisibility">Cancel</cw-button>
          <cw-button btn-type="danger" class="ml-6" @click="onDeleteBtnModal">Delete</cw-button>
        </div>
      </div>
      <div v-else class="cw-g-card cw-category-details-modal-content relative mx-4 h-auto w-full max-w-xl">
        <ph-x size="24" class="absolute top-5 right-5 cursor-pointer text-tertiary transition ease-in hover:text-secondary" @click="changeModalVisibility" />

        <div class="flex h-full w-full flex-col justify-around">
          <cw-form-input for="shared" label="Shared">
            <input id="shared" class="cw-g-input" type="text" name="shared" :value="sharedUrl" readonly />
            <cw-button v-if="state.category.shared_id" class="ml-4" @click="copyUrl">Copy</cw-button>
          </cw-form-input>

          <cw-form-input for="category-name" label="Name">
            <input id="category-name" v-model="state.category.name" class="cw-g-input" type="text" name="category-name" />
          </cw-form-input>

          <h3 class="my-6 text-center font-header text-lg">Visibility</h3>
          <div class="mx-auto flex w-32 flex-col">
            <span v-for="(visibility, index) in visibilities" :key="index" class="flex items-center">
              <input :id="`vs-${visibility}`" v-model="state.visibility" type="radio" :value="visibility" />
              <label :for="`vs-${visibility}`" class="ml-2 text-lg font-light">{{ visibility }}</label>
            </span>
          </div>
        </div>
        <div class="mt-6 flex items-center justify-center">
          <cw-button btn-type="primary" @click="updateCategory">Ok</cw-button>
          <cw-button btn-type="danger" class="ml-6" @click="state.isSettingsModal = false">Delete</cw-button>
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
        <cw-button btn-type="primary-outlined" class="lg:mr-3" @click="changeModalVisibility('settings')">Settings</cw-button>
        <ph-pencil
          v-if="showEditMode"
          size="30"
          class="cursor-pointer transition duration-300 ease-in-out lg:mx-6"
          :class="state.isDeleteMovieMode ? 'text-secondary' : 'text-primary'"
          @click="changeDeleteMovieMode"
        />
        <cw-settings-dropdown class="lg:ml-3" />
      </div>
    </cw-container-nav-bar>

    <cw-container-content>
      <cw-grid-list :evenly="state.isEvenly" :is-loading="state.isLoading" :centered="currentPaginateMoviesIsEmpty" msg-empty-data="No movies in this category">
        <cw-movie-poster
          v-for="(movie, index) in state.currentPaginateMovies"
          :key="index"
          :show-delete="state.isDeleteMovieMode"
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
const visibilities = ['All', 'Friends only', 'You only']

const state = reactive({
  currentPage: 1,
  currentPaginateMovies: <IMovie.ShortDetails[]>[],
  nextPaginateMovies: <IMovie.ShortDetails[]>[],
  category: <ICategory.Details>{},
  isEvenly: false,
  isLoading: true,
  isDeleteMovieMode: false,
  showModal: false,
  isSettingsModal: false,
  visibility: '',
})

// Computed
const currentPaginateMoviesIsEmpty = computed(() => state.currentPaginateMovies.length === 0)
const nextPaginateMoviesIsEmpty = computed(() => state.nextPaginateMovies.length === 0)
const sharedUrl = computed(() => {
  const APP_PORT = import.meta.env.VITE_APP_PORT
  const basePath = `http://localhost:${APP_PORT}/category/shared`

  if (!state.category.shared_id) return 'No shared url'

  return `${basePath}/${state.category.shared_id}`
})
const sharedEncodedUrl = computed(() => {
  const APP_PORT = import.meta.env.VITE_APP_PORT
  const basePath = `http://localhost:${APP_PORT}/category/shared`
  const encodedSharedId = encodeURIComponent(state.category.shared_id)
  return `${basePath}/${encodedSharedId}`
})
const showEditMode = computed(() => state.category.movies.length !== 0)

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

const changeDeleteMovieMode = () => {
  state.isDeleteMovieMode = !state.isDeleteMovieMode
}

const copyUrl = useThrottleFn(() => {
  navigator.clipboard.writeText(sharedEncodedUrl.value)
  toast.info('Copied in clipboard !')
}, 2000)

const changeModalVisibility = (modalType: string = '', tmdbMovieId: number = 0) => {
  tmdbMovieIdToDelete = tmdbMovieId

  if (!state.showModal) {
    state.showModal = true
    state.isSettingsModal = modalType === 'settings'
    if (state.isSettingsModal) state.isDeleteMovieMode = false
    return
  }

  state.showModal = false
  state.isSettingsModal = false
  state.isDeleteMovieMode = false
}

const getVisibilityId = () => {
  return visibilities.findIndex((visibility) => visibility === state.visibility) + 1
}

const updateCategory = useThrottleFn(async () => {
  const body = <ICategory.Update>{ name: state.category.name, visibility_id: getVisibilityId() }

  const res = await CategoryService.updateCategory(categoryId, body)

  toast.success(res.message)

  state.category.shared_id = res.results.shared_id

  changeModalVisibility()
}, 2000)

const onDeleteBtnModal = useThrottleFn(async () => {
  if (state.isDeleteMovieMode) {
    if (tmdbMovieIdToDelete === 0) return

    const message = await CategoryService.deleteMovieInCategory(categoryId, tmdbMovieIdToDelete)
    state.currentPage = 1
    state.category.movies = state.category.movies.filter((movie) => movie.id !== tmdbMovieIdToDelete)
    state.currentPaginateMovies = paginateArray(state.category.movies, nbOfMoviesDisplayed, state.currentPage)
    state.nextPaginateMovies = paginateArray(state.category.movies, nbOfMoviesDisplayed, state.currentPage + 1)
    state.isEvenly = state.currentPaginateMovies.length <= 4 && state.currentPaginateMovies.length !== 0
    state.showModal = false

    if (state.category.movies.length === 0) state.isDeleteMovieMode = false

    toast.success(message)
    return
  }

  const message = await CategoryService.deleteCategory(categoryId)

  await router.push({ path: '/categories' })

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
