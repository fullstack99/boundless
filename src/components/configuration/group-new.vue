<template lang="pug">
  span.d-inline-block
    // open new group modal
    v-btn(icon, @click.stop="openNewGroupModal")
      v-icon create_new_folder

    // new group modal
    v-dialog(v-model='newGroupModal', max-width='700px')
      v-card.pa-3
        v-layout(row)
          v-flex(xs10)
            v-card-title
              h2 {{ $t('settings.groupInfo') }}
          v-flex.text-xs-right(xs2 white)
            v-btn.mt-3(icon, small, @click.native='newGroupModal=false')
              v-icon close
        hr
        v-card-text
          v-layout(row)
            v-flex(xs12)
              h4.pb-4
                | {{ $t('settings.newGroupDescription') }}
          v-layout(row)
            v-flex.px-3(xs12 sm6)
              v-text-field(:name="$t('settings.groupName')", v-model='groupName', :label="$t('settings.groupName')", append-icon="help_outlined", required)
            v-flex.px-3(xs12 sm6)
              v-select(:items='groups', v-model='group', :label="$t('settings.selectGroup')", single-line, append-icon="help_outlined")
          v-layout(row)
            v-flex(xs12 sm6)
              p.py-5.pl-3.grey--text.lighten-4
                | {{ $t('contact.mandatoryFields') }}
            v-flex(xs12 sm6)
              p.py-5.pr-3.grey--text.lighten-4.text-sm-right
                v-btn(:loading='loading', :disabled='loading', color='success', @click.native="saveNewGroup")
                  | {{ $t('settings.saveGroup') }}
                  span(slot='loader') {{ $t('general.loading') }}...

</template>

<script>
export default {
  name: 'NewGroupModal',

  data () {
    return {
      newGroupModal: '',
      group: '',
      groupName: '',
      groups: ['Etam Global', '> Etam France', '>> Etam Paris', '> Etam Romania', '>> Etam Oradea'],
      loader: null,
      loading: false
    }
  },

  methods: {
    openNewGroupModal () {
      this.newGroupModal = true
    },
    saveNewGroup () {
      console.log(`Saving ${this.groupName} as a new group under ${this.group}`)
      this.loader = this.$t('general.loading')
      this.newGroupModal = false
    }
  }
}
</script>
