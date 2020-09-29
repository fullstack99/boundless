<template lang='pug'>
  v-container
    // layout holding the entire login view
    v-layout(row)
      v-flex(xs12)
        h1.pa-3.primary--text {{ userName }} - {{ $t('general.myProfile') }}

    // user profile information
    v-layout.pb-5(row)
      // general info
      v-flex(xs12 sm4)
        h1 general
        hr
        v-container
          v-layout(row)
            v-flex(xs6)
              strong Last Connection
            v-flex(xs6)
              p 30 mins ago
          v-layout(row)
            v-flex(xs6)
              strong Company
            v-flex(xs6)
              p Etam
          v-layout(row)
            v-flex(xs6)
              strong Assign to
            v-flex(xs6)
              p Etam Group
          v-layout(row)
            v-flex(xs6)
              strong Member for
            v-flex(xs6)
              p 1 year
          v-layout(row)
            v-flex(xs6)
              strong Role
            v-flex(xs6)
              p Marketing Director

      // language prefs
      v-flex(xs12 sm4)
        h1 Language preferences
        hr
        v-select.pr-5(v-model='country',
          :items="countries",
          item-text='name' item-value='value' label="Select country",
          persistent-hint, single-line, return-object, autocomplete)

      // api key
      v-flex(xs12 sm4)
        h1 API key
        hr
        v-form(ref='apiKey', v-model='apiKeyValid', lazy-validation)
          // API Key field
          v-container
            v-layout(row)
              v-flex(xs12)
                v-text-field(v-model='apiKey', :rules="apiKeyRules" required)
            // submit
            v-layout(row)
              v-flex(xs12)
                v-btn.primary.white--text(:disabled='!apiKeyValid', @click='submitApiKey') {{ $t('login.submit') }}

    v-layout.pb-5(row)
      v-flex(xs12 sm4)
        h1 Edit your information
        hr
        v-form(ref='userInformation', v-model='userInformationValid', lazy-validation)
          // title field
          v-container
            v-layout(row)
              v-flex(xs12)
                v-select(:items='titles', v-model='title', :label="$t('user.enterTitle')", single-line, required)

          // first name field
          v-container
            v-layout(row)
              v-flex(xs12)
                v-text-field(v-model='firstName', :rules='firstNameRules', :label="$t('user.enterFirstName')", type="text", required)
          // last name field
          v-container
            v-layout(row)
              v-flex(xs12)
                v-text-field(v-model='lastName', :rules='lastNameRules', :label="$t('user.enterLastName')", type="text", required)
          // mobile number
          v-container
            v-layout(row)
              v-layout(row)
                v-flex(xs12)
                  v-text-field(v-model='mobilePhoneNumber', :rules='mobilePhoneNumberRules', :label="$t('user.enterMobilePhoneNumber')", type="text", required)
          // submission
          v-container
            v-layout(row)
              v-flex(xs12)
                v-btn.primary.white--text(:disabled='!userInformationValid', @click='submitEditInformation') {{ $t('login.submit') }}

      v-flex(xs12 sm4)
        h1 Edit your e-mail
        hr
        v-form(ref='editEmail', v-model='editEmailValid', lazy-validation)
          // email field
          v-container
            v-layout(row)
              v-flex(xs12)
                v-text-field(v-model='email', :rules='emailRules', :label="$t('login.enterEmail')", type="email", required)
            // submit
            v-layout(row)
              v-flex(xs12)
                v-btn.primary.white--text(:disabled='!editEmailValid', @click='submitEditEmail') {{ $t('login.submit') }}

      v-flex(xs12 sm4)
        h1 Edit your password
        hr
        v-form(ref='editPassword', v-model='editPasswordValid', lazy-validation)
          // password field
          v-container
            v-layout(row)
              v-flex(xs12)
                v-text-field(v-model='password',
                :rules='passwordRules',
                :append-icon="passwordHidden ? 'visibility' : 'visibility_off'",
                :append-icon-cb='() => passwordHidden = !passwordHidden',
                :type="passwordHidden ? 'password' : 'text'",
                :label="$t('login.enterPassword')",
                :hint="$t('login.passwordHint')", min='8', required, counter)

          // password confirmation field
          v-container
            v-layout(row)
              v-flex(xs12)
                v-text-field(v-model='password2',
                :rules='password2Rules',
                :append-icon="password2Hidden ? 'visibility' : 'visibility_off'",
                :append-icon-cb='() => password2Hidden = !password2Hidden',
                :type="password2Hidden ? 'password' : 'text'",
                :label="$t('login.confirmPassword')",
                :hint="$t('login.passwordHint')", min='8', required, counter)

          // submit
          v-layout(row)
            v-flex(xs12)
              v-btn.primary.white--text(:disabled='!editPasswordValid', @click='submitEditEmail') {{ $t('login.submit') }}

    v-layout.pb-5(row)
      v-flex(xs12)
        h1 Account authorization
        h4.pb-3
          v-icon verified_user
          | You are an administrator of the organization

        template
          v-data-table.elevation-1(:headers='headers', :items='desserts', hide-actions='')
            template(slot='items', slot-scope='props')
              td {{ props.item.name }}
              td.text-xs-right {{ props.item.site }}
              td.text-xs-right {{ props.item.admin }}
              td.text-xs-right {{ props.item.manage }}
              td.text-xs-right {{ props.item.edit }}
              td.text-xs-right {{ props.item.read }}
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {nameRules, emailRules, requiredField} from '@/utils/form-fields-validation-rules'
import passwordFieldMatchingValidation from '@/mixins/password-field-matching-validation.mixin'

export default {
  name: 'UserProfile',

  // use auth from auth.service
  props: ['auth'],

  mixins: [passwordFieldMatchingValidation],

  mounted () {
    if (this.countries.length < 1) {
      this.fetchCountries()
    }
  },

  data () {
    // each field is represented by a value property and its validation rule
    return {
      userName: 'Cristian Maghiar',
      country: { value: '', name: '' },
      apiKey: 'jefjlzefkGQSEK25465321dkkdnfqsf',
      apiKeyRules: requiredField('Enter API Key'),
      apiKeyValid: false,
      title: '',
      titleRules: nameRules('Title'),
      firstName: '',
      firstNameRules: nameRules('First name'),
      lastName: '',
      lastNameRules: nameRules('Last name'),
      mobilePhoneNumber: '',
      mobilePhoneNumberRules: nameRules(),
      userInformationValid: false,
      email: '',
      emailRules: emailRules(),
      editEmailValid: false,
      // password
      password: '',
      password2: '',
      passwordRules: [],
      password2Rules: [],
      passwordHidden: true,
      password2Hidden: true,
      editPasswordValid: false,
      titles: [
        { text: 'Mr' },
        { text: 'Ms' },
        { text: 'Mrs' }
      ],
      headers: [
        { text: 'Organization', align: 'left', value: 'name' },
        { text: 'Site/ Group', align: 'right', value: 'site' },
        { text: 'Admin', align: 'right', value: 'admin' },
        { text: 'Manage', align: 'right', value: 'manage' },
        { text: 'Edit', align: 'right', value: 'edit' },
        { text: 'Read', align: 'right', value: 'read' }
      ],
      desserts: [
        {
          value: false,
          name: 'Etam France',
          site: 'Rue de Rennes',
          admin: true,
          manage: false,
          edit: false,
          read: false
        },
        {
          value: false,
          name: 'Etam France',
          site: 'Rue de Rennes',
          admin: true,
          manage: false,
          edit: false,
          read: true
        },
        {
          value: false,
          name: 'Etam France',
          site: 'Rue de Rennes',
          admin: true,
          manage: false,
          edit: false,
          read: false
        }
      ]
    }
  },

  computed: {
    ...mapGetters(['countries'])
  },

  methods: {
    ...mapActions(['fetchCountries']),
    submitApiKey () {
      if (this.$refs.apiKey.validate()) {
        console.log(this.apiKey)
        // this.sendApiKey(this.apiKey)
      }
    },

    submitEditInformation () {
      if (this.$refs.userInformation.validate()) {
        console.log({
          title: this.title,
          firstName: this.firstName,
          lastName: this.lastName,
          mobilePhoneNumber: this.mobilePhoneNumber
        })
        // this.editInformation()
      }
    },

    submitEditEmail () {
      if (this.$refs.editEmail.validate()) {
        console.log(this.email)
        // this.editInformation()
      }
    },

    submitEditPassword () {
      if (this.$refs.editPassword.validate()) {
        console.log({ password: this.password })
        // this.editPassword()
      }
    }
  },

  // meta tags
  metaInfo: {
    title: ``
  }
}
</script>
