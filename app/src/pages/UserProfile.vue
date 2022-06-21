<template>
  <cw-container v-if="!state.isLoading">
    <cw-container-nav-bar class="relative mt-9 flex-col md:flex-row">
      <cw-button btn-type="primary-outlined" class="z-10 my-3 w-1/3 md:my-0" @click="goBack">
        <ph-arrow-arc-left class="mr-3"></ph-arrow-arc-left>
        <p class="whitespace-nowrap">Back to app</p>
      </cw-button>
      <div class="top-4 z-0 flex w-full flex-col items-center justify-center font-header text-xl md:absolute">
        <ph-user-circle size="48" />
        <h2 class="font-header text-2xl font-light">{{ state.profile.user_pseudo }} {{ state.profile.friend }}</h2>
        <h3 class="font-header text-lg font-light">{{ state.profile.total.categories }} Categories - {{ state.profile.total.movies }} Movies</h3>
        <p v-if="state.profile.friend" class="text-sm text-primary">This is one of your friend !</p>
      </div>
    </cw-container-nav-bar>

    <cw-container-content class="flex items-center md:h-full">
      <cw-grid-list :nb-of-rows="3" :centered="currentPaginateCategoriesIsEmpty" :evenly="state.isEvenly" :is-loading="state.isLoading" msg-empty-data="No categories">
        <div v-for="category in state.currentPaginateCategories" :key="category.id" class="cw-user-profile-categories-card">
          <p class="text-center lg:text-lg">{{ category.name }}</p>
        </div>
      </cw-grid-list>
    </cw-container-content>

    <cw-container-footer>
      <cw-pagination v-if="!currentPaginateCategoriesIsEmpty" :current-page="state.currentPage" :show-last-paginate="!nextPaginateCategoriesIsEmpty" @page-changed="pageChanged" />
    </cw-container-footer>
  </cw-container>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import CwButton from '@/components/cwButton.vue'
import * as UserService from '@/services/User'
import { computed, onMounted, reactive, watch } from 'vue'
import { ICategory, IUser } from '@/types'
import CwGridList from '@/components/cwGridList.vue'
import CwContainer from '@/components/container/cwContainer.vue'
import CwContainerContent from '@/components/container/cwContainerContent.vue'
import CwContainerNavBar from '@/components/container/cwContainerNavBar.vue'
import { breakpointsTailwind, useBreakpoints, useWindowSize } from '@vueuse/core'
import CwContainerFooter from '@/components/container/cwContainerFooter.vue'
import paginateArray from '@/features/paginateArray'
import CwPagination from '@/components/cwPagination.vue'

const router = useRouter()
const route = useRoute()
const { width } = useWindowSize()
const breakpoints = useBreakpoints(breakpointsTailwind)
const userId = Number(route.params.id)
const nbOfCategoriesDisplayed = 12

// State
const state = reactive({
  profile: <IUser.Profile>{},
  currentPaginateCategories: <ICategory.ShortDetails[]>[],
  nextPaginateCategories: <ICategory.ShortDetails[]>[],
  currentPage: 1,
  isLoading: true,
  isEvenly: false,
})

// Computed
const currentPaginateCategoriesIsEmpty = computed(() => state.currentPaginateCategories.length === 0)
const nextPaginateCategoriesIsEmpty = computed(() => state.nextPaginateCategories.length === 0)

// Watch
watch(width, () => {
  if (breakpoints.isSmaller('md')) {
    state.isEvenly = false
    return
  }

  state.isEvenly = state.profile.categories.length <= 4 && state.profile.categories.length !== 0
})

// Functions
const goBack = () => router.push({ path: '/home' })

const pageChanged = async (page: number) => {
  state.currentPage = page
  state.currentPaginateCategories = paginateArray(state.profile.categories, nbOfCategoriesDisplayed, state.currentPage)
  state.nextPaginateCategories = paginateArray(state.profile.categories, nbOfCategoriesDisplayed, state.currentPage + 1)
  state.isEvenly = state.currentPaginateCategories.length <= 4 && state.currentPaginateCategories.length !== 0
}

onMounted(async () => {
  state.profile = await UserService.getUserProfile(userId)

  state.currentPaginateCategories = paginateArray(state.profile.categories, nbOfCategoriesDisplayed, state.currentPage)
  state.nextPaginateCategories = paginateArray(state.profile.categories, nbOfCategoriesDisplayed, state.currentPage + 1)

  state.isEvenly = state.profile.categories.length <= 4 && state.profile.categories.length !== 0
  state.isLoading = false
})
</script>

<style lang="scss" scoped>
.cw-user-profile-categories-card {
  @apply flex h-32 w-36 items-center justify-center rounded-2xl border border-tertiary 2xl:w-48;
}
</style>
