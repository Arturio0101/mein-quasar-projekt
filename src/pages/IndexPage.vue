<template>
  <q-page padding>
    <h1>{{ t('home.title') }}</h1>
    <p>{{ t('home.text') }}</p>
  </q-page>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
