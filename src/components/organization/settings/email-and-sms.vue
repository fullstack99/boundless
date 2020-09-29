<template lang="pug">
  .email-and-sms

    v-layout(row)
      v-flex.mr-2(xs12, md6)
        h3.py-3.small-heading {{ $t(' organization.configurationEmail ') }}
        .card.form-card
          v-layout(row)
            v-flex(xs10)
              base-switch(
                color="deep-purple lighten-2",
                :label-left="$t('organization.boundlessPresets')",
                :label-right="$t('organization.customSettings')",
                v-model="switch1"
              )
            v-flex.text-xs-right(xs2)
              v-icon help_outline

          // configuration email row2
          v-layout.mt-3(row)
            v-flex(xs12 md6)
              v-text-field.mr-3(:name="$t('organization.senderName')", :label="$t('organization.senderName')")
              v-text-field.mr-3(:name="$t('organization.smtpHost')", :label="$t('organization.smtpHost')")
              v-text-field.mr-3(:name="$t('organization.smtpID')", :label="$t('organization.smtpID')")
            v-flex(xs12 md6)
              v-text-field.ml-3(:name="$t('organization.destinationAddress')", :label="$t('organization.destinationAddress')")
              v-text-field.ml-3(:name="$t('organization.smtpPort')", :label="$t('organization.smtpPort')")
              v-text-field.ml-3(:name="$t('organization.smtpPassword')", :label="$t('organization.smtpPassword')")
          v-layout(row)
            v-flex.text-xs-right(xs12)
              v-btn(color="success", outline, round, large) {{$t('organization.sendTestEmail')}}
              v-btn(color="success", round, large) {{$t('general.save')}}
      v-flex.ml-2(xs12, md6)
        h3.py-3.small-heading {{ $t(' organization.configurationSMS ') }}
        .card.form-card
          v-layout(row)
            v-flex(xs10)
              base-switch(
                color="deep-purple lighten-2",
                :label-left="$t('organization.boundlessPresets')",
                :label-right="$t('organization.customSettings')",
                v-model="switch2"
              )
            v-flex.text-xs-right(xs2)
              v-icon help_outline
          v-layout.mt-3(row)
            v-flex(xs12 md6)
              v-select.mr-3(:items='providers', v-model='provider', :label="$t('general.chooseProvider')", single-line, append-icon="help_outlined")
            v-flex(xs12 md6)
              v-text-field.ml-3(:name="$t('general.apiKey')", :label="$t('general.apiKey')")
          v-layout(row)
            v-flex.text-xs-right(xs12)
              v-btn(color="success", outline, round, large) {{$t('organization.sendTestSms')}}
              v-btn(color="success", round, large) {{$t('general.save')}}

</template>

<script>
export default {
  data () {
    return {
      active: null,
      checkbox: true,
      radioGroup: 1,
      switch1: true,
      switch2: true,
      provider: '',
      providers: [
        { text: 'Twilio' }
      ]
    }
  },

  methods: {
    next () {
      const active = parseInt(this.active)
      this.active = (active < 2 ? active + 1 : 0).toString()
    }
  }
}
</script>
