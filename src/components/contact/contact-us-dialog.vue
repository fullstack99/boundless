<template lang="pug">
  base-dialog(:show="show", @close="$emit('close')")
    v-tabs.tabs-simple(v-model="active")
      v-tab(:ripple="false") {{ $t(' contact.contactUs') }}
      v-tab(:ripple="false") {{ $t(' contact.toBeRecalled') }}
      v-tab-item
        // page title
        v-layout(row)
          v-flex.mb-4.mt-5(xs12)
            h2.dialog-heading.mb-1 {{ $t(' contact.contactUs') }}
            h4.dialog-subtitle {{ $t(' contact.fillTheContactForm') }}

        // contact row
        v-layout(row)
          v-flex(xs12 sm6)
            v-select.mr-3(
              single-line, required,
              :items='polites',
              v-model='contactForm.gender',
              :label="$t('general.polite')",
              :error-messages="genderErrors",
              @input="$v.contactForm.gender.$touch()",
              @blur="$v.contactForm.gender.$touch()"
            )
            v-text-field.mr-3(
              v-model="contactForm.name",
              required,
              :name="$t('general.name')",
              :label="$t('general.name')",
              :error-messages="nameErrors",
              @input="$v.contactForm.name.$touch()",
              @blur="$v.contactForm.name.$touch()"
            )
            v-text-field.mr-3(
              required
              v-model="contactForm.email",
              :name="$t('general.email')",
              :label="$t('general.email')",
              :error-messages="emailErrors",
              @input="$v.contactForm.email.$touch()",
              @blur="$v.contactForm.email.$touch()"
            )
          v-flex(xs12 sm6)
            tel-input.ml-3(
              v-model="contactForm.telephone",
              required,
              :label="$t('general.phoneNumber')",
              :error-messages="telephoneErrors",
              @input="$v.contactForm.telephone.$touch()",
              @blur="$v.contactForm.telephone.$touch()"
            )
            v-select.ml-3(
              single-line, required,
              v-model="contactForm.availability",
              :items='availabilities',
              :label="$t('contact.availability')",
              :error-messages="availabilityErrors",
              @input="$v.contactForm.availability.$touch()",
              @blur="$v.contactForm.availability.$touch()"
            )
            v-text-field.ml-3(
              multi-line, required,
              v-model='contactForm.message',
              :name="$t('contact.writeMessageHere')",
              :label="$t('contact.writeMessageHere')",
              :error-messages="messageErrors",
              @input="$v.contactForm.message.$touch()",
              @blur="$v.contactForm.message.$touch()"
            )
      v-tab-item
        // page title
        v-layout(row)
          v-flex.mb-4.mt-5(xs12)
            h2.dialog-heading.mb-1 {{ $t(' contact.toBeRecalled') }}
            h4.dialog-subtitle {{ $t(' contact.fillTheContactForm') }}

        // contact row
        v-layout(row)
          v-flex(xs12 sm6)
            v-select.mr-3(
              single-line, required,
              :items='polites',
              v-model='contactForm.gender',
              :label="$t('general.polite')",
              :error-messages="genderErrors",
              @input="$v.contactForm.gender.$touch()",
              @blur="$v.contactForm.gender.$touch()"
            )
            v-text-field.mr-3(
              v-model="contactForm.name",
              required,
              :name="$t('general.name')",
              :label="$t('general.name')",
              :error-messages="nameErrors",
              @input="$v.contactForm.name.$touch()",
              @blur="$v.contactForm.name.$touch()"
            )
            v-text-field.mr-3(
              required
              v-model="contactForm.email",
              :name="$t('general.email')",
              :label="$t('general.email')",
              :error-messages="emailErrors",
              @input="$v.contactForm.email.$touch()",
              @blur="$v.contactForm.email.$touch()"
            )
          v-flex(xs12 sm6)
            tel-input.ml-3(
              v-model="contactForm.telephone",
              required,
              :label="$t('general.phoneNumber')",
              :error-messages="telephoneErrors",
              @input="$v.contactForm.telephone.$touch()",
              @blur="$v.contactForm.telephone.$touch()"
            )
            v-select.ml-3(
              single-line, required,
              v-model="contactForm.availability",
              :items='availabilities',
              :label="$t('contact.availability')",
              :error-messages="availabilityErrors",
              @input="$v.contactForm.availability.$touch()",
              @blur="$v.contactForm.availability.$touch()"
            )
            v-text-field.ml-3(
              multi-line, required,
              v-model='contactForm.message',
              :name="$t('contact.writeMessageHere')",
              :label="$t('contact.writeMessageHere')",
              :error-messages="messageErrors",
              @input="$v.contactForm.message.$touch()",
              @blur="$v.contactForm.message.$touch()"
            )
    v-layout.pt-3(row)
      v-flex(xs12)
        em.required-label {{ $t('contact.mandatoryFields') }}
    v-layout.pt-3.text-xs-right(row)
      v-flex(xs12)
        v-btn(color="success", round, large, @click="submitForm", :loading="loading") {{$t('general.send')}}
</template>

<script>
import { mapGetters } from 'vuex'
import baseDialog from '@/components/common/base-dialog'
import axios from 'axios'
import { required, email, maxLength } from 'vuelidate/lib/validators'
import telInput from '@/components/common/tel-input/input'

export default {
  name: 'ContactUsDialog',

  props: ['show'],

  components: {
    baseDialog,
    telInput
  },

  validations: {
    contactForm: {
      gender: {
        required
      },
      email: {
        required,
        email
      },
      name: {
        required
      },
      telephone: {
        required
      },
      availability: {
        required
      },
      message: {
        required,
        maxLength: maxLength(500)
      }
    }
  },

  data () {
    return {
      active: null,
      phone: '',
      polites: [
        'Mr',
        'Ms',
        'Mrs'
      ],
      availabilities: [
        'One',
        'Two'
      ],
      message: '',
      contactForm: {
        gender: '',
        name: '',
        email: '',
        telephone: '',
        availability: '',
        subject: 'Contact Form Submission',
        message: ''
      },
      loading: false
    }
  },

  mounted () {
    Object.assign(this.contactForm, {
      name: this.currentUser.name,
      telephone: this.currentUser.phone,
      email: this.currentUser.email
    })
  },

  methods: {
    next () {
      const active = parseInt(this.active)
      this.active = (active < 2 ? active + 1 : 0).toString()
    },
    submitForm () {
      this.$v.$touch()
      const API_URL = process.env.API_URL
      this.contactForm.type = (this.active) ? 'contact' : 'remind'

      if (!this.$v.$invalid) {
        this.loading = true
        axios.post(API_URL + '/contact/', this.contactForm).then((response) => {
          console.log(response.data)
          global.toastr['success'](this.$t('contact.contactSuccessMessage'), this.$t('general.success'))
          this.loading = false
          this.clearForm()
          this.$emit('close')
        }).catch(err => {
          this.loading = false
          console.log(err)
        })
      }
    },
    clearForm () {
      this.contactForm = {
        gender: '',
        name: this.currentUser.name,
        email: this.currentUser.email,
        telephone: this.currentUser.phone,
        availability: '',
        subject: 'Contact Form Submission',
        message: ''
      }

      this.$v.$reset()
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    emailErrors () {
      const errors = []
      if (!this.$v.contactForm.email.$dirty) return errors
      !this.$v.contactForm.email.email && errors.push('Must be valid e-mail')
      !this.$v.contactForm.email.required && errors.push(`${this.$t('general.email')} is required`)
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.contactForm.name.$dirty) return errors
      !this.$v.contactForm.name.required && errors.push(`${this.$t('general.name')} is required`)
      return errors
    },
    genderErrors () {
      const errors = []
      if (!this.$v.contactForm.gender.$dirty) return errors
      !this.$v.contactForm.gender.required && errors.push(`${this.$t('general.polite')} is required`)
      return errors
    },
    telephoneErrors () {
      const errors = []
      if (!this.$v.contactForm.telephone.$dirty) return errors
      !this.$v.contactForm.telephone.required && errors.push(`${this.$t('general.phoneNumber')} is required`)
      return errors
    },
    availabilityErrors () {
      const errors = []
      if (!this.$v.contactForm.availability.$dirty) return errors
      !this.$v.contactForm.availability.required && errors.push(`${this.$t('contact.availability')} is required`)
      return errors
    },
    messageErrors () {
      const errors = []
      if (!this.$v.contactForm.message.$dirty) return errors
      !this.$v.contactForm.message.required && errors.push(`${this.$t('general.message')} is required`)
      !this.$v.contactForm.message.maxLength && errors.push(`${this.$t('general.message')} cannot have more than 500 letters`)
      return errors
    }
  }
}
</script>

<style>
  .required-label {
    color: #9ba9c4 !important;
  }
</style>
