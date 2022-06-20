<template>
  <cw-container>
    <cw-container-nav-bar>
      <h2 class="hidden font-header text-2xl font-light text-tertiary lg:block">Add a friend</h2>
      <ph-list size="28" class="lg:hidden" @click="components.slideSideBar()" />
      <cw-settings-dropdown />
    </cw-container-nav-bar>
    <cw-container-content class="flex h-full flex-col items-center justify-center">
      <cw-form-input for="add" label="Friend email">
        <input id="add" v-model="friend" type="email" name="Add" class="cw-g-input w-72" placeholder="john.doe@cineweb.fr" @keyup.enter="addFriend" />
      </cw-form-input>
      <cw-button class="mt-6 w-12" @click="addFriend">Add</cw-button>
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
import * as FriendService from '@/services/Friend'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const components = useComponents()
const router = useRouter()
const toast = useToast()
const friend = ref('')

// Function
const addFriend = useThrottleFn(async () => {
  if (!friend.value) {
    toast.info('Please enter a friend email')
    return
  }

  const message = await FriendService.addFriend({ friend_email: friend.value })

  await router.push({ path: '/friends' })

  toast.success(message)
}, 2000)
</script>

<style lang="scss" scoped></style>
