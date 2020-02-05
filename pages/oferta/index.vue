<template>
  <div id="oferta" class="page-wrapper">
    <div class="container">
      <h1 class="htitle htitle--big">
        {{ $t('oferta.title') }}
      </h1>
      <div class="products-list">
        <CardProduct
          v-for="{ id, thumb, name, slug, volumes, year } in products"
          :key="id"
          :thumb="thumb"
          :name="name"
          :slug="slug"
          :year="year"
          :volumes="volumes"
        />
      </div>
    </div>
    <PageFooter />
  </div>
</template>

<script>
import PageFooter from '../../components/PageFooter'
import CardProduct from '../../components/CardProduct'
export default {
  head() {
    return {
      title: this.$t('mainNav.oferta'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('seo.descriptionDefault')
        }
      ]
    }
  },
  components: { CardProduct, PageFooter },
  nuxtI18n: {
    paths: {
      pl: '/oferta',
      en: '/offer'
    }
  },
  transition: {
    name: 'fade'
  },
  computed: {
    products() {
      const { iso: lang } = this.$i18n.locales.find(
        (item) => item.code === this.$i18n.locale
      )

      return this.$store.state.products.products.map(
        ({
          id,
          isRecent,
          thumb,
          namePl,
          nameEn,
          slugPl,
          slugEn,
          volumes,
          year
        }) => ({
          id,
          isRecent,
          thumb,
          name: lang === 'pl-PL' ? namePl : nameEn,
          slug: lang === 'pl-PL' ? slugPl : slugEn,
          volumes,
          year
        })
      )
    }
  }
}
</script>

<style lang="scss">
#oferta .container > .htitle {
  margin: 1em 0 1.5em;
}
.products-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px 15px;
  margin-bottom: 100px;
}

@media (min-width: $brOverMobile) and (max-width: $brSmall) {
  .products-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: $brMobile) {
  #oferta > .container {
    margin: 0 15px;
  }

  .products-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
