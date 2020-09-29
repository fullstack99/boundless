<template lang="pug">
  .step-two
    v-layout.mb-5(row)
      v-flex(xs12, sm6)
        h2.step-heading {{ $t('campaign.redirectionUrl') }}
          v-icon.heading-icon help_outlined
      v-flex(xs12, offset-sm3, sm3)
        base-switch(color="deep-purple lighten-2", label-left="Static", label-right="Conditional" v-model="campaign.static")
    v-text-field.transparent(v-model="campaign.site", solo-inverted label="Site 1", :disabled="campaign.static")
    div(v-show="campaign.static")
      h4.step-heading.mt-5 {{ $t('campaign.chooseRedirectionMethod') }}
        v-icon.heading-icon help_outlined
      .item-list.redirection-list
        .item(
          v-for="redirectionType in redirectionTypes",
          @click="selectType(redirectionType)",
          :class="{'active': redirectionType.id == campaign.selectedType.id}"
        )
          p {{redirectionType.title}}
      connection-mode(ref="connectionMode", v-if="campaign.selectedType.id == 1", :redirection="campaign.redirection")
      mobile-mode(ref="mobileMode", v-if="campaign.selectedType.id == 2", :redirection="campaign.redirection")
      scenario-mode(ref="scenarioMode", v-if="campaign.selectedType.id == 3", :redirection="campaign.redirection")
    v-layout.mt-5.step-actions(v-if="!hideSteps", row)
      v-flex.pr-2.mt-2(sm-2)
        v-btn(round, large, @click.native="$emit('back')") {{$t('general.previous')}}
      v-flex.text-xs-right.pr-2.mt-2(sm-2)
        v-btn(color="success", round, large, @click.native="$emit('continue')", :disabled="isContinueDisabled") {{$t('general.next')}}
    v-layout.step-actions(v-else, row)
      v-flex.text-xs-right.pr-2.mt-2(sm-2)
        v-btn(color="success", round, large, @click.native="$emit('save')") {{$t('campaign.saveCampaign')}}
</template>

<script>
import connectionMode from './step-two-connection-mode'
import mobileMode from './step-two-mobile-mode'
import scenarioMode from './step-two-scenario-mode'
import baseSwitch from '@/components/common/base-switch'

export default {
  components: {
    connectionMode,
    mobileMode,
    scenarioMode,
    baseSwitch
  },
  props: ['currentStep', 'campaign', 'hideSteps'],
  data () {
    return {
      redirectionTypes: [
        {id: 1, title: this.$t('campaign.redirectionConnectionMode')},
        {id: 2, title: this.$t('campaign.redirectionMobile')},
        {id: 3, title: this.$t('campaign.redirectionScenario')}
      ]
    }
  },
  computed: {
    isContinueDisabled () {
      const { site, selectedType, redirection } = this.campaign
      const checkStaticSite = !site || site.length === 0

      if (this.campaign.static) {
        if (selectedType.id === 1) {
          const connectionHasFrom = !redirection.connection.formUrl || redirection.connection.formUrl.length === 0
          const connectionHasFacebook = !redirection.connection.facebookUrl || redirection.connection.facebookUrl.length === 0
          const connectionHasGoogle = !redirection.connection.googleUrl || redirection.connection.googleUrl.length === 0
          const connectionHasInstagram = !redirection.connection.instagramUrl || redirection.connection.instagramUrl.length === 0
          const connectionHasLinkedin = !redirection.connection.linkedUrl || redirection.connection.linkedUrl.length === 0
          const connectionHasTwitter = !redirection.connection.twitterUrl || redirection.connection.twitterUrl.length === 0
          if (connectionHasFrom && connectionHasFacebook && connectionHasGoogle && connectionHasInstagram && connectionHasLinkedin && connectionHasTwitter) {
            return true
          }
        }

        if (selectedType.id === 2) {
          const mobileHasDefaults = !redirection.mobile.defaults || redirection.mobile.defaults.length === 0

          if (mobileHasDefaults) {
            return true
          }
        }

        if (selectedType.id === 3) {
          const scenarios = redirection.scenarios
          console.log(scenarios)
          for (let i = 0; i < scenarios.length; i++) {
            const item = scenarios[i]
            const scenariosHasCondition = !item.condition
            const scenariosHasParam = !item.param
            const scenariosHasValue = !item.value || item.value.length === 0
            const scenariosHasRedirectUrl = !item.redirectUrl || item.redirectUrl.length === 0

            if (item.moreConditions.length > 0) {
              const moreConditions = item.moreConditions
              for (let j = 0; j < moreConditions.length; j++) {
                const value = moreConditions[j]
                const scenariosHasMoreCondition = !value.condition
                const scenariosHasMoreBrowser = !value.browser
                const scenariosHasMoreLogical = !value.logical
                const scenariosHasMoreParam = !value.param
                if (scenariosHasMoreCondition || scenariosHasMoreBrowser || scenariosHasMoreLogical || scenariosHasMoreParam) {
                  return true
                }
              }
            }

            if (scenariosHasCondition || scenariosHasParam || scenariosHasValue || scenariosHasRedirectUrl) {
              return true
            }
          }
        }
      } else {
        if (checkStaticSite) {
          return true
        }
      }

      return false
    },
    staticLabel () {
      return (this.campaign.static) ? 'Conditional' : 'Static'
    }
  },
  methods: {
    selectType (type) {
      this.campaign.selectedType = type

      // scroll to specific section on type select
      this.$nextTick(() => {
        let el
        switch (type.id) {
          case 1:
            el = this.$refs.connectionMode.$el
            break
          case 2:
            el = this.$refs.mobileMode.$el
            break
          case 3:
            el = this.$refs.scenarioMode.$el
            break
        }
        this.$el.closest('.dialog').scrollTop = el.scrollHeight
      })
    }
  }
}
</script>

<style lang="scss">
@import "styles/colors.scss";

.item-list.redirection-list {
  margin: 20px 0;
  justify-content: space-between;

  .item {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    line-height: 1.5;
    max-width: 26%;
    padding: 30px;
    background-color: transparent;
    border-color: $primary;
    text-transform: uppercase;

    p {
      font-weight: bold;
      font-size: 15px;
      color: $primary;
    }

    &.active {
      background-color: $primary;
      color: #fff;

      p {
        color: #ffffff;
      }
    }
  }

  p {
      height: auto;
  }
}

.heading-icon {
  margin-left: 10px;
}
</style>
