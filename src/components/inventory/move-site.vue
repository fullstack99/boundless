<template lang="pug">
  v-card.pa-4
    h3.pb-3 {{ $t('inventory.editSiteGroup') }}
    v-divider
    v-select(:items='groups', v-model='group', :label="$t(' settings.selectGroup ')", autocomplete)

    v-card-actions.pt-4
      v-btn(dark, color='indigo', @click='moveSite') {{ $t('general.move') }}
      v-btn(dark, color='red', @click='deleteSite') {{ $t('general.delete') }}
</template>

<script>
export default {
  name: 'MoveSite',

  data () {
    return {
      group: '',
      groups: ['Etam Global', '> Etam France', '> Etam Romania', '>> Etam Oradea']
    }
  },

  methods: {
    moveSite () {
      console.log('moveSite function')
      this.$store.commit('UPDATE_MOVE_MENU', false)
    },
    deleteSite () {
      console.log('deleteSite function')
      this.$store.commit('UPDATE_MOVE_MENU', false)
    }
  }
}
</script>
