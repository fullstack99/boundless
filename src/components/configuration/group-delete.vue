<template lang="pug">
  span.d-inline-block
    // open delete group modal
    v-btn(icon, @click.stop="openDeleteGroupModal")
      v-icon delete
    // delete group modal
    v-dialog(v-model='deleteGroupModal', max-width='700px')
      v-card.pa-3
        v-layout(row)
          v-flex(xs10)
            v-card-title
              h2 {{ $t('settings.deleteGroup') }} : {{ $t('general.currentOrganization') }}
          v-flex.text-xs-right(xs2 white)
            v-btn.mt-3(icon, small, @click.native='deleteGroupModal=false')
              v-icon close
        hr
        v-card-text
          v-checkbox(:label="$t('settings.deleteGroupDescription')", v-model='checkbox')

        v-card-actions.text-xs-right
          v-btn(dark, color="grey", @click.native="deleteGroupModal=false") {{ $t('general.cancel') }}
          v-btn(dark, color="error", @click.native="saveDeleteGroup") {{ $t('general.delete') }}

</template>

<script>
export default {
  name: 'DeleteGroupModal',

  data () {
    return {
      checkbox: true,
      deleteGroupModal: false
    }
  },

  methods: {
    openDeleteGroupModal () {
      this.deleteGroupModal = true
    },
    saveDeleteGroup () {
      console.log(`Deleting A group`)
      this.loader = this.$t('general.loading')
      this.deleteGroupModal = false
    }
  }
}
</script>
