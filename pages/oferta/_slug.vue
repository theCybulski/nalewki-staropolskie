<template>
  <div id="single-product" class="page-wrapper">
    <div class="offer-bg">
      <div class="offer-bg__image"></div>
      <div class="offer-bg__gradient"></div>
    </div>
    <div class="prod-nav">
      <button
        :class="{ 'prod-nav--disabled': !getPrevProduct }"
        class="prod-nav__prev"
        @click="goPrevProduct"
      >
        <span class="prod-nav__icon"></span>
        <span class="prod-nav__title">
          {{ getPrevProduct.name }}
        </span>
      </button>
      <button class="prod-nav__close" @click="closeProduct">
        <span class="prod-nav__icon"></span>
      </button>
      <button
        :class="{ 'prod-nav--disabled': !getNextProduct }"
        class="prod-nav__next"
        @click="goNextProduct"
      >
        <span class="prod-nav__icon"></span>
        <span class="prod-nav__title">
          {{ getNextProduct.name }}
        </span>
      </button>
    </div>
    <DecorFrame :tr="false" />
    <div class="row">
      <div class="block-product">
        <div class="column-grid">
          <div class="product-data">
            <h3 class="htitle htitle--label">
              {{ $t('oferta.smTitle') }}
            </h3>
            <h1 v-if="product.name" class="htitle htitle--big">
              {{ product.name }}
            </h1>
            <div
              v-if="product.desc"
              class="product-data__description"
              v-html="product.desc"
            ></div>
            <div class="product-data__secondary">
              <div v-if="product.year" class="detail">
                <h5 class="htitle htitle--mini">{{ $t('oferta.rocznik') }}:</h5>
                <span class="htitle htitle--small">{{ product.year }}</span>
              </div>
              <div v-if="product.awards.length > 0" class="detail">
                <h5 class="htitle htitle--mini">{{ $t('oferta.nagrody') }}:</h5>
                <div class="detail__awards">
                  <img
                    v-for="{ id, logo, name } in product.awards"
                    :key="`award${id}`"
                    :src="logo"
                    :alt="name"
                  />
                </div>
              </div>
            </div>
            <Cta
              ref="cta"
              :is-link="false"
              :txt="$t('oferta.ctaTekst')"
              @click="openForm"
            />
            <div class="usp">
              <div class="usp__item">
                <img
                  src="~/assets/icons/icon-home_hand_made.svg"
                  alt="Nalewki hand made"
                />
              </div>
              <div class="usp__item">
                <img
                  src="~/assets/icons/icon_lezakowanie.svg"
                  alt="Nalewki leżakowane"
                />
              </div>
              <div class="usp__item">
                <img
                  src="~/assets/icons/icon-bez_chemii.svg"
                  alt="Nalewki bez chemii"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="column-grid">
          <div class="product-details">
            <div v-if="product.year" class="product-details__year">
              <div class="big-year">{{ product.year }}</div>
            </div>
            <div v-if="product.features" class="product-details__features">
              <ul class="features">
                <li
                  v-for="{ id, name } in product.features"
                  :key="`feature${id}`"
                  class="features__item"
                >
                  {{ name }}
                </li>
              </ul>
            </div>
            <div v-if="product.volumes" class="product-details__volumes">
              <ul class="big-volumes">
                <li
                  v-for="({ id, value }, index) in product.volumes"
                  :key="`volume${id}`"
                  :class="{
                    'big-volumes__item--active': activeBottle === index
                  }"
                  class="big-volumes__item"
                  @click="changeBottle(index)"
                >
                  {{ value }}
                </li>
                <li class="big-volumes__item big-volumes__item--unit">
                  ml
                </li>
              </ul>
            </div>
            <div v-if="product.volumes" class="product-details__photo">
              <hooper
                ref="prodCarousel"
                :wheel-control="false"
                :keys-control="false"
                :transition="600"
                :items-to-show="1"
                :initial-slide="defaultVolume"
                style="height: 100%"
                @slide="changeSlide"
              >
                <slide v-for="{ value, photo } in product.volumes" :key="value">
                  <img
                    v-if="photo"
                    :src="photo"
                    :alt="`${product.name} o pojemności - ${value}`"
                  />
                </slide>
              </hooper>
            </div>
          </div>
        </div>
      </div>
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
import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css'
import { TweenMax } from 'gsap'
import DecorFrame from '../../components/ui/DecorFrame'
import Cta from '../../components/ui/Cta'
import ContactForm from '../../components/ContactForm'

export default {
  head() {
    return {
      title: this.product.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.seoDescription
        }
      ]
    }
  },
  components: { ContactForm, Hooper, Slide, Cta, DecorFrame },
  nuxtI18n: {
    paths: {
      pl: '/oferta/:slug',
      en: '/offer/:slug'
    }
  },
  data() {
    return {
      awards: this.$store.state.awards.awards,
      activeBottle: null,
      form: {
        show: false,
        subject: null
      }
    }
  },
  validate({ params, store, app }) {
    const { products } = store.state.products
    const { iso: lang } = app.i18n.locales.find(
      ({ code }) => code === app.i18n.locale
    )

    if (lang === 'pl-PL') {
      return products.find(({ slugPl }) => slugPl === params.slug)
    } else {
      return products.find(({ slugEn }) => slugEn === params.slug)
    }
  },
  transition(to, from) {
    if (from) {
      const inner =
        (to.name === 'oferta-slug___pl' && from.name === 'oferta-slug___pl') ||
        (to.name === 'oferta-slug___en' && from.name === 'oferta-slug___en')

      if (inner) return 'innerTransition'
    }

    return 'fade'
  },
  computed: {
    products() {
      const { products } = this.$store.state.products
      const { iso: lang } = this.$i18n.locales.find(
        (item) => item.code === this.$i18n.locale
      )

      return products.map(
        ({
          id,
          thumb,
          awards,
          namePl,
          nameEn,
          slugPl,
          slugEn,
          descPl,
          descEn,
          volumes,
          year,
          features
        }) => ({
          id,
          thumb,
          awards,
          name: lang === 'pl-PL' ? namePl : nameEn,
          slug: lang === 'pl-PL' ? slugPl : slugEn,
          desc: lang === 'pl-PL' ? descPl : descEn,
          volumes,
          year,
          features: features.map(({ id, namePl, nameEn }) => ({
            id,
            name: lang === 'pl-PL' ? namePl : nameEn
          }))
        })
      )
    },
    product() {
      return this.products.find(
        ({ slug }) => slug === this.$router.history.current.params.slug
      )
    },
    seoDescription() {
      if (this.product.desc) {
        return this.product.desc.replace(/<\/?[^>]+(>|$)/g, '')
      }
      return ''
    },
    getPrevProduct() {
      const index = this.products.indexOf(this.product) - 1
      if (index >= 0) {
        return this.products[index]
      }

      return { name: '' }
    },
    getNextProduct() {
      const index = this.products.indexOf(this.product) + 1

      if (index < this.products.length) {
        return this.products[index]
      }

      return { name: '' }
    },
    defaultVolume() {
      const index = this.product.volumes.indexOf(
        this.product.volumes.find((item) => {
          return item.value.toString() === '350'
        })
      )

      return index > -1 ? index : 0
    }
  },
  mounted() {
    document.onkeyup = this.keyboardNav
    this.activeBottle = this.setDefaultVolume()
  },
  beforeDestroy() {
    document.onkeyup = () => {}
  },
  methods: {
    keyboardNav(event) {
      if (!this.form.show) {
        switch (event.key) {
          case 'ArrowLeft':
            this.goPrevProduct()
            break
          case 'ArrowRight':
            this.goNextProduct()
            break
          case 'Escape':
            this.closeProduct()
            break
        }
      }
    },
    goPrevProduct() {
      const index = this.products.indexOf(this.product) - 1
      if (index >= 0 && this.$i18n) {
        this.$router.push(
          this.localePath({
            name: 'oferta-slug',
            params: { slug: this.getPrevProduct.slug }
          })
        )
      }
    },
    goNextProduct() {
      const index = this.products.indexOf(this.product) + 1
      if (index <= this.products.length - 1 && this.$i18n) {
        this.$router.push(
          this.localePath({
            name: 'oferta-slug',
            params: { slug: this.getNextProduct.slug }
          })
        )
      }
    },
    closeProduct() {
      this.$router.push(this.localePath('oferta'))
    },
    changeSlide(payload) {
      this.fadeImages(payload)
      this.changeBottle(payload.currentSlide)
    },
    fadeImages(payload) {
      const caro = this.$refs.prodCarousel.$el
      const slides = caro.querySelectorAll('.hooper-slide')

      Array.from(slides, (slide) => {
        TweenMax.to(slide, 1, { opacity: 0 }).duration(0.2)
      })

      TweenMax.to(slides[payload.currentSlide], 1, { opacity: 1 })
        .duration(0.4)
        .delay(0.2)
    },
    changeBottle(index) {
      this.activeBottle = index
      this.$refs.prodCarousel.slideTo(index)
    },
    setDefaultVolume(defaultVolume) {
      const index = this.product.volumes.indexOf(
        this.product.volumes.find((item) => {
          return item.value === defaultVolume
        })
      )

      this.activeBottle = index > -1 ? index : 0
    },
    openForm() {
      this.form.show = true
      this.form.subject = `Zapytanie o nalewkę ${this.product.name}`
    }
  }
}
</script>

<style lang="scss">
.innerTransition-enter-active,
.innerTransition-leave-active {
  transition-duration: 1s;
  .product-data {
    .htitle--label,
    .htitle--big {
      transition: opacity 0.2s ease-out, transform 0.3s ease-out;
    }

    &__description,
    &__secondary,
    .cta-holder {
      transition: opacity 0.2s ease-out 0.1s, transform 0.3s ease-out 0.1s;
    }

    .usp {
      transition: opacity 0.2s ease-out 0.2s, transform 0.3s ease-out 0.2s;
    }
  }

  .product-details {
    &__photo {
      transition: opacity 0.5s ease-out, transform 0.6s ease-out;
    }

    &__year,
    &__volumes,
    &__features {
      transition: opacity 0.5s ease-out;
    }
  }
}

.innerTransition-enter,
.innerTransition-leave-active {
  .product-data {
    .htitle--label,
    .htitle--big,
    &__description,
    &__secondary,
    .cta-holder,
    .usp {
      opacity: 0;
      transform: translateY(-50px);
    }
  }

  .product-details {
    &__photo {
      opacity: 0;
      transform: translateX(-300px);
    }

    &__year,
    &__volumes,
    &__features {
      opacity: 0;
    }
  }
}

#single-product {
  position: relative;
  .decor-frame {
    z-index: 0;
  }
}

.block-product {
  display: flex;
  width: 100%;
  min-height: 100vh;

  .product-data {
    height: 100%;
  }
}

.detail {
  margin-right: 50px;
  display: flex;
  align-items: center;

  &:last-child {
    margin-right: 0;
  }

  .htitle {
    &--small {
      color: $black;
    }

    &--mini {
      margin-right: 15px;
    }
  }

  &__awards {
    img {
      max-height: 60px;
      margin-right: 30px;
      display: inline-block;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}

.usp {
  position: absolute;
  display: flex;
  bottom: 40px;

  &__item {
    margin-right: 45px;

    &:last-child {
      margin-right: 0;
    }

    svg {
      max-height: 70px;
    }
  }
}

.big-year {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-variant-numeric: lining-nums;
  font-size: 144px;
  transform-origin: center;
  transform: rotate(90deg) translateY(30px);
  opacity: 0.3;
}

.features {
  list-style: none;
  padding: 0;
  margin: 0;

  &__item {
    position: relative;
    text-align: right;
    margin-bottom: 65px;
    padding-right: calc(9vw + 15px);
    color: $golden;

    &:last-child {
      margin-bottom: 0;
    }

    &:after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      background: $black30;
      width: 9vw;
      height: 1px;
    }
  }
}

.big-volumes {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;

  &__item {
    font-weight: 700;
    color: $black;
    opacity: 0.3;
    transition: opacity 0.2s ease-in-out;
    margin-right: 30px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &--unit {
      font-weight: 400;
    }

    &--active {
      opacity: 1;
    }
  }
}

@media (max-width: $brSmall) {
  #single-product {
    .product-details__photo .hooper-slide {
      align-items: flex-start;
    }

    .block-product {
      flex-direction: column;
    }

    .decor-frame {
      display: none;
    }

    .prod-nav {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 60px;
      display: flex;
      background: #fff;
      align-items: center;
      justify-content: center;
      z-index: 99;

      &__close,
      &__prev,
      &__next {
        position: relative;
        top: unset;
        right: unset;
        bottom: unset;
        left: unset;
        transform-origin: center;
        width: 50px;
        height: 100%;
      }

      &__prev {
        transform: translateY(0) rotate(-90deg);
      }

      &__next {
        transform: translateY(0) rotate(90deg);
      }

      &__title {
        display: none;
      }
    }

    .product-data {
      display: flex;
      justify-content: flex-start;

      .htitle--label {
        order: 1;
      }

      .htitle--big {
        order: 2;
      }

      &__description {
        order: 3;
      }

      &__secondary {
        order: 4;
      }

      .cta-holder {
        order: 6;
      }
    }
  }

  .block-product {
    min-height: auto;
  }

  .usp {
    position: static;
    order: 5;
    justify-content: space-between;
    margin-bottom: 40px;

    &__item {
      margin-right: 0;
    }
  }

  .big-year {
    font-size: 108px;
    transform: rotate(90deg) translateY(40px);
  }

  .features {
    list-style: none;
    padding: 0;
    margin: 0;

    &__item {
      margin-bottom: 45px;
      padding-right: calc(9vw + 20px);

      &:after {
        display: none;
      }
    }
  }

  .big-volumes {
    &__item {
      margin-right: 20px;
    }
  }
}
</style>
