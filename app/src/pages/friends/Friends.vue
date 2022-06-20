<template>
  <cw-container>
    <cw-container-nav-bar>
      <h2 class="hidden font-header text-2xl font-light text-tertiary lg:block">Friends</h2>
      <ph-list size="28" class="lg:hidden" @click="components.slideSideBar()" />
      <cw-settings-dropdown />
    </cw-container-nav-bar>

    <cw-container-content class="flex flex-col items-center justify-evenly md:h-full">
      <cw-grid-list :is-loading="state.isLoading" :evenly="state.isEvenly" :nb-of-rows="3" :centered="currentFriendsIsEmpty" msg-empty-data="No Friends found">
        <div v-for="friend in state.currentFriends" :key="friend.id" class="cw-friends-card">
          <p class="text-center lg:text-lg">{{ friend.pseudo }}</p>
        </div>
      </cw-grid-list>

      <cw-button btn-type="primary-outlined" class="mt-9 mb-6 md:mt-0 md:mb-0" @click="goToAddFriend">Add a friend</cw-button>
    </cw-container-content>

    <cw-container-footer>
      <cw-pagination v-if="!currentFriendsIsEmpty" :show-last-paginate="!nextFriendsIsEmpty" :current-page="state.currentPage" @page-changed="pageChanged" />
    </cw-container-footer>
  </cw-container>
</template>

<script setup lang="ts">
import CwContainer from '@/components/container/cwContainer.vue'
import CwContainerNavBar from '@/components/container/cwContainerNavBar.vue'
import CwSettingsDropdown from '@/components/cwSettingsDropdown.vue'
import useComponents from '@/stores/componentsStore'
import { computed, onMounted, reactive, watch } from 'vue'
import * as FriendService from '@/services/Friend'
import CwContainerContent from '@/components/container/cwContainerContent.vue'
import CwGridList from '@/components/cwGridList.vue'
import { IFriendUser } from '@/types'
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
  currentFriends: <IFriendUser[]>[],
  currentPage: 1,
  nextFriends: <IFriendUser[]>[],
  isLoading: true,
  isEvenly: false,
})

const router = useRouter()

// Computed
const currentFriendsIsEmpty = computed(() => state.currentFriends.length === 0)
const nextFriendsIsEmpty = computed(() => state.nextFriends.length === 0)

// Watch
watch(width, () => {
  if (breakpoints.isSmaller('md')) {
    state.isEvenly = false
    return
  }

  state.isEvenly = state.currentFriends.length <= 6 && state.currentFriends.length !== 0
})

// Function
const pageChanged = async (newPage: number) => {
  state.isLoading = true

  state.currentPage = newPage

  state.currentFriends = await FriendService.getFriends(state.currentPage)
  state.nextFriends = await FriendService.getFriends(state.currentPage + 1)
  state.isEvenly = state.currentFriends.length <= 6 && state.currentFriends.length !== 0
  state.isLoading = false
}

const goToAddFriend = async () => {
  await router.push({ path: '/friends/add' })
}

onMounted(async () => {
  state.currentFriends = await FriendService.getFriends(state.currentPage)
  state.nextFriends = await FriendService.getFriends(state.currentPage + 1)
  state.isEvenly = state.currentFriends.length <= 6 && state.currentFriends.length !== 0
  state.isLoading = false
})
</script>

<style lang="scss" scoped>
.cw-friends-card {
  @apply flex h-32 w-36 items-center justify-center rounded-2xl border border-tertiary 2xl:w-48;
}
</style>
