<template lang="pug">
  div
    v-layout(row)
      v-flex(sm4)
        v-text-field.search-input.no-border(v-model="search", solo, placeholder="Search", append-icon="search")
      v-flex.text-xs-right(sm8)
        v-btn.btn-default(v-if="showPaginationButtons", @click="viewAll") {{$t('general.viewAll')}} ({{items.length}})
    v-layout.mt-2(row)
      v-data-table.table-container(
        ref="datatable",
        item-key='name',
        sort-icon="arrow_drop_up",
        :headers='filteredHeaders',
        :items='items',
        :search='search',
        :loading="loading"
      )
        v-progress-linear(slot="progress", color="blue", indeterminate)
        template(slot="headerCell", slot-scope="props")
          span(v-if="props.header.text == 'actions'")
            column-selector(:columns="tableHeaders")
          span(v-else) {{ props.header.text }}

        template(slot='items', slot-scope='props')
          tr.list-table-row(@click="onRowClick(props.item, $event)", :class="{'clickable' : rowClickable}")
            td.px-3
              v-icon(small) {{icon}}
            td.px-4(
              v-for="header in filteredHeaders",
              v-if="header.text && header.text !== 'actions'"
            ) {{ props.item[header.value] }}
            td.px-3.justify-end.layout
              div.list-table-actions(v-if="!hideActions")
                v-menu(left, offset-y)
                  v-btn.divider-vert.mx-0(slot="activator", icon)
                    v-icon(small, color='grey') more_horiz
                  .row-popover
                    .row-popover-arrow
                    .row-popover-inner
                      slot(name="row-action", :item="props.item")
                        .row-popover-item(@click="")
                          v-icon add_circle_outline
                        .row-popover-item(@click="")
                          v-icon edit
                        .row-popover-item(@click="")
                          v-icon folder_open
                        .row-popover-item(@click="")
                          v-icon delete
        v-alert(slot='no-results', :value='true', color='error', icon='warning')
          | Your search for "{{ search }}" found no results.
    v-layout.mt-3(row)
      v-flex.text-xs-center(sm12)
        v-btn.btn-default(
          v-if="showPaginationButtons",
          @click="viewNext"
        ) {{ $t('general.viewMore') }} ({{currentRows}} of {{items.length}})
</template>

<script>
import columnSelector from './column-selector'

export default {
  components: {
    columnSelector
  },

  props: {
    items: {
      required: true,
      type: Array
    },
    tableHeaders: {
      required: true,
      type: Array
    },
    loading: {
      required: false,
      type: Boolean,
      default: false
    },
    icon: {
      required: false,
      type: String,
      default: 'fas fa-image'
    },
    rowClickable: {
      required: false,
      type: Boolean,
      default: false
    },
    hideActions: {
      required: false,
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      search: '',
      currentRows: 5
    }
  },

  methods: {
    viewAll () {
      let datatable = this.$refs.datatable
      datatable.updatePagination({
        page: 1,
        rowsPerPage: -1
      })

      this.currentRows = this.items.length
    },

    viewNext () {
      let datatable = this.$refs.datatable
      const rowsPerPage = datatable.computedPagination.rowsPerPage

      this.currentRows += 10
      datatable.updatePagination({
        page: 1,
        rowsPerPage: rowsPerPage + 10
      })
    },

    setCurrentRows () {
      if (this.currentRows > this.items.length) {
        this.currentRows = this.items.length
      }
    },

    onRowClick (item, e) {
      if (!e.target.closest('.list-table-actions')) {
        this.$emit('rowClicked', item)
      }
    }
  },

  watch: {
    'items' () {
      this.setCurrentRows()
    }
  },

  computed: {
    filteredHeaders () {
      return this.tableHeaders.filter((header) => {
        return header.selected === true
      })
    },
    showPaginationButtons () {
      return (this.currentRows < this.items.length)
    }
  }
}
</script>

<style lang="scss">
@import "styles/colors.scss";

.list-table-row.clickable {
  cursor: pointer;
}

.row-popover {
  margin-top: 5px;
  position: relative;
  background: transparent;

  .row-popover-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    margin: 0 5px;
    border-color: $primary;
    right: 9px;
    border-width: 0 5px 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-top-color: transparent !important;
    position: absolute;
    top: -5px;
  }

  .row-popover-inner {
    background-color: $primary;
    color: white;
    display: flex;
    padding: 20px;
    border-radius: 4px;
  }

  .row-popover-item {
    flex: 1;
    color: white;
    margin-right: 20px;

    .icon {
      color: white;
      cursor: pointer;
    }
  }

  .row-popover-item:last-child {
    margin-right: 0;
  }
}
</style>
