<template>
  <button :class="{ opened: isOpened }" class="nav-toggle" @click="toggleNav">
    <span class="btn-line btn-line--first"></span>
    <span class="btn-line btn-line--second"></span>
    <span class="btn-line btn-line--third"></span>
  </button>
</template>

<script>
export default {
  name: 'NavToggle',
  data() {
    return {
      isOpened: false
    }
  },
  watch: {
    $route() {
      if (this.isOpened) {
        this.toggleNav()
      }
    }
  },
  methods: {
    toggleNav() {
      this.isOpened = !this.isOpened
      this.$emit('toggleNav')
    }
  }
}
</script>

<style lang="scss">
.nav-toggle {
  display: none;
}

@media (max-width: $brSmall) {
  .nav-toggle {
    display: block;
    position: relative;
    width: 54px;
    height: 47px;
    padding: 15px;
    border: none;
    z-index: 4;
    background: transparent;

    &:focus {
      outline: none;
    }
  }

  .btn-line {
    content: '';
    display: block;
    position: absolute;
    height: 2px;
    background: rgba(255, 255, 255, 0.7);
    width: calc(100% - 30px);
    transition: all 0.2s ease-in-out;

    &--first {
      top: 15px;
      transform-origin: right top;
    }

    &--second {
      top: calc(50% - 1px);
    }

    &--third {
      bottom: 15px;
      transform-origin: right bottom;
    }
  }
}

.opened {
  .btn-line {
    &--first {
      transform: rotate(-45deg) translate(1px, 1px);
    }

    &--second {
      opacity: 0;
    }

    &--third {
      transform: rotate(45deg) translate(2px, 1px);
    }
  }
}
</style>
