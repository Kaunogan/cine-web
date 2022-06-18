<template>
  <cw-container>
    <cw-container-nav-bar>
      <h2 class="hidden font-header text-2xl font-light text-tertiary lg:block">Your categories</h2>
      <ph-list size="28" class="lg:hidden" @click="components.slideSideBar()" />
      <cw-settings-dropdown />
    </cw-container-nav-bar>

    <cw-container-content class="flex flex-col items-center justify-evenly md:h-full">
      <cw-grid-list :evenly="state.isEvenly" :nb-of-rows="3" :centered="currentCategoriesIsEmpty" msg-empty-data="No categories found">
        <div v-for="(category, index) in state.currentCategories" :key="category.id" class="cw-categories-card" :class="getTextColor(index)" @click="goToCategory(category.id)">
          <p class="text-center lg:text-lg">{{ category.name }}</p>
        </div>
      </cw-grid-list>

      <cw-button btn-type="primary-outlined" class="mt-9 mb-6 md:mt-0 md:mb-0" @click="goToAddCategory">Add a category</cw-button>
    </cw-container-content>

    <cw-container-footer>
      <cw-pagination v-if="!currentCategoriesIsEmpty" :show-last-paginate="!nextCategoriesIsEmpty" :current-page="state.currentPage" @page-changed="pageChanged" />
    </cw-container-footer>
  </cw-container>
</template>

<script setup lang="ts">
import CwContainer from '@/components/container/cwContainer.vue'
import CwContainerNavBar from '@/components/container/cwContainerNavBar.vue'
import CwSettingsDropdown from '@/components/cwSettingsDropdown.vue'
import useComponents from '@/stores/componentsStore'
import { computed, onMounted, reactive, watch } from 'vue'
import * as CategoryService from '@/services/Category'
import CwContainerContent from '@/components/container/cwContainerContent.vue'
import CwGridList from '@/components/cwGridList.vue'
import { ICategory } from '@/types'
import CwContainerFooter from '@/components/container/cwContainerFooter.vue'
import CwButton from '@/components/cwButton.vue'
import CwPagination from '@/components/cwPagination.vue'
import { useRouter } from 'vue-router'
import { breakpointsTailwind, useBreakpoints, useWindowSize } from '@vueuse/core'

const components = useComponents()
const { width } = useWindowSize()
const breakpoints = useBreakpoints(breakpointsTailwind)

// State
const state = reactive({
  currentCategories: <ICategory[]>[],
  currentPage: 1,
  nextCategories: <ICategory[]>[],
  isEvenly: false,
})

const router = useRouter()

// Computed
const currentCategoriesIsEmpty = computed(() => state.currentCategories.length === 0)
const nextCategoriesIsEmpty = computed(() => state.nextCategories.length === 0)

// Watch
watch(width, () => {
  if (breakpoints.isSmaller('md')) {
    state.isEvenly = false
    return
  }

  state.isEvenly = state.currentCategories.length <= 6
})

// Function
const getTextColor = (number: number) => {
  if (number === 0 || number === 1 || number === 2) return 'text-primary'
  if (number === 6 || number === 7 || number === 8) return 'text-primary'

  return ''
}

const pageChanged = async (newPage: number) => {
  state.currentPage = newPage

  state.currentCategories = await CategoryService.getCategories(state.currentPage)
  state.nextCategories = await CategoryService.getCategories(state.currentPage + 1)
  state.isEvenly = state.currentCategories.length <= 6
}

const goToAddCategory = async () => {
  await router.push({ path: '/categories/add' })
}

const goToCategory = (id: number) => {
  router.push({ path: `/categories/${id}` })
}

onMounted(async () => {
  state.currentCategories = await CategoryService.getCategories(state.currentPage)
  state.nextCategories = await CategoryService.getCategories(state.currentPage + 1)
  state.isEvenly = state.currentCategories.length <= 6
})
</script>

<style lang="scss" scoped>
.cw-categories-card {
  @apply flex h-32 w-36 cursor-pointer items-center justify-center rounded-2xl border border-tertiary transition ease-in hover:-translate-y-1 2xl:w-48;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
}
</style>
