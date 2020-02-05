<template>
  <footer class="page-footer">
    <div class="page-footer__primary">
      <div class="container">
        <div class="row">
          <div class="column">
            <nuxt-link to="/">
              <img
                src="@/assets/logo-full.svg"
                alt="Nalewki Staropolskie Logo"
              />
            </nuxt-link>
          </div>
          <div class="column">
            <h4 class="htitle htitle--small">
              NALEWKI STAROPOLSKIE<br />
              Karol Majewski i Wspólnicy Sp. z o.o.
            </h4>
            <br />
            <div v-html="address"></div>
          </div>
          <div class="column">
            <span>tel</span>&nbsp;&nbsp;
            <a :href="`tel:${tel}`">
              {{ tel }}
            </a>
            <span>- {{ $t('footer.biuro') }}</span
            ><br />

            <span>tel</span>&nbsp;&nbsp;
            <a :href="`tel:${tel2}`">
              {{ tel2 }}
            </a>
            <span>- Anna Papierzyńska</span><br />
            <br />

            <span>e-mail</span>&nbsp;&nbsp;
            <a :href="`mailto:${mail}`">
              {{ mail }}
            </a>
          </div>
          <div class="column footer-social">
            <a :href="facebook" target="_blank" class="link link--fb"></a>
            <a :href="instagram" target="_blank" class="link link--insta"></a>
          </div>
        </div>
      </div>
    </div>
    <div class="page-footer__secondary">
      <div class="container">
        <div class="row">
          <div class="column">
            {{ $t('footer.copyrights') }}
          </div>
          <div class="column">
            Created by:
            <a href="http://highline.pl" target="_blank">
              <img src="@/assets/hl-logo.svg" alt="Highline Studio logo" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'PageFooter',
  data() {
    return {
      address: this.$store.state.contact.contact.address,
      tel: this.$store.state.contact.contact.tel,
      tel2: this.$store.state.contact.contact.tel2,
      mail: this.$store.state.contact.contact.mail,
      facebook: this.$store.state.contact.contact.facebook,
      instagram: this.$store.state.contact.contact.instagram
    }
  }
}
</script>

<style lang="scss">
.page-footer {
  background: #7b6c5f;
  color: $white;
  font-weight: 300;
  font-size: 14px;

  &__primary {
    padding: 60px 0;
    .container {
      .row {
        display: flex;
        flex-basis: 25%;

        .column {
          flex-basis: inherit;
        }
      }
    }

    .htitle {
      text-transform: none;
      color: inherit;
      margin: 0;
      font-size: 18px;
    }

    img {
      position: relative;
      top: -14px;
    }

    span {
      color: $white50;
    }

    a {
      color: $white;
    }
  }

  &__secondary {
    padding: 10px 0;
    background: #6a6057;
    font-size: 12px;

    .container {
      .row {
        justify-content: space-between;
        .column {
          display: flex;
          justify-content: flex-end;
          align-items: center;

          &:first-child {
            color: $white50;
            justify-content: flex-start;
          }

          a {
            display: inline-block;
            margin: 5px 0 0 15px;
          }
        }
      }
    }
  }
}

.footer-social {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

@media (max-width: $brSmall) {
  .page-footer {
    .container .row {
      flex-direction: column;
    }

    &__primary {
      padding: 40px 0 30px;
    }

    &__secondary {
      padding: 20px 0 15px;
      .container {
        .row {
          .column {
            justify-content: flex-start;

            &:first-child {
              margin-bottom: 10px;
              line-height: 1.5em;
            }
          }
        }
      }
    }
  }

  .footer-social {
    margin-top: 30px;
    justify-content: flex-start;
  }
}
</style>
