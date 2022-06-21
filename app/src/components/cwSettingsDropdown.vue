<template>
  <div ref="target" class="relative">
    <div class="cw-settings-dropdown-avatar" :class="getAnimationsClasses" @click="changeVisibility">
      <ph-gear size="30" class="mx-auto text-white" />
    </div>
    <div v-if="isVisible" class="cw-settings-dropdown">
      <div class="cw-settings-dropdown__container">
        <div class="cw-settings-dropdown__item">
          <ph-user-circle size="26" class="ml-3 mr-2" />
          <router-link class="font-light" to="/user/profile">Profile</router-link>
        </div>
        <div class="cw-settings-dropdown__item">
          <ph-wrench size="26" class="ml-3 mr-2" />
          <router-link class="font-light" to="/user/account">Account</router-link>
        </div>
        <div class="cw-settings-dropdown__item" @click="logout">
          <ph-sign-out size="26" class="ml-3 mr-2" />
          <p class="font-light text-primary">Logout</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import * as AuthService from '@/services/Auth'

const isVisible = ref(false)
const target = ref(null)

// Computed
const getAnimationsClasses = computed(() => `${isVisible.value ? 'lg:hover:opacity-100 rotate-45' : 'lg:hover:opacity-80 rotate-0'}`)

// Function
const changeVisibility = () => {
  isVisible.value = !isVisible.value
}

const logout = () => AuthService.logout()

onClickOutside(target, () => {
  if (!isVisible.value) return
  isVisible.value = false
})
</script>

<style lang="scss" scoped>
.cw-settings-dropdown-avatar {
  @apply rounded-3xl bg-primary p-1.5 transition duration-300;
}

.cw-settings-dropdown {
  @apply absolute right-0 top-10  z-20 mt-1.5 h-40 w-48 rounded-xl bg-white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  &__container {
    @apply flex h-full flex-col justify-around;
  }

  &__item {
    @apply relative inline-flex cursor-pointer items-center;
  }

  &__item:last-child::before {
    content: '';
    @apply absolute -top-2.5 w-full border-t border-t-tertiary border-opacity-50;
  }
}
</style>
