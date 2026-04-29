<script setup lang="ts">
import { useLocale } from '../composables/useLocale'

const { t } = useLocale()

const impressumData = {
  companyName: "ShutterVision Studios GmbH",
  legalForm: "Gesellschaft mit beschränkter Haftung",
  address: "Mühlgasse 8",
  city: "2544 Leobersdorf",
  country: "Austria",
  uid: "ATU12345678",
  commercialRegister: "FN 123456a",
  commercialCourt: "Handelsgericht Wien",
  managingDirectors: "Alexander Schmidt, Maria Weber",
  contact: {
    phone: "+43 123 456789",
    phoneTel: "+43123456789",
    email: "info@shuttervision.com",
  },
  supervisoryAuthority: "Bezirkshauptmannschaft Baden",
  chamberMembership: "Wirtschaftskammer Österreich",
  applicableLaw: "Österreichisches Recht",
  disputeResolution: "Online-Streitbeilegung gemäß Art. 14 Abs. 1 ODR-VO: Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit.",
  liabilityNote: "Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links."
}
</script>

<template>
  <div class="min-h-screen relative select-none bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/5 rounded-full mix-blend-multiply filter blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500/5 rounded-full mix-blend-multiply filter blur-3xl"></div>
    </div>

    <div class="relative z-10 container mx-auto px-4 pt-8 pb-12">

      <h1 v-reveal class="font-bold text-5xl md:text-6xl text-white mb-8">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-200">IMPRESSUM</span>
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <!-- Left: Legal info -->
        <div v-reveal="{ direction: 'left', delay: 100 }" class="space-y-6">
          <div>
            <h2 class="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">Unternehmen</h2>
            <div class="text-gray-300 space-y-1 text-sm leading-relaxed">
              <p class="text-white font-medium">{{ impressumData.companyName }}</p>
              <p>{{ impressumData.legalForm }}</p>
              <p>{{ impressumData.address }}, {{ impressumData.city }}</p>
              <p>{{ impressumData.country }}</p>
            </div>
          </div>

          <div class="h-px bg-gray-700/50"></div>

          <div>
            <h2 class="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">{{ t.impressum.sections.legal }}</h2>
            <div class="text-gray-300 space-y-1 text-sm">
              <p><span class="text-gray-500">{{ t.impressum.labels.uid }}</span> {{ impressumData.uid }}</p>
              <p><span class="text-gray-500">{{ t.impressum.labels.register }}</span> {{ impressumData.commercialRegister }}</p>
              <p><span class="text-gray-500">{{ t.impressum.labels.court }}</span> {{ impressumData.commercialCourt }}</p>
              <p><span class="text-gray-500">{{ t.impressum.labels.directors }}</span> {{ impressumData.managingDirectors }}</p>
            </div>
          </div>

          <div class="h-px bg-gray-700/50"></div>

          <div>
            <h2 class="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">{{ t.impressum.sections.authority }}</h2>
            <div class="text-gray-300 space-y-1 text-sm">
              <p>{{ impressumData.supervisoryAuthority }}</p>
              <p>{{ impressumData.chamberMembership }}</p>
              <p><span class="text-gray-500">{{ t.impressum.labels.appLaw }}</span> {{ impressumData.applicableLaw }}</p>
            </div>
          </div>

          <div class="text-xs text-gray-500 space-y-1 leading-relaxed pt-2 border-t border-gray-700/50">
            <p>{{ impressumData.disputeResolution }}</p>
            <p>{{ impressumData.liabilityNote }}</p>
          </div>
        </div>

        <!-- Right: Contact -->
        <div v-reveal="{ direction: 'right', delay: 200 }" class="space-y-6">
          <div>
            <h2 class="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">Kontakt</h2>
            <div class="space-y-3">

              <!-- Email -->
              <a
                :href="`mailto:${impressumData.contact.email}?subject=Anfrage`"
                class="flex items-center gap-4 p-4 bg-gray-800/40 hover:bg-gray-800/70 rounded-xl border border-gray-700/50 hover:border-amber-500/40 transition-all duration-300 group"
              >
                <div class="p-2.5 bg-amber-500/15 rounded-lg shrink-0 group-hover:bg-amber-500/25 transition-colors">
                  <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs text-gray-500 mb-0.5">E-Mail · Betreff: Anfrage</p>
                  <p class="text-white font-medium group-hover:text-amber-400 transition-colors truncate">{{ impressumData.contact.email }}</p>
                </div>
                <i class="bi bi-arrow-up-right text-gray-600 group-hover:text-amber-400 transition-colors"></i>
              </a>

              <!-- Phone -->
              <a
                :href="`tel:${impressumData.contact.phoneTel}`"
                class="flex items-center gap-4 p-4 bg-gray-800/40 hover:bg-gray-800/70 rounded-xl border border-gray-700/50 hover:border-amber-500/40 transition-all duration-300 group"
              >
                <div class="p-2.5 bg-amber-500/15 rounded-lg shrink-0 group-hover:bg-amber-500/25 transition-colors">
                  <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="text-xs text-gray-500 mb-0.5">Telefon</p>
                  <p class="text-white font-medium group-hover:text-amber-400 transition-colors">{{ impressumData.contact.phone }}</p>
                </div>
                <i class="bi bi-arrow-up-right text-gray-600 group-hover:text-amber-400 transition-colors"></i>
              </a>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}
</style>
