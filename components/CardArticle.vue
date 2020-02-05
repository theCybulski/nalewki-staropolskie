<template>
  <a :href="link" target="_blank">
    <article class="article">
      <DecorFrameMin />
      <h4 class="article__title htitle htitle--small">
        {{ title }}
      </h4>
      <div class="article__content" v-html="content"></div>
      <div class="article__source">{{ source }}</div>
    </article>
  </a>
</template>

<script>
import DecorFrameMin from './ui/DecorFrameMin'
export default {
  name: 'CardArticle',
  components: { DecorFrameMin },
  props: {
    title: {
      type: String,
      default: 'Article title'
    },
    content: {
      type: String,
      default: 'Some sample article content lorem ipsum dolor sit amet.'
    },
    source: {
      type: String,
      default: 'Article source'
    },
    link: {
      type: String,
      default: 'http://nalewki.pl'
    }
  }
}
</script>

<style lang="scss">
.article {
  position: relative;
  padding: 35px 40px;
  border: 1px solid $golden25;
  transition: border 0.2s ease-in-out;
  z-index: 1;
  min-height: 100%;

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  &:before {
    z-index: -2;
    background: $black;
    left: 8px;
    top: 4px;
    width: calc(100% - 8px);
    height: calc(100% + 3px);
    filter: blur(8px);
    opacity: 0;
    transition: 0.25s ease-in;
  }

  &:after {
    z-index: -1;
    background: $background;
  }

  &:hover {
    border: 1px solid $golden;

    &:before {
      opacity: 0.1;
    }
  }

  &__title {
    color: $black;
    text-transform: none;
    margin-bottom: 1em;
  }

  &__content {
    margin-bottom: 0.5em;
    color: $black;
  }

  &__source {
    font-weight: 300;
    color: $golden;
  }
}

@media (max-width: $brMobile) {
  .article {
    &:hover {
      border: 1px solid $golden25;

      &:before {
        opacity: 0;
      }
    }
  }
}
</style>
