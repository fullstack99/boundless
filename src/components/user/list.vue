<template lang='pug'>
  .page-content
    v-layout.mb-5
      v-flex(xs12, sm12, md6, lg6)
        h2 {{ $t('user.userList') }}
      v-flex.pb-3(xs6, md6, lg6, text-xs-right)
        v-btn.primary-action(color='primary', @click.stop='addNewUserDialog = true')
          | {{ $t('user.newUser') }}
          v-icon add_circle_outline
    base-table(
      :items="users",
      :table-headers="userListHeaders",
      :loading="loading",
      icon="fas fa-image",
      @rowClicked="onItemClick",
      :row-clickable="true"
    )
      template(slot="row-action", slot-scope="slotProps")
        .row-popover-item(@click.prevent.stop="openDeleteUser")
          v-icon delete
    add-user-dialog(:show="addNewUserDialog", @close="addNewUserDialog = false", @next="addNewUser")
    add-user-account-dialog(:show="newUserAccountCreationDialog",  @close="newUserAccountCreationDialog = false")
    user-details-dialog(:show="userDetailsDialog", user-details="userDetails", @close="userDetailsDialog = false")
    user-remove-dialog(:show="userRemoveDialog", @close="userRemoveDialog = false")
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import addUserDialog from './add-user-dialog'
import addUserAccountDialog from './add-user-account-dialog'
import userDetailsDialog from './user-details-dialog'
import userRemoveDialog from './user-remove-dialog'
import baseTable from '../common/base-table'

export default {
  name: 'UserList',

  mounted () {
    if (this.users.length < 1) {
      this.loading = true
      this.fetchUsers().then(() => {
        this.loading = false
      })
    }
  },

  components: {
    addUserDialog,
    addUserAccountDialog,
    userDetailsDialog,
    userRemoveDialog,
    baseTable
  },

  data () {
    return {
      search: '',
      newUserAccountCreationDialog: false,
      addNewUserDialog: false,
      userDetailsDialog: false,
      userRemoveDialog: false,
      userDetails: {},
      userListHeaders: [
        { sortable: false, value: 'icon', selected: true },
        { text: this.$t('general.name'), sortable: true, align: 'left', value: 'name', selected: true },
        { text: this.$t('general.email'), sortable: true, align: 'left', value: 'email', selected: true },
        { text: this.$t('general.role'), sortable: true, align: 'left', value: 'permissions', selected: true },
        { text: this.$t('general.function'), sortable: true, align: 'left', value: 'job_title', selected: true },
        { text: this.$t('general.lastConnected'), sortable: true, align: 'left', value: 'last_connected_at', selected: true },
        { text: 'actions', sortable: false, align: 'right', value: 'actions', selected: true }
      ],
      loading: false
    }
  },

  computed: {
    ...mapGetters(['users'])
  },

  methods: {
    ...mapActions(['fetchUsers']),
    addNewUser () {
      this.addNewUserDialog = false
      this.newUserAccountCreationDialog = true
    },
    addNewUserAccount () {
      console.log('addNewUserAccount')
      this.newUserAccountCreationDialog = false
    },
    addUserSitesAndPermissions () {
      this.userSitesAndPermissions.push({
        groupSite: this.group,
        permissions: this.accessLevel
      })
      this.group = ''
      this.accessLevel = ''
    },
    removeUserSitesAndPermissions (usp, idx) {
      console.log('removeUserSitesAndPermissions', usp, idx)
      this.userSitesAndPermissions.splice(idx, 1)
    },
    openDeleteUser () {
      console.log('openDeleteUser')
      this.userRemoveDialog = true
    },
    deleteUser (user) {
      console.log('deleteUser', user)
      this.userRemoveDialog = false
    },
    moreActions () {
      console.log('moreActions')
    },
    onItemClick (item) {
      this.userDetailsDialog = true
      this.userDetails = item
    }
  },

  // meta tags
  metaInfo: {
    title: 'UserList'
  }
}
</script>

<style scoped lang="sass">
  .user-list-table-row
    .user-list-table-actions
      opacity: 0
    &:hover
      .user-list-table-actions
        opacity: 1
</style>
