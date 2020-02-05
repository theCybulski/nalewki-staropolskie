<template>
  <div class="decor-frame-min">
    <div class="decor-frame-min__corner decor-frame-min__corner--tl"></div>
    <div class="decor-frame-min__corner decor-frame-min__corner--tr"></div>
    <div class="decor-frame-min__corner decor-frame-min__corner--br"></div>
    <div class="decor-frame-min__corner decor-frame-min__corner--bl"></div>
  </div>
</template>

<script>
export default {
  name: 'DecorFrameMin'
}
</script>

<style lang="scss">
.decor-frame-min {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  z-index: 3;

  &__corner {
    content: '';
    position: absolute;
    width: 35px;
    height: 35px;
    background: url('../../assets/decorations/decor-frame-min-corner.svg')
      no-repeat top left;
    background-size: contain;

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
