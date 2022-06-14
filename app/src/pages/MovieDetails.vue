<template>
  <div class="cw-movie-details-container">
    <div class="cw-movie-details-container__header">
      <img :src="movie.backdrop_url" alt="backdrop-movie" class="backdrop" />
      <div class="absolute top-0 left-0 flex h-full w-full items-center justify-center">
        <h1 class="font-header text-2xl text-white">{{ movie.title }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import * as MovieService from '@/services/Movies'

const route = useRoute()
// const tmdbMovieId = Number(route.params.id)
const movie = {
  tmdb_movie_id: 338953,
  title: 'Fantastic Beasts: The Secrets of Dumbledore',
  overview:
    "Professor Albus Dumbledore knows the powerful, dark wizard Gellert Grindelwald is moving to seize control of the wizarding world. Unable to stop him alone, he entrusts magizoologist Newt Scamander to lead an intrepid team of wizards and witches. They soon encounter an array of old and new beasts as they clash with Grindelwald's growing legion of followers.",
  poster_url: 'https://themoviedb.org/t/p/original/jrgifaYeUtTnaH7NF5Drkgjg2MB.jpg',
  backdrop_url: 'https://themoviedb.org/t/p/original/zGLHX92Gk96O1DJvLil7ObJTbaL.jpg',
  trailer_url: 'https://youtube.com/embed/Fo6TfHkLW6Y',
}

onMounted(async () => {
  // movie = await MovieService.getMoviesDetails(tmdbMovieId)
})
</script>

<style lang="scss" scoped>
.cw-movie-details-container {
  @apply h-full flex-1 bg-white;

  &__header {
    @apply relative  h-1/3 w-full;
    background-color: black;
  }
}

.backdrop {
  @apply h-full w-full object-cover opacity-70;
}
</style>
