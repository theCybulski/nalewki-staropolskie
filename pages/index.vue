<template>
  <div id="homepage">
    <div
      v-if="
        !this.$store.state.device.isSmall && !this.$store.state.device.isMobile
      "
      :style="{ backgroundImage: `url(${hero.bg})` }"
      class="hero"
    >
      <div class="hero__decoration hero__decoration--left">
        <img
          src="@/assets/decorations/bordiura.png"
          alt="Nalewki Staropolskie"
        />
      </div>
      <div class="hero__content">
        <div class="h-positioner">
          <div class="h-positioner__txt">
            <h2 class="htitle htitle--big">
              {{ hero.title }}
            </h2>
            <p>
              {{ hero.txt }}
            </p>
            <Cta
              :link="localePath('oferta')"
              :txt="$t('stronaGlowna.hero.ctaTekst')"
            />
          </div>
        </div>
        <div class="awards">
          <div class="awards__frame">
            <div class="corner corner--tl"></div>
            <div class="corner corner--tr"></div>
            <div class="corner corner--br"></div>
            <div class="corner corner--bl"></div>
          </div>
          <div class="awards__title">
            {{ $t('stronaGlowna.hero.nagrody') }}
          </div>
          <div class="awards__items">
            <div
              v-for="{ id, logo, name } in awards"
              :key="`award-${id}`"
              class="award"
            >
              <div class="award__logo">
                <img :src="logo" :alt="name" />
              </div>
              <div class="award__name">{{ name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero__decoration hero__decoration--right">
        <img
          src="@/assets/decorations/bordiura.png"
          alt="Nalewki Staropolskie"
        />
      </div>
    </div>
    <div v-else class="hero-mobile">
      <img class="hero-mobile__image" :src="hero.bgMobile" :alt="hero.title" />
      <div class="hero-mobile__content">
        <div class="h-positioner">
          <div class="h-positioner__txt">
            <h2 class="htitle htitle--big">
              {{ hero.title }}
            </h2>
            <p>{{ hero.txt }} }}</p>
            <Cta
              :link="localePath('oferta')"
              :txt="$t('stronaGlowna.hero.ctaTekst')"
            />
          </div>
        </div>
        <div class="awards">
          <div class="awards__frame"></div>
          <div class="awards__title">
            {{ $t('stronaGlowna.hero.nagrody') }}
          </div>
          <div class="awards__items">
            <div
              v-for="{ id, logo, name } in awards"
              :key="`award-${id}`"
              class="award"
            >
              <div class="award__logo">
                <img :src="logo" :alt="name" />
              </div>
              <div class="award__name">{{ name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section v-if="about.showAbout" class="about">
      <DecorFrame />
      <div class="about__txt">
        <h3 class="htitle htitle--label">
          {{ $t('stronaGlowna.oNas.naglowek') }}
        </h3>
        <h2 class="htitle htitle--big">
          {{ about.title }}
        </h2>
        <p>
          {{ about.txt }}
        </p>
        <Cta
          :link="localePath('o-nas')"
          :txt="$t('stronaGlowna.oNas.ctaTekst')"
        />
      </div>
      <div class="about__image"></div>
    </section>
    <section v-if="showRecentProducts" class="recent-products">
      <div class="container">
        <div class="recent-products__title">
          <h2 class="htitle htitle--big">
            {{ $t('stronaGlowna.najnowsze.naglowek') }}
          </h2>
          <div class="title-arrow"></div>
          <nuxt-link :to="localePath('oferta')">
            {{ $t('stronaGlowna.najnowsze.ctaTekst') }}
          </nuxt-link>
        </div>
      </div>
      <div class="recent-products__items">
        <div class="container">
          <hooper
            ref="recent"
            :settings="carouselSettings"
            style="height: auto"
          >
            <slide
              v-for="{ id, thumb, name, slug, year, volumes } in recentProducts"
              :key="id"
            >
              <CardProduct
                :thumb="thumb"
                :name="name"
                :slug="slug"
                :year="year"
                :volumes="volumes"
              />
            </slide>
            <hooper-navigation slot="hooper-addons" />
            <hooper-progress slot="hooper-addons" />
          </hooper>
        </div>
      </div>
    </section>

    <section v-if="showArticles" class="articles">
      <div class="container">
        <div class="articles__title">
          <h2 class="htitle htitle--big">
            {{ $t('stronaGlowna.mediaNaglowek') }}
          </h2>
        </div>

        <div class="articles__wrap">
          <CardArticle
            v-for="{ id, title, content, source, link } in articles"
            :key="id"
            :title="title"
            :content="content"
            :source="source"
            :link="link"
          />
        </div>
      </div>
    </section>
    <PageFooter />
  </div>
</template>

<script>
import axios from 'axios'
import {
  Hooper,
  Slide,
  Navigation as HooperNavigation,
  Progress as HooperProgress
} from 'hooper'
import 'hooper/dist/hooper.css'
import Cta from '../components/ui/Cta'
import DecorFrame from '../components/ui/DecorFrame'
import CardProduct from '../components/CardProduct'
import CardArticle from '../components/CardArticle'
import PageFooter from '../components/PageFooter'
export default {
  head() {
    return {
      title: 'Nalewki Staropolskie',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('seo.descriptionDefault')
        }
      ]
    }
  },
  components: {
    PageFooter,
    CardArticle,
    CardProduct,
    Hooper,
    Slide,
    HooperNavigation,
    HooperProgress,
    DecorFrame,
    Cta
  },
  data() {
    return {
      carouselSettings: {
        mouseDrag: false,
        wheelControl: false,
        keysControl: false,
        transition: 600,
        trimWhiteSpace: true,
        itemsToSlide: 1,
        breakpoints: {
          0: {
            itemsToShow: 1.5
          },
          768: {
            itemsToShow: 3
          },
          1200: {
            itemsToShow: 4.5
          }
        }
      }
    }
  },
  computed: {
    recentProducts() {
      const { iso: lang } = this.$i18n.locales.find(
        (item) => item.code === this.$i18n.locale
      )

      const products = this.$store.state.products.products.map(
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

      return products.filter(({ isRecent }) => isRecent === true)
    },
    lang() {
      const { iso: lang } = this.$i18n.locales.find(
        (item) => item.code === this.$i18n.locale
      )

      return lang
    }
  },
  async asyncData({ store }) {
    const baseUrl = process.env.baseUrl
    const lang = store.app.i18n.locale === 'pl' ? 'pl-PL' : 'en-US'

    let { data: awards } = await axios.get(`${baseUrl}/nagrody?_sort=Order`)
    awards = awards.map(({ id, Logo, Nazwa }) => ({
      id,
      logo: baseUrl + Logo.url,
      name: Nazwa
    }))

    let { data: articles } = await axios.get(
      `${baseUrl}/media-o-nas?_sort=Order`
    )
    articles = articles.map(({ id, Tytul, Zrodlo, Link, Tresc }) => ({
      id,
      title: Tytul,
      source: Zrodlo,
      link: Link,
      content: Tresc
    }))

    let { data: hp } = await axios.get(`${baseUrl}/strona-glowna`)
    hp = hp.map(
      ({ Onas, Najnowsze, Media, Hero, Onas_, HeroBg, HeroBgMobile }) => ({
        hero: {
          bg: baseUrl + HeroBg.url,
          bgMobile: baseUrl + HeroBgMobile.url,
          title: lang === 'pl-PL' ? Hero.Naglowek_PL : Hero.Naglowek_EN,
          txt: lang === 'pl-PL' ? Hero.Tekst_PL : Hero.Tekst_EN
        },
        about: {
          showAbout: Onas,
          title: lang === 'pl-PL' ? Onas_.Naglowek_PL : Onas_.Naglowek_EN,
          txt: lang === 'pl-PL' ? Onas_.Tekst_PL : Onas_.Tekst_EN
        },
        showRecentProducts: Najnowsze,
        showArticles: Media
      })
    )

    return {
      awards,
      articles,
      hero: hp[0].hero,
      about: hp[0].about,
      showRecentProducts: hp[0].showRecentProducts,
      showArticles: hp[0].showArticles
    }
  }
}
</script>

<style lang="scss">
.hero {
  height: calc(100vh + 125px);
  color: $white;
  padding-top: 145px;
  display: flex;
  justify-content: space-between;
  background-color: $black;
  background-size: cover;
  background-position: center;

  &__decoration {
    content: '';
    width: $dtContMargin;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px;

    &--left {
      border-right: 1px solid #5b482f;
    }

    &--right {
      border-left: 1px solid #5b482f;
    }

    img {
      height: 100%;
    }
  }

  &__content {
    width: calc(100% - 290px);
    display: flex;
    flex-direction: column;
  }
}

.h-positioner {
  height: calc(100vh - 125px);
  padding: 0 85px;
  display: flex;
  align-items: center;

  &__txt {
    flex-basis: 55%;
    padding-right: 85px;

    p {
      color: $white80;
      margin-bottom: 25px;
    }
  }
}

.awards {
  position: relative;
  bottom: 35px;
  padding: 25px;
  margin: 0 35px;
  background: transparent;
  border: 1px solid $golden50;

  &__frame {
    pointer-events: none;
    position: absolute;
    content: '';
    top: -5px;
    right: -5px;
    bottom: -5px;
    left: -5px;
    border: 1px solid $golden;
    clip-path: polygon(
      16px 0%,
      calc(100% - 16px) 0%,
      100% 16px,
      100% calc(100% - 16px),
      calc(100% - 16px) 100%,
      16px 100%,
      0% calc(100% - 16px),
      0% 16px
    );

    .corner {
      content: '';
      position: absolute;
      width: 2px;
      height: 25px;
      background: $golden;

      &--tl {
        transform: rotate(45deg);
        left: 6px;
        top: -6px;
      }

      &--tr {
        transform: rotate(-45deg);
        right: 6px;
        top: -6px;
      }

      &--br {
        transform: rotate(45deg);
        right: 6px;
        bottom: -6px;
      }

      &--bl {
        transform: rotate(-45deg);
        left: 6px;
        bottom: -6px;
      }
    }
  }

  &__title {
    position: absolute;
    font-family: 'Adobe Garamond Pro', serif;
    top: -36px;
    left: 0;
    right: 0;
    font-size: 18px;
    color: $golden;
    width: 100%;
    text-align: center;
  }

  &__items {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
}

.award {
  position: relative;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: default;
    .award__name {
      opacity: 0;
    }

    .award__logo {
      opacity: 1;
    }
  }

  &__name {
    text-align: center;
    font-weight: 700;
    color: $golden;
    text-transform: uppercase;
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
  }

  &__logo {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-height: 100%;
    }
  }
}

.about {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 100vh;
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid $golden50;

  &__txt,
  &__image {
    width: 50%;
    height: 100%;
  }

  &__txt {
    padding: 170px 115px 170px $dtContMargin;

    p {
      margin-bottom: 25px;
    }
  }

  &__image {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    background: url('../assets/onas.jpg') no-repeat center;
    background-size: cover;
    overflow: hidden;
  }
}

.recent-products {
  padding: 80px 0;

  &__title {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 2em;

    h2 {
      line-height: 1em;
      margin: 0;
    }

    a {
      font-size: 14px;
      text-transform: uppercase;
      color: $golden;
      opacity: 0.7;
      transition: opacity 0.2s ease-out;

      &:hover {
        opacity: 1;
      }
    }
  }

  &__items {
    .hooper-slide {
      padding: 0 10px;
      position: relative;
    }

    .hooper-navigation {
      & > button {
        &:focus {
          outline: none;
        }
      }
      .hooper-prev {
        left: -50px;
      }

      .hooper-next {
        right: -50px;
      }
    }

    .hooper-progress {
      top: unset;
      height: 1px;
      background-color: #fff;
      bottom: -30px;

      &-inner {
        background-color: $golden;
      }
    }
  }
}

.title-arrow {
  content: '';
  position: relative;
  top: 50%;
  display: block;
  flex: 1;
  height: 1px;
  background: $golden60;
  margin: 0 50px 0 30px;
  &:before,
  &:after {
    content: '';
    position: absolute;
  }

  &:before {
    left: -10px;
    width: 5px;
    height: 5px;
    transform: rotate(45deg);
    background: $golden60;
    top: -2px;
  }

  &:after {
    content: '';
    position: absolute;
    width: 25px;
    height: 10px;
    right: -27px;
    top: -5px;
    mask: url('../assets/decorations/arrowhead-1.svg') no-repeat center;
    mask-size: contain;
    background: $golden60;
  }
}

.articles {
  margin-bottom: 80px;
  &__title {
    margin-bottom: 2em;
  }
  &__wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }
}

@media (min-width: $brOverMobile) and (max-width: $brSmall) {
  .award {
    width: 28vw;
  }
}

@media (max-width: $brSmall) {
  .hero {
    display: none;
  }

  .hero-mobile {
    background: #000;
    overflow: hidden;

    &__image {
      width: 100%;
    }
  }

  .h-positioner {
    padding: 0;
    height: auto;
    flex-direction: column;
    margin-bottom: 85px;

    &__txt {
      order: 2;
      padding: 0 30px;
      text-align: center;
    }
  }

  .awards {
    margin: 0;
    padding: 25px 0;
    bottom: 5px;
    position: relative;
    border-left: none;
    border-right: none;

    &__frame {
      clip-path: unset;
      border-bottom: none;

      .corner {
        display: none;
      }
    }

    &__items {
      display: block;
      overflow-x: scroll;
      grid-template-columns: unset;
      white-space: nowrap;
    }
  }

  .award {
    display: inline-block;
    white-space: normal;

    &:hover {
      .award__name {
        opacity: 1;
      }

      .award__logo {
        opacity: 1;
      }
    }

    &__logo {
      position: relative;
      opacity: 1;
      margin-bottom: 10px;

      img {
        height: 70px;
      }
    }

    &__name {
      line-height: 1.1;
      opacity: 1;
    }
  }

  .about {
    border: none;
    &__txt,
    &__image {
      width: 100%;
    }

    &__txt {
      height: auto;
      position: absolute;
      bottom: 0;
      z-index: 1;
      padding: 0 30px 40px;
      text-align: center;

      p {
        display: none;
      }
    }

    &__image {
      background: url('../assets/onas-mobile.jpg') no-repeat center;
      background-size: cover;

      &:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.2);
      }
    }
  }

  .recent-products {
    padding: 20px 0;
    margin-top: 40px;
    &__title {
      flex-direction: column;
      text-align: center;

      a {
        display: none;
      }

      .htitle {
        order: 2;
      }
    }
  }

  .title-arrow {
    display: none;
  }

  .articles {
    margin-top: 50px;

    &__wrap {
      grid-template-columns: repeat(1, 1fr);
      grid-row-gap: 30px;
    }
  }
}

@media (max-width: $brMobile) {
  .awards {
    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 0;
      width: 30%;
      height: 100%;
      z-index: 3;
      pointer-events: none;
    }

    &:before {
      left: 0;
      background: linear-gradient(90deg, #000 0, rgba(0, 0, 0, 0) 100%);
    }

    &:after {
      right: 0;
      background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0, #000 100%);
    }
  }

  .award {
    width: 60vw;

    &:first-child {
      margin-left: 20vw;
    }

    &:last-child {
      margin-right: 20vw;
    }
  }

  .about__txt {
    .cta-holder {
      width: auto;

      .cta {
        width: auto;
      }
    }
  }

  .recent-products {
    .hooper-navigation {
      display: none;
    }

    .hooper-progress {
      bottom: -15px;
    }
  }
}
</style>
