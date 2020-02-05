<template>
  <div id="gdzie-jestesmy">
    <section>
      <div class="locations">
        <div class="locations__list">
          <div class="list">
            <header class="list__header">
              <h1 class="htitle htitle--big">
                {{ $t('gdzieJestesmy.title') }}
              </h1>
              <input
                v-model="searchInput"
                :placeholder="$t('gdzieJestesmy.searchPlaceholder')"
                type="text"
                class="search-bar"
              />
            </header>
            <div class="list__items">
              <LocationCard
                v-for="{
                  id,
                  logo,
                  profile,
                  name,
                  address,
                  www
                } in filteredLocations"
                :key="`card-${id}`"
                :identifier="id"
                :logo="logo"
                :profile="profile"
                :name="name"
                :www="www"
                :address="address"
                @go-to-location="goToMarker"
              />
            </div>
          </div>
        </div>
        <div class="locations__map">
          <client-only>
            <l-map :zoom="mapZoom" :center="mapCenter">
              <l-tile-layer
                url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png"
              />
              <l-marker
                v-for="{ id, coords } in markers"
                :key="`marker-${id}`"
                :lat-lng="coords"
                :icon="customIcon"
              />
            </l-map>
          </client-only>
        </div>
      </div>
    </section>
    <PageFooter />
  </div>
</template>

<script>
import axios from 'axios'
import LocationCard from '../components/CardLocation'
import PageFooter from '../components/PageFooter'

let L = { icon() {} }
if (process.browser) L = require('leaflet')
export default {
  head() {
    return {
      title: this.$t('mainNav.gdzieJestesmy'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('seo.descriptionDefault')
        }
      ]
    }
  },
  components: { PageFooter, LocationCard },
  nuxtI18n: {
    paths: {
      pl: '/gdzie-jestesmy',
      en: '/where-are-we'
    }
  },
  data() {
    return {
      searchInput: '',
      mapCenter: [52.237049, 21.017532],
      mapZoom: 6,
      customIcon: L.icon({
        iconUrl: '/map-marker.svg',
        iconSize: [35, 46],
        iconAnchor: [22.5, 22.5]
      })
    }
  },
  computed: {
    lang() {
      const { iso: lang } = this.$i18n.locales.find(
        (item) => item.code === this.$i18n.locale
      )

      return lang
    },
    markers() {
      return this.filteredLocations.map(({ id, localization }) => {
        return {
          id,
          coords: localization.split(',')
        }
      })
    },
    filteredLocations() {
      const locations = [...this.locations]

      if (this.searchInput) {
        return locations.filter((item) => {
          return (
            item.name.toLowerCase().includes(this.searchInput.toLowerCase()) ||
            item.profile
              .toLowerCase()
              .includes(this.searchInput.toLowerCase()) ||
            item.address.toLowerCase().includes(this.searchInput.toLowerCase())
          )
        })
      } else {
        return locations
      }
    }
  },
  async asyncData({ store }) {
    const baseUrl = process.env.baseUrl
    const lang = store.app.i18n.locale === 'pl' ? 'pl-PL' : 'en-US'

    let { data: locations } = await axios.get(
      `${baseUrl}/gdzie-jestesmy?_sort=Order`
    )
    /* eslint-disable camelcase */
    locations = locations.map(
      ({ id, Logo, Nazwa, Adres, Lokalizacja, WWW, Profil_PL, Profil_EN }) => ({
        id,
        logo: baseUrl + Logo.url,
        profile: lang === 'pl-PL' ? Profil_PL : Profil_EN,
        name: Nazwa,
        address: Adres,
        localization: Lokalizacja,
        www: WWW
      })
    )
    /* eslint-enable camelcase */

    return { locations }
  },
  transition: {
    name: 'fade'
  },
  methods: {
    goToMarker(value) {
      const device = this.$store.state.device

      this.mapCenter = this.markers.find((item) => {
        return item.id === value
      }).coords

      this.mapZoom = 17

      if (device.isMobile || device.isSmall) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.locations {
  display: flex;
  flex-basis: 50%;
  height: calc(100vh - 105px);

  &__list,
  &__map {
    flex-basis: inherit;
  }

  &__list {
    background: $white;
  }

  &__map {
    background: $black30;
  }
}

.list {
  overflow-y: scroll;
  height: 100%;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: $golden;
    margin-right: 5px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: $black;
  }

  &__header {
    padding: 30px 35px;

    .htitle {
      margin-bottom: 0.5em;
    }
  }
}

.search-bar {
  border: 1px solid $greyLight;
  padding: 15px 20px;
  transition: border 0.2s ease-in;
  width: 100%;

  &:focus {
    outline: none;
    border: 1px solid $golden;
  }

  &::placeholder {
    color: #d0d0d0;
  }
}

@media (max-width: $brSmall) {
  .locations {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
    flex-basis: 100%;
    &__list {
      order: 2;
    }

    &__map {
      order: 1;
      height: calc(65vh - 80px);
    }
  }

  .list {
    &__header {
      padding: 30px;
    }
  }
}
</style>
