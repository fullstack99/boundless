<template lang="pug">
div.connection-mode
  h4.step-heading.mt-5.mb-4 {{ $t('campaign.redirectionConnectionMode') }}
    v-icon.heading-icon help_outlined
  .connect-form
    .connect-group
      .connect-icon
        v-icon.default fa-file
        span {{$t('general.form')}}
      .connect-field
        v-text-field(v-model="redirection.connection.formUrl", :label="$t('campaign.redirectLink')")
    .connect-group
      .connect-icon
        v-icon.facebook fab fa-facebook
        span Facebook
      .connect-field
        v-text-field(v-model="redirection.connection.facebookUrl", :label="$t('campaign.redirectLink')")
    .connect-group
      .connect-icon
        v-icon.twitter fab fa-twitter
        span Twitter
      .connect-field
        v-text-field(v-model="redirection.connection.twitterUrl", :label="$t('campaign.redirectLink')")
    .connect-group
      .connect-icon
        v-icon.linkedin fab fa-linkedin
        span Linkedin
      .connect-field
        v-text-field(v-model="redirection.connection.linkedUrl", :label="$t('campaign.redirectLink')")
    .connect-group
      .connect-icon
        v-icon.instagram fab fa-instagram
        span Instagram
      .connect-field
        v-text-field(v-model="redirection.connection.instagramUrl", :label="$t('campaign.redirectLink')")
    .connect-group
      .connect-icon
        v-icon.google-plus fab fa-google
        span Google
      .connect-field
        v-text-field(v-model="redirection.connection.googleUrl", :label="$t('campaign.redirectLink')")
</template>

<script>
export default {
  props: ['redirection']
}
</script>

<style lang="scss">
  @import "styles/colors.scss";

  .connect-form {
    padding: 50px;
    background-color: white;
  }

  .connect-group {
    display: flex;
    justify-content: center;
    font-size: 15px;
    align-items: center;

    .connect-icon {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex: 1;
      text-align: center;
      min-width: 170px;

      .icon {
        width: 50px;
        text-align: left;
        justify-content: flex-end;
        font-size: 20px;
      }

      span {
        padding-left: 20px;
      }
    }

    .connect-field {
      flex: 5;
      padding-left: 20px;
    }
  }
</style>
