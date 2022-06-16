<template>
  <cw-container>
    <cw-container-nav-bar>
      <h2 class="hidden font-header text-2xl font-light text-tertiary lg:block">Add a category</h2>
      <ph-list size="28" class="lg:hidden" @click="components.slideSideBar()" />
      <cw-settings-dropdown />
    </cw-container-nav-bar>
    <cw-container-content class="flex h-full w-full items-center justify-center">
      <div class="items-centers flex flex-col items-center justify-center md:w-auto">
        <cw-form-input for="add" label="Category name">
          <input id="add" type="text" name="Add" class="cw-g-input w-72" placeholder="My superb category" />
        </cw-form-input>
        <cw-button class="mt-6 w-12">Add</cw-button>
      </div>
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

const components = useComponents()
</script>

<style lang="scss" scoped></style>
