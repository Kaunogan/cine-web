<template>
  <cw-container class="relative">
    <cw-modal :show-modal="state.showModal">
      <div class="cw-g-card cw-category-details-modal-content">
        <h1 class="font-header text-xl text-tertiary">Are you sure ?</h1>
        <div class="mt-6 flex items-center justify-center">
          <cw-button btn-type="primary" @click="changeModalVisibility">Cancel</cw-button>
          <cw-button btn-type="danger" class="ml-6" @click="deleteUser">Delete</cw-button>
        </div>
      </div>
    </cw-modal>

    <cw-container-nav-bar>
      <h2 class="hidden font-header text-2xl font-light text-tertiary lg:block">Friends</h2>
      <ph-list size="28" class="lg:hidden" @click="components.slideSideBar()" />
      <div class="flex h-full w-full items-center justify-end lg:w-1/2 lg:justify-end">
        <ph-pencil size="30" class="mr-6 cursor-pointer transition duration-300 ease-in-out" :class="state.isDeleteMode ? 'text-secondary' : 'text-primary'" @click="changeDeleteMode" />
        <cw-settings-dropdown />
      </div>
    </cw-container-nav-bar>

    <cw-container-content class="flex flex-col items-center justify-evenly md:h-full">
      <cw-grid-list :is-loading="state.isLoading" :evenly="state.isEvenly" :nb-of-rows="3" :centered="currentFriendsIsEmpty" msg-empty-data="No Friends found">
        <div v-for="friend in state.currentFriends" :key="friend.id" class="cw-friends-card z-10">
          <ph-trash v-if="state.isDeleteMode" size="28" class="absolute top-1 left-1 z-0 cursor-pointer text-secondary" @click="changeModalVisibility(friend.id)" />
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
import { useToast } from 'vue-toastification'
import CwModal from '@/components/cwModal.vue'

const components = useComponents()
const { width } = useWindowSize()
const toast = useToast()
const breakpoints = useBreakpoints(breakpointsTailwind)
let userFriendIdToDelete = 0

// State
const state = reactive({
  currentFriends: <IFriendUser[]>[],
  currentPage: 1,
  nextFriends: <IFriendUser[]>[],
  isLoading: true,
  isEvenly: false,
  isDeleteMode: false,
  showModal: false,
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

const changeDeleteMode = () => {
  state.isDeleteMode = !state.isDeleteMode
}

const changeModalVisibility = (friendId: number = -1) => {
  userFriendIdToDelete = friendId
  state.showModal = !state.showModal
}

const deleteUser = async () => {
  const message = await FriendService.removeFriend(userFriendIdToDelete)

  state.currentPage = 1
  state.currentFriends = await FriendService.getFriends(state.currentPage)
  state.nextFriends = await FriendService.getFriends(state.currentPage + 1)
  state.isEvenly = state.currentFriends.length <= 6 && state.currentFriends.length !== 0

  changeModalVisibility()
  toast.success(message)
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
  @apply relative flex h-32 w-48 items-center justify-center rounded-2xl border border-tertiary 2xl:w-48;
}
</style>
