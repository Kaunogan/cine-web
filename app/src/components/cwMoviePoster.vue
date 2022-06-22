<template>
  <div class="cw-movie-poster">
    <span class="relative">
      <img :src="getPosterUrl()" alt="movie-poster" class="relative z-10" :class="translate" @click="goToDetails" />
      <ph-trash size="28" class="absolute top-1/2 -left-2 z-0 cursor-pointer text-secondary transition duration-300" :class="props.showDelete ? 'opacity-100' : 'opacity-0'" @click="emit('delete')" />
    </span>
    <p class="mt-2 flex h-full w-full items-center justify-center text-center text-sm font-light lg:text-base">{{ props.title }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()

// Props
const props = defineProps({
  tmdbMovieId: { type: Number, required: true },
  posterUrl: { type: String, required: true },
  title: { type: String, required: true },
  showDelete: { type: Boolean, required: false, default: false },
})

// Emit
const emit = defineEmits(['delete'])

// Computed
const translate = computed(() => (props.showDelete ? 'translate-x-6' : ''))

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
  @apply flex w-36 flex-col items-center 2xl:w-48;

  & img {
    @apply h-52 rounded-xl transition duration-300 ease-in-out hover:-translate-y-1 2xl:h-72;
  }

  & img:hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
}
</style>
