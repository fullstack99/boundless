<template lang="pug">
  v-container(grid-list-md)
    v-layout(row)
      v-flex(xs12)
        h2 {{ $t('settings.establishmentInformation') }}
        hr.my-3
        p {{ $t('settings.establishmentInformationDescription') }}
    v-layout(row)
      v-flex(xs12 sm6)
        v-text-field(v-model='facilityName', :label="$t(' settings.facilityName ')", append-icon="help_outlined")
        v-select(:items='timeZones', v-model='timeZone', :label="$t(' settings.selectTimeZone ')", append-icon="help_outlined")
        v-text-field(v-model='address', :label="$t(' general.address ')")
        v-select(:items='cities', v-model='city', :label="$t(' general.city ')")
        v-select(:items='countries', item-text="name" v-model='country', :label="$t(' general.country ')", autocomplete)
        v-text-field(v-model='zipCode', :label="$t(' general.zipCode ')")

      v-flex(xs12 sm6)
        v-select(:items='groups', v-model='group', :label="$t(' settings.selectGroup ')", append-icon="help_outlined")
        v-select(:items='zones', v-model='zone', :label="$t(' settings.selectZone ')", append-icon="help_outlined")
        v-text-field(v-model='phoneNumber', :label="$t(' general.phoneNumber ')")
        v-text-field(v-model='emailAddress', :label="$t(' general.emailAddress ')")
        v-text-field(v-model='VATNumber', :label="$t(' settings.VATNumber ')")
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'NewSiteModalStep1',

  mounted () {
    if (this.countries.length < 1) {
      this.fetchCountries()
    }
  },

  data () {
    return {
      facilityName: '',
      timeZone: '',
      timeZones: [
        { text: 'GMT' },
        { text: 'GMT + 2' },
        { text: 'EST' },
        { text: 'PST' }
      ],
      city: '',
      cities: [
        { text: 'Paris' },
        { text: 'Oradea' }
      ],
      zipCode: '',
      country: '',
      address: '',
      zone: '',
      zones: ['a', 'b'],
      group: '',
      groups: ['Etam Global', '> Etam France', '> Etam Romania', '>> Etam Oradea'],
      m2Number: '',
      floorNumber: '',
      phoneNumber: '',
      emailAddress: '',
      VATNumber: ''
    }
  },

  computed: {
    ...mapGetters(['countries'])
  },
  methods: {
    ...mapActions(['fetchCountries'])
  }
}
</script>
