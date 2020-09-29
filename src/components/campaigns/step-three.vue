<template lang="pug">
  .step-three
    h2.step-heading.mb-5 {{ $t('campaign.analyticsConfig') }}
    h5 {{ $t('campaign.addAnalyticsCode') }}
    v-text-field(v-model='campaign.analyticsCode', textarea, :placeholder="$t('campaign.pasteYourCode')", :rows="2")
    v-layout.step-actions(v-if="!hideSteps", row)
      v-flex.pr-2.mt-2(sm-2)
        v-btn(@click.native="$emit('back')", round, large) {{$t('general.previous')}}
      v-flex.text-xs-right.mt-2(sm-2)
        v-btn(color="success", round, large, @click.native="$emit('save')", :disabled="isContinueDisabled") {{$t('campaign.saveCampaign')}}
    v-layout.step-actions(v-else, row)
      v-flex.text-xs-right.mt-2(sm-2)
        v-btn(color="success", round, large, @click.native="$emit('save')") {{$t('campaign.saveCampaign')}}
</template>

<script>
export default {
  props: ['currentStep', 'campaign', 'hide-steps'],
  computed: {
    isContinueDisabled () {
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
h5 {
  font-family: 'Fira Sans', sans-serif;
  font-size: 16px;
}
</style>
