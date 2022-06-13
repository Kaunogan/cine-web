<template>
  <div class="cw-g-auth-container">
    <div class="cw-signin-container cw-g-auth-shadow">
      <h1 class="font-header text-4xl md:text-5xl">CineWeb</h1>
      <div class="cw-signin-form-container">
        <div class="cw-g-card w-full max-w-md">
          <h1 class="text-center font-header text-2xl font-light">Sign in</h1>
          <cw-form :is-loading="state.isLoading" @submit.prevent="signin">
            <cw-form-input label="Email" for="em">
              <input id="em" v-model="state.email" class="cw-g-input" type="email" name="email" placeholder="Please enter your email" />
              <ph-envelope size="24" class="ml-2" />
            </cw-form-input>

            <cw-form-input label="Password" for="pwd">
              <input id="pwd" v-model="state.password" class="cw-g-input" type="password" name="password" placeholder="Please enter your password" />
              <ph-password size="24" class="ml-2" />
            </cw-form-input>
          </cw-form>
        </div>
        <h3 class="mt-4 text-center font-light">No account ? <router-link to="/register" class="text-primary">Register</router-link></h3>
      </div>
      <p class="text-center text-sm font-light md:text-base">
        Made by Melanie, Kaunogan & Elric <br />
        <a href="https://github.com/Kaunogan/cine-web" target="_blank"><ph-github-logo class="mx-auto" size="16" /> </a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import CwForm from '@/components/cwForm.vue'
import CwFormInput from '@/components/cwFormInput.vue'

import * as AuthService from '@/services/Auth'
import { useRouter } from 'vue-router'

// State
const router = useRouter()
const state = reactive({
  email: '',
  password: '',
  isLoading: false,
})

// Function
const signin = useThrottleFn(async () => {
  if (!state.email || !state.password || state.isLoading) return

  state.isLoading = true

  try {
    await AuthService.login({
      email: state.email,
      password: state.password,
    })

    await router.push({ path: '/home' })
  } finally {
    state.isLoading = false
  }
}, 2000)
</script>

<style lang="scss" scoped>
.cw-signin-container {
  @apply flex h-full w-full flex-col items-center justify-center bg-white p-4 md:p-8 lg:w-1/2;
}

.cw-signin-form-container {
  @apply flex h-full w-full flex-col items-center justify-center bg-white;
}
</style>
