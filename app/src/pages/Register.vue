<template>
  <div class="cw-g-auth-container justify-end">
    <div class="cw-register-container cw-g-auth-shadow">
      <h1 class="font-header text-4xl md:text-5xl">CineWeb</h1>
      <div class="cw-register-form-container">
        <div class="cw-g-card w-full max-w-md">
          <h1 class="text-center font-header text-2xl font-light">Register</h1>
          <cw-form :is-loading="state.isLoading" @submit.prevent="register">
            <cw-form-input label="Email" for="em">
              <input id="em" v-model="state.email" class="cw-g-input" type="email" name="email" placeholder="Please enter your email" />
              <ph-envelope size="24" class="ml-2" />
            </cw-form-input>

            <cw-form-input label="Pseudo" for="psd">
              <input id="psd" v-model="state.pseudo" class="cw-g-input" type="text" name="pseudo" placeholder="Please enter your pseudo" />
              <ph-user size="24" class="ml-2" />
            </cw-form-input>

            <cw-form-input label="Password" for="pwd">
              <input id="pwd" v-model="state.password" class="cw-g-input" type="password" name="password" placeholder="Please enter your password" />
              <ph-password size="24" class="ml-2" />
            </cw-form-input>
          </cw-form>
        </div>
        <h3 class="mt-4 text-center font-light">Already have an account ? <router-link to="/signin" class="text-primary">Signin</router-link></h3>
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
  pseudo: '',
  password: '',
  isLoading: false,
})

// Function
const register = useThrottleFn(async () => {
  if (!state.email || !state.pseudo || !state.password || state.isLoading) return

  state.isLoading = true

  try {
    await AuthService.register({
      email: state.email,
      pseudo: state.pseudo,
      password: state.password,
    })

    await router.push({ name: 'Home' })
  } finally {
    state.isLoading = false
  }
}, 2000)
</script>

<style lang="scss" scoped>
.cw-register-container {
  @apply flex h-full w-full flex-col items-center justify-center bg-white p-4 md:p-8 lg:w-1/2;
}

.cw-register-form-container {
  @apply flex h-full w-full flex-col items-center justify-center bg-white;
}
</style>
