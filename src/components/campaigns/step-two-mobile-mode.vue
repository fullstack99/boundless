<template lang="pug">
div
  h4.step-heading.mt-5.mb-4 {{ $t('campaign.redirectionMobile') }}
    v-icon.heading-icon help_outlined
  .connect-form
    .connect-group
      .connect-icon
        v-icon.default fas fa-mobile
        span Default*
      .connect-field
        v-text-field(v-model="redirection.mobile.defaults", :label="$t('campaign.redirectLink')")
    .connect-group
      .connect-icon
        v-icon.apple fab fa-apple
        span Apple
      .connect-field
        v-text-field(v-model="redirection.mobile.apple", :label="$t('campaign.redirectLink')")
    .connect-group
      .connect-icon
        v-icon.android fab fa-android
        span Android
      .connect-field
        v-text-field(v-model="redirection.mobile.android", :label="$t('campaign.redirectLink')")
    .connect-group
      .connect-icon
        v-icon.windows fab fa-windows
        span Windows
      .connect-field
        v-text-field(v-model="redirection.mobile.windows", :label="$t('campaign.redirectLink')")
</template>

<script>
export default {
  props: ['redirection']
}
</script>
