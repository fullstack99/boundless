<template lang="pug">
  v-container
    v-layout(row)
      // tabs...
      v-flex(xs8)
        v-tabs(v-model='active', color='white', light, slider-color='yellow')
          v-tab(v-for='n in 4', :key='n', ripple)
            | Item {{ n }}
          v-tab-item(v-for='n in 4', :key='n')
            v-card(flat)
              v-card-text {{ n }}

      v-flex.text-xs-right.pr-1.pt-1(xs4 white)
        // new group modal component
        new-group-modal
        // delete group modal component
        delete-group-modal
        // new site modal component
        new-site-modal

    // in the tree
    v-layout(row)
        v-flex(xs12)
          tree(:data="groupAndSiteFileStructure", :indent="50", :space="0" draggable, cross-tree)
            div(slot-scope="{data, store}")
              template(v-if="!data.isDragPlaceHolder")
                b(v-if="data.children && data.children.length", @click="store.toggleOpen(data)") {{ data.open ? '-' : '+' }} &nbsp;
                span
                  v-icon {{ data.open ? data.iconOpen : data.iconClosed }} &nbsp;
                  | {{data.text}} &nbsp;
                  template(v-if="data.children.length > 0") ( {{ data.children.length }} )
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import * as vueDraggableNestedTree from 'vue-draggable-nested-tree'
import newGroupModal from './group-new.vue'
import deleteGroupModal from './group-delete.vue'
import newSiteModal from './site-new.vue'

export default {
  components: {
    Tree: vueDraggableNestedTree.DraggableTree,
    newGroupModal,
    deleteGroupModal,
    newSiteModal
  },

  data () {
    return {
      active: null
    }
  },

  computed: {
    ...mapGetters(['groupAndSiteFileStructure'])
  },

  methods: {
    ...mapActions(['setGroupAndSiteFileStructure']),
    isNodeDroppable (node) {
      return node.level < 3
    }
  }
}
</script>

<style lang="sass">
  .he-tree
    border: 1px solid #e3e3e3

  .tree-node-inner-back
    border-bottom: 1px solid #e3e3e3

  .tree-node-inner
    padding: 20px
    cursor: pointer

  .draggable-placeholder
    color: rgba(0, 136, 248, .5)
    background: rgba(0, 136, 249, .05)
    border: 1px dashed rgba(0, 136, 248, .5)

  .draggable-placeholder-inner
    background: rgba(0, 136, 249, .05)
</style>
