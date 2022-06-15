<template>
  <cw-container>
    <cw-container-nav-bar>
      <h2 class="hidden font-header text-2xl font-light text-tertiary lg:block">Your categories</h2>
      <ph-list size="28" class="lg:hidden" @click="components.slideSideBar()" />
      <cw-settings-dropdown />
    </cw-container-nav-bar>
  </cw-container>
</template>

<script setup lang="ts">
import CwContainer from '@/components/container/cwContainer.vue'
import CwContainerNavBar from '@/components/container/cwContainerNavBar.vue'
import CwSettingsDropdown from '@/components/cwSettingsDropdown.vue'
import useComponents from '@/stores/componentsStore'
import { onMounted } from 'vue'
import * as CategoryService from '@/services/Category'

const components = useComponents()

onMounted(async () => {
  const categories = await CategoryService.getCategories(1, 5)
  console.log(categories)
})
</script>

<style lang="scss" scoped></style>
