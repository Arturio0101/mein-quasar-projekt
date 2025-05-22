<template>
  <q-page padding>
    <div class="q-gutter-md">
      <h1>Handel</h1>

      <!-- Статьи текущей страницы -->
      <q-card
        v-for="artikel in paginatedArtikels"
        :key="artikel.id"
        class="my-card"
        clickable
        @click="goToArtikel(artikel.id)"
      >
        <div class="artikel-container">
          <div class="date-block">
            <div>{{ formatDate(artikel.date).day }}</div>
            <div>{{ formatDate(artikel.date).month }}</div>
            <div>{{ formatDate(artikel.date).time }}</div>
          </div>

          <q-img
            :src="artikel.image"
            class="artikel-image"
            spinner-color="primary"
            style="min-width: 150px; min-height: 150px"
          />

          <div class="content-block">
            <div class="date-author">{{ artikel.date }} — {{ artikel.author }}</div>
            <div class="titel">{{ artikel.titel }}</div>
            <p class="content-preview">
              {{
                artikel.content.length > 150
                  ? artikel.content.substring(0, 150) + '...'
                  : artikel.content
              }}
            </p>
          </div>
        </div>
      </q-card>

      <!-- Пагинация -->
      <div class="pagination-wrapper">
        <q-pagination
          v-model="currentPage"
          :max="maxPages"
          :max-pages="6"
          boundary-numbers
          class="q-mt-lg"
          color="primary"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import artikelsData from 'src/data/news.json'

const router = useRouter()
const artikels = artikelsData.artikels

const itemsPerPage = 4
const currentPage = ref(1)

const maxPages = computed(() => {
  return Math.ceil(artikels.length / itemsPerPage)
})

const paginatedArtikels = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return artikels.slice(start, start + itemsPerPage)
})

function goToArtikel(id) {
  router.push(`/artikel/${id}`)
}

// Функция парсинга даты вида "12.03.2025 16:12"
function formatDate(dateStr) {
  const [datePart, timePart] = dateStr.split(' ')
  const [day, monthNum] = datePart.split('.')

  const months = [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  ]

  const monthIndex = parseInt(monthNum, 10) - 1
  const monthName = months[monthIndex] || ''

  return {
    day,
    month: monthName,
    time: timePart,
  }
}
</script>

<style scoped>
.my-card {
  max-width: 700px;
  margin: 0 auto 15px auto; /* добавлен margin-bottom: 15px */
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  height: 200px;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  box-sizing: border-box;
}

.my-card:not(:last-child) {
  margin-bottom: 15px;
}

.my-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.artikel-container {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  gap: 15px;
  box-sizing: border-box;
}

.date-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  color: var(--neutrals-grey, #484848);
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #fff;
  height: fit-content;
}

.date-block > div:last-child {
  background: var(--red-100, #fa0f2b);
  color: #fff;
  padding: 2px 6px;
  border-radius: 0 0 12px 12px;
  margin-top: 4px;
  font-weight: 400;
  font-size: 12px;
}

.artikel-image {
  width: 200px !important;
  height: 200px !important;
  border-radius: 6px 0 0 6px; /* top-left, top-right, bottom-right, bottom-left */
  object-fit: cover;
  flex-shrink: 0;
}

.content-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.date-author {
  font-size: 14px;
  color: var(--neutrals-grey, #484848);
  margin-bottom: 4px;
}

.titel {
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 6px;
  color: var(--neutrals-grey, #484848);
  white-space: normal;
  overflow: visible;
  text-overflow: unset;
}

.content-preview {
  font-size: 14px;
  color: var(--neutrals-grey, #484848);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

/* Пробиваем scoped, чтобы задать стили для внутренних кнопок пагинации */
::v-deep(.q-pagination__middle) {
  display: flex !important;
  justify-content: center !important;
  gap: 3px; /* чтобы кнопки не слипались */
}

/* Активная страница - кнопка с aria-current="true" и классом q-btn--standard */
::v-deep(button.q-btn[aria-current='true']) {
  background-color: var(--red-100, #fa0f2b) !important;
  color: #ffffff !important;
  border-radius: 6px !important;
}

/* Для всех остальных кнопок пагинации */
::v-deep(button.q-btn:not([aria-current='true'])) {
  background-color: transparent !important;
  color: var(--primary) !important; /* или цвет по умолчанию */
  border-radius: 6px !important;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

/* При наведении на кнопки (неактивные) */
::v-deep(button.q-btn:not([aria-current='true']):hover) {
  background-color: var(--red-100, #fa0f2b) !important;
  color: #fff !important;
}

@media (max-width: 600px) {
  .my-card {
    height: auto;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }
  .artikel-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .date-block {
    flex: none;
    width: 100%;
    text-align: left;
  }
  .artikel-image {
    width: 100%;
    height: auto !important;
    min-height: auto;
    border-radius: 6px;
  }
  .content-block {
    width: 100%;
  }
  .titel {
    white-space: normal;
  }
}
</style>
