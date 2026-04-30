<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLocale } from '../composables/useLocale'

const { t } = useLocale()

// Map is not loaded until the user explicitly clicks — avoids Google cookies
// without prior consent (DSGVO / ePrivacy compliance).
const mapConsented = ref(false)
const loadMap = () => { mapConsented.value = true }

const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2673.6901411103454!2d16.206907689934948!3d47.92303269701518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476db654a87903ef%3A0x13c1734954a91bd0!2sM%C3%BChlgasse%208%2C%202544%20Leobersdorf!5e0!3m2!1sde!2sat!4v1769086317899!5m2!1sde!2sat"
const ADDRESS = "Mühlgasse 8, 2544 Leobersdorf, Austria"

const locations = computed(() => [
  {
    id: 1,
    title: t.value.location.studio.title,
    address: ADDRESS,
    mapEmbedUrl: MAP_EMBED_URL,
    descriptionByCar: t.value.location.studio.byCar,
    descriptionByPublicTransport: t.value.location.studio.byTransport,
  }
])
</script>

<template>
  <div class="min-h-screen relative select-none bg-gray-900 text-white overflow-hidden flex flex-col">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/5 rounded-full mix-blend-multiply filter blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500/5 rounded-full mix-blend-multiply filter blur-3xl"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 flex flex-col justify-center flex-1 pt-4 pb-32 px-4 sm:px-6 lg:px-8">
      <!-- Location Cards -->
      <div class="max-w-6xl w-full mx-auto">
        <div v-for="location in locations" :key="location.id" class="mb-0">
          <!-- Desktop Layout (Map left, Info right) -->
          <div class="hidden lg:flex flex-col lg:flex-row gap-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 p-5">
            <!-- Left Column: Map -->
            <div v-reveal="{ direction: 'left', duration: 700 }" class="lg:w-1/2">
              <div class="bg-gray-900 rounded-xl overflow-hidden shadow-2xl h-full">
                <div class="relative h-full min-h-[480px]">

                  <!-- Map loaded after consent -->
                  <template v-if="mapConsented">
                    <iframe
                      :src="location.mapEmbedUrl"
                      width="100%" height="100%"
                      style="border:0; min-height:480px;"
                      allowfullscreen="" loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                      class="absolute inset-0"
                    ></iframe>
                    <div class="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-4">
                      <div class="flex items-start space-x-3">
                        <svg class="w-6 h-6 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                          <h3 class="font-semibold text-white">{{ location.title }}</h3>
                          <p class="text-gray-300 text-sm">{{ location.address }}</p>
                        </div>
                      </div>
                    </div>
                  </template>

                  <!-- Consent placeholder -->
                  <div v-else class="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gray-800/60 p-6 text-center">
                    <svg class="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p class="text-gray-300 text-sm max-w-xs">
                      {{ t.location.mapConsent }}
                    </p>
                    <button
                      @click="loadMap"
                      class="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 text-sm"
                    >
                      {{ t.location.mapConsentBtn }}
                    </button>
                  </div>

                </div>
              </div>
            </div>

            <!-- Right Column: Transportation Information -->
            <div v-reveal="{ direction: 'right', duration: 700, delay: 150 }" class="lg:w-1/2 flex flex-col justify-center p-6 lg:p-10">
              <!-- Title -->
              <h2 class="text-2xl font-bold mb-4 flex items-center">
                <svg class="w-6 h-6 mr-2 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ t.location.gettingHere }}
              </h2>

              <!-- By Car -->
              <div class="mb-4">
                <div class="flex items-center mb-2">
                  <div class="p-1.5 bg-amber-500/20 rounded-lg mr-3">
                    <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                    </svg>
                  </div>
                  <h3 class="text-base font-semibold">{{ t.location.byCar }}</h3>
                </div>
                <p class="text-gray-300 text-sm leading-relaxed pl-10">{{ location.descriptionByCar }}</p>
              </div>

              <!-- By Public Transport -->
              <div class="mb-4">
                <div class="flex items-center mb-2">
                  <div class="p-1.5 bg-amber-500/20 rounded-lg mr-3">
                    <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 class="text-base font-semibold">{{ t.location.byTransport }}</h3>
                </div>
                <p class="text-gray-300 text-sm leading-relaxed pl-10">{{ location.descriptionByPublicTransport }}</p>
              </div>

              <!-- Get Directions Button -->
              <div class="mt-4 pt-4 border-t border-gray-700">
                <a
                  :href="`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  {{ t.location.getDirections }}
                </a>
              </div>
            </div>
          </div>

          <!-- Mobile Layout -->
          <div class="lg:hidden bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50">
            <!-- Map on Mobile -->
            <div class="relative h-80 bg-gray-900">
              <template v-if="mapConsented">
                <iframe
                  :src="location.mapEmbedUrl"
                  width="100%" height="100%"
                  style="border:0;"
                  allowfullscreen="" loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  class="absolute inset-0"
                ></iframe>
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                  <h2 class="text-2xl font-bold mb-1">{{ location.title }}</h2>
                  <p class="text-gray-300 text-sm">{{ location.address }}</p>
                </div>
              </template>

              <div v-else class="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gray-800/60 p-6 text-center">
                <svg class="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p class="text-gray-300 text-sm">{{ t.location.mapConsent }}</p>
                <button
                  @click="loadMap"
                  class="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-semibold rounded-lg transition-all duration-300 text-sm"
                >
                  {{ t.location.mapConsentBtn }}
                </button>
              </div>
            </div>

            <!-- Transportation Information on Mobile -->
            <div class="p-6">
              <h3 class="text-2xl font-bold mb-6">{{ t.location.gettingHere }}</h3>

              <!-- By Car -->
              <div class="mb-6">
                <h4 class="text-lg font-semibold mb-3 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  {{ t.location.byCar }}
                </h4>
                <p class="text-gray-300 text-sm leading-relaxed">
                  {{ location.descriptionByCar }}
                </p>
              </div>

              <!-- By Public Transport -->
              <div class="mb-6">
                <h4 class="text-lg font-semibold mb-3 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ t.location.byTransport }}
                </h4>
                <p class="text-gray-300 text-sm leading-relaxed">
                  {{ location.descriptionByPublicTransport }}
                </p>
              </div>

              <!-- Get Directions Button -->
              <div class="mt-6 pt-6 border-t border-gray-700">
                <a
                  :href="`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  {{ t.location.getDirectionsMaps }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State (if no locations) -->
        <div v-if="locations.length === 0" class="text-center py-16">
          <svg class="w-24 h-24 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h3 class="text-2xl font-semibold text-gray-400 mb-2">{{ t.location.noLocations }}</h3>
          <p class="text-gray-500">{{ t.location.noLocationsDesc }}</p>
        </div>

        <!-- Multiple Location Note -->
        <div v-if="locations.length > 1" class="text-center mt-12 text-gray-400">
          <p>{{ t.location.scrollMore }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for iframe container */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(251, 191, 36, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(251, 191, 36, 0.5);
}

/* Smooth transitions for interactive elements */
button, a {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Ensure map iframe is properly contained */
iframe {
  min-height: 500px;
}

@media (max-width: 1024px) {
  iframe {
    min-height: 300px;
  }
}

/* Glass effect enhancement */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* Gradient border effect */
.border-gradient {
  border: 2px solid transparent;
  background: linear-gradient(to right, rgba(251, 191, 36, 0.1), rgba(59, 130, 246, 0.1)) padding-box,
              linear-gradient(to right, rgba(251, 191, 36, 0.5), rgba(59, 130, 246, 0.5)) border-box;
}

/* Hover effects for cards */
.bg-gray-800\/30:hover {
  background-color: rgba(31, 41, 55, 0.4);
}
</style>
