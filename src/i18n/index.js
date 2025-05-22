import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    home: {
      title: 'Home Page',
      text: 'This is text on the home page ;)',
    },
  },
  de: {
    home: {
      title: 'Startseite',
      text: 'Dies ist ein Text auf der Startseite ;)',
    },
  },
}

const i18n = createI18n({
  locale: 'de', // язык по умолчанию — немецкий
  fallbackLocale: 'en',
  messages,
})

export default i18n
