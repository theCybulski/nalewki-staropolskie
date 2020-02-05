<template>
  <!--eslint-disable-->
  <nuxt-link v-if="isLink" :to="link" class="cta-holder">
    <div @click="emitClick" class="cta">
      <div class="cta__decor cta__decor--left">
        <svg x="0px" y="0px">
          <polyline
            class="st0"
            points="25.7,0.5 14.2,0.5 0.7,13 10.8,22 0.7,31 14.2,43.5 25.7,43.5 "
          />
        </svg>
      </div>
      <div class="cta__txt">
        <span>{{ txt }}</span>
      </div>
      <div class="cta__decor cta__decor--right">
        <svg x="0px" y="0px">
          <polyline
            class="st0"
            points="0,43.5 11.6,43.5 25,31 14.9,22 25,13 11.6,0.5 0,0.5 "
          />
        </svg>
      </div>
    </div>
  </nuxt-link>
  <div v-else class="cta-holder">
    <button :type="ctaType" @click="emitClick">
      <div class="cta">
        <div class="cta__decor cta__decor--left">
          <svg x="0px" y="0px">
            <polyline
              class="st0"
              points="25.7,0.5 14.2,0.5 0.7,13 10.8,22 0.7,31 14.2,43.5 25.7,43.5 "
            />
          </svg>
        </div>
        <div class="cta__txt">
          <span v-if="!isLoading">{{ txt }}</span>
          <div v-else class="loader">
            <span class="loader__dot"></span>
            <span class="loader__dot"></span>
            <span class="loader__dot"></span>
          </div>
        </div>
        <div class="cta__decor cta__decor--right">
          <svg x="0px" y="0px">
            <polyline
              class="st0"
              points="0,43.5 11.6,43.5 25,31 14.9,22 25,13 11.6,0.5 0,0.5 "
            />
          </svg>
        </div>
      </div>
    </button>
  </div>
  <!--eslint-enable-->
</template>

<script>
export default {
  name: 'Cta',
  props: {
    isLink: {
      type: Boolean,
      default: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    link: {
      type: String,
      default: '/'
    },
    txt: {
      type: String,
      default: 'Call to action'
    },
    ctaType: {
      type: String,
      default: 'button'
    }
  },
  methods: {
    emitClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
$inactiveOpacity: 0.8;

.cta-holder {
  & > button {
    background: transparent;
    border: none;
    padding: 0;

    &:focus {
      outline: none;
    }
  }

  &:focus {
    outline: none;
  }
}

.cta {
  position: relative;
  font-family: 'Adobe Garamond Pro Regular', serif;
  font-size: 14px;
  text-transform: uppercase;
  color: $goldenDark;
  display: inline-block;
  min-width: 200px;
  height: 44px;
  padding: 0 25px;
  text-align: center;
  cursor: pointer;

  &:before,
  &:after {
    content: '';
    width: 6px;
    height: 6px;
    position: absolute;
    border: 1px solid $golden;
    top: calc(50% - 4px);
    transform: rotate(45deg);
    opacity: $inactiveOpacity;
    transition: transform 0.15s ease-in-out, opacity 0.2s ease-in-out;
  }

  &:before {
    left: -6px;
  }

  &:after {
    right: -5px;
  }

  &:hover {
    &:before,
    &:after {
      opacity: 1;
    }

    &:before {
      transform: rotate(45deg) translate(-2px, 2px);
    }

    &:after {
      transform: rotate(45deg) translate(2px, -2px);
    }

    .cta__txt {
      span {
        opacity: 1;
      }
    }
  }

  &__txt {
    position: relative;
    width: 100%;
    top: -1px;
    height: 44px;
    line-height: 44px;
    vertical-align: middle;
    display: inline-block;

    &:before,
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      left: 0;
      height: 1px;
      background: $golden;
    }

    &:before {
      top: 0;
    }

    &:after {
      bottom: 0;
    }

    span {
      opacity: $inactiveOpacity;
      transition: opacity 0.25s ease-in-out;
      letter-spacing: 0.07em;
    }
  }

  &__decor {
    content: '';
    position: absolute;
    top: -1px;
    width: 28px;
    height: 44px;

    &--left {
      left: 0;
    }

    &--right {
      right: 0;
    }

    svg {
      height: 100%;
      width: 100%;
      .st0 {
        vector-effect: non-scaling-stroke;
        fill: none;
        stroke: $golden;
        stroke-width: 1px;
      }
    }
  }
}

.loader {
  position: relative;
  text-align: center;
  top: 12px;
  width: 20px;
  height: 20px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;

  &__dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    margin-right: 4px;
    background: $golden;
    animation: jump 1.3s linear infinite;

    &:nth-child(2) {
      animation-delay: -1.1s;
    }

    &:nth-child(3) {
      animation-delay: -0.9s;
      margin-right: 0;
    }
  }
}

@keyframes jump {
  0%,
  60%,
  100% {
    transform: initial;
  }

  30% {
    transform: translateY(-10px);
  }
}

@media (max-width: $brMobile) {
  .cta-holder {
    width: 100%;

    & > button {
      width: 100%;
    }
  }

  .cta {
    width: 100%;
    &:before,
    &:after {
      opacity: 1;
    }

    &:before {
      transform: rotate(45deg) translate(0, 0);
    }

    &:after {
      transform: rotate(45deg) translate(0, 0);
    }

    .cta__txt {
      span {
        opacity: 1;
      }
    }
  }
}
</style>
