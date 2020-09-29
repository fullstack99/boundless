<template lang="pug">
  .page-content.settings-page.no-margin
    // v-layout(row)
    //   v-flex(xs12)
    //     v-alert.info-strip(:value='true', outline, color='grey', icon='business_center')
    //       | {{ $t('general.currentOrganization') }}
    .selection-list.mb-5
      .list-item(:class="{'active': isRouteActive('OrganizationSettingsGeneral')}", @click="openPage('OrganizationSettingsGeneral')")
        p {{ $t(' organization.general ') }}
      .list-item(:class="{'active': isRouteActive('OrganizationSettingsSocialOauth')}",  @click="openPage('OrganizationSettingsSocialOauth')")
        p {{ $t(' organization.socialAuthSplashPage ') }}
      .list-item(:class="{'active': isRouteActive('OrganizationSettingsDataExport')}",  @click="openPage('OrganizationSettingsDataExport')")
        p {{ $t(' organization.exportData ') }}
      .list-item(:class="{'active': isRouteActive('OrganizationSettingsEmailAndSMS')}",  @click="openPage('OrganizationSettingsEmailAndSMS')")
        p {{ $t(' organization.emailSmsMobilApp ') }}
      .list-item(:class="{'active': isRouteActive('OrganizationSettingsGDPRPortability')}",  @click="openPage('OrganizationSettingsGDPRPortability')")
        p {{ $t(' organization.dataPortability ') }}
    router-view
</template>

<script>
export default {
  methods: {
    isRouteActive (input) {
      return this.$route.name === input
    },
    openPage (route) {
      this.$router.push({ name: route })
    }
  }
}
</script>

<style lang="scss">
  @import "styles/colors.scss";

  .form-card {
    width: 100%;
    padding: 50px;
    background: white;

    &.small{
      padding: 20px;
    }

    &.danger {
      border: 1px solid $red;

      p {
        font-size: 16px;
        margin-bottom: 0;
      }
    }

    .label-wrapper {
      display: flex;
      align-items: center;
    }

    .form-card-label {
      color: #43619c;
      margin-left: 15px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .input-row {
      margin-top: 40px;
    }

    .base-switch label {
      color: #9ba9c4 !important;
      font-size: 14px !important;
    }
  }
</style>
