<template>
  <cw-container>
    <cw-container-nav-bar>
      <h2 class="hidden font-header text-2xl font-light text-tertiary lg:block">Your categories</h2>
      <ph-list size="28" class="lg:hidden" @click="components.slideSideBar()" />
      <cw-settings-dropdown />
    </cw-container-nav-bar>

    <cw-container-content class="flex flex-col items-center justify-evenly md:h-full">
      <cw-grid-list :nb-of-rows="3" :centered="currentCategoriesIsEmpty" msg-empty-data="No categories found">
        <div v-for="(category, index) in state.currentCategories" :key="category.id" class="cw-categories-card" :class="getTextColor(index)">
          <p class="text-center lg:text-lg">{{ category.name }}</p>
        </div>
      </cw-grid-list>

      <cw-button btn-type="primary-outlined" class="mt-9 mb-6 md:mt-0 md:mb-0">Add a category</cw-button>
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
import { computed, onMounted, reactive } from 'vue'
import * as CategoryService from '@/services/Category'
import CwContainerContent from '@/components/container/cwContainerContent.vue'
import CwGridList from '@/components/cwGridList.vue'
import { ICategory } from '@/types'
import CwContainerFooter from '@/components/container/cwContainerFooter.vue'
import CwButton from '@/components/cwButton.vue'
import CwPagination from '@/components/cwPagination.vue'

const components = useComponents()

// State
const state = reactive({
  currentCategories: <ICategory[]>[],
  currentPage: 1,
  nextCategories: <ICategory[]>[],
})

// Computed
const currentCategoriesIsEmpty = computed(() => state.currentCategories.length === 0)
const nextCategoriesIsEmpty = computed(() => state.nextCategories.length === 0)

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
}

onMounted(async () => {
  state.currentCategories = await CategoryService.getCategories(state.currentPage)
  state.nextCategories = await CategoryService.getCategories(state.currentPage + 1)
})
</script>

<style lang="scss" scoped>
.cw-categories-card {
  @apply flex h-32 w-36 items-center justify-center rounded-2xl border border-tertiary 2xl:w-48;
}
</style>
