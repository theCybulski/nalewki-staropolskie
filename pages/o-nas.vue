<template>
  <div id="onas">
    <div class="filler"></div>
    <div class="timeline">
      <button
        v-if="showGoTop"
        class="timeline__gotop"
        @click="goToSlide($refs.slider, 0)"
      >
        <span class="gotop-icon" />
      </button>
      <div class="timeline__sidebar">
        <span class="tl-nav-indicator" />
        <hooper
          ref="navSlider"
          :vertical="true"
          :items-to-show="9"
          :center-mode="true"
          :wheel-control="false"
          :keys-control="false"
          :mouse-drag="false"
          :touch-drag="false"
          :short-drag="false"
          :pagination="false"
          :style="{ height: navSliderHeight }"
          class="tl-nav"
          @afterSlide="repaintNav"
        >
          <slide
            v-for="{ year, slideIndex } in years"
            :key="slideIndex"
            class="tl-nav__item"
          >
            <span @click="goToSlide($refs.slider, slideIndex)">
              {{ year }}
            </span>
          </slide>
        </hooper>
      </div>
      <div class="timeline__slides">
        <hooper
          ref="slider"
          :vertical="true"
          :items-to-show="1"
          :center-mode="true"
          :short-drag="false"
          :transition="650"
          style="height: 100vh"
          @slide="changeSlide"
          @afterSlide="animateImage"
        >
          <slide
            v-for="{ id, variant, year, title, desc, image } in slides"
            :key="`slide-${id}`"
            :class="`tl-slide--${variant}`"
            class="tl-slide"
          >
            <div
              :style="{ backgroundImage: `url(${image})` }"
              class="tl-slide__image"
            ></div>
            <div class="tl-slide__content">
              <span class="htitle htitle--label tl-year">{{ year }}</span>
              <h2 class="htitle htitle--big">
                {{ title }}
              </h2>
              <div
                v-if="desc"
                class="tl-slide__description"
                v-html="desc"
              ></div>
            </div>
          </slide>
        </hooper>
      </div>
    </div>
  </div>
</template>

<script>
import { TweenMax } from 'gsap'
import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css'
import axios from 'axios'

export default {
  head() {
    return {
      title: this.$t('mainNav.oNas'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('seo.descriptionOnas')
        }
      ]
    }
  },
  components: {
    Hooper,
    Slide
  },
  nuxtI18n: {
    paths: {
      pl: '/o-nas',
      en: '/about-us'
    }
  },
  data() {
    return {
      navSliderHeight: '400px',
      showGoTop: false
    }
  },
  transition: {
    name: 'fade'
  },
  computed: {
    years() {
      const years = this.slides.map((item, i) => ({
        slideIndex: i,
        year: item.year
      }))

      const uniqueYears = []

      years.forEach((item) => {
        const isInArray = uniqueYears.find((year) => {
          return year.year === item.year
        })

        !isInArray && uniqueYears.push(item)
      })

      return uniqueYears
    }
  },
  async asyncData({ app }) {
    const baseUrl = process.env.baseUrl
    const { iso: lang } = app.i18n.locales.find(
      ({ code }) => code === app.i18n.locale
    )

    let { data: slides } = await axios.get(`${baseUrl}/o-nas?_sort=Order`)
    /* eslint-disable camelcase */
    slides = slides.map(
      (
        {
          id,
          Wariant,
          Rok,
          Naglowek_PL,
          Naglowek_EN,
          Opis_PL,
          Opis_EN,
          Zdjecie
        },
        i
      ) => ({
        id,
        variant: Wariant,
        image: baseUrl + Zdjecie.url,
        year: Rok,
        title: lang === 'pl-PL' ? Naglowek_PL : Naglowek_EN,
        desc:
          lang === 'pl-PL'
            ? Opis_PL && Opis_PL.replace(/\n/g, '<br/>')
            : Opis_EN && Opis_EN.replace(/\n/g, '<br/>')
      })
    )
    /* eslint-enable camelcase */

    slides[0].year = lang === 'pl-PL' ? 'O nas' : 'About'

    return { slides }
  },
  mounted() {
    if (this.$store.state.device.isMobile) {
      this.navSliderHeight = '300px'
    }
  },
  methods: {
    changeSlide() {
      setTimeout(this.animateImage, 500)

      const firstSlide = document.getElementsByClassName('tl-slide')[0]
      const header = document.getElementsByClassName('page-header')[0]

      setTimeout(() => {
        // show/hide header
        if (firstSlide.classList.contains('is-active')) {
          header.classList.remove('hidden')
          this.showGoTop = false
        } else {
          this.showGoTop = true
          header.classList.add('hidden')
        }

        // change nav active item
        const slider = this.$refs.slider
        const navSlider = this.$refs.navSlider
        const activeSlide = slider.$el.getElementsByClassName('is-current')[0]

        if (activeSlide.getElementsByClassName('tl-year')[0]) {
          const slideYear = activeSlide.getElementsByClassName('tl-year')[0]
            .textContent

          const navIndex = this.years.indexOf(
            this.years.find((item) => {
              return item.year === slideYear
            })
          )

          this.goToSlide(navSlider, navIndex)
        } else {
          this.goToSlide(navSlider, 0)
        }
      }, 0)
    },
    goToSlide(slider, slideIndex) {
      slider.slideTo(slideIndex)
    },
    repaintNav() {
      // set opacity for before and after current nav items
      const navSlider = this.$refs.navSlider
      const navItems = navSlider.$el.querySelectorAll('.hooper-track')[0]
      const currNavItem = navItems.getElementsByClassName('is-current')[0]
      const currNavItemIndex = Array.from(navItems.childNodes).indexOf(
        currNavItem
      )

      let isAfterCurrent = false
      let opacity = 0.2

      for (let i = -4; i <= 4; i++) {
        const item = navItems.childNodes[currNavItemIndex + i]

        if (item) TweenMax.to(item, 0.4, { opacity })

        if (opacity === 1) isAfterCurrent = true

        isAfterCurrent ? (opacity -= 0.2) : (opacity += 0.2)
      }
    },
    animateImage() {
      const activeSlide = this.$refs.slider.$el.getElementsByClassName(
        'is-current'
      )[0]
      const slideImages = document.querySelectorAll('.tl-slide__image')
      const activeImage = activeSlide.getElementsByClassName(
        'tl-slide__image'
      )[0]

      if (this.$store.state.device.isMobile) {
        slideImages.forEach((item) => {
          TweenMax.to(item, 0, {
            transform: 'translate(0)'
          })
        })

        TweenMax.to(activeImage, 20, {
          transform: 'translate(calc(-100% + 100vw))'
        })
      } else {
        slideImages.forEach((item) => {
          TweenMax.to(item, 0, {
            css: { scaleX: 1, scaleY: 1 }
          })
        })

        TweenMax.to(activeImage, 20, {
          css: { scaleX: 1.1, scaleY: 1.1 }
        })
      }
    }
  }
}
</script>

<style lang="scss">
.timeline {
  position: relative;

  &__gotop {
    position: absolute;
    z-index: 9;
    bottom: 30px;
    right: 30px;
    background: transparent;
    width: 50px;
    height: 50px;
    border: 1px solid rgba(189, 138, 93, 0.51);
    cursor: pointer;

    &:hover {
      border: 1px solid $golden;
    }

    &:focus {
      outline: none;
    }

    .gotop-icon {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: url(../assets/decorations/arrowhead-2.svg) center no-repeat
        transparent;
      transform: rotate(-90deg);
    }
  }

  &__sidebar {
    position: absolute;
    left: 0;
    top: 0;
    width: 145px;
    height: 100vh;
    z-index: 1;
    border-right: 1px solid $golden50;
    color: $golden;
    display: flex;
    align-items: center;
    justify-content: center;

    &:before {
      content: '';
      position: absolute;
      width: 25vw;
      height: 100%;
      top: 0;
      left: 0;
      background: linear-gradient(
        -90deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.6) 100%
      );
    }
  }

  .tl-slide {
    position: relative;
    min-height: 100vh;
    padding: 35px 145px 35px 220px;
    background-color: #000;
    display: flex;
    overflow: hidden;

    &--top,
    &.hooper-slide.tl-slide--top {
      padding: 200px 145px 100px 220px;
      justify-content: flex-start;
    }

    &--right {
      justify-content: flex-end;
      align-items: center;
    }

    &--bottom {
      justify-content: flex-start;
      align-items: flex-end;

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 60%;
        bottom: 0;
        left: 0;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
        z-index: 1;
      }

      .tl-slide__content {
        flex-basis: 65%;
      }
    }

    &__image {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      z-index: 0;
    }

    &__content {
      position: relative;
      flex-basis: 43%;
      z-index: 1;
    }

    &__description {
      color: $white80;
    }
  }
}

.tl-nav {
  list-style: none;
  margin: 0;
  padding: 0;

  &:focus {
    outline: none;
  }

  &__item {
    font-family: 'Adobe Garamond Pro', serif;
    font-size: 18px;
    text-transform: uppercase;
    text-align: center;
    transition: transform 0.2s ease-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    opacity: 0.2;

    &.is-current {
      transform: scale(1.35);
    }
  }
}

.tl-nav-indicator {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-65%);
  background: url('../assets/decorations/arrowhead-2.svg') no-repeat center;
  width: 23px;
  height: 14px;
}

@media (min-width: $brOverMobile) and (max-width: $brSmall) {
  .timeline {
    .tl-slide {
      padding: 120px 20px 80px 190px;

      &--top,
      &--right,
      &--bottom {
        align-items: center;
      }

      &__image {
        opacity: 0.6;
        background-position: top left;
      }

      &__content {
        flex-basis: 100%;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;

        .htitle--big {
          font-size: 34px;
        }
      }
    }
  }
}

@media (max-width: $brMobile) {
  .timeline {
    &__gotop {
      top: 30px;
      left: 20px;
    }

    &__sidebar {
      width: 90px;
    }

    .tl-slide {
      padding: 100px 20px 80px 110px;
      align-items: flex-end;
      overflow-y: hidden;

      &.hooper-slide.tl-slide--top,
      &--top {
        align-items: flex-start;
        padding: 140px 20px 80px 110px;

        &:before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
        }

        .tl-slide__content {
          justify-content: flex-start;
        }
      }

      &--bottom {
        .tl-slide__content {
          flex-basis: 100%;
        }
      }

      &__image {
        width: 178vh;
      }

      &__content {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        flex-basis: 100%;
        height: 100%;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;

        .htitle--big {
          font-size: 24px;
        }
      }
    }
  }

  .tl-nav {
    &__item {
      &.is-current {
        transform: scale(1.3);
      }
    }
  }

  .tl-nav-indicator {
    display: none;
  }

  .filler {
    content: '';
    position: fixed;
    width: 100%;
    height: 200vh;
  }
}
</style>
