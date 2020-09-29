<template lang='pug'>
  base-dialog(:show='show', max-width='920', :persistent="true", @close="$emit('close')")
    v-layout(row)
      v-flex(sm11)
        h2.dialog-heading.px-2.py-3 {{ $t('splash.addSplash') }}
    v-divider
    v-stepper(v-model="currentStep")
      v-stepper-header
        v-stepper-step(:complete="currentStep > 1", step="1") Stage 1
        v-divider
        v-stepper-step(:complete="currentStep > 2", step="2") Stage 2
      v-stepper-items
        v-stepper-content(step="1")
          step-template-type(:current-step="currentStep", @continue="currentStep = 2")
        v-stepper-content(step="2")
          step-choose-template(v-if="selectedSplashTemplateType.id == 3", :current-step="currentStep", @continue="currentStep = 2", @back="currentStep = 1")
          step-project-mode(v-else, :current-step="currentStep", @continue="currentStep = 2", @back="currentStep = 1")
</template>

<script>
import {mapGetters} from 'vuex'
import stepTemplateType from './step-template-type'
import stepChooseTemplate from './step-choose-template'
import stepProjectMode from './step-project-mode'
import baseDialog from '@/components/common/base-dialog'

export default {
  components: {
    stepTemplateType,
    stepChooseTemplate,
    stepProjectMode,
    baseDialog
  },
  data () {
    return {
      name: '',
      group: '',
      groups: ['Etam Global', '> Etam France', '> Etam Romania', '>> Etam Oradea'],
      currentStep: 0
    }
  },
  props: ['show'],
  computed: {
    ...mapGetters('splashpage', ['selectedSplashTemplateType'])
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
