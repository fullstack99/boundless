<template lang="pug">
  .social-oauth
    v-btn.primary-action(color='primary')
      | {{ $t('general.save') }}
      v-icon save
    v-layout.mb-3(row)
      v-flex.py-3(xs12)
        h3.small-heading {{ $t(' organization.socialNetworkAuthorization ') }}
    v-layout(row)
      v-flex.mr-2(xs6)
        .form-card
          v-layout(row)
            v-flex.label-wrapper(xs5)
              v-icon.facebook fab fa-facebook
              span.form-card-label  Facebook
            v-flex(xs7)
              base-switch(
                color="deep-purple lighten-2",
                :label-left="$t('organization.defaultOauth')",
                :label-right="$t('organization.oauthCustomised')",
                v-model="facebook.custom"
              )
          v-layout.mt-4(row)
            v-flex(xs5)
              v-text-field(name='oauthID', :label="$t(' organization.oauthID ')", append-icon="help_outlined", hide-details)
            v-flex(xs5, offset-sm2)
              v-text-field(name='oauthSecret', :label="$t(' organization.oauthSecret ')", append-icon="help_outlined", hide-details)
      v-flex.ml-2(xs6)
        .form-card
          v-layout(row)
            v-flex.label-wrapper(xs5)
              v-icon.twitter fab fa-twitter
              span.form-card-label  Twitter
            v-flex(xs7)
              base-switch(
                color="deep-purple lighten-2",
                :label-left="$t('organization.defaultOauth')",
                :label-right="$t('organization.oauthCustomised')",
                v-model="twitter.custom"
              )
          v-layout.mt-4(row)
            v-flex(xs5)
              v-text-field(name='oauthID', :label="$t(' organization.oauthID ')", append-icon="help_outlined", hide-details)
            v-flex(xs5, offset-sm2)
              v-text-field(name='oauthSecret', :label="$t(' organization.oauthSecret ')", append-icon="help_outlined", hide-details)
    v-layout.mt-3(row)
      v-flex.mr-2(xs6)
        .form-card
          v-layout(row)
            v-flex.label-wrapper(xs5)
              v-icon.linkedin fab fa-linkedin
              span.form-card-label  LinkedIn
            v-flex(xs7)
              base-switch(
                color="deep-purple lighten-2",
                :label-left="$t('organization.defaultOauth')",
                :label-right="$t('organization.oauthCustomised')",
                v-model="linkedin.custom"
              )
          v-layout.mt-4(row)
            v-flex(xs5)
              v-text-field(name='oauthID', :label="$t(' organization.oauthID ')", append-icon="help_outlined", hide-details)
            v-flex(xs5, offset-sm2)
              v-text-field(name='oauthSecret', :label="$t(' organization.oauthSecret ')", append-icon="help_outlined", hide-details)
      v-flex.ml-2(xs6)
        .form-card
          v-layout(row)
            v-flex.label-wrapper(xs5)
              v-icon.instagram fab fa-instagram
              span.form-card-label  Instagram
            v-flex(xs7)
              base-switch(
                color="deep-purple lighten-2",
                :label-left="$t('organization.defaultOauth')",
                :label-right="$t('organization.oauthCustomised')",
                v-model="instagram.custom"
              )
          v-layout.mt-4(row)
            v-flex(xs5)
              v-text-field(name='oauthID', :label="$t(' organization.oauthID ')", append-icon="help_outlined", hide-details)
            v-flex(xs5, offset-sm2)
              v-text-field(name='oauthSecret', :label="$t(' organization.oauthSecret ')", append-icon="help_outlined", hide-details)
    v-layout.mt-3(row)
      v-flex.mr-2(xs6)
        .form-card
          v-layout(row)
            v-flex.label-wrapper(xs5)
              v-icon.google fab fa-google
              span.form-card-label  Google
            v-flex(xs7)
              base-switch(
                color="deep-purple lighten-2",
                :label-left="$t('organization.defaultOauth')",
                :label-right="$t('organization.oauthCustomised')",
                v-model="google.custom"
              )
          v-layout.mt-4(row)
            v-flex(xs5)
              v-text-field(name='oauthID', :label="$t(' organization.oauthID ')", append-icon="help_outlined", hide-details)
            v-flex(xs5, offset-sm2)
              v-text-field(name='oauthSecret', :label="$t(' organization.oauthSecret ')", append-icon="help_outlined", hide-details)
      v-flex.ml-2(xs6)
</template>

<script>
import baseSwitch from '@/components/common/base-switch'

export default {
  name: 'SocialOauth',

  data () {
    return {
      active: null,
      checkbox: true,
      radioGroup: 1,
      switch1: true,
      facebook: {
        custom: false,
        id: '',
        secret: ''
      },
      twitter: {
        custom: false,
        id: '',
        secret: ''
      },
      instagram: {
        custom: false,
        id: '',
        secret: ''
      },
      linkedin: {
        custom: false,
        id: '',
        secret: ''
      },
      google: {
        custom: false,
        id: '',
        secret: ''
      }
    }
  },

  components: {
    baseSwitch
  },

  methods: {
    next () {
      const active = parseInt(this.active)
      this.active = (active < 2 ? active + 1 : 0).toString()
    }
  }
}
</script>
