<template lang="pug">
div
  h4.step-heading.mt-5.mb-4 {{ $t('campaign.redirectionScenario') }}
    v-icon.heading-icon help_outlined
  .scenario.mt-5(v-for="(scenario, index) in redirection.scenarios", :key="scenario.order")
    h5 Scenario {{scenario.order}}
      a(@click.prevent="removeScenario(index)", href="#")
        v-icon.heading-icon.remove-icon(v-if="scenario.order !== 1", ) fas fa-minus-circle
    v-layout(row)
      v-flex(xs12, sm4, pr-4)
        v-select(:items='params', v-model='scenario.param', label="Param")
      v-flex(xs12, sm4, pr-4)
        v-select(:items='conditions', v-model='scenario.condition', label="Condition")
      v-flex(xs12, sm4, pr-4)
        v-text-field(v-model='scenario.value', label="Value")
      v-flex.pt-4(xs12, sm1)
        a(@click.prevent="addCondition(scenario)", href="#")
          v-icon.add-icon fas fa-plus-circle
    v-layout(row, v-for="condition in scenario.moreConditions", :key="condition.order")
      v-flex(xs12, sm3, pr-4)
        v-select(:items='logicals', v-model='condition.logical', label="And/Or")
      v-flex(xs12, sm3, pr-4)
        v-select(:items='params', v-model='condition.param', label="Param")
      v-flex(xs12, sm3, pr-4)
        v-select(:items='isAndNotConditions', v-model='condition.condition', label="Condition")
      v-flex(xs12, sm3, pr-4)
        v-select(:items='browsers', v-model='condition.browser', label="Browser")
      v-flex.pt-4(xs12, sm1)
        a(@click.prevent="removeCondition(scenario, condition)", href="#")
          v-icon.add-icon.remove-icon fas fa-minus-circle
    v-layout(row)
      v-flex.solo-label.pt-2(xs1) {{$t('campaign.redirectTo')}}
      v-flex(xs11)
        v-text-field.transparent(v-model='scenario.redirectUrl', solo-inverted)
    a.mt-4.condition-link(v-if="scenario.order == redirection.scenarios.length", @click="addScenario") {{$t('campaign.addScenario')}}
</template>

<script>
import scenarioStub from '@/stubs/scenario'

export default {
  props: ['redirection'],
  data () {
    return {
      params: [
        this.$t('campaign.age'),
        this.$t('campaign.genre'),
        this.$t('campaign.numberOfVisits'),
        this.$t('campaign.anniversary'),
        this.$t('campaign.lastVisit'),
        this.$t('campaign.platform'),
        this.$t('campaign.navigator')
      ],
      conditions: [
        this.$t('campaign.lessThan'),
        this.$t('campaign.is'),
        this.$t('campaign.isNot'),
        this.$t('campaign.moreThan'),
        this.$t('campaign.between'),
        this.$t('campaign.lessThanEqualTo'),
        this.$t('campaign.moreThanEqualTo')
      ],
      logicals: [
        this.$t('general.and'),
        this.$t('general.or')
      ],
      isAndNotConditions: [
        this.$t('campaign.is'),
        this.$t('campaign.isNot')
      ],
      browsers: [
        'Chrome',
        'Firefox',
        'IE',
        'Safari',
        'Opera'
      ]
    }
  },
  methods: {
    addCondition (scenario) {
      let order = this.getLastConditionOrder(scenario)
      scenario.moreConditions.push({order: order, logical: '', param: '', condition: '', browser: ''})
    },
    removeCondition (scenario, condition) {
      let conditionIndex = scenario.moreConditions.findIndex((cond) => {
        return condition.order === cond.order
      })

      scenario.moreConditions.splice(conditionIndex, 1)
    },
    getLastConditionOrder (scenario) {
      let lastConditionOrder = scenario.moreConditions[scenario.moreConditions.length - 1]
      return (lastConditionOrder && lastConditionOrder.order) ? lastConditionOrder.order + 1 : 1
    },
    getLastScenarioOrder () {
      let lastScenarioOrder = this.redirection.scenarios[this.redirection.scenarios.length - 1]
      return (lastScenarioOrder && lastScenarioOrder.order) ? lastScenarioOrder.order + 1 : 1
    },
    addScenario () {
      let order = this.getLastScenarioOrder()
      let newScenario = JSON.parse(JSON.stringify(scenarioStub))

      newScenario.order = order
      newScenario.condition = ''
      newScenario.order = ''
      newScenario.param = ''
      newScenario.redirectUrl = ''
      newScenario.value = ''
      newScenario.moreConditions.map((item) => {
        item.order = order
        item.logical = ''
        item.param = ''
        item.condition = ''
        item.browser = ''
      })

      this.redirection.scenarios.push(newScenario)
    },
    removeScenario (index) {
      this.redirection.scenarios.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "styles/colors.scss";

.add-icon {
  top: 10px;
  color: $primary;
}

.remove-icon {
  color: $red;
}

.condition-link {
  text-decoration: underline;
  font-size: 16px;
  display: block;
}

.solo-label {
  font-size: 16px;
  padding-right: 15px;
  min-width: 100px;
  padding-top: 10px !important;
}

h5 {
  font-family: 'Fira Sans', sans-serif;
  font-size: 16px;
}
</style>
