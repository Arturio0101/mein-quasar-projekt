import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    home: {
      title: 'Home Page',
      text: 'This is text on the home page ;)',
    },
    menu: {
      my_pages: 'My Pages',
      home: 'Home',
      home_caption: 'Home Page',
      handel: 'Trade',
      handel_caption: 'News and Articles',
      add_news: 'Add News',
      add_news_caption: 'Create your own news',
      app_title: 'My Test Quasar Project',
    },
    add_news: {
      title: 'Add News',
      description: 'Here you can add a new news article.',
    },
  },
  de: {
    home: {
      title: 'Startseite',
      text: 'Dies ist ein Text auf der Startseite ;)',
    },
    menu: {
      my_pages: 'Meine Seiten',
      home: 'Startseite',
      home_caption: 'Startseite',
      handel: 'Handel',
      handel_caption: 'Nachrichten und Artikel',
      add_news: 'News hinzufügen',
      add_news_caption: 'Eigene News erstellen',
      app_title: 'Mein Test Quasar Projekt',
    },
    add_news: {
      title: 'News hinzufügen',
      description: 'Hier kannst du einen neuen Nachrichtenartikel hinzufügen.',
    },
  },
}

const i18n = createI18n({
  locale: 'de', // <- язык по умолчанию: немецкий
  fallbackLocale: 'en',
  legacy: false,
  messages,
})

export default ({ app }) => {
  app.use(i18n)
}

export { i18n }
