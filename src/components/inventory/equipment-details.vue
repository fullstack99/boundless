<template lang="pug">
  base-dialog(:show='equipmentDetails', @close="closeDialog", persistent, max-width="900")
    v-layout(row)
      v-flex(xs10)
        h2.dialog-heading {{ $t('inventory.equipmentDetails') }}
    // data details row
    v-layout.py-4(row)
      v-flex
        v-icon(v-if="equipmentDetailsObject.status === 'active'", small, color='green') brightness_1
        v-icon(v-else, small, color='grey') brightness_1
      v-flex
        | {{ "equipmentDetailsObject.status === 'active'" ? 'online' : 'offline' }}
      v-flex
        | {{ $t('general.name') }} : {{ equipmentDetailsObject.name }}
      v-flex
        | {{ $t('general.MACAddress') }} : {{ equipmentDetailsObject.MACAddress }}
      v-flex
        | {{ $t('general.siteGroup') }} : {{ equipmentDetailsObject.siteGroup }}
      v-flex
        | {{ $t('general.tags') }} : {{ equipmentDetailsObject.tags }}
      v-flex
        | {{ $t('general.vendor') }} : {{ equipmentDetailsObject.vendor }}

    v-layout.py-4(row)
      v-flex(xs6)
        // tags management component
        tags-management
      v-flex(xs6)
        // move site component
        move-site

    v-layout(row)
      v-btn(color='grey', flat, @click.native='closeDialog') {{ $t('general.close') }}
</template>

<script>
import {mapGetters} from 'vuex'
import tagsManagement from './tags.vue'
import moveSite from './move-site.vue'

export default {
  name: 'EquipmentDetails',

  components: {
    tagsManagement,
    moveSite
  },

  props: {
    equipmentDetailsObject: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters(['equipmentDetails'])
  },

  methods: {
    closeDialog () {
      this.$store.commit('UPDATE_EQUIPMENT_DETAILS', false)
    }
  }
}
</script>
