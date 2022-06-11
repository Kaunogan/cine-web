<template>
  <div class="cw-home-container">
    <div class="cw-home-navbar">
      <h1 class="hidden text-2xl font-light lg:block">Hello {{ user.pseudo }} 🍿</h1>
      <ph-list size="28" class="lg:hidden" @click="components.slideSideBar()" />
      <cw-search-bar placeholder="Search for a movie" :callback="sendQuery" />
      <cw-settings-dropdown />
    </div>
    <div>
      {{ movies }}
    </div>
  </div>
</template>

<script setup lang="ts">
import CwSearchBar from '@/components/cwSearchBar.vue'
import CwSettingsDropdown from '@/components/cwSettingsDropdown.vue'
import useUser from '@/stores/userStore'
import { useThrottleFn } from '@vueuse/core'
import useComponents from '@/stores/componentsStore'
import { onMounted, ref } from 'vue'
import * as MovieService from '@/services/Movies'

// State
const user = useUser()
const components = useComponents()

const movies: any = ref([
  { tmdbMovieId: 338953, title: 'Fantastic Beasts: The Secrets of Dumbledore', posterUrl: 'https://themoviedb.org/t/p/original/jrgifaYeUtTnaH7NF5Drkgjg2MB.jpg' },
  { tmdbMovieId: 526896, title: 'Morbius', posterUrl: 'https://themoviedb.org/t/p/original/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg' },
  { tmdbMovieId: 752623, title: 'The Lost City', posterUrl: 'https://themoviedb.org/t/p/original/neMZH82Stu91d3iqvLdNQfqPPyl.jpg' },
  { tmdbMovieId: 675353, title: 'Sonic the Hedgehog 2', posterUrl: 'https://themoviedb.org/t/p/original/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg' },
  { tmdbMovieId: 639933, title: 'The Northman', posterUrl: 'https://themoviedb.org/t/p/original/zhLKlUaF1SEpO58ppHIAyENkwgw.jpg' },
  { tmdbMovieId: 818397, title: 'Memory', posterUrl: 'https://themoviedb.org/t/p/original/QaNLpq3Wuu2yp5ESsXYcQCOpUk.jpg' },
  { tmdbMovieId: 507086, title: 'Jurassic World Dominion', posterUrl: 'https://themoviedb.org/t/p/original/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg' },
  { tmdbMovieId: 453395, title: 'Doctor Strange in the Multiverse of Madness', posterUrl: 'https://themoviedb.org/t/p/original/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg' },
  { tmdbMovieId: 634649, title: 'Spider-Man: No Way Home', posterUrl: 'https://themoviedb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg' },
  { tmdbMovieId: 689700, title: 'Clean', posterUrl: 'https://themoviedb.org/t/p/original/kRpKJstAW7DsoPAEBW2Kk1uD9Q6.jpg' },
  { tmdbMovieId: 335787, title: 'Uncharted', posterUrl: 'https://themoviedb.org/t/p/original/tlZpSxYuBRoVJBOpUrPdQe9FmFq.jpg' },
  { tmdbMovieId: 414906, title: 'The Batman', posterUrl: 'https://themoviedb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg' },
  { tmdbMovieId: 508947, title: 'Turning Red', posterUrl: 'https://themoviedb.org/t/p/original/qsdjk9oAKSQMWs0Vt5Pyfh6O4GZ.jpg' },
  { tmdbMovieId: 756681, title: 'Veneciafrenia', posterUrl: 'https://themoviedb.org/t/p/original/luMC56bwZqaECYRz6X7sXjqN6nd.jpg' },
  { tmdbMovieId: 864116, title: 'A Day to Die', posterUrl: 'https://themoviedb.org/t/p/original/8Kce1utfytAG5m1PbtVoDzmDZJH.jpg' },
  { tmdbMovieId: 628900, title: 'The Contractor', posterUrl: 'https://themoviedb.org/t/p/original/rJPGPZ5soaG27MK90oKpioSiJE2.jpg' },
  { tmdbMovieId: 916821, title: 'Gasoline Alley', posterUrl: 'https://themoviedb.org/t/p/original/ews3l3v7JYLtBS5ansZrXsXLMzl.jpg' },
  { tmdbMovieId: 629542, title: 'The Bad Guys', posterUrl: 'https://themoviedb.org/t/p/original/7qop80YfuO0BwJa1uXk1DXUUEwv.jpg' },
  { tmdbMovieId: 836225, title: 'The Exorcism of God', posterUrl: 'https://themoviedb.org/t/p/original/hangTmbxpSV4gpHG7MgSlCWSSFa.jpg' },
  { tmdbMovieId: 785985, title: 'The Takedown', posterUrl: 'https://themoviedb.org/t/p/original/h5hVeCfYSb8gIO0F41gqidtb0AI.jpg' },
])

// Function
const sendQuery = useThrottleFn((query: string) => {
  console.log(query)
}, 1000)

onMounted(async () => {
  // movies.value = await MovieService.getMovies()
})
</script>

<style lang="scss" scoped>
.cw-home-container {
  @apply flex-1 bg-white;
}

.cw-home-navbar {
  @apply flex h-32 w-full items-center justify-evenly lg:justify-around 3xl:justify-evenly;
}
</style>
