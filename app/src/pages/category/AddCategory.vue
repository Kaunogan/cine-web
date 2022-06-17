<template>
  <cw-container>
    <cw-container-nav-bar>
      <h2 class="hidden font-header text-2xl font-light text-tertiary lg:block">Add a category</h2>
      <ph-list size="28" class="lg:hidden" @click="components.slideSideBar()" />
      <cw-settings-dropdown />
    </cw-container-nav-bar>
    <cw-container-content class="flex h-full flex-col items-center justify-center">
      <cw-form-input for="add" label="Category name">
        <input id="add" v-model="category" type="text" name="Add" class="cw-g-input w-72" placeholder="My superb category" />
      </cw-form-input>
      <cw-button class="mt-6 w-12" @click="addCategory">Add</cw-button>
    </cw-container-content>
  </cw-container>
</template>

<script setup lang="ts">
import CwContainer from '@/components/container/cwContainer.vue'
import CwContainerNavBar from '@/components/container/cwContainerNavBar.vue'
import CwSettingsDropdown from '@/components/cwSettingsDropdown.vue'
import useComponents from '@/stores/componentsStore'
import CwContainerContent from '@/components/container/cwContainerContent.vue'
import CwFormInput from '@/components/cwFormInput.vue'
import CwButton from '@/components/cwButton.vue'
import { ref } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import * as CategoryService from '@/services/Category'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const components = useComponents()
const router = useRouter()
const toast = useToast()
const category = ref('')

// Function
const addCategory = useThrottleFn(async () => {
  if (!category.value) {
    toast.info('Please enter a category name')
    return
  }

  await CategoryService.addCategory({ name: category.value })

  await router.push({ path: '/categories' })

  toast.success(`Category ${category.value} created successfully`)
}, 2000)
</script>

<style lang="scss" scoped></style>
