<template>
  <q-page padding>
    <div class="q-gutter-md">
      <h1>Handel</h1>

      <!-- Статьи текущей страницы -->
      <q-card
        v-for="(artikel, index) in paginatedArtikels"
        :key="artikel.id"
        class="my-card"
        clickable
        @click="goToArtikel(artikel.id)"
      >
        <q-img
          :src="artikel.image"
          class="artikel-image"
          spinner-color="primary"
          style="min-width: 150px; min-height: 150px"
        />

        <div class="artikel-container">
          <div
            class="date-block"
            :class="{
              'no-after-line': index === paginatedArtikels.length - 1,
              'no-before-line': index === 0,
            }"
          >
            <div>{{ formatDate(artikel.date).day }}</div>
            <div class="month">{{ formatDate(artikel.date).month }}</div>
            <div class="time">{{ formatDate(artikel.date).time }}</div>
          </div>

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
  margin: 0 auto 15px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  display: flex;
  box-sizing: border-box;
  gap: 15px;
}

.my-card:not(:last-child) {
  margin-bottom: 15px;
}

.my-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.artikel-container {
  display: flex;
  align-items: center;
  height: 200px;
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 12px;
  gap: 15px;
}

.date-block {
  position: absolute;
  left: -64px;
  top: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  color: var(--neutrals-grey, #484848);
  text-align: center;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background: #fff;
  height: fit-content;
}

.date-block > div:last-child {
  background: var(--red-100, #fa0f2b);
  color: #fff;
  padding: 2px 10px;
  border-radius: 0 0 6px 6px;
  margin-top: 4px;
  font-weight: 400;
  font-size: 11px !important;
}

.month {
  font-weight: 400;
  font-size: 10px;
}

.artikel-image {
  width: 200px !important;
  height: 200px !important;
  flex-shrink: 0;
}

.content-block {
  width: 100%;
}

.date-author,
.content-preview {
  font-size: 14px;
  color: var(--neutrals-grey, #484848);
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

/* ::v-deep оптимизации */
::v-deep(.q-pagination__middle) {
  display: flex !important;
  justify-content: center !important;
  gap: 3px;
}

::v-deep(button.q-btn) {
  border-radius: 6px !important;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

::v-deep(button.q-btn[aria-current='true']) {
  background-color: var(--red-100, #fa0f2b) !important;
  color: #fff !important;
}

::v-deep(button.q-btn:not([aria-current='true'])) {
  background: transparent !important;
  color: var(--primary) !important;
}

::v-deep(button.q-btn:not([aria-current='true']):hover) {
  background-color: var(--red-100, #fa0f2b) !important;
  color: #fff !important;
}

::v-deep(.date-block) {
  position: absolute;
}

::v-deep(.date-block::before),
::v-deep(.date-block::after) {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
}

::v-deep(.date-block::before) {
  top: 20px;
  height: 200px;
  width: 0.5px;
  background-color: #e5e5e5;
}

::v-deep(.date-block.no-after-line::before) {
  display: none !important;
}

/* Адаптив */
@media (max-width: 600px) {
  .my-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    height: auto;
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
