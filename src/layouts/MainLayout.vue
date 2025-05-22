<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>{{ i18n.global.t('menu.app_title') }}</q-toolbar-title>

        <!-- Переключатель языка -->
        <q-btn
          flat
          dense
          round
          :label="language.toUpperCase()"
          @click="toggleLanguage"
          class="q-ml-sm"
          style="min-width: 50px"
          aria-label="Switch language"
        />

        <!-- Кнопка переключения темы -->
        <q-btn
          flat
          dense
          round
          :icon="darkMode ? 'dark_mode' : 'light_mode'"
          @click="toggleDarkMode"
          :aria-label="darkMode ? 'Switch to light mode' : 'Switch to dark mode'"
          class="q-ml-sm"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>{{ i18n.global.t('menu.my_pages') }}</q-item-label>
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view :language="language" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useQuasar } from 'quasar'
import EssentialLink from 'components/EssentialLink.vue'
import { i18n } from 'boot/i18n'

const $q = useQuasar()

const darkModeStored = localStorage.getItem('darkMode')
const darkMode = ref(darkModeStored === 'true' ? true : false)

$q.dark.set(darkMode.value)

watch(darkMode, (val) => {
  localStorage.setItem('darkMode', val ? 'true' : 'false')
  $q.dark.set(val)
})

function toggleDarkMode() {
  darkMode.value = !darkMode.value
}

const linksList = computed(() => [
  {
    title: i18n.global.t('menu.home'),
    caption: i18n.global.t('menu.home_caption'),
    icon: 'home',
    link: '/',
  },
  {
    title: i18n.global.t('menu.handel'),
    caption: i18n.global.t('menu.handel_caption'),
    icon: 'article',
    link: '/handel',
  },
])

const leftDrawerOpen = ref(false)
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const language = ref(localStorage.getItem('language') || 'de')

// Инициализация языка i18n при загрузке
i18n.global.locale.value = language.value

function toggleLanguage() {
  language.value = language.value === 'de' ? 'en' : 'de'
  localStorage.setItem('language', language.value)
  i18n.global.locale.value = language.value
}
</script>
