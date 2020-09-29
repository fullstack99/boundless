<template lang="pug">
  .page-content.monitoring-page

    v-layout.mb-5
      //- v-flex(xs12, sm12, md6, lg6)
      //-   a.tab(:class="{'active': isRouteActive('WifiAnalyticsHome')}",  @click="openPage('WifiAnalyticsHome')")
      //-     span {{ $t(' monitoring.home ') }}
      //-   a.tab(:class="{'active': isRouteActive('WifiAnalyticsExport')}",  @click="openPage('WifiAnalyticsExport')")
      //-     span {{ $t(' monitoring.export ') }}
      //-   a.tab(:class="{'active': isRouteActive('WifiAnalyticsSettings')}",  @click="openPage('WifiAnalyticsSettings')")
      //-     span {{ $t(' monitoring.settings ') }}

      v-flex.mx-2(xs12, sm12, md3, lg3)
        v-select(:items='groups', v-model='selectedGroup', :label="$t(' campaign.selectGroup ')")
      v-flex.mx-2(xs12, sm12, md3, lg3)
        v-select(:items='times', v-model='selectedTime', :label="$t(' monitoring.selectTime ')")
      v-flex.pb-3(xs6, md6, lg6, text-xs-right)
        v-btn.primary-action(color='primary', @click.stop='showNewSplashDialog = true')
          | {{ $t(' monitoring.save ') }}
          v-icon save_alt
    .wifi-analytics
      v-layout(row, wrap)
        .container-3.px-2.py-2
          collection-satistics
        .container-3.px-2.py-2
          email-collected
        .container-3.px-2.py-2
          visited-sites
      v-layout(row, wrap)
        .container-2.px-2.py-2
          type-of-product(
            :type="'os'",
            :data='charts.os',
            :bgImg="'/static/images/chart-os-bg.png'"
          )
        .container-2.px-2.py-2
          type-of-product(
            :type="'device'",
            :data='charts.device',
            :bgImg="'/static/images/chart-device-bg.png'"
          )
</template>

<script>
import collectionSatistics from './collection-satistics'
import emailCollected from './email-collected'
import visitedSites from './visited-sites'
import typeOfProduct from './type-of-product'

export default {
  components: {
    collectionSatistics,
    emailCollected,
    visitedSites,
    typeOfProduct
  },
  methods: {
    isRouteActive (input) {
      return this.$route.name === input
    },
    openPage (route) {
      this.$router.push({ name: route })
    }
  },
  data () {
    return {
      groups: ['Etam Global', '> Etam France', '> Etam Romania', '>> Etam Oradea'],
      selectedGroup: 'Etam Global',
      times: ['Last day', 'Last week', 'Last month'],
      selectedTime: 'Last day',
      charts: {
        os: {
          apple: {
            icon: 'fab fa-apple',
            value: 18
          },
          android: {
            icon: 'fab fa-android',
            value: 45
          },
          windows: {
            icon: 'fab fa-windows',
            value: 30
          },
          other: {
            icon: 'fa fa-mobile',
            value: 7
          }
        },
        device: {
          telephone: {
            icon: 'fa fa-phone',
            value: 18
          },
          tablet: {
            icon: 'fa fa-tablet',
            value: 45
          },
          computer: {
            icon: 'fa fa-desktop',
            value: 30
          },
          other: {
            icon: 'fa fa-mobile',
            value: 7
          }
        }
      }
    }
  }
}

</script>

<style lang="scss">
@import "styles/colors.scss";

.monitoring-page {
  a {
    &.tab {
      padding: 5px;
      margin-right: 30px;
      position: relative;

      span {
        font-family: 'Fira Sans', sans-serif;
        color: $deemed-gray;
      }

      &.active {
        span {
          color: $black;
        }

        &:after {
          width: 30px;
          height: 4px;
          background: $green;
          content: ' ';
          position: absolute;
          bottom: -7px;
          left: 5px;
        }
      }
    }
  }

  .form-card {
    width: 100%;
    padding: 50px;
    background: white;
    box-shadow: 5px 10px 20px 0px rgba(206, 211, 218, 0.3);
    border-radius: 5px;

    .icon {
      width: 40px !important;
    }

    &.x2 {
      height: 280px;
      min-width: 600px;
      max-width: 750px;
    }
    &.x3 {
      width: 420px;
      height: 420px;
    }
  }

  .container-2, .container-3 {
    display: flex;
  }

  @media (min-width: 1690px) {
    .container-3 {
      flex-basis: 33.33333333333333%;
      flex-grow: 0;
      max-width: 33.33333333333333%;
    }
    .container-2 {
      flex-basis: 50%;
      flex-grow: 0;
      max-width: 50%;
    }
  }

  @media (max-width: 1690px) {
    .container-3 {
      flex-basis: 50%;
      flex-grow: 0;
      max-width: 50%;
    }
  }

  @media (max-width: 1620px) {
    .container-2 {
      flex-basis: 100%;
      flex-grow: 0;
      max-width: 100%;
    }
  }

  @media (max-width: 1080px) {
    .container-3 {
      flex-basis: 100%;
      flex-grow: 0;
      max-width: 100%;
    }
  }
}

</style>
