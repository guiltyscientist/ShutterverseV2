<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import Home from './components/Home.vue'
import News from './components/News.vue'
import Studios from './components/Studios.vue'
import Location from './components/Location.vue'
import Team from './components/Team.vue'
import Impressum from './components/Impressum.vue'
</script>

<template>
  <div id="app" class="bg-gray-900">
    <NavBar />
    <section id="home">
      <Home />
    </section>
    <section id="news">
      <News />
    </section>
    <section id="studios">
      <Studios />
    </section>
    <section id="location">
      <Location />
    </section>
    <section id="team">
      <Team />
    </section>
    <section id="impressum">
      <Impressum />
    </section>
  </div>
</template>

<style>
/* Add smooth scrolling to the whole page */
html {
  scroll-behavior: smooth;
}

/* Adjust scroll position to account for fixed navbar */
section {
  scroll-margin-top: 5rem;
}

/* Remove default link styles */
a {
  text-decoration: none;
}
</style>
