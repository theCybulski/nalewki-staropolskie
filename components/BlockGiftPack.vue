<template>
  <div class="block-pack">
    <div class="packs-bg">
      <div class="packs-bg__image"></div>
      <div class="packs-bg__gradient"></div>
    </div>
    <DecorFrame />
    <div class="column-grid column-grid--left">
      <div class="product-data">
        <h3 class="htitle htitle--label">
          {{ blockPackType }}
        </h3>
        <h1 class="htitle htitle--big">{{ blockName }}<br /></h1>
        <div
          class="product-data__description"
          v-html="
            `${blockDescription ? blockDescription + '<br />' : ''}${
              detailDescription ? detailDescription : ''
            }`
          "
        ></div>

        <div class="product-data__variants">
          <div
            v-for="({ value }, index) in blockVariants"
            :key="`productVariant${index}`"
            :class="{ 'product-variant--active': activeVariant === index }"
            class="product-variant"
            @click="setVariantActive(index)"
          >
            {{ value }}
          </div>
        </div>
        <Cta
          ref="cta"
          :is-link="false"
          :txt="$t('form.zapytajOCennik')"
          @click="openForm"
        />
      </div>
    </div>
    <div class="column-grid">
      <div class="product-details">
        <div class="product-details__photo">
          <hooper
            ref="blockCarousel"
            :wheel-control="false"
            :keys-control="false"
            :transition="caroTransition"
            :items-to-show="1"
            style="height: 100%"
            @slide="fadeImages"
          >
            <slide
              v-for="(photo, index) in blockVariants[activeVariant].photos"
              :key="`blockGiftPhoto${index}`"
            >
              <img
                :src="photo"
                :alt="`${blockName} - ${blockVariants[activeVariant].value}`"
              />
            </slide>

            <hooper-pagination
              v-if="blockVariants[activeVariant].photos.length > 1"
              slot="hooper-addons"
            />
          </hooper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Hooper, Slide, Pagination as HooperPagination } from 'hooper'
import 'hooper/dist/hooper.css'
import { TweenMax } from 'gsap'

import Cta from './ui/Cta'
import DecorFrame from './ui/DecorFrame'

export default {
  name: 'BlockGiftPack',
  components: { Hooper, Slide, HooperPagination, Cta, DecorFrame },
  props: {
    name: {
      type: String,
      default: 'Gift pack name'
    },
    description: {
      type: String,
      default:
        'Quick brown foxed jumped over a lazy dog lorem ipsum dolor sit amet.'
    },
    packType: {
      type: String,
      default: 'standard'
    },
    variants: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      activePhoto: 1,
      activeVariant: 0,
      blockName: this.name,
      blockDescription: this.description,
      blockPackType: this.packType,
      blockVariants: this.variants,
      isWorking: false,
      caroTransition: 600
    }
  },
  computed: {
    detailDescription() {
      return this.blockVariants[this.activeVariant].details
    }
  },
  methods: {
    setVariantActive(index) {
      if (this.activeVariant === index) return

      const { blockCarousel } = this.$refs

      TweenMax.to(blockCarousel.$el, 0.2, { opacity: 0 })
      setTimeout(() => (this.activeVariant = index), 200)
      TweenMax.to(blockCarousel.$el, 0.2, { opacity: 1 }).delay(0.4)
    },
    fadeImages(payload) {
      const carousel = this.$refs.blockCarousel.$el
      const slides = carousel.querySelectorAll('.hooper-slide')

      Array.from(slides, (slide) => {
        TweenMax.to(slide, 1, { opacity: 0 }).duration(0.2)
      })

      TweenMax.to(slides[payload.currentSlide], 1, { opacity: 1 })
        .duration(0.4)
        .delay(0.2)
    },
    openForm() {
      this.$emit(
        'openForm',
        `${this.blockName} ${this.blockVariants[this.activeVariant].value}`
      )
    }
  }
}
</script>

<style lang="scss">
.fadePhotos-enter-active,
.fadePhotos-leave-active {
  transition: opacity 0.5s;
}
.fadePhotos-enter, .fadePhotos-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.block-pack {
  display: flex;
  position: relative;
  min-height: calc(100vh - 105px);

  .product-data {
    height: 100%;
  }

  .hooper-pagination {
    bottom: 30px;
  }
}

.packs-bg {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &__image,
  &__gradient {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &__image {
    background: url('../assets/oferta-bg.jpg') no-repeat center;
    background-size: cover;
    opacity: 0.3;
  }

  &__gradient {
    background: linear-gradient(
      270deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0.2) 25%,
      rgba(255, 255, 255, 0.8) 75%,
      rgba(255, 255, 255, 0.8) 100%
    );
  }
}

@media (max-width: $brSmall) {
  #zestawy-prezentowe {
    .block-pack {
      flex-direction: column;

      .column-grid {
        &--left {
          order: 2;
        }
      }

      .product-data {
        padding: 0 30px 100px;
      }

      .hooper-pagination {
        bottom: -20px;
      }
    }
  }

  .hooper-pagination {
    bottom: 0;
  }

  .hooper-indicators {
    li {
      margin-right: 10px;
    }
  }

  .product-data {
    display: block;
  }
}

@media (max-width: $brMobile) {
  .product-data {
    &__variants {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
