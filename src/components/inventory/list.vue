<template lang='pug'>
  .page-content
    v-layout.mb-5
      v-flex(xs12, sm12, md6, lg6)
        h2 {{$t('inventory.deviceInventory')}}
      v-flex.pb-3(xs6, md6, lg6, text-xs-right)
        v-btn.primary-action(color='primary', @click.stop='showNewDeviceInventory = true')
          | {{ $t('inventory.newDevice') }}
          v-icon add_circle_outline

    v-layout.grey.lighten-3(row)
      v-flex(xs12)

        // tags popup
        v-menu(:close-on-content-click='false', :nudge-width='320', v-model='tagsMenu', offset-y)
          v-btn(slot='activator', color='indigo', dark) {{ $t('general.tags') }}

          // tags management component
          tags-management

        // move popup
        v-menu(:close-on-content-click='false', :nudge-width='320', v-model='moveMenu', offset-y)
          v-btn(slot='activator', color='indigo', dark) {{ $t('general.move') }}

          // move site component
          move-site

    // devices list
    base-table(
      :items="devices",
      :table-headers="headers",
      :loading="loading",
      icon="fas fa-image",
      @rowClicked="editItem",
      :row-clickable="true"
    )
      template(slot="row-action", slot-scope="slotProps")
        .row-popover-item(@click.prevent.stop="deleteItem")
          v-icon delete
    equipment-details(:equipmentDetailsObject='currentItemToEdit')
    add-inventory-dialog(:show="showNewDeviceInventory", @close="showNewDeviceInventory = false")
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import tagsManagement from './tags.vue'
import moveSite from './move-site.vue'
import equipmentDetails from './equipment-details.vue'
import baseTable from '../common/base-table'
import addInventoryDialog from './add-inventory-dialog'

export default {
  name: 'Inventory',

  components: {
    baseTable,
    tagsManagement,
    moveSite,
    equipmentDetails,
    addInventoryDialog
  },

  mounted () {
    if (this.devices.length < 1) {
      this.loading = true
      this.fetchDevices().then(() => {
        this.loading = false
      })
    }
  },

  data () {
    return {
      search: '',
      selected: [],
      currentItemToEdit: {},
      currentItemHovered: null,
      headers: [
        { sortable: false, align: 'left', value: 'checkbox', width: 50, selected: true },
        { text: this.$t('general.status'), sortable: false, align: 'left', value: 'status', width: 50, selected: true },
        { text: this.$t('general.name'), sortable: false, align: 'left', value: 'name', selected: true },
        { text: this.$t('general.MACAddress'), sortable: false, align: 'left', value: 'mac_address', selected: true },
        { text: this.$t('general.siteGroup'), sortable: false, align: 'left', value: 'site', selected: true },
        { text: this.$t('general.tags'), sortable: false, align: 'left', value: 'tags', selected: true },
        { text: this.$t('general.vendor'), sortable: false, align: 'left', value: 'vendor', selected: true },
        { text: 'actions', sortable: false, align: 'right', value: 'actions', selected: true }
      ],
      showNewDeviceInventory: false,
      loading: false
    }
  },

  computed: {
    ...mapGetters(['devices']),
    tagsMenu: {
      get () {
        return this.$store.state.tagsMenu
      },
      set (value) {
        this.$store.commit('UPDATE_TAGS_MENU', value)
      }
    },
    moveMenu: {
      get () {
        return this.$store.state.moveMenu
      },
      set (value) {
        this.$store.commit('UPDATE_MOVE_MENU', value)
      }
    }
  },

  methods: {
    ...mapActions(['fetchDevices']),
    editItem (item) {
      // TODO: there's a bug here, will fix it later on when we implement api
      this.currentItemToEdit = item
      this.$store.commit('UPDATE_EQUIPMENT_DETAILS', true)
    },
    deleteItem () {
      console.log('deleteItem')
    },
    setCurrentItemHovered (val) {
      this.currentItemHovered = val
    }
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
