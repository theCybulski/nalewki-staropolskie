<template>
  <div id="zestawy-prezentowe">
    <div class="packs-holder">
      <BlockGiftPack
        v-for="{ id, name, desc, type, variants } in packs"
        :key="id"
        :name="name"
        :description="desc"
        :pack-type="type"
        :variants="variants"
        @openForm="setFormData"
      />
    </div>
    <transition name="showForm">
      <div v-if="form.show" class="form-holder">
        <div class="form-holder__overlay"></div>
        <ContactForm :subject="form.subject" @closeForm="form.show = false" />
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import BlockGiftPack from '../components/BlockGiftPack'
import ContactForm from '../components/ContactForm'

export default {
  head() {
    return {
      title: this.$t('mainNav.zestawyPrezentowe'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('seo.descriptionDefault')
        }
      ]
    }
  },
  components: { ContactForm, BlockGiftPack },
  nuxtI18n: {
    paths: {
      pl: '/zestawy-prezentowe',
      en: '/gift-packs'
    }
  },
  data() {
    return {
      form: {
        show: false,
        subject: null
      }
    }
  },
  async asyncData({ app }) {
    const baseUrl = process.env.baseUrl
    const { iso: lang } = app.i18n.locales.find(
      ({ code }) => code === app.i18n.locale
    )

    let { data: packs } = await axios.get(
      `${baseUrl}/zestawy-prezentowe?_sort=Order`
    )
    /* eslint-disable camelcase */
    packs = packs.map(
      ({
        id,
        Nazwa_PL,
        Nazwa_EN,
        Rodzaj_PL,
        Rodzaj_EN,
        Opis_PL,
        Opis_EN,
        Warianty
      }) => ({
        id,
        name: lang === 'pl-PL' ? Nazwa_PL : Nazwa_EN,
        type: lang === 'pl-PL' ? Rodzaj_PL : Rodzaj_EN,
        desc:
          lang === 'pl-PL'
            ? Opis_PL && Opis_PL.replace(/\n/g, '<br/>')
            : Opis_EN && Opis_EN.replace(/\n/g, '<br/>'),
        variants: Warianty.map(
          ({
            id,
            Wartosc_PL,
            Wartosc_EN,
            Szczegoly_PL,
            Szczegoly_EN,
            Zdjecia
          }) => ({
            id,
            value: lang === 'pl-PL' ? Wartosc_PL : Wartosc_EN,
            details:
              lang === 'pl-PL'
                ? Szczegoly_PL && Szczegoly_PL.replace(/\n/g, '<br/>')
                : Szczegoly_EN && Szczegoly_EN.replace(/\n/g, '<br/>'),
            photos: Zdjecia.map(({ url }) => baseUrl + url)
          })
        )
      })
    )
    /* eslint-enable camelcase */

    return { packs }
  },
  transition: {
    name: 'fade'
  },
  methods: {
    setFormData(value) {
      this.form.show = true
      this.form.subject = value
    }
  }
}
</script>

<style lang="scss"></style>
