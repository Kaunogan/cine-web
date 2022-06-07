<template>
  <div class="cw-signin-container">
    <div class="cw-container cw-signin-shadow p-4 md:p-8 lg:w-1/2">
      <h1 class="font-header text-4xl md:text-5xl">CineWeb</h1>
      <div class="cw-container">
        <div class="cw-card w-full max-w-md">
          <h1 class="text-2xl text-center font-light">Sign in</h1>
          <cw-form @submit.prevent="signin">
            <cw-form-input label="Email" for="em">
              <input id="em" v-model="state.email" class="cw-input" type="email" name="email" placeholder="Please enter your email" />
              <ph-envelope size="24" class="ml-2" />
            </cw-form-input>

            <cw-form-input label="Password" for="pwd">
              <input id="pwd" v-model="state.password" class="cw-input" type="password" name="password" placeholder="Please enter your password" />
              <ph-password size="24" class="ml-2" />
            </cw-form-input>
          </cw-form>
        </div>
        <h3 class="mt-4 font-light text-center">No account ? <router-link to="/register" class="text-primary">Register</router-link></h3>
      </div>
      <p class="text-center text-sm font-light font-light md:text-md">
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

import * as AuthService from '@/services/AuthService'

const state = reactive({
  email: '',
  password: '',
})

const signin = useThrottleFn(() => {
  if (!state.email || !state.password) return

  AuthService.login({
    email: state.email,
    password: state.password,
  })
}, 1000)
</script>

<style lang="scss" scoped>
.cw-signin-container {
  @apply w-full h-full bg-cover;
  background-image: url('../assets/images/wallpaper-poster.jpeg');
}

.cw-signin-shadow {
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
}
</style>
