<template lang='pug'>
  base-dialog(:show="show", @close="$emit('close')")
    h2.step-heading.mb-3 {{ $t('inventory.newDevice') }}
    v-stepper(v-model="currentStep")
      v-stepper-header.mb-5
        v-stepper-step(:complete="currentStep > 1", step="1")
        v-divider
        v-stepper-step(:complete="currentStep > 2", step="2")
        v-divider
        v-stepper-step(:complete="currentStep > 3", step="3")
      v-stepper-items
        v-stepper-content(step="1") step one
        v-stepper-content(step="2") step two
        v-stepper-content(step="3") step three
</template>

<script>
import baseDialog from '@/components/common/base-dialog'

export default {
  components: {
    baseDialog
  },
  data () {
    return {
      currentStep: 0
    }
  },
  props: ['show'],
  methods: {
    saveInventory () {
      console.log('SAVE Inventory')
    }
  }
}
</script>

<style lang="sass">
  .item-list
    display: flex
    flex-wrap: wrap
    align-items: center
    margin: 20px 10px
    .item
      padding: 10px 20px
      text-align: center
      background-color: #F2F2F2
      color: gray
      font-size: 13px
      border-radius: 3px
      margin: 5px
      flex: 1
      max-width: 30%
      min-width: 15%
      cursor: pointer
      border: 1px solid #d9d9d9
      &.active
        background-color: #ffffff
      .icon
        margin-top: 15px
        height: 30px
      p
        height: 30px
        font-size: 12px
        line-height: 1.2
        margin-top: 10px
</style>
