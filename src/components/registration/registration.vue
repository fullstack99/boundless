<template lang='pug'>
  div
    p.login-text {{ $t('login.signUpText')}}
    v-form(ref='form', @submit.prevent="registerUser")
      // name field
      v-layout(row)
        v-flex(xs12)
          v-text-field(
            v-model='name',
            type="text",
            required,
            :label="$t('login.name')",
            :error-messages="nameErrors",
            @input="$v.name.$touch()",
            @blur="$v.name.$touch()"
          )
      // email field
      v-layout(row)
        v-flex(xs12)
          v-text-field(
            v-model='email',
            type="email",
            required,
            :label="$t('login.email')",
            :error-messages="emailErrors",
            @blur="$v.email.$touch()"
          )
      // password field
      v-layout(row)
        v-flex(xs12)
          v-text-field(
            v-model='password',
            min='8', required, counter,
            :append-icon="passwordHidden ? 'visibility' : 'visibility_off'",
            :append-icon-cb='() => passwordHidden = !passwordHidden',
            :type="passwordHidden ? 'password' : 'text'",
            :label="$t('login.password')",
            :error-messages="passwordErrors",
            @input="$v.password.$touch()",
            @blur="$v.password.$touch()"
          )
      // phone number
      v-layout(row)
        v-layout(row)
          v-flex(xs12)
            v-text-field(
              v-model='phoneNumber',
              type="text",
              :label="$t('login.phoneNumber')",
              :error-messages="getErrorMessages('phone')"
            )
      // checkbox
      v-layout(row)
        v-flex(xs12)
          // v-checkbox.primary--text(v-model='checkbox', :rules="checkboxRules", :label="$t('login.doYouAgree')", required)
          v-btn.success.white--text(:loading="loading", round, block, :disabled='this.$v.$dirty && this.$v.$invalid', type="submit") {{ $t('login.submit') }}
      // the links below the form: register and forgot pass
      v-layout(row).mt-3
        v-flex.text-xs-center(xs12)
          router-link.forgot-link(to="/login") {{ $t("login.alreadyRegistered") }}
</template>

<script>
import {mapActions} from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'

import ErrorHandlerMixin from '@/mixins/error-handler.mixin'
import SelectOrgMixin from '@/mixins/select-org.mixin'

export default {
  name: 'Register',

  validations: {
    name: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    }
  },

  mixins: [
    ErrorHandlerMixin,
    SelectOrgMixin
  ],

  data () {
    // each field is represented by a value property and its validation rule
    return {
      // name
      name: '',

      // email
      email: '',
      // password
      password: '',
      passwordHidden: true,

      // phoneNumber
      phoneNumber: '',
      // checkbox
      checkbox: false,
      // form is valid
      valid: true,
      loading: false
    }
  },

  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors.length > 0 ? errors : this.getErrorMessages('email')
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Password must be at least 8 characters')
      !this.$v.password.required && errors.push('Password is required')
      return errors.length > 0 ? errors : this.getErrorMessages('password')
    }
  },

  methods: {
    ...mapActions('auth', ['signup']),
    // the form cleanup
    clear () {
      this.$refs.form.reset()
      this.clearErrorData()
    },

    // actions
    registerUser () {
      this.$v.$touch()
      this.clearErrorData()

      if (!this.$v.$invalid) {
        this.loading = true

        this.signup({
          email: this.email,
          password: this.password,
          password2: this.password,
          name: this.name,
          phone: this.phoneNumber
        }).then(() => {
          this.fetchOrganizations().then(response => {
            // Redirects to proper organization url
            this.selectActiveOrganization()
            this.loading = false
          })
        }).catch((err) => {
          // `this.setErrorData()` is from ErrorHandlerMixin
          this.setErrorData(err)
          this.loading = false
        })
      }
    }
  },

  // meta tags
  metaInfo: {
    title: ``
  }
}
</script>
