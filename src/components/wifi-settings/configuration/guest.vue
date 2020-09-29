<template lang="pug">
  // TODO: this one is reapeating but I am not making reusables yet
  div
    // wifi programming and table row
    v-layout(row)
      v-flex.py-5(xs12 sm4)
        h1 {{ $t(' organization.wifiProgramming ') }}
      v-flex.py-5(xs12 sm4)
        v-icon public
        | {{ $t('general.yes') }}
        v-switch(v-model="switch1", color="success")
        | {{ $t('general.no') }}
    hr.mb-5
    template
      // start wifi programming table
      v-data-table.elevation-1(:headers='headers', :items='rows')
        template(slot='items', slot-scope='props')
          td {{ props.item.day }}
          td {{ props.item.status }}
          td
            v-text-field(v-model="props.item.minimum")
          td
            v-text-field(v-model="props.item.maximum")
          td
            v-slider(v-model="props.item.maximum", min="0" max="24", thumb-label, ticks)

    // connection time row
    v-layout(row)
      v-flex.py-5(xs12 sm6)
        v-layout(row)
          v-flex(xs8)
            h4 {{ $t(' organization.connectionTime ') }}
          v-flex(xs4)
            v-icon help_outline
        hr
        v-layout(row)
          v-flex(xs10)
            v-select(:items='connectionTimeOptions', v-model='connectionTimeOptionModel', single-line)

      v-flex.py-5(xs12 sm6)
        v-layout(row)
          v-flex(xs4)
            h4 {{ $t(' organization.dataLimitation ') }}
          v-flex(xs2)
            v-icon help_outline
          v-flex(xs6)
            v-layout(row)
              v-flex(xs4)
                | {{ $t('general.yes') }}
              v-flex(xs4)
                v-switch(v-model="switch1", color="success")
              v-flex(xs4)
                | {{ $t('general.no') }}
        hr
        v-layout(row)
          v-flex.pr-3(xs8)
            v-text-field(name='input-1', :label="$t(' organization.dataVolume ')")

          v-flex.pl-3(xs4)
            v-select(:items='dataVolume', v-model='dataVolumeModel', single-line)

    // limit the connnection frquency row
    v-layout.py-5(row)
      v-flex(xs12 sm6)
        v-layout(row)
          v-flex(xs7)
            h4 {{ $t(' organization.limitConnectionFrequency ') }}
          v-flex(xs2)
            v-icon help_outline
          v-flex(xs3)
            v-layout(row)
              v-flex(xs4)
                | {{ $t('general.yes') }}
              v-flex(xs4)
                v-switch(v-model="switch1", color="success")
              v-flex(xs4)
                | {{ $t('general.no') }}

        hr
        v-layout(row)
          v-flex.pr-3(xs8)
            v-text-field(name='input-1', :label="$t(' organization.connectionName ')")
          v-flex.pl-3(xs4)
            v-select(:items='connectionFrequency', v-model='connectionFrequencyModel', single-line)
</template>

<script>
export default {
  name: 'WifiConfigurationGuest',

  data () {
    return {
      switch1: true,
      headers: [
        { text: this.$t('general.day'), value: 'day', sortable: false, width: 100 },
        { text: this.$t('general.status'), value: 'status', sortable: false, width: 100 },
        { text: this.$t('general.from'), value: 'minimum', sortable: false, width: 100 },
        { text: this.$t('general.to'), value: 'maximum', sortable: false, width: 100 },
        { text: '', value: 'edit', sortable: false }
      ],
      rows: [
        { day: this.$t('general.days.monday'), status: this.$t('general.active'), minimum: 0, maximum: 16, edit: '' },
        { day: this.$t('general.days.tuesday'), status: this.$t('general.active'), minimum: 0, maximum: 24, edit: '' },
        { day: this.$t('general.days.wednesday'), status: this.$t('general.active'), minimum: 0, maximum: 20, edit: '' },
        { day: this.$t('general.days.thursday'), status: this.$t('general.active'), minimum: 0, maximum: 16, edit: '' },
        { day: this.$t('general.days.friday'), status: this.$t('general.active'), minimum: 0, maximum: 16, edit: '' },
        { day: this.$t('general.days.saturday'), status: this.$t('general.active'), minimum: 0, maximum: 16, edit: '' },
        { day: this.$t('general.days.sunday'), status: this.$t('general.active'), minimum: 0, maximum: 16, edit: '' }
      ],
      connectionTimeOptionModel: '',
      connectionTimeOptions: [
        { text: '30 min' },
        { text: '1 hr' },
        { text: '12 hr' },
        { text: '24 hr' },
        { text: '7 d' },
        { text: '30 d' }
      ],
      dataVolumeModel: '',
      dataVolume: [
        { text: 'Mb' },
        { text: 'Gb' }
      ],
      connectionFrequencyModel: '',
      connectionFrequency: [
        { text: 'per hour' },
        { text: 'per day' },
        { text: 'per week' }
      ]
    }
  },

  methods: {}
}
</script>
