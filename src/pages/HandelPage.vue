<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import artikelsData from 'src/data/news.json'

const props = defineProps({
  language: {
    type: String,
    default: 'de',
  },
})

const router = useRouter()
const artikels = artikelsData.artikels

const itemsPerPage = 4
const currentPage = ref(1)
const searchQuery = ref('')

// Фильтрация с учётом выбранного языка
const filteredArtikels = computed(() => {
  return artikels.filter((artikel) =>
    artikel.titel[props.language].toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const paginatedArtikels = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredArtikels.value.slice(start, start + itemsPerPage)
})

const maxPages = computed(() => {
  return Math.ceil(filteredArtikels.value.length / itemsPerPage)
})

function goToArtikel(id) {
  router.push(`/artikel/${id}`)
}

function formatDate(dateStr, lang = 'de') {
  const [datePart, timePart] = dateStr.split(' ')
  const [day, monthNum] = datePart.split('.')

  const months = {
    de: [
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
    ],
    en: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    // добавьте другие языки по необходимости
  }

  const monthIndex = parseInt(monthNum, 10) - 1
  const monthName = months[lang]?.[monthIndex] || ''

  return { day, month: monthName, time: timePart }
}
</script>

<template>
  <q-page padding>
    <div class="q-gutter-md">
      <h1>Handel</h1>
      <q-input v-model="searchQuery" label="Suche" class="q-mb-md" :clearable="false">
        <template v-slot:append>
          <div class="q-field__append q-field__marginal row no-wrap items-center q-anchor--skip">
            <i
              class="q-icon notranslate material-icons cursor-pointer q-field__focusable-action"
              aria-label="Clear"
              role="button"
              tabindex="0"
              @click="searchQuery = ''"
            >
              cancel
            </i>
          </div>
        </template>
      </q-input>

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
            <div class="month">{{ formatDate(artikel.date, language).month }}</div>
            <div class="time">{{ formatDate(artikel.date).time }}</div>
          </div>

          <div class="content-block">
            <div class="date-author">{{ artikel.date }} — {{ artikel.author }}</div>
            <div class="titel">{{ artikel.titel[language] }}</div>
            <p class="content-preview">
              {{
                artikel.content[language].length > 150
                  ? artikel.content[language].substring(0, 150) + '...'
                  : artikel.content[language]
              }}
            </p>
          </div>
        </div>
      </q-card>

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
/* Мобильный адаптив */
@media (max-width: 600px) {
  .my-card {
    flex-direction: column;
    align-items: center;
    padding: 12px;
    height: auto;
    box-sizing: border-box;
  }

  .artikel-container {
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 10px;
    padding: 0;
  }

  .artikel-image {
    width: 90%;
    max-width: 320px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 8px;
    margin: 0 auto;
  }

  .date-block {
    position: relative;
    left: auto;
    top: auto;
    margin-bottom: 10px;
    width: auto;
    display: flex;
    flex-direction: row;
    gap: 4px;
    border: none;
    background: none;
    padding: 0;
  }

  .date-block > div {
    background: #f0f0f0;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    color: #333;
  }

  .date-block > div:last-child {
    background: #fa0f2b;
    color: #fff;
    border-radius: 4px;
  }

  .content-block {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
  }

  .titel {
    white-space: normal;
    text-align: center;
    font-size: 16px;
  }

  .date-author,
  .content-preview {
    font-size: 14px;
    text-align: center;
  }

  .content-preview {
    -webkit-line-clamp: 4;
  }

  ::v-deep(.date-block::before),
  ::v-deep(.date-block::after) {
    display: none !important;
  }
}
</style>
