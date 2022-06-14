<template>
  <div class="cw-movie-poster" @click="goToDetails">
    <span>
      <img :src="getPosterUrl()" alt=" movie-poster" />
    </span>
    <p class="mt-2 flex h-full w-full items-center justify-center text-center text-sm font-light lg:text-base">{{ props.title }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// Props
const props = defineProps({
  tmdbMovieId: { type: Number, required: true },
  posterUrl: { type: String, required: true },
  title: { type: String, required: true },
})

// Function
const getPosterUrl = () => {
  return props.posterUrl.includes('null') ? 'https://pbs.twimg.com/profile_images/527991807402328064/LmS_7fXc_400x400.jpeg' : props.posterUrl
}

const goToDetails = () => {
  router.push({ path: `/movie/${props.tmdbMovieId}` })
}
</script>

<style lang="scss" scoped>
.cw-movie-poster {
  @apply flex w-36 flex-col items-center grid-lg:w-48;

  & img {
    @apply h-52 rounded-xl transition duration-300 ease-in-out hover:-translate-y-1 grid-lg:h-72;
  }

  & img:hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
}
</style>
