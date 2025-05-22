<template>
  <q-page class="q-pa-md artikel-detail">
    <div v-if="artikel" class="artikel-container">
      <h1 class="artikel-title">{{ titel }}</h1>

      <div class="artikel-meta q-mb-sm">
        <div class="artikel-date">{{ artikel.date }}</div>
        <div class="artikel-author">Von {{ artikel.author }}</div>
      </div>

      <div class="artikel-content q-mt-md">
        <q-img :src="artikel.image" class="inline-image" spinner-color="primary" />
        <p>
          {{ content }}
        </p>
      </div>
    </div>

    <div v-else class="q-pa-md text-center">
      <q-spinner color="primary" />
      <p class="q-mt-sm">Artikel wird geladen...</p>
    </div>
  </q-page>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import artikels from 'src/data/news.json'

// Получаем язык из пропсов
const props = defineProps({
  language: {
    type: String,
    default: 'de',
  },
})

const route = useRoute()
const artikelId = parseInt(route.params.id)

// Следим за текущим языком
const lang = ref(props.language)
watch(
  () => props.language,
  (newLang) => {
    lang.value = newLang
  },
)

// Найти статью
const artikel = computed(() => artikels.artikels.find((a) => a.id === artikelId))

function getLocalizedObjectField(article, fieldName, langRef) {
  if (!article || !article[fieldName]) return ''
  return article[fieldName][langRef.value] || article[fieldName]['de'] || ''
}

const titel = computed(() => getLocalizedObjectField(artikel.value, 'titel', lang))
const content = computed(() => getLocalizedObjectField(artikel.value, 'content', lang))
</script>

<style scoped>
.artikel-detail {
  max-width: 800px;
  margin: 0 auto;
}

.artikel-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.artikel-title {
  font-size: 26px;
  font-weight: 600;
  color: #222;
  margin-bottom: 4px;
}

.artikel-meta {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #777;
  flex-wrap: wrap;
}

.artikel-content {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  position: relative;
}

.inline-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  float: left;
  margin: 0 16px 16px 0;
}

/* Адаптивность */
@media (max-width: 600px) {
  .inline-image {
    float: none;
    display: block;
    margin: 0 auto 16px auto;
  }

  .artikel-title {
    font-size: 20px;
  }

  .artikel-content {
    font-size: 15px;
  }

  .artikel-meta {
    font-size: 13px;
    gap: 8px;
  }
}
</style>
