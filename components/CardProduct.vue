<template>
  <nuxt-link
    ref="prodLink"
    :to="localePath({ name: 'oferta-slug', params: { slug: slug } })"
  >
    <div class="card-product">
      <div class="card-product__photo">
        <img :src="thumb" :alt="`${$t('cardProduct.nalewka')} ${name}`" />
      </div>
      <div class="card-product__info">
        <h3 class="htitle htitle--small">
          {{ name }}
        </h3>
        <div class="year">
          {{ year }}
        </div>
        <div class="volumes">
          <span v-for="{ value } in volumes" :key="value">
            {{ value }}
          </span>
          ml
        </div>
      </div>
      <div class="card-product__bg"></div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'CardProduct',
  props: {
    thumb: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'Product name'
    },
    slug: {
      type: String,
      default: 'product_slug'
    },
    year: {
      type: String,
      default: '2019'
    },
    volumes: {
      type: Array,
      default() {
        return ['vol1', 'vol2', 'vol3']
      }
    }
  }
}
</script>

<style lang="scss">
.card-product {
  height: 575px;
  position: relative;
  overflow: hidden;

  &:hover {
    .card-product {
      &__bg {
        border: 1px solid $golden;
      }

      &__info {
        transform: translateY(0);

        .volumes {
          opacity: 1;
        }
      }
    }

    &:after {
      background: $golden;
    }
  }

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background: #d9d7d7;
    bottom: 0;
    z-index: 3;
    transition: background 0.2s ease-in-out;
  }

  &__bg {
    content: '';
    position: absolute;
    border: 1px solid #d9d7d7;
    border-bottom: none;
    background: #f8f8f8;
    top: 95px;
    right: 0;
    bottom: 0;
    left: 0;
    transition: border 0.2s ease-in-out;
    z-index: 0;
  }

  &__photo {
    position: absolute;
    left: 1px;
    right: 1px;
    height: 77%;
    z-index: 1;
    overflow: hidden;

    img {
      position: absolute;
      top: 0;
      left: 50%;
      height: 100%;
      transform: translateX(-50%);
    }
  }

  &__info {
    position: absolute;
    left: 1px;
    right: 1px;
    bottom: 1px;
    padding: 30px 20px 10px;
    background: #fff;
    color: $golden;
    text-align: center;
    z-index: 3;
    transform: translateY(2em);
    transition: transform 0.2s ease-in-out;

    .htitle {
      height: 2.6em;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .year {
      font-size: 18px;
      font-family: 'Adobe Garamond Pro', serif;
      margin-bottom: 15px;
    }

    .volumes {
      font-weight: 300;
      opacity: 0;
      transition: opacity 0.4s ease-in-out;

      span {
        font-size: 14px;
        margin-right: 8px;
      }
    }
  }
}

@media (min-width: $brOverSmall) and (max-width: $brMid) {
  .card-product {
    height: 500px;

    &__info {
      padding: 15px 10px;
    }
  }
}

@media (max-width: $brSmall) {
  .card-product {
    height: 500px;

    &:hover {
      .card-product {
        &__bg {
          border: 1px solid #d9d7d7;
        }

        &__info {
          transform: unset;

          .volumes {
            opacity: 0;
          }
        }
      }

      &:after {
        background: #d9d7d7;
      }
    }

    &__info {
      padding: 20px 15px 10px;
      transform: unset;

      .htitle {
        height: 4em;
        overflow: hidden;
        text-overflow: initial;
      }

      .year {
        font-size: 14px;
      }

      .volumes {
        display: none;
      }
    }
  }
}
</style>
