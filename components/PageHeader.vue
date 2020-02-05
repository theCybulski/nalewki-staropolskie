<template>
  <header
    ref="pageHeader"
    :class="{
      'page-header--big': isHomepage,
      'page-header--hidden': isHidden,
      'page-header--floating': isTimeline,
      opened: isOpened
    }"
    class="page-header"
  >
    <div class="page-header__logo">
      <nuxt-link :to="localePath('index')">
        <Logo />
      </nuxt-link>
    </div>
    <nav class="page-header__nav">
      <ul>
        <li>
          <nuxt-link :to="localePath('index')">
            {{ $t('mainNav.stronaGlowna') }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="localePath('o-nas')">
            {{ $t('mainNav.oNas') }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="localePath('oferta')">
            {{ $t('mainNav.oferta') }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="localePath('zestawy-prezentowe')">
            {{ $t('mainNav.zestawyPrezentowe') }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="localePath('gdzie-jestesmy')">
            {{ $t('mainNav.gdzieJestesmy') }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="localePath('wydarzenia')">
            {{ $t('mainNav.wydarzenia') }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="localePath('kontakt')">
            {{ $t('mainNav.kontakt') }}
          </nuxt-link>
        </li>
      </ul>
      <div class="page-header__social">
        <a :href="facebook" target="_blank" class="link link--fb"></a>
        <a :href="instagram" target="_blank" class="link link--insta"></a>
      </div>
    </nav>
    <div class="page-header__lang">
      <nuxt-link
        v-for="locale in locales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
        class="lang"
      >
        {{ locale.name }}
      </nuxt-link>
    </div>
    <div class="page-header__nav-toggle">
      <NavToggle ref="navToggle" @toggleNav="toggleNav" />
    </div>
  </header>
</template>

<script>
import NavToggle from './NavToggle'
import Logo from './Logo'
export default {
  name: 'PageHeader',
  components: { Logo, NavToggle },
  data() {
    return {
      isHomepage: false,
      isHidden: false,
      isTimeline: false,
      isOpened: false,
      locales: this.$i18n.locales,
      facebook: this.$store.state.contact.contact.facebook,
      instagram: this.$store.state.contact.contact.instagram
    }
  },
  watch: {
    $route() {
      this.changeStyle()
    }
  },
  created() {
    this.changeStyle()
  },
  methods: {
    changeStyle() {
      this.isHomepage =
        this.$router.history.current.fullPath === '/' ||
        this.$router.history.current.fullPath === '/en'
      this.isHidden =
        this.$router.history.current.matched[0].path === '/oferta/:slug' ||
        this.$router.history.current.matched[0].path === '/en/offer/:slug'
      this.isTimeline =
        this.$router.history.current.fullPath === '/o-nas' ||
        this.$router.history.current.fullPath === '/en/about-us'
    },
    toggleNav() {
      this.isOpened = !this.isOpened
    }
  }
}
</script>

<style lang="scss">
.page-header {
  position: relative;
  width: 100%;
  display: flex;
  font-size: 14px;
  height: 105px;
  transition: all 0.3s ease-out;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: $white;
    z-index: 0;
    transition: opacity 0.3s ease-out;
    transform: translateY(0);
    opacity: 1;
  }

  &--big {
    position: absolute;
    top: 0;
    left: 0;
    height: 145px;
    border-bottom: 1px solid #5b482f;
    &:before {
      transform: translateY(-100%);
      opacity: 0;
    }

    .page-header {
      &__logo {
        text-align: center;

        .logo {
          transform: scale(1);
          background: #fff;
        }
      }

      &__nav {
        ul {
          li {
            a {
              color: $greyLight;
            }
          }
        }
      }

      &__lang {
        color: $greyLight;
      }
    }
  }

  &--hidden {
    visibility: hidden;
    opacity: 0;
    height: 0;
  }

  &--floating {
    position: fixed;
    top: 0;
    z-index: 9;

    &.hidden {
      transform: translateY(-100%);
      transition: transform 0.2s ease-out;
    }
  }

  &__logo {
    flex-basis: $dtContMargin;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    .logo {
      transform: scale(0.72);
    }
  }

  &__nav {
    display: flex;
    padding-left: 50px;
    flex-basis: calc(100% - 290px);
    align-items: center;
    z-index: 1;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        display: inline-block;
        margin-right: 50px;

        &:last-child {
          margin: 0;
        }

        a {
          font-weight: 400;
          text-transform: uppercase;
          color: $black;
          letter-spacing: 0.05em;
        }
      }
    }
  }

  &__lang {
    flex-basis: $dtContMargin;
    justify-self: flex-end;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $black;
    z-index: 1;

    .lang {
      color: inherit;
      margin-right: 20px;
      letter-spacing: 0.05em;
      opacity: 0.5;

      &:hover {
        opacity: 1;
      }

      &:last-child {
        margin: 0;
      }

      &.nuxt-link-exact-active {
        opacity: 1;
      }
    }
  }

  &__social {
    display: none;
  }

  &__nav-toggle {
    display: none;
  }
}

@media (max-width: $brSmall) {
  .page-header {
    height: 80px;

    &--hidden {
      visibility: hidden;
      opacity: 0;
      height: 0;
    }

    &.opened {
      .page-header__nav {
        transform: translateX(0);
      }

      .page-header__lang {
        transform: translateY(0);
        opacity: 1;
      }

      .page-header__nav-toggle {
        .nav-toggle {
          .btn-line {
            background: rgba(255, 255, 255, 0.7);
          }
        }
      }
    }

    &--big {
      border-bottom: none;
      .page-header__logo {
        .logo {
          height: 50px;
          transform: unset;
        }
      }

      .page-header__nav-toggle {
        .nav-toggle {
          .btn-line {
            background: rgba(255, 255, 255, 0.7);
          }
        }
      }
    }

    &__logo {
      display: flex;
      height: 100%;
      position: absolute;
      align-items: center;
      left: 15px;

      .logo {
        height: 50px;
        transform: unset;
      }
    }

    &__nav {
      display: block;
      position: fixed;
      flex-basis: unset;
      width: 75%;
      padding: 0;
      bottom: 0;
      right: 0;
      top: 0;
      background: #191919;
      transform: translateX(100%);
      transition: transform 0.3s ease-out;
      z-index: 99999;

      ul {
        padding-top: 80px;
        li {
          display: block;
          margin-right: 0;
          padding: 15px 30px;
          text-align: right;

          &:last-child {
            margin-bottom: 0;
          }

          a {
            color: $white;
          }
        }
      }
    }

    &__lang {
      position: fixed;
      bottom: 0;
      left: calc(25% + 30px);
      height: 90px;
      transition: transform 0.5s ease-out, opacity 0.5s ease-out;
      transform: translateY(80px);
      opacity: 0;
      z-index: 99999;
      color: #fff;
    }

    &__social {
      display: block;
      position: absolute;
      bottom: 0;
      width: 100%;
      background: #262626;
      text-align: right;
      padding: 30px;
    }

    &__nav-toggle {
      display: flex;
      position: fixed;
      align-items: center;
      height: 80px;
      z-index: 99999;
      right: 15px;

      .nav-toggle {
        .btn-line {
          background: #323232;
        }
      }
    }
  }
}
</style>
