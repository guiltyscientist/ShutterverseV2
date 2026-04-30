<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useLocale } from '../composables/useLocale'
import { useLocalText } from '../composables/useLocalText'
import type { LocaleText, LocaleArr } from '../composables/useLocalText'

const { t } = useLocale()
const { lt, ltArr } = useLocalText()

interface SocialMedia {
  platform: 'linkedin' | 'instagram' | 'twitter' | 'github' | 'facebook' | 'youtube' | 'website' | 'behance' | 'dribbble'
  url: string
}

interface TeamMember {
  id: number | string
  firstName: string
  lastName: string
  roles: LocaleArr
  description?: LocaleText
  profilImg?: { url: string, publicId: string }
  socialMedia: SocialMedia[]
}

const teamMembers = ref<TeamMember[]>([])

const fetchTeam = async () => {
  try {
    const response = await axios.get('/api/team')
    teamMembers.value = response.data
  } catch (err) {
    console.error('Error fetching team:', err)
  }
}

const socialIcons: Record<string, { icon: string, color: string, bgColor: string }> = {
  linkedin: {
    icon: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z',
    color: 'text-blue-600', bgColor: 'bg-blue-600/10 hover:bg-blue-600/20'
  },
  instagram: {
    icon: 'M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2m-.25 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4zm9.1 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z',
    color: 'text-pink-600', bgColor: 'bg-pink-600/10 hover:bg-pink-600/20'
  },
  twitter: {
    icon: 'M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z',
    color: 'text-blue-400', bgColor: 'bg-blue-400/10 hover:bg-blue-400/20'
  },
  github: {
    icon: 'M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27',
    color: 'text-gray-200', bgColor: 'bg-gray-200/10 hover:bg-gray-200/20'
  },
  facebook: {
    icon: 'M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07',
    color: 'text-blue-700', bgColor: 'bg-blue-700/10 hover:bg-blue-700/20'
  },
  youtube: {
    icon: 'M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.53 3.6 12 3.6 12 3.6s-7.53 0-9.38.45A3.02 3.02 0 00.5 6.19 32.1 32.1 0 000 12.01a32.1 32.1 0 00.5 5.82 3.02 3.02 0 002.12 2.14c1.85.45 9.38.45 9.38.45s7.53 0 9.38-.45a3.02 3.02 0 002.12-2.14c.33-1.92.5-3.86.5-5.82a32.1 32.1 0 00-.5-5.82zM9.6 15.6V8.41l6.26 3.6-6.26 3.6z',
    color: 'text-red-600', bgColor: 'bg-red-600/10 hover:bg-red-600/20'
  },
  website: {
    icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
    color: 'text-green-600', bgColor: 'bg-green-600/10 hover:bg-green-600/20'
  },
  behance: {
    icon: 'M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V6.021h6.457c5.476.081 5.38 4.325 4.85 7.421.396 2.826-2.456 5.819-6.061 5.546zm-3.463-8.665h3.594c3.105 0 3.019-3.012 2.965-3.729-.139-2.345-2.128-3.164-3.281-3.212H1.797v6.941z',
    color: 'text-blue-500', bgColor: 'bg-blue-500/10 hover:bg-blue-500/20'
  },
  dribbble: {
    icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zm4.93 4.38a16.88 16.88 0 013.62 1.5 8.05 8.05 0 01-1.19 4.65 23.84 23.84 0 00-2.43-6.15zm-2.86 1.57a25.46 25.46 0 012.2 6.47 19.57 19.57 0 01-4.88.6c-1.67 0-3.27-.2-4.8-.58a25.34 25.34 0 012.2-6.47c.83.2 1.7.33 2.6.4 1.13.08 2.23.04 3.28-.02zM7.6 5.25a23.87 23.87 0 00-2.43 6.15 8.05 8.05 0 01-1.19-4.65 16.88 16.88 0 013.62-1.5z',
    color: 'text-pink-500', bgColor: 'bg-pink-500/10 hover:bg-pink-500/20'
  }
}

// Block javascript: / data: / other unsafe protocols in social URLs
const safeUrl = (url: string): string => /^https?:\/\//i.test(url) ? url : ''

const gridColumns = computed(() => {
  const count = teamMembers.value.length
  if (count === 1) return 'grid-cols-1 max-w-2xl mx-auto'
  if (count === 2) return 'grid-cols-1 md:grid-cols-2'
  if (count === 3) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  if (count === 4) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  if (count === 5) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
  if (count === 6) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
  return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
})

onMounted(() => { fetchTeam() })
</script>

<template>
  <div class="min-h-screen relative select-none bg-gray-900 text-white overflow-hidden flex flex-col justify-center">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/5 rounded-full mix-blend-multiply filter blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500/5 rounded-full mix-blend-multiply filter blur-3xl"></div>
    </div>

    <div class="relative z-10 py-6 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto text-center mb-6">
        <h1 v-reveal class="text-4xl md:text-5xl font-bold mb-2">{{ t.team.title }}</h1>
      </div>

      <div class="max-w-7xl mx-auto">
        <!-- Empty State -->
        <div v-if="teamMembers.length === 0" class="text-center py-16">
          <svg class="w-24 h-24 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h3 class="text-2xl font-semibold text-gray-400 mb-2">{{ t.team.growing }}</h3>
          <p class="text-gray-500">{{ t.team.checkBack }}</p>
        </div>

        <!-- Grid -->
        <div v-else :class="['grid gap-8', gridColumns]">
          <div
            v-for="(member, i) in teamMembers"
            :key="member.id"
            v-reveal="{ delay: i * 120 }"
            class="group bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-amber-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10"
          >
            <div class="relative h-64 overflow-hidden">
              <img
                :src="member.profilImg?.url"
                :alt="`${member.firstName} ${member.lastName}`"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>
            </div>

            <div class="p-6">
              <h3 class="text-2xl font-bold mb-4">{{ member.firstName }} {{ member.lastName }}</h3>

              <div class="mb-6 flex flex-wrap gap-2">
                <span
                  v-for="(role, index) in ltArr(member.roles)"
                  :key="index"
                  class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 group-hover:scale-105"
                  :class="{
                    'bg-amber-500/20 text-amber-300 border border-amber-500/30': index === 0,
                    'bg-amber-500/10 text-amber-200 border border-amber-500/20': index === 1,
                    'bg-gray-700/60 text-gray-300 border border-gray-600/40': index > 1
                  }"
                >{{ role }}</span>
              </div>

              <div v-if="member.socialMedia && member.socialMedia.length > 0" class="mt-4 pt-4 border-t border-gray-700/50">
                <div class="flex flex-wrap gap-2">
                  <a
                    v-for="social in member.socialMedia.filter(s => safeUrl(s.url))"
                    :key="social.platform"
                    :href="safeUrl(social.url)"
                    target="_blank"
                    rel="noopener noreferrer"
                    :class="['p-2 rounded-lg transition-all duration-300 hover:scale-110', socialIcons[social.platform]?.bgColor]"
                    :title="`${member.firstName}'s ${social.platform}`"
                  >
                    <svg class="w-5 h-5" :class="socialIcons[social.platform]?.color" viewBox="0 0 24 24" fill="currentColor">
                      <path :d="socialIcons[social.platform]?.icon" />
                    </svg>
                  </a>
                </div>
              </div>
              <div v-else class="mt-4 pt-4 border-t border-gray-700/50">
                <p class="text-sm text-gray-500 italic">{{ t.team.socialSoon }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.backdrop-blur-sm { backdrop-filter: blur(8px); }
</style>
