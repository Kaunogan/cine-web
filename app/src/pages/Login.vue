<template>
  <div class="cw-login-container">
    <div class="cw-container cw-login-shadow p-4 md:p-8 lg:w-1/2">
      <h1 class="font-header text-4xl md:text-5xl">CineWeb</h1>
      <div class="cw-container">
        <div class="cw-card w-full max-w-md">
          <h1 class="text-2xl text-center font-light">Login</h1>
          <div class="my-6">
            <cw-input id="email" label="Email" placeholder="Please enter your email" input-type="text">
              <ph-envelope size="24" />
            </cw-input>
            <cw-input id="password" class="mt-6" label="Password" placeholder="Please enter your password" input-type="password">
              <ph-password size="24" />
            </cw-input>
          </div>
          <cw-button btn-type="primary" class="transition mx-auto hover:opacity-80">Ok</cw-button>
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
import CwInput from '@/components/cwInput.vue'
import CwButton from '@/components/cwButton.vue'
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
