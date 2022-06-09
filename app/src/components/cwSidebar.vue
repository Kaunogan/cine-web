<template>
  <div v-if="showSideBar" class="cw-sidebar">
    <div class="cw-sidebar__header">
      <h1 class="text-4xl font-header">CineWeb</h1>
    </div>

    <div class="cw-sidebar__content">
      <ul class="h-36 flex flex-col justify-between">
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
import { computed } from 'vue'

const routesNotAllowed = ['/', '/signin', '/register', '/notfound']

// State
const route = useRoute()

// Computed
const showSideBar = computed(() => !routesNotAllowed.includes(route.path))

// Functions
const getClass = (path: string) => (route.path === path ? 'text-secondary' : 'transition ease-in-out hover:translate-x-2')
</script>

<style lang="scss" scoped>
.cw-sidebar {
  @apply transition duration-300 fixed -translate-x-full md:translate-x-0 md:static h-full w-72 bg-white;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

  &__header {
    @apply fixed z-10 h-24 w-72 flex justify-center items-center;
  }

  &__content {
    @apply fixed z-0 h-full w-72 flex justify-center items-center;
  }
}
</style>
