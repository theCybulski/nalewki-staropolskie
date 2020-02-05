<template>
  <div :class="{ 'card-event--special': isSpecial }" class="card-event">
    <div class="card-event__content">
      <DecorFrameMin v-if="isSpecial" />
      <div class="card-event__upcoming">
        {{ $t('wydarzenia.najblizsze') }}
      </div>
      <div class="card-event__date">
        {{ date }}
        <span>{{ year }}</span>
      </div>
      <h4 class="card-event__name">
        {{ name }}
      </h4>
      <div class="card-event__location">
        {{ location }}
      </div>
    </div>
  </div>
</template>

<script>
import DecorFrameMin from './ui/DecorFrameMin'
export default {
  name: 'CardEvent',
  components: { DecorFrameMin },
  props: {
    isSpecial: {
      type: Boolean,
      default: false
    },
    startDate: {
      type: String,
      default: '2020-07-15'
    },
    endDate: {
      type: String,
      default: '2020-08-01'
    },
    name: {
      type: String,
      default: 'Event name'
    },
    location: {
      type: String,
      default: 'Event localization details'
    }
  },
  computed: {
    date() {
      const startDay = this.startDate.split('-')[2]
      const startMonth = this.startDate.split('-')[1]

      const endDay = this.endDate.split('-')[2]
      const endMonth = this.endDate.split('-')[1]

      if (this.startDate === this.endDate) {
        return `${startDay}.${startMonth}`
      } else if (startMonth !== endMonth) {
        return `${startDay}.${startMonth}-${endDay}.${endMonth}`
      } else {
        return `${startDay}-${endDay}.${endMonth}`
      }
    },
    year() {
      const startYear = this.startDate.split('-')[0]
      const endYear = this.endDate.split('-')[0]

      if (startYear === endYear) {
        return `${startYear}`
      } else {
        return `${startYear}-${endYear}`
      }
    }
  }
}
</script>

<style lang="scss">
.card-event {
  background: $white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 10px;
  font-family: 'Adobe Garamond Pro', serif;
  text-align: center;

  &--special {
    grid-column: 1 / 3;
    border: 1px solid $golden;

    .card-event__upcoming {
      display: block;
    }
  }

  &__content {
    position: relative;
    padding: 25px 20px;
    background: $white;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  &__upcoming {
    display: none;
    font-size: 14px;
    text-transform: uppercase;
    color: $golden;
    margin-bottom: 1em;
  }

  &__date {
    font-size: 60px;
    line-height: 1em;
    color: $golden;

    span {
      display: block;
      font-size: 0.4em;
    }
  }

  &__name {
    font-size: 22px;
    font-weight: normal;
    line-height: 1.3em;
    margin-bottom: 0.5em;
  }

  &__location {
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
  }
}

@media (max-width: $brSmall) {
  .card-event {
    &--special {
      grid-column: 1;
    }

    &__date {
      font-size: 45px;
    }
  }
}
</style>
