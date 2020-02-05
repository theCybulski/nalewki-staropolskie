<template>
  <div id="kontakt">
    <div class="contact">
      <div class="row">
        <div class="column">
          <div class="contact__title">
            <h1 v-if="title" class="htitle htitle--big">
              {{ title }}
            </h1>
            <p v-if="txt">{{ txt }}</p>
          </div>
          <div class="contact__data">
            <div class="row">
              <div class="column">
                <a v-if="tel" :href="`tel:${tel}`">
                  {{ tel }}
                </a>
                <br />
                <a v-if="tel2" :href="`tel:${tel2}`">
                  {{ tel2 }}
                </a>
                <br />
                <a v-if="mail" :href="`mailto:${mail}`">
                  {{ mail }}
                </a>
              </div>
              <div class="column">
                <h2 class="htitle htitle--small">
                  NALEWKI STAROPOLSKIE <br />
                  Karol Majewski i Wspólnicy Sp. z o.o.
                </h2>
                <div v-if="address" v-html="address"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="contact__image">
            <img src="@/assets/karol-majewski.png" alt="Karol Majewski" />
          </div>
        </div>
      </div>
    </div>
    <PageFooter />
  </div>
</template>

<script>
import PageFooter from '../components/PageFooter'

export default {
  head() {
    return {
      title: this.$t('mainNav.kontakt'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('seo.descriptionDefault')
        }
      ]
    }
  },
  components: { PageFooter },
  nuxtI18n: {
    paths: {
      pl: '/kontakt',
      en: '/contact'
    }
  },
  data() {
    return {
      titlePl: this.$store.state.contact.contact.titlePl,
      titleEn: this.$store.state.contact.contact.titleEn,
      txtPl: this.$store.state.contact.contact.txtPl,
      txtEn: this.$store.state.contact.contact.txtEn,
      address: this.$store.state.contact.contact.address,
      tel: this.$store.state.contact.contact.tel,
      tel2: this.$store.state.contact.contact.tel2,
      mail: this.$store.state.contact.contact.mail
    }
  },
  transition: {
    name: 'fade'
  },
  computed: {
    lang() {
      const { iso: lang } = this.$i18n.locales.find(
        (item) => item.code === this.$i18n.locale
      )

      return lang
    },
    title() {
      return this.lang === 'pl-PL' ? this.titlePl : this.titleEn
    },
    txt() {
      return this.lang === 'pl-PL' ? this.txtPl : this.txtEn
    }
  }
}
</script>

<style lang="scss">
.contact {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 125px);
  background: url('../assets/kontakt-bg.jpg') no-repeat center;
  background-size: cover;
  color: $greyLight;
  display: flex;
  align-items: center;

  & > .row {
    width: 100%;
    & > .column {
      &:first-child {
        padding-left: $dtContMargin;
        height: 100%;
        align-items: center;
      }
    }
  }

  &__title {
    margin-bottom: 40px;
  }

  &__data {
    .column {
      border-left: 1px solid $greyLight;
      padding-left: 30px;

      &:first-child {
        font-size: 24px;
        line-height: 1.8em;
      }

      &:last-child {
        .htitle {
          text-transform: none;
          color: inherit;
          margin-bottom: 1em;
        }
      }
    }

    a {
      font-family: 'Adobe Garamond Pro', serif;
      color: $greyLight;

      &:hover {
        color: $golden;
      }
    }
  }

  &__image {
    position: absolute;
    width: 50%;
    height: 90%;
    bottom: 0;
    overflow: hidden;
    text-align: center;

    img {
      height: 100%;
    }
  }
}

@media (min-width: $brOverMobile) and (max-width: $brSmall) {
  .contact {
    .column {
      flex-basis: 100%;
    }

    & > .row > .column {
      &:first-child {
        padding: 0 $midContMargin;
      }

      &:last-child {
        display: none;
      }
    }
  }
}

@media (max-width: $brMobile) {
  .contact {
    height: calc(100vh - 80px);
    & > .row > .column {
      &:first-child {
        padding: 0 30px;
      }

      &:last-child {
        display: none;
      }
    }

    &__title {
      margin-bottom: 30px;
    }

    &__data {
      .column {
        &:first-child {
          margin-bottom: 45px;
        }
      }
    }
  }
}
</style>
