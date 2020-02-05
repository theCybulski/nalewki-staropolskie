<template>
  <div>
    <PageHeader />
    <nuxt />
  </div>
</template>

<script>
import PageHeader from '../components/PageHeader'
export default {
  components: { PageHeader },
  watch: {
    $route() {
      this.blockScrolling()
    }
  },
  mounted() {
    this.checkDevice()
    window.addEventListener('resize', this.checkDevice)
    this.blockScrolling()
  },
  methods: {
    checkDevice() {
      this.$store.commit('device/checkDevice', window)
    },
    blockScrolling() {
      this.$router.history.current.fullPath === '/o-nas' ||
      this.$router.history.current.fullPath === '/en/about-us'
        ? document.body.classList.add('no-scroll')
        : document.body.classList.remove('no-scroll')
    }
  }
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease-out;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

@font-face {
  font-family: 'Adobe Garamond Pro Regular', serif;
  font-style: normal;
  font-weight: normal;
  src: local('Adobe Garamond Pro Regular'),
    url('../assets/fonts/AGaramondPro-Regular.woff') format('woff');
}

html {
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 300;
  line-height: 1.8em;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  color: $black;
  background: $background;
}

body {
  &.no-scroll {
    overflow: hidden;
  }
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

a {
  text-decoration: none;
}

input,
textarea,
select {
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
}

.container {
  margin: 0 $dtContMargin;
}

.row {
  display: flex;
  .column {
    flex-basis: 50%;
  }
}

.column-grid {
  width: 50%;
}

.htitle {
  font-family: 'Adobe Garamond Pro Regular', serif;
  font-weight: normal;
  color: $golden;
  margin-bottom: 0.15em;

  &--big {
    font-size: 45px;
    line-height: 1.15em;
    margin-bottom: 0.5em;
    text-transform: uppercase;
  }

  &--small {
    font-size: 20px;
    line-height: 1.3em;
    text-transform: uppercase;
  }

  &--mini {
    font-size: 16px;
    line-height: 1em;
  }

  &--label {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    letter-spacing: 0.2em;
  }
}

a {
  transition: color 0.2s ease-in-out, background 0.2s ease-in-out;
  &.link {
    content: '';
    width: 22px;
    height: 22px;
    mask-repeat: no-repeat;
    mask-size: contain;
    background-color: #fff;
    display: inline-block;

    &:hover {
      background-color: $golden;
    }

    &--fb {
      -webkit-mask-image: url('../assets/icon-fb.svg');
      mask-image: url('../assets/icon-fb.svg');
      margin-right: 30px;
    }

    &--insta {
      -webkit-mask-image: url('../assets/icon-insta.svg');
      mask-image: url('../assets/icon-insta.svg');
    }
  }
}

.product-data {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px 200px;

  &__secondary {
    display: flex;
    margin: 30px 0;
  }

  &__variants {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 15px;
    margin: 1em 0 2em;
  }
}

.product-variant {
  position: relative;
  text-align: center;
  white-space: nowrap;
  padding: 8px 20px;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: 1px solid $golden;
    opacity: 0.3;
  }

  &--active {
    &:after {
      opacity: 1;
    }
  }
}

.product-details {
  position: relative;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;

  &__year,
  &__features,
  &__volumes {
    position: absolute;
  }

  &__year {
    left: 50%;
    top: 50%;
    transform: translateY(-50%);
  }

  &__features {
    right: 50%;
    top: 50%;
    transform: translate(0, -50%);
  }

  &__volumes {
    width: 100%;
    bottom: 40px;
    display: flex;
    justify-content: center;
    z-index: 12;
  }

  &__photo {
    width: 100%;
    z-index: 11;

    & > section:focus {
      outline: none;
    }

    img {
      max-height: 100vh;
      pointer-events: none;
    }
  }
}

.product-details__photo {
  & *::selection {
    background-color: transparent;
  }

  .hooper-slide {
    text-align: center;
  }
}

.hooper {
  &:focus {
    outline: none;
  }
  .hooper-indicators {
    li {
      margin-right: 20px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .hooper-indicator {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: transparent;
    border: 1px solid #bd8a5d;

    &:hover {
      background: rgba(189, 138, 93, 0.51);
    }

    &:focus {
      outline: none;
    }

    &.is-active {
      background: #bd8a5d;
    }
  }
}

.offer-bg {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

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

@media (min-width: $brOverMobile) and (max-width: $brMid) {
  .container {
    margin: 0 $midContMargin;
  }
}

@media (min-width: $brOverSmall) and (max-width: $brMid) {
  html {
    font-size: 15px;
  }

  .htitle {
    &--big {
      font-size: 34px;
    }

    &--small {
      font-size: 18px;
    }

    &--mini {
      font-size: 15px;
    }

    &--label {
      font-size: 15px;
    }
  }

  .product-data {
    padding: 80px 80px 150px;
  }
}

@media (min-width: $brOverMobile) and (max-width: $brSmall) {
  html {
    font-size: 14px;
  }

  .htitle {
    &--big {
      font-size: 33px;
    }

    &--small {
      font-size: 16px;
    }

    &--mini {
      font-size: 14px;
    }

    &--label {
      font-size: 14px;
    }
  }

  .product-data {
    .cta-holder {
      text-align: center;
      .cta {
        width: 50%;
      }
    }
  }
}

.input-holder {
  position: relative;
  height: 50px;

  label,
  input,
  textarea {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 300;
    color: #323232;
    background: #fff;
  }

  label {
    position: absolute;
    padding: 0 10px;
    top: 25px;
    left: 14px;
    color: #8e8e8e;
    pointer-events: none;
    transform-origin: left top;
    transform: translateY(-50%);
    transition: transform 0.4s cubic-bezier(0.06, 0.89, 0.7, 1);
  }

  input,
  textarea {
    width: 100%;
    padding: 17px 20px;
    height: 100%;
    border: 1px solid rgba(189, 138, 93, 0.6);

    &:focus {
      outline: none;
      border: 1px solid rgba(189, 138, 93, 1);
    }

    &:focus,
    &.filled {
      & ~ label {
        transform: scale(0.8) translateY(calc(-30px - 50%));
      }
    }

    &:disabled {
      border: 1px solid rgba(189, 138, 93, 0);
    }
  }

  &--static-label {
    label {
      position: absolute;
      top: 25px;
      transform: translateY(-50%);
      left: 20px;
    }

    input,
    textarea {
      color: #323232;
      padding-left: 100px;
      padding-right: 63px;

      &:focus,
      &.filled {
        & ~ label {
          transform: translateY(-50%);
        }
      }
    }
  }

  &--elastic {
    height: auto;
  }

  &__edit {
    position: absolute;
    top: 25px;
    transform: translateY(-50%);
    right: 15px;
    border: none;
    background: #fff;
    color: $golden;
    cursor: pointer;
    font-size: 14px;

    &:focus {
      outline: none;
    }
  }
}

.prod-nav {
  &__close,
  &__prev,
  &__next {
    content: '';
    position: absolute;
    z-index: 10;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;

    &:focus {
      outline: none;
    }

    &:hover {
      svg,
      .prod-nav__icon {
        transform: scale(1.15);
      }
    }

    &.prod-nav--disabled {
      opacity: 0.3;
    }
  }

  &__close {
    top: 20px;
    right: 20px;
    width: 53px;
    height: 53px;

    .prod-nav__icon {
      top: 0;
      left: 0;
      width: inherit;
      height: inherit;
      background: url('../assets/close-button.svg') no-repeat center;
      background-size: contain;
    }
  }

  &__prev,
  &__next {
    top: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
    transform-origin: center top;

    .prod-nav__icon {
      width: 40px;
      height: 24px;
      background: url('../assets/arrow-button.svg') no-repeat center;
      background-size: contain;
    }
  }

  &__prev {
    left: 20px;
    writing-mode: lr-bt;
    transform: translateY(-50%) rotate(-90deg);
  }

  &__next {
    right: 20px;
    writing-mode: lr-tb;
    transform: translateY(-50%) rotate(90deg);
  }

  &__icon {
    position: absolute;
    content: '';
    transition: transform 0.2s ease-out;
  }

  &__title {
    position: absolute;
    white-space: nowrap;
    top: 25px;
    font-family: 'Adobe Garamond Pro', serif;
    font-size: 14px;
    line-height: 1em;
    text-transform: uppercase;
    color: $golden;
  }
}

.form-holder {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;

  &__overlay {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.8);
  }
}

@media (max-width: $brSmall) {
  .column-grid {
    width: 100%;

    &:first-child {
      order: 2;
    }

    &:last-child {
      order: 1;
    }
  }

  .offer-bg {
    top: 0;
    right: unset;
    bottom: unset;
    left: 0;
    width: 100%;
    height: 80vh;

    &__gradient {
      height: 180px;
      top: unset;
      bottom: 0;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.8) 100%
      );
    }
  }

  .product-details {
    height: auto;
    padding-bottom: 30px;

    &__photo {
      height: 100%;

      .hooper-slide {
        height: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          max-height: 70vh;
          max-width: 100%;
        }
      }
    }

    &__volumes {
      bottom: 0;
    }
  }

  .product-data {
    padding: 30px 30px 100px;
    justify-content: flex-start;
    min-height: auto;
  }
}

@media (max-width: $brMobile) {
  html {
    font-size: 14px;
  }

  .htitle {
    &--big {
      font-size: 30px;
    }

    &--small {
      font-size: 18px;
    }

    &--label {
      font-size: 14px;
    }
  }

  .container {
    margin: 0 $mobileContMargin;
  }

  .row {
    flex-direction: column;
    .column {
      flex-basis: 100%;
    }
  }

  .form-holder {
    overflow-y: scroll;
    padding: 15px;
    display: block;
  }
}
</style>
