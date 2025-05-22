<template>
  <div class="q-pa-md">
    <q-card class="q-pa-md max-w-600">
      <q-card-section>
        <div class="text-h6">Neue Nachricht hinzufügen</div>
      </q-card-section>

      <q-form @submit.prevent="submitNews">
        <q-card-section>
          <q-input v-model="news.titel.de" label="Titel (Deutsch)" filled />
          <q-input v-model="news.titel.en" label="Title (English)" filled />
          <q-input v-model="news.content.de" label="Inhalt (Deutsch)" type="textarea" filled />
          <q-input v-model="news.content.en" label="Content (English)" type="textarea" filled />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Speichern" color="primary" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { date } from 'quasar'
import newsData from 'src/data/news.json'
import { useRouter } from 'vue-router'

const router = useRouter()

const news = ref({
  titel: { de: '', en: '' },
  content: { de: '', en: '' },
})

function submitNews() {
  const now = new Date()
  const formattedDate = date.formatDate(now, 'DD.MM.YYYY HH:mm')

  const newArticle = {
    id: newsData.artikels.length + 1,
    titel: news.value.titel,
    content: news.value.content,
    date: formattedDate,
    image: 'https://picsum.photos/200/300',
    author: 'Brandora',
  }

  newsData.artikels.push(newArticle)

  // Эмуляция сохранения: можно заменить на API-запрос, если потребуется
  console.log('New article added:', newArticle)

  router.push('/handel')
}
</script>

<style scoped>
.max-w-600 {
  max-width: 600px;
  margin: auto;
}
</style>
