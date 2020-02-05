<template>
  <div
    :title="`Pokaż ${name} na mapie`"
    :class="{ 'card-location--active': isActive }"
    class="card-location"
    @click="goToLocation"
  >
    <div class="card-location__logo">
      <img :src="logo" :alt="name" />
    </div>
    <div class="card-location__details">
      <h4 class="card-location__title">
        <span>{{ profile }}</span>
        {{ name }}
        <a
          v-if="www"
          :href="www"
          :title="`Strona WWW ${name}`"
          target="_blank"
          class="card-location__www-icon"
        />
      </h4>
      <p class="card-location__address">
        {{ address }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LocationCard',
  props: {
    identifier: {
      type: Number,
      default: 1
    },
    logo: {
      type: String,
      default: 'amaro.png'
    },
    profile: {
      type: String,
      default: 'restaurant'
    },
    name: {
      type: String,
      default: 'Pizza Hut'
    },
    address: {
      type: String,
      default: '720 King St W, Toronto'
    },
    www: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    goToLocation() {
      this.$emit('go-to-location', this.identifier)
    }
  }
}
</script>

<style lang="scss">
.card-location {
  position: relative;
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  &:after {
    position: absolute;
    content: '';
    width: 100%;
    height: 1px;
    left: 0;
    bottom: 0;
    background: $golden;
    opacity: 0;
    transition: opacity 0.2s ease-in;
  }

  &:hover {
    cursor: pointer;

    &:after {
      opacity: 1;
    }

    .card-location__details:after {
      transform: translateX(12px);
      opacity: 1;
    }
  }

  &__logo {
    flex-basis: 160px;
    display: flex;
    align-self: center;
    justify-content: center;

    img {
      max-height: 90px;
    }
  }

  &__details {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    font-size: 14px;

    &:after {
      position: absolute;
      content: '';
      right: 30px;
      width: 23px;
      height: 14px;
      opacity: 0.6;
      background: url('../assets/decorations/arrowhead-2.svg') no-repeat center;
      background-size: contain;
      transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
    }
  }

  &__title {
    font-family: 'Adobe Garamond Pro', serif;
    font-size: 1.83em;

    span {
      font-family: 'Poppins', sans-serif;
      font-size: 0.54em;
      font-weight: 300;
      color: $grey;
      display: block;
      text-transform: lowercase;
      line-height: 1em;
    }
  }

  &__www-icon {
    content: '';
    display: inline-block;
    width: 13px;
    height: 13px;
    background: url(../assets/icons/icon-www.svg);
    margin-left: 5px;
  }

  &__address {
    font-size: 1em;
  }
}

@media (max-width: $brMobile) {
  .card-location {
    &__logo {
      flex-basis: 120px;
      padding: 0 15px;
    }

    &__details {
      &:after {
        display: none;
      }
    }

    &__title {
      font-size: 20px;
      span {
        font-size: 12px;
      }
    }

    &__address {
      font-size: 14px;
      line-height: 1.3em;
    }
  }
}
</style>
