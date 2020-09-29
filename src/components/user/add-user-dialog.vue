<template lang="pug">
  base-dialog(:show='show', @close="$emit('close')")
    v-layout(row)
      v-flex(sm11)
        h2.step-heading.px-2.py-3 {{ $t('user.newUser') }}
    v-divider
    v-layout(row)
      v-flex(xs12)
        v-container(grid-list-lg, wrap)
          v-layout(row)
            v-flex(xs12, sm6)
              v-text-field(v-model='userName', :label="$t(' general.name ')", append-icon="help_outlined")
            v-flex(xs12, sm6)
              v-text-field(v-model='userEmail', :label="$t(' general.email ')", append-icon="help_outlined")
    v-divider
    v-layout(row)
      v-flex(xs12)
        v-container(grid-list-lg, wrap)
          v-layout(row)
            v-flex(xs12, sm6)
              h3.pt-4 {{ $t('user.addAsOrganizationAdministrator') }}
            v-flex(xs12, sm6)
              base-switch.pt-4(color="deep-purple lighten-2", label-left="No", label-right="Yes" v-model="addAsOrganizationAdministrator")
    v-divider
    v-layout(row, v-if="!addAsOrganizationAdministrator")
      v-flex(xs12)
        v-container(grid-list-lg, wrap)
          v-layout(row)
            v-flex(sm12)
              h3.pt-4 {{ $t('user.chooseSitesAndGroups') }}

          v-layout(row, align-end)
            v-flex(xs12, sm5)
              v-select(:items='groups', v-model='group', :label="$t(' settings.selectGroup ')", append-icon="help_outlined", hide-details)
            v-flex(xs12, sm5)
              v-select(:items='accessLevels', v-model='accessLevel', :label="$t(' user.accessLevel ')", append-icon="help_outlined", hide-details)
            v-flex.text-xs-right(xs12, sm2)
              v-btn.no-margin(color='success', outline, round, @click.stop='addUserSitesAndPermissions', :disabled="!group || !accessLevel") {{ $t('user.addSite') }}

          .access-items.mt-3
            v-layout.access-item(row v-for="(usp, index) in userSitesAndPermissions", :key="index")
              v-flex(xs12, sm5)
                v-select(:items='groups', v-model='usp.groupSite', :label="$t(' settings.selectGroup ')", hide-details)
              v-flex(xs10, sm5)
                v-select(:items='accessLevels', v-model='usp.accessLevel', :label="$t(' user.accessLevel ')", hide-details)
              v-flex.text-xs-right(xs2, sm2)
                v-btn.btn__close(fab, small, flat, color='error', @click.stop='removeUserSitesAndPermissions(index)')
                  v-icon(small) close

    v-layout.mt-4(row)
      v-flex.text-xs-right.pb-3.pr-2(sm-2)
        v-btn(color='success', round, large, @click.stop="inviteUser") {{ $t('general.invite') }}
</template>

<script>
import baseDialog from '@/components/common/base-dialog'

export default {
  props: ['show'],

  components: {
    baseDialog
  },

  data () {
    return {
      userName: '',
      userEmail: '',
      addAsOrganizationAdministrator: true,
      userSitesAndPermissions: [],
      group: '',
      groups: ['Etam Global', '> Etam France', '> Etam Romania', '>> Etam Oradea'],
      accessLevel: '',
      accessLevels: [this.$t('user.manager'), this.$t('user.editor'), this.$t('user.reader')]
    }
  },

  methods: {
    addUserSitesAndPermissions () {
      this.userSitesAndPermissions.push({
        groupSite: this.group,
        accessLevel: this.accessLevel
      })
    },
    removeUserSitesAndPermissions (index) {
      this.userSitesAndPermissions.splice(index, 1)
    },
    inviteUser () {
      console.log('invite')
    }
  }
}
</script>

<style lang="scss" scoped>
  .divider {
    background-color: darken(#eff3f8, 10%);
  }

  .access-item {
    padding: 20px;
    background-color: white;
    margin: 0 !important;
    margin-top: 10px !important;
    border-radius: 5px;
  }

  .btn__close .icon {
    font-size: 22px !important;
  }
</style>
