<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Home from './components/Home.vue'
import News from './components/News.vue'
import Studios from './components/Studios.vue'
import Location from './components/Location.vue'
import Team from './components/Team.vue'
import Impressum from './components/Impressum.vue'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
</script>

<template>
  <RouterView v-if="isAdminRoute" />

  <div v-else id="app" class="bg-gray-900">
    <NavBar />
    <section id="home"><Home /></section>
    <section id="news"><News /></section>
    <section id="studios"><Studios /></section>
    <section id="location"><Location /></section>
    <section id="team"><Team /></section>
    <section id="impressum"><Impressum /></section>
  </div>
</template>

<style>
a { text-decoration: none; }
section { scroll-margin-top: 0; }
</style>
