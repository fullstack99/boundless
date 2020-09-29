<template lang='pug'>
  base-dialog(:show="show", @close="$emit('close')")
    v-stepper(v-model="currentStep")
      v-stepper-header.mb-5
        v-stepper-step(:complete="currentStep > 1", step="1")
        v-divider
        v-stepper-step(:complete="currentStep > 2", step="2")
        v-divider
        v-stepper-step(:complete="currentStep > 3", step="3")
      v-stepper-items
        v-stepper-content(step="1")
          step-one(
            :current-step="currentStep",
            :campaign="newCampaign",
            :schedule="schedule",
            @continue="currentStep = 2"
          )
        v-stepper-content(step="2")
          step-two(
            :current-step="currentStep",
            :campaign="newCampaign",
            @continue="currentStep = 3",
            @back="currentStep = 1"
          )
        v-stepper-content(step="3")
          step-three(
            :current-step="currentStep",
            :campaign="newCampaign",
            @save="saveCampaign",
            @back="currentStep = 2"
          )
</template>

<script>
import baseDialog from '@/components/common/base-dialog'
import stepOne from './step-one'
import stepTwo from './step-two'
import stepThree from './step-three'
import scenarioStub from '@/stubs/scenario'

export default {
  components: {
    baseDialog,
    stepOne,
    stepTwo,
    stepThree
  },
  data () {
    return {
      currentStep: 0,
      newCampaign: {
        name: '',
        splashPage: '',
        group: '',
        wifi: '',
        campaignStartDate: '',
        campaignFinishDate: '',
        campaignStartTime: '',
        campaignFinishTime: '',
        acceptTerms: false,
        active: false,
        static: false,
        site: '',
        selectedType: {id: 1},
        redirection: {
          connection: {
            formUrl: '',
            facebookUrl: '',
            twitterUrl: '',
            linkedUrl: '',
            instagramUrl: '',
            googleUrl: ''
          },
          mobile: {
            apple: '',
            android: '',
            windows: '',
            defaults: ''
          },
          scenarios: [
            scenarioStub
          ]
        },
        options: {
          showMinAge: false,
          showMaxAge: false,
          acceptCommercialParticipation: false,
          verifyIdentifyBySms: false,
          acceptDefaultUgc: false,
          customizeText: false,
          acceptanceTerms: '',
          generalTerms: '',
          generalCustomizeText: '',
          minAge: '',
          maxAge: '',
          maxAgeText: ''
        },
        analyticsCode: '',
        summary: ''
      },
      schedule: {
        active: false
      }
    }
  },
  props: ['show'],
  methods: {
    saveCampaign () {
      console.log('SAVE CAMPAIGN')
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
