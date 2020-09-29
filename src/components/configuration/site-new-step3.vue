<template lang="pug">
  v-container(grid-list-md)
    v-layout(row)
      // Setting up social networks row
      v-flex(xs12)
        v-container(grid-list-md)
          v-layout(row)
            v-flex(xs12)
              h2 {{ $t('settings.settingUpSocialNetworks') }}
              hr.mb-3
              p {{ $t('settings.settingUpSocialNetworksDescription') }}

          // facebook row
          v-layout(row)
            v-flex(xs4, sm3)
              v-icon.d-inline-block fa-facebook-f
              span.d-inline-block
                | {{ $t('social.facebook') }}
            v-flex(xs8, sm9)
              v-text-field(name='oauthSecret', :label="$t(' settings.urlOrIdOfPage ')", append-icon="help")

          // twitter row
          v-layout(row)
            v-flex(xs4, sm3)
              v-icon.d-inline-block fa-twitter
              span.d-inline-block
                | {{ $t('social.twitter') }}
            v-flex(xs8, sm9)
              v-text-field(name='oauthSecret', :label="$t(' settings.urlOrIdOfPage ')", append-icon="help")

          // linkedIn row
          v-layout(row)
            v-flex(xs4, sm3)
              v-icon.d-inline-block fa-linked-in
              span.d-inline-block
                | {{ $t('social.linkedIn') }}
            v-flex(xs8, sm9)
              v-text-field(name='oauthSecret', :label="$t(' settings.urlOrIdOfPage ')", append-icon="help")

          // instagram row
          v-layout(row)
            v-flex(xs4, sm3)
              v-icon.d-inline-block fa-instagram
              span.d-inline-block
                | {{ $t('social.instagram') }}
            v-flex(xs8, sm9)
              v-text-field(name='oauthSecret', :label="$t(' settings.urlOrIdOfPage ')", append-icon="help")

          // google row
          v-layout(row)
            v-flex(xs4, sm3)
              v-icon.d-inline-block fa-google-plus-g
              span.d-inline-block
                | {{ $t('social.google') }}
            v-flex(xs8, sm9)
              v-text-field(name='oauthSecret', :label="$t(' settings.urlOrIdOfPage ')", append-icon="help")
</template>
<script>
export default {
  name: 'NewSiteModalStep3'
}
</script>
