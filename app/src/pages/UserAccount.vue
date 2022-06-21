<template>
  <cw-container>
    <cw-container-nav-bar :centered="true">
      <ph-list size="28" class="mr-7 lg:hidden" @click="components.slideSideBar()" />
      <h2 class="font-header text-2xl">Account</h2>
    </cw-container-nav-bar>

    <cw-container-content class="flex h-full items-center justify-center">
      <div class="cw-user-account-form">
        <cw-form-input label="Email" for="em">
          <input id="em" v-model="state.email" class="cw-g-input" type="email" name="email" placeholder="Please enter your email" @keyup.enter="updateUserAccount" />
          <ph-envelope size="24" class="ml-2" />
        </cw-form-input>

        <cw-form-input label="Pseudo" for="pseudo">
          <input id="pseudo" v-model="state.pseudo" class="cw-g-input" type="text" name="pseudo" placeholder="Please enter your pseudo" @keyup.enter="updateUserAccount" />
          <ph-user size="24" class="ml-2" />
        </cw-form-input>

        <cw-form-input label="Password" for="pwd">
          <input id="pwd" v-model="state.password" class="cw-g-input" type="password" name="password" placeholder="Please enter your password" @keyup.enter="updateUserAccount" />
          <ph-password size="24" class="ml-2" />
        </cw-form-input>

        <div class="cw-user-account-container-btn">
          <cw-button btn-type="primary" class="transition lg:hover:opacity-80" @click="updateUserAccount">
            <span class="md:text-lg">Update</span>
          </cw-button>
          <cw-button btn-type="danger" class="ml-6 transition lg:hover:opacity-80">
            <span class="md:text-lg">Delete</span>
          </cw-button>
        </div>
      </div>
    </cw-container-content>
  </cw-container>
</template>

<script setup lang="ts">
import CwContainer from '@/components/container/cwContainer.vue'
import CwContainerNavBar from '@/components/container/cwContainerNavBar.vue'
import useComponents from '@/stores/componentsStore'
import CwContainerContent from '@/components/container/cwContainerContent.vue'
import CwFormInput from '@/components/cwFormInput.vue'
import CwButton from '@/components/cwButton.vue'
import { onMounted, reactive } from 'vue'
import * as UserService from '@/services/User'
import { IUser } from '@/types'
import { useToast } from 'vue-toastification'
import useUser from '@/stores/userStore'
import { useThrottleFn } from '@vueuse/core'

// State
const components = useComponents()
const user = useUser()
const toast = useToast()
const defaultAccount = <IUser.RequestBody>{}
const state = reactive({
  email: '',
  pseudo: '',
  password: '',
})

// Function
const updateUserAccount = useThrottleFn(async () => {
  let body = null

  if (state.email !== defaultAccount.email) body = { email: state.email }
  if (state.pseudo !== defaultAccount.pseudo) body = { ...body, pseudo: state.pseudo }
  if (state.password !== '') body = { ...body, password: state.password }

  if (body === null) return

  const message = await UserService.updateUserAccount(body)

  defaultAccount.email = state.email
  defaultAccount.pseudo = state.pseudo

  user.pseudo = state.pseudo

  toast.success(message)
}, 2000)

onMounted(async () => {
  const { email, pseudo } = await UserService.getUserInfo()

  defaultAccount.email = email
  defaultAccount.pseudo = pseudo

  state.email = email
  state.pseudo = pseudo
})
</script>

<style lang="scss" scoped>
.cw-user-account-form {
  @apply flex h-full w-full max-w-lg flex-col justify-center;
}

.cw-user-account-container-btn {
  @apply mt-6 flex w-full items-center justify-center;
}
</style>
