<template lang="pug">
  .step-one
    h2.step-heading.mb-3 {{ $t('campaign.createNewCampaign') }}
    v-layout(row)
      v-flex(xs12)
          v-layout(row)
            v-flex(xs12, sm5)
              v-text-field(v-model='campaign.name', :label="$t(' campaign.nameOfCampaign ') + '*'")
            v-flex(xs12, offset-sm2, sm5, class="input-wrap")
              v-select(:items='splashPages', item-text="name", return-object, v-model='campaign.splashPage', :label="$t(' campaign.chooseSplashPage ') + '*'", append-icon="help")
              v-tooltip.action(top, left, class="tooltip-input")
                v-btn(icon slot='activator', @click="showContactDialog = true")
                  v-icon(class="tooltip-icon") help
                span {{$t(' campaign.chooseSplashPageHelp ')}}
          v-layout(row)
            v-flex(xs12, sm5)
              v-select(:items='groups', v-model='campaign.group', :label="$t(' campaign.selectGroup ')", append-icon="help_outlined")
            v-flex(xs12, offset-sm2, sm5)
              v-select(:items='devices', item-text="name", return-object, v-model='campaign.wifi', :label="$t(' campaign.chooseWifiDevice ')")
          v-layout(row).mt-4
            v-flex(xs12, sm5)
              h2.step-heading.mb-3 {{ $t('campaign.programMyCampaign') }}
            v-flex(xs12, offset-sm2, sm5).custom-switch
              label.disabled-label Disabled
              v-switch(color="deep-purple lighten-2", label="Active", v-model="schedule.active", hide-details)
          v-layout(row v-if="schedule.active")
            v-flex(xs12, sm5)
              v-text-field(v-model='campaign.campaignStartDate', :label="$t(' campaign.campaignStartDate ') + '*'")
            v-flex(xs12, offset-sm2, sm5)
              v-text-field(v-model='campaign.campaignFinishDate', :label="$t(' campaign.campaignFinishDate ') + '*'")
          v-layout(row v-if="schedule.active")
            v-flex(xs12, sm5)
              v-text-field(v-model='campaign.campaignStartTime', :label="$t(' campaign.campaignStartTime ') + '*'")
            v-flex(xs12, offset-sm2, sm5)
              v-text-field(v-model='campaign.campaignFinishTime', :label="$t(' campaign.campaignFinishTime ') + '*'")
          label.mt-4.mb-4(v-if="schedule.active") {{ '* '+ $t('campaign.newCampaignNote') }}
    .step-actions(v-if="!hideSteps", row)
      v-flex.condition-text {{$t('general.requiredFields')}} *
      v-flex.text-xs-right.mt-2(sm-2)
        v-btn(round, large, color="success", @click.native="$emit('continue')", :disabled="isContinueDisabled") {{$t('general.next')}}
    .step-actions(v-else, row)
      v-flex.text-xs-right.mt-2(sm-2)
        v-btn(color="primary", @click.native="$emit('save')") {{$t('campaign.saveCampaign')}}
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  props: ['currentStep', 'campaign', 'hideSteps', 'schedule'],
  data () {
    return {
      groups: ['Etam Global', '> Etam France', '> Etam Romania', '>> Etam Oradea']
    }
  },
  mounted () {
    if (this.splashPages.length < 1) {
      this.fetchSplashPages()
    }

    if (this.devices.length < 1) {
      this.fetchDevices()
    }
  },
  computed: {
    ...mapGetters('splashpage', ['splashPages']),
    ...mapGetters(['devices']),

    isContinueDisabled () {
      const { name, splashPage, campaignStartDate, campaignFinishDate, campaignStartTime, campaignFinishTime } = this.campaign
      if (!name || name.length === 0) {
        return true
      }

      if (!splashPage) {
        return true
      }

      const compaignHasStartDate = !campaignStartDate || campaignStartDate.length === 0
      const compaignHasFinishDate = !campaignFinishDate || campaignFinishDate.length === 0
      const compaignHasStartTime = !campaignStartTime || campaignStartTime.length === 0
      const compaignHasFinishTime = !campaignFinishTime || campaignFinishTime.length === 0

      if (this.schedule.active) {
        if (compaignHasStartDate || compaignHasFinishDate || compaignHasStartTime || compaignHasFinishTime) {
          return true
        }
      }

      return false
    }
  },
  methods: {
    ...mapActions('splashpage', ['fetchSplashPages']),
    ...mapActions(['fetchDevices'])
  }
}
</script>

<style lang="scss">
  .custom-switch {
    display: flex;
    align-items: center;
    .disabled-label {
      color: #6e7072;
      font-size: 16px;
      margin-right: 14px;
    }
  }
  .condition-text {
    position: absolute;
    bottom: 5px;
  }
</style>
