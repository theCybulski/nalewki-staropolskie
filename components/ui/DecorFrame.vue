<template>
  <div class="decor-frame">
    <div v-if="tl" class="decor-frame__corner decor-frame__corner--tl"></div>
    <div v-if="tr" class="decor-frame__corner decor-frame__corner--tr"></div>
    <div v-if="br" class="decor-frame__corner decor-frame__corner--br"></div>
    <div v-if="bl" class="decor-frame__corner decor-frame__corner--bl"></div>
  </div>
</template>

<script>
export default {
  name: 'DecorFrame',
  props: {
    tl: {
      type: Boolean,
      default: true
    },
    tr: {
      type: Boolean,
      default: true
    },
    br: {
      type: Boolean,
      default: true
    },
    bl: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss">
.decor-frame {
  content: '';
  position: absolute;
  top: 10px;
  right: 10px;
  bottom: 10px;
  left: 10px;
  border: 1px solid $golden;
  pointer-events: none;
  z-index: 3;

  &__corner {
    content: '';
    position: absolute;
    width: 77px;
    height: 77px;
    background: url('../../assets/decorations/decor-frame-corner.svg') no-repeat
      top left;

    &--tl {
      top: -1px;
      left: -1px;
    }

    &--tr {
      top: -1px;
      right: -1px;
      transform: rotate(90deg);
    }

    &--br {
      bottom: -1px;
      right: -1px;
      transform: rotate(180deg);
    }

    &--bl {
      bottom: -1px;
      left: -1px;
      transform: rotate(270deg);
    }
  }
}
</style>
