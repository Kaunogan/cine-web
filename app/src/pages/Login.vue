<template>
  <div class="cw-login-container">
    <div class="cw-container cw-login-shadow p-4 md:p-8 lg:w-1/2">
      <h1 class="font-header text-4xl md:text-5xl">CineWeb</h1>
      <div class="cw-container">
        <div class="cw-card w-full max-w-md">
          <h1 class="text-2xl text-center font-light">Login</h1>
          <div class="my-6">
            <cw-form id="em" label="Email">
              <input id="em" v-model="state.email" class="w-full font-light focus:outline-none" type="email" name="email" placeholder="Please enter your email" />
              <ph-envelope size="24" />
            </cw-form>

            <cw-form id="pwd" label="Password" class="mt-6">
              <input id="pwd" v-model="state.password" class="w-full font-light focus:outline-none" type="password" name="password" placeholder="Please enter your password" />
              <ph-password size="24" />
            </cw-form>
          </div>
          <cw-button btn-type="primary" class="transition mx-auto hover:opacity-80" @click="login">Ok</cw-button>
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
import CwForm from '@/components/cwForm.vue'
import CwButton from '@/components/cwButton.vue'
import * as AuthService from '@/services/AuthService'

const state = reactive({
  email: '',
  password: '',
})

const login = () => {
  AuthService.login({
    email: state.email,
    password: state.password,
  })
}
</script>

<style lang="scss" scoped>
.cw-login-container {
  @apply w-full h-full bg-cover;
  background-image: url('../assets/images/wallpaper-poster.jpeg');
}

.cw-login-shadow {
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
}
</style>
