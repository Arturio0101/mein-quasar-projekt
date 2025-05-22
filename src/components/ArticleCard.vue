<template>
  <q-card class="my-card q-mb-md">
    <q-img :src="article.image" ratio="16/9" />

    <q-card-section>
      <div class="text-subtitle2">{{ article.date }} - {{ article.author }}</div>
      <div class="text-h6 q-mt-sm">{{ article.titel }}</div>
    </q-card-section>

    <q-card-actions>
      <q-btn :to="`/artikel/${article.id}`" flat label="Mehr lesen" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
defineProps({
  article: Object,
})
</script>
