<template>
  <section id="wydarzenia">
    <div class="container">
      <header>
        <h1 class="htitle htitle--big">
          {{ $t('wydarzenia.title') }}
        </h1>
      </header>
      <div class="events">
        <div class="events__list">
          <EventCard
            v-for="{ id, featured, start, end, name, localization } in events"
            :key="`event-${id}`"
            :is-special="featured"
            :start-date="start"
            :end-date="end"
            :name="name"
            :location="localization"
          />
        </div>
        <div v-if="!$store.state.device.isMobile" class="events__calendar">
          <client-only>
            <v-calendar :attributes="attrs" />
          </client-only>
        </div>
      </div>
    </div>
    <PageFooter />
  </section>
</template>

<script>
import axios from 'axios'
import EventCard from '../components/CardEvent'
import PageFooter from '../components/PageFooter'
export default {
  head() {
    return {
      title: this.$t('mainNav.wydarzenia'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('seo.descriptionDefault')
        }
      ]
    }
  },
  components: { PageFooter, EventCard },
  nuxtI18n: {
    paths: {
      pl: '/wydarzenia',
      en: '/events'
    }
  },
  data() {
    return {
      attrs: [
        {
          highlight: {
            backgroundColor: 'transparent',
            borderColor: '#bd8a5d',
            borderWidth: '1px',
            borderRadius: '0',
            height: '55px'
          },
          contentStyle: {
            fontFamily: 'Adobe Garamond Pro, serif',
            color: '#bd8a5d'
          },
          dates: []
        }
      ]
    }
  },
  async asyncData() {
    const baseUrl = process.env.baseUrl

    let { data: events } = await axios.get(`${baseUrl}/wydarzenia?_sort=Order`)
    events = events.map(({ id, Wyroznione, Od, Do, Nazwa, Lokalizacja }) => ({
      id,
      featured: Wyroznione,
      start: Od,
      end: Do,
      name: Nazwa,
      localization: Lokalizacja
    }))

    return { events }
  },
  transition: {
    name: 'fade'
  },
  created() {
    this.setDates()
  },
  methods: {
    setDates() {
      this.attrs[0].dates = this.events.map((event) => {
        return {
          start: new Date(
            event.start.split('-')[0],
            event.start.split('-')[1] - 1,
            event.start.split('-')[2]
          ),
          end: new Date(
            event.end.split('-')[0],
            event.end.split('-')[1] - 1,
            event.end.split('-')[2]
          )
        }
      })
    }
  }
}
</script>

<style lang="scss">
#wydarzenia header .htitle {
  margin: 1em 0 1.5em;
}

.events {
  display: flex;
  padding-bottom: 80px;

  &__list {
    flex-basis: 66.66666%;
    margin-right: 10px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
  }

  &__calendar {
    flex-basis: 33.33333%;
    margin-left: 10px;
  }
}
.c-pane-container {
  width: 100%;
  * {
    font-family: 'Adobe Garamond Pro', serif;
    font-weight: normal;
    font-size: 22px;
  }

  .c-weekday {
    color: $grey;
    font-size: 18px;
  }

  .c-day {
    min-height: 55px;

    .c-day-content-wrapper {
      height: 55px;
    }
  }
}

@media (min-width: $brOverMobile) and (max-width: $brSmall) {
  .events {
    &__list {
      flex-basis: 55%;
      grid-template-columns: repeat(1, 1fr);
    }

    &__calendar {
      flex-basis: 45%;
    }
  }
}

@media (max-width: $brMobile) {
  #wydarzenia {
    .container {
      margin: 0 10px;
    }

    header .htitle {
      margin: 1em 0;
    }
  }

  .events {
    display: flex;
    padding-bottom: 80px;

    &__list {
      flex-basis: 100%;
      margin-right: 0;
      grid-template-columns: repeat(1, 1fr);
      grid-gap: 20px;
    }

    &__calendar {
      display: none;
    }
  }
}
</style>
