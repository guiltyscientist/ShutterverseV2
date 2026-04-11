<script setup lang="ts">
import { ref } from 'vue'
import { useLocale } from '../composables/useLocale'

const { t } = useLocale()

interface ContactForm {
  name: string
  email: string
  message: string
  sendCopy: boolean
}

const formData = ref<ContactForm>({
  name: '',
  email: '',
  message: '',
  sendCopy: false
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const formError = ref('')

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
    email: "info@shuttervision.com",
    website: "www.shuttervision.com"
  },
  supervisoryAuthority: "Bezirkshauptmannschaft Baden",
  professionalRegulations: "Gewerbeordnung: www.ris.bka.gv.at",
  chamberMembership: "Wirtschaftskammer Österreich",
  applicableLaw: "Österreichisches Recht",
  disputeResolution: "Online-Streitbeilegung gemäß Art. 14 Abs. 1 ODR-VO: Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie unter https://ec.europa.eu/consumers/odr/ finden.",
  liabilityNote: "Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich."
}

const validateForm = (): boolean => {
  if (!formData.value.name.trim()) {
    formError.value = t.value.impressum.validation.nameRequired
    return false
  }

  if (!formData.value.email.trim()) {
    formError.value = t.value.impressum.validation.emailRequired
    return false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.value.email)) {
    formError.value = t.value.impressum.validation.emailInvalid
    return false
  }

  if (!formData.value.message.trim()) {
    formError.value = t.value.impressum.validation.messageRequired
    return false
  }

  formError.value = ''
  return true
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  formError.value = ''

  try {
    // In a real application, you would send this to your backend
    // For now, we'll simulate the API call and use a mailto link as fallback
    await simulateAPICall()

    // If checkbox is checked, send copy to user
    if (formData.value.sendCopy) {
      sendCopyToUser()
    }

    isSubmitted.value = true

    // Reset form after successful submission
    setTimeout(() => {
      formData.value = {
        name: '',
        email: '',
        message: '',
        sendCopy: false
      }
      isSubmitted.value = false
    }, 5000)

  } catch (error) {
    formError.value = t.value.impressum.form.errorGeneral
  } finally {
    isSubmitting.value = false
  }
}

// Simulate API call to backend
const simulateAPICall = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In production, you would make a real API call here:
      // Example with fetch:
      // fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData.value)
      // })

      // For demo purposes, we'll use mailto as a fallback
      const subject = t.value.impressum.form.emailSubject.replace('{name}', formData.value.name)
      const body = t.value.impressum.form.emailBody
        .replace('{name}', formData.value.name)
        .replace('{email}', formData.value.email)
        .replace('{message}', formData.value.message)

      // This opens the user's email client
      window.location.href = `mailto:impressum@shuttervision.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

      resolve()
    }, 1000)
  })
}

// Send copy to user
const sendCopyToUser = () => {
  const subject = t.value.impressum.form.copySubject
  const body = t.value.impressum.form.copyBody
    .replace('{name}', formData.value.name)
    .replace('{message}', formData.value.message)

  window.location.href = `mailto:${formData.value.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

// Reset form
const resetForm = () => {
  formData.value = {
    name: '',
    email: '',
    message: '',
    sendCopy: false
  }
  isSubmitted.value = false
  formError.value = ''
}
</script>

<template>
  <div class="min-h-screen select-none bg-gradient-to-br from-gray-900 to-gray-950 text-white overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Page Title -->
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            {{ t.impressum.title }}
          </h1>
        </div>

        <!-- Two Column Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <!-- Left Column: Impressum -->
          <div class="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 md:p-8">
            <h2 class="text-2xl font-bold mb-6 text-amber-400">
              Impressum
            </h2>

            <!-- Impressum Content -->
            <div class="space-y-6">
              <!-- Company Info -->
              <div>
                <h3 class="text-lg font-semibold mb-2">{{ t.impressum.sections.company }}</h3>
                <div class="space-y-1 text-gray-300">
                  <p>{{ impressumData.companyName }}</p>
                  <p>{{ impressumData.legalForm }}</p>
                  <p>{{ impressumData.address }}</p>
                  <p>{{ impressumData.city }}, {{ impressumData.country }}</p>
                </div>
              </div>

              <!-- Contact Info -->
              <div>
                <h3 class="text-lg font-semibold mb-2">{{ t.impressum.sections.contact }}</h3>
                <div class="space-y-1 text-gray-300">
                  <p>{{ t.impressum.labels.phone }} {{ impressumData.contact.phone }}</p>
                  <p>{{ t.impressum.labels.email }} {{ impressumData.contact.email }}</p>
                  <p>{{ t.impressum.labels.web }} {{ impressumData.contact.website }}</p>
                </div>
              </div>

              <!-- Legal Info -->
              <div>
                <h3 class="text-lg font-semibold mb-2">{{ t.impressum.sections.legal }}</h3>
                <div class="space-y-2 text-gray-300">
                  <p><span class="font-medium">{{ t.impressum.labels.uid }}</span> {{ impressumData.uid }}</p>
                  <p><span class="font-medium">{{ t.impressum.labels.register }}</span> {{ impressumData.commercialRegister }}</p>
                  <p><span class="font-medium">{{ t.impressum.labels.court }}</span> {{ impressumData.commercialCourt }}</p>
                  <p><span class="font-medium">{{ t.impressum.labels.directors }}</span> {{ impressumData.managingDirectors }}</p>
                </div>
              </div>

              <!-- Authority Info -->
              <div>
                <h3 class="text-lg font-semibold mb-2">{{ t.impressum.sections.authority }}</h3>
                <div class="space-y-2 text-gray-300">
                  <p>{{ impressumData.supervisoryAuthority }}</p>
                  <p><span class="font-medium">{{ t.impressum.labels.law }}</span> {{ impressumData.professionalRegulations }}</p>
                  <p><span class="font-medium">{{ t.impressum.labels.chamber }}</span> {{ impressumData.chamberMembership }}</p>
                </div>
              </div>

              <!-- Legal Notes -->
              <div class="pt-4 border-t border-gray-700/50">
                <div class="space-y-3 text-sm text-gray-400">
                  <p><span class="font-medium">{{ t.impressum.labels.appLaw }}</span> {{ impressumData.applicableLaw }}</p>
                  <p><span class="font-medium">{{ t.impressum.labels.dispute }}</span> {{ impressumData.disputeResolution }}</p>
                  <p><span class="font-medium">{{ t.impressum.labels.liability }}</span> {{ impressumData.liabilityNote }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Contact Form -->
          <div class="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 md:p-8">
            <h2 class="text-2xl font-bold mb-6 text-amber-400">
              {{ t.impressum.form.title }}
            </h2>

            <!-- Success Message -->
            <div
              v-if="isSubmitted"
              class="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg"
            >
              <div class="flex items-center">
                <svg class="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p class="font-medium text-green-300">{{ t.impressum.form.successTitle }}</p>
                  <p class="text-sm text-green-400 mt-1">
                    {{ t.impressum.form.successText }}
                    <span v-if="formData.sendCopy">{{ t.impressum.form.successCopy }}</span>
                  </p>
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <div
              v-if="formError"
              class="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg"
            >
              <div class="flex items-center">
                <svg class="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-red-300">{{ formError }}</p>
              </div>
            </div>

            <!-- Contact Form -->
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Name Field -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-300 mb-2">
                  {{ t.impressum.form.name }}
                </label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                  :placeholder="t.impressum.form.namePlaceholder"
                  :disabled="isSubmitting"
                >
              </div>

              <!-- Email Field -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
                  {{ t.impressum.form.email }}
                </label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                  :placeholder="t.impressum.form.emailPlaceholder"
                  :disabled="isSubmitting"
                >
              </div>

              <!-- Message Field -->
              <div>
                <label for="message" class="block text-sm font-medium text-gray-300 mb-2">
                  {{ t.impressum.form.message }}
                </label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  rows="6"
                  required
                  class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors resize-none"
                  :placeholder="t.impressum.form.messagePlaceholder"
                  :disabled="isSubmitting"
                ></textarea>
              </div>

              <!-- Copy Checkbox -->
              <div class="flex items-center">
                <input
                  id="sendCopy"
                  v-model="formData.sendCopy"
                  type="checkbox"
                  class="w-4 h-4 text-amber-600 bg-gray-800 border-gray-700 rounded focus:ring-amber-500 focus:ring-2"
                  :disabled="isSubmitting"
                >
                <label for="sendCopy" class="ml-3 text-sm text-gray-300">
                  {{ t.impressum.form.sendCopy }}
                </label>
              </div>

              <!-- Form Actions -->
              <div class="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
                >
                  <svg
                    v-if="isSubmitting"
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{{ isSubmitting ? t.impressum.form.submitting : t.impressum.form.submit }}</span>
                </button>

                <button
                  type="button"
                  @click="resetForm"
                  :disabled="isSubmitting"
                  class="px-6 py-3 bg-gray-800/50 hover:bg-gray-700/60 border border-gray-700 text-white font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ t.impressum.form.reset }}
                </button>
              </div>

              <!-- Form Note -->
              <div class="pt-4 border-t border-gray-700/50">
                <p class="text-sm text-gray-400">
                  {{ t.impressum.form.required }}
                </p>
              </div>
            </form>

            <!-- Alternative Contact Info -->
            <div class="mt-8 pt-6 border-t border-gray-700/50">
              <h3 class="text-lg font-semibold mb-4">{{ t.impressum.alternatives.title }}</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="/cdn-cgi/l/email-protection#97fef9f1f8d7e4ffe2e3e3f2e5e1fee4fef8f9b9f4f8fa" class="flex items-center p-3 bg-gray-800/50 hover:bg-gray-700/60 rounded-lg transition-colors group">
                  <svg class="w-5 h-5 text-amber-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p class="font-medium text-white group-hover:text-amber-300 transition-colors">{{ t.impressum.alternatives.email }}</p>
                    <p class="text-sm text-gray-400"><span class="__cf_email__" data-cfemail="9bf2f5fdf4dbe8f3eeefeffee9edf2e8f2f4f5b5f8f4f6">[email&#160;protected]</span></p>
                  </div>
                </a>

                <a
                  href="tel:+43123456789"
                  class="flex items-center p-3 bg-gray-800/50 hover:bg-gray-700/60 rounded-lg transition-colors group"
                >
                  <svg class="w-5 h-5 text-amber-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p class="font-medium text-white group-hover:text-amber-300 transition-colors">{{ t.impressum.alternatives.phone }}</p>
                    <p class="text-sm text-gray-400">+43 123 456789</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth transitions */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Glass effect enhancement */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* Custom scrollbar */
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

/* Form input focus styles */
input:focus, textarea:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.2);
}

/* Checkbox styling */
input[type="checkbox"]:checked {
  background-color: rgb(245, 158, 11);
  border-color: rgb(245, 158, 11);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
}

/* Print styles */
@media print {
  .bg-gradient-to-br {
    background: white !important;
  }

  .text-white {
    color: black !important;
  }
  .text-gray-300 {
    color: #666 !important;
  }

  .border-gray-700 {
    border-color: #ccc !important;
  }
}
</style>
