<template>
  <div v-if="showSideBar" ref="target" class="cw-sidebar lg:translate-x-0" :class="slideSideBar">
    <div class="cw-sidebar__header">
      <h1 class="font-header text-3xl md:text-4xl">CineWeb</h1>
    </div>

    <div class="cw-sidebar__content">
      <ul class="flex h-36 flex-col justify-between">
        <li class="text-xl" :class="getClass('/home')">
          <router-link to="/home">Home</router-link>
        </li>
        <li class="text-xl" :class="getClass('/categories')">
          <router-link class="transition ease-in hover:text-secondary" to="/categories">Categories</router-link>
        </li>
        <li class="text-xl" :class="getClass('/friends')">
          <router-link class="transition ease-in-out hover:text-secondary" to="/friends">Friends</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import useComponents from '@/stores/componentsStore'
import { onClickOutside, useBreakpoints, useWindowSize, breakpointsTailwind } from '@vueuse/core'

const routesNotAllowed = ['/', '/signin', '/register', '/notfound']
const target = ref(null)
const { width } = useWindowSize()
const breakpoints = useBreakpoints(breakpointsTailwind)

// State
const route = useRoute()
const components = useComponents()

// Computed
const showSideBar = computed(() => !routesNotAllowed.includes(route.path))
const slideSideBar = computed(() => (components.sidebar.isOpen ? 'translate-x-0' : '-translate-x-full'))

// Watch
watch(width, () => {
  if (breakpoints.isGreater('lg') && components.sidebar.isOpen) {
    components.slideSideBar()
  }
})

// Functions
const getClass = (path: string) => (route.path.includes(path) ? 'text-secondary' : 'transition ease-in-out hover:translate-x-2')

onClickOutside(target, () => {
  if (!components.sidebar.isOpen) return
  components.slideSideBar()
})
</script>

<style lang="scss" scoped>
.cw-sidebar {
  @apply fixed z-30 h-full w-1/2 flex-none bg-white transition duration-300 md:w-72 lg:static;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

  &__header {
    @apply absolute z-10 flex h-32 w-full items-center justify-center;
  }

  &__content {
    @apply absolute z-0 flex h-full w-full items-center justify-center;
  }
}
</style>
