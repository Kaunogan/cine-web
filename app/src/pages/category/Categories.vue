<template>
  <cw-container>
    <cw-container-nav-bar>
      <h2 class="hidden font-header text-2xl font-light text-tertiary lg:block">Your categories</h2>
      <ph-list size="28" class="lg:hidden" @click="components.slideSideBar()" />
      <cw-settings-dropdown />
    </cw-container-nav-bar>

    <cw-container-content>
      <cw-grid-list :nb-of-rows="3" :centered="categoriesIsEmpty" msg-empty-data="No categories found">
        <div v-for="(category, index) in categories" :key="category.id" class="cw-categories-card" :class="getTextColor(index)">
          <p class="lg:text-lg">{{ category.name }}</p>
        </div>
      </cw-grid-list>
    </cw-container-content>

    <cw-container-footer> </cw-container-footer>
  </cw-container>
</template>

<script setup lang="ts">
import CwContainer from '@/components/container/cwContainer.vue'
import CwContainerNavBar from '@/components/container/cwContainerNavBar.vue'
import CwSettingsDropdown from '@/components/cwSettingsDropdown.vue'
import useComponents from '@/stores/componentsStore'
import { computed, onMounted, ref } from 'vue'
import * as CategoryService from '@/services/Category'
import CwContainerContent from '@/components/container/cwContainerContent.vue'
import CwGridList from '@/components/cwGridList.vue'
import { ICategory } from '@/types'
import CwContainerFooter from '@/components/container/cwContainerFooter.vue'

const components = useComponents()
const categories = ref(<ICategory[]>[])

// Computed
const categoriesIsEmpty = computed(() => categories.value.length === 0)

// Function
const getTextColor = (number: number) => {
  if (number === 0 || number === 1 || number === 2) return 'text-primary'
  if (number === 6 || number === 7 || number === 8) return 'text-primary'

  return ''
}

onMounted(async () => {
  categories.value = await CategoryService.getCategories(1)
})
</script>

<style lang="scss" scoped>
.cw-categories-card {
  @apply flex h-32 w-36 items-center justify-center rounded-2xl border-2 border-tertiary 2xl:w-48;
}
</style>
