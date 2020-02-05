export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head() {
    return {
      title: 'Nalewki Staropolskie',
      meta: [
        { charset: 'utf-8' },
        { name: 'author', content: 'Highline Studio, The Cybulski' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Nalewki Staropolskie'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Ekskluzywne upominki dla firm i osób prywatnych.'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'http://nalewki.pl'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'http://nalewki.pl/ogimage.png'
        },
        {
          hid: 'og:locale',
          property: 'og:locale',
          content: 'pl_PL'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css?family=Poppins:300,400,700&display=swap&subset=latin-ext'
        },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css?family=Playfair+Display:700&display=swap'
        }
      ]
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#bd8a5d' },
  /*
   ** Global CSS
   */
  css: [],

  serverMiddleware: ['~/api/contact'],

  router: {
    middleware: ['fetchData']
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~plugins/v-calendar', ssr: false }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/style-resources', 'nuxt-leaflet', 'nuxt-i18n'],
  i18n: {
    locales: [
      { code: 'pl', iso: 'pl-PL', file: 'pl-PL.js', name: 'PL' },
      { code: 'en', iso: 'en-US', file: 'en-US.js', name: 'EN' }
    ],
    defaultLocale: 'pl',
    lazy: true,
    langDir: 'lang/'
  },

  env: {
    baseUrl: 'http://admin.nalewki.pl',
  },

  styleResources: {
    scss: ['assets/scss/main.scss']
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
