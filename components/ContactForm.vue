<template>
  <div :class="{ 'form-sent': isSent }" class="contact-form">
    <div class="contact-form__head">
      <h3 class="htitle htitle--big">
        {{ formHead }}
      </h3>
    </div>
    <button v-if="!isSent" class="prod-nav__close" @click="closeForm">
      <span class="prod-nav__icon"></span>
    </button>
    <div v-if="isSent" class="contact-form__msg">
      <p v-if="isError">
        {{ $t('form.msgError') }}
      </p>
      <p v-else>{{ $t('form.msgSent') }}</p>
    </div>
    <form
      v-if="!isSent"
      class="contact-form__form"
      @change="manageInputs"
      @submit.prevent="submitForm"
    >
      <div class="input-holder">
        <input
          id="fname"
          v-model="form.firstName"
          autocomplete="given-name"
          type="text"
          name="fname"
          required
        />
        <label for="fname">
          {{ $t('form.imie') }}
        </label>
      </div>

      <div class="input-holder">
        <input
          id="lname"
          v-model="form.lastName"
          autocomplete="family-name"
          type="text"
          name="lname"
          required
        />
        <label for="lname">
          {{ $t('form.nazwisko') }}
        </label>
      </div>

      <div class="input-holder">
        <input
          id="email"
          v-model="form.email"
          autocomplete="email"
          type="email"
          name="email"
          required
        />
        <label for="email">
          {{ $t('form.email') }}
        </label>
      </div>

      <div class="input-holder">
        <input
          id="tel"
          v-model="form.tel"
          autocomplete="tel"
          type="text"
          name="tel"
          required
        />
        <label for="tel">
          {{ $t('form.numerTel') }}
        </label>
      </div>
      <div class="input-holder input-holder--static-label wide">
        <input
          id="subject"
          v-model="form.msgSubject"
          :disabled="isSubjectDisabled"
          type="text"
          name="subject"
          required
        />
        <label for="subject">
          {{ $t('form.temat') }}
        </label>
        <button
          v-if="!isSending"
          type="button"
          class="input-holder__edit"
          @click="editSubject"
        >
          <span v-if="isSubjectDisabled">{{ $t('form.edytuj') }}</span>
          <span v-else>{{ $t('form.zmien') }}</span>
        </button>
      </div>
      <div class="input-holder input-holder--elastic wide">
        <textarea
          id="message"
          v-model="form.message"
          name="message"
          rows="8"
        ></textarea>
        <label for="message">
          {{ $t('form.trescWiad') }}
        </label>
      </div>
      <div class="row row--submit wide">
        <Cta
          :is-link="false"
          :txt="$t('form.wyslij')"
          :is-loading="isSending"
          cta-type="submit"
        />
      </div>
    </form>
    <Cta
      v-if="isSent"
      :is-link="false"
      :txt="$t('form.wrocNaStrone')"
      @click="closeForm"
    />
  </div>
</template>

<script>
import axios from 'axios'
import Cta from './ui/Cta'
export default {
  name: 'ContactForm',
  components: { Cta },
  props: {
    subject: {
      type: String,
      default: 'Lorem ipsum dolor sit amet'
    }
  },
  data() {
    return {
      isSent: false,
      isError: false,
      isSending: false,
      isSubjectDisabled: true,

      form: {
        firstName: null,
        lastName: null,
        email: null,
        tel: null,
        msgSubject: this.subject,
        message: null
      }
    }
  },
  computed: {
    formHead() {
      if (this.isSent && !this.isError) {
        return this.$t('form.headSent')
      } else if (this.isSent && this.isError) {
        return this.$t('form.headError')
      }

      return this.$t('form.head')
    }
  },
  mounted() {
    document.addEventListener('keyup', this.keyNav)
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.keyNav)
  },
  methods: {
    keyNav(e) {
      if (e.key === 'Escape') this.closeForm()
    },
    closeForm() {
      this.$emit('closeForm')
    },
    manageInputs() {
      const inputs = document.querySelectorAll('input')
      const textarea = document.querySelectorAll('textarea')
      const els = [...inputs, ...textarea]

      els.forEach((el) => {
        el.value ? el.classList.add('filled') : el.classList.remove('filled')
      })
    },
    editSubject() {
      this.isSubjectDisabled = !this.isSubjectDisabled
    },
    disableInputs() {
      const inputs = document.querySelectorAll('input')
      const textarea = document.querySelectorAll('textarea')
      const els = [...inputs, ...textarea]

      els.forEach((el) => {
        el.disabled = true
      })
    },
    async submitForm() {
      if (!this.isSending) {
        this.isSending = true
        this.disableInputs()
        await axios
          .post('/api/contact/send', this.form)
          .then((response) => {
            this.isSending = false
            this.isSent = true

            if (response.data !== 'Success') this.isError = true
          })
          .catch((err) => {
            console.log(err)
            this.isSending = false
            this.isError = true
          })
      }
    }
  }
}
</script>

<style lang="scss">
.showForm-enter-active,
.showForm-leave-active {
  transition-duration: 0.6s;
  .form-holder__overlay {
    transition: opacity 0.2s ease-out;
  }

  .contact-form {
    transition: transform 0.6s cubic-bezier(0.06, 0.89, 0.7, 1),
      opacity 0.4s ease-out;
  }
}

.showForm-enter,
.showForm-leave-active {
  .form-holder__overlay {
    opacity: 0;
  }

  .contact-form {
    transform: translateY(150px);
    opacity: 0;
  }
}

.form-sent {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.contact-form {
  position: relative;
  width: 50%;
  min-height: calc(100vh - 200px);
  margin: 0 auto;
  background: #fff;
  padding: 30px;
  border: 2px solid rgba(189, 138, 93, 0.5);
  box-shadow: 0 14px 100px rgba(0, 0, 0, 0.35);

  &__head {
    position: relative;

    .prod-nav__close {
      right: 0;
      top: 0;
    }
  }

  &__msg {
    margin-bottom: 30px;
  }

  &__form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;

    .wide {
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }

  .row--submit {
    justify-content: flex-end;
  }
}

@media (max-width: $brMobile) {
  #single-product .contact-form .prod-nav__close {
    position: absolute;
    height: 50px;
    top: 15px;
    right: 15px;
  }

  .contact-form {
    width: 100%;
    min-height: auto;
    padding: 15px;

    &__form {
      .input-holder {
        grid-column-start: 1;
        grid-column-end: 3;

        input {
          padding: 17px 15px;
        }

        label {
          left: 9px;
        }

        &--static-label input,
        &--static-label textarea {
          padding-left: 82px;
          padding-right: 63px;
        }
      }
    }
  }
}
</style>
