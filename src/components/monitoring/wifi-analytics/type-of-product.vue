<template lang="pug">
  .type-of-product
    .form-card.x2
      v-layout(row)
        v-flex.main-container(xs12 md6)
          v-layout.row-container(column)
            .hidden-div
            v-flex.mb-4(x12)
              h4 {{  type === 'os' ? $t(' monitoring.typeOfOS ') :  $t(' monitoring.typeOfDevice ') }}
            .type-row
              .label-container
                v-icon {{ icons[0] }}
                span.small-label.pl-3 {{ labels[0] }}
              .color-badge(
                :style="'background-color: ' + colors[0]"
              )
            .type-row
              .label-container
                v-icon {{ icons[1] }}
                span.small-label.pl-3 {{ labels[1] }}
              .color-badge(
                :style="'background-color: ' + colors[1]"
              )
            .type-row
              .label-container
                v-icon {{ icons[2] }}
                span.small-label.pl-3 {{ labels[2] }}
              .color-badge(
                :style="'background-color: ' + colors[2]"
              )
            .type-row
              .label-container
                v-icon {{ icons[3] }}
                span.small-label.pl-3 {{ labels[3] }}
              .color-badge(
                :style="'background-color: ' + colors[3]"
              )
        v-flex.main-container(xs12 md6)
          .chart-container
            pie-chart(
              :data="chartData"
            )
          .hidden-div
          .chart-bg(
            :style="'background-image: url(' + bgImg + ');'"
          )
</template>

<script>
import PieChart from '@/components/common/pie-chart.js'

export default {
  name: 'TypeOfDevice',
  props: ['type', 'data', 'bgImg'],
  components: {
    PieChart
  },
  methods: {

  },
  mounted () {

  },
  computed: {
    chartData () {
      console.log('===> Data in chart: ', this.data, this.bgImg)
      return {
        datasets: [{
          data: Object.values(this.data).map(v => v.value),
          backgroundColor: this.colors
        }],
        labels: Object.values(this.data).map(v => `${v.value}%`)
      }
    },
    labels () {
      return Object.keys(this.data)
    },
    icons () {
      return Object.values(this.data).map(v => v.icon)
    }
  },
  data () {
    return {
      colors: ['#4b83f0', '#62d862', '#aa85d9', '#354c77']
    }
  }
}
</script>

<style lang="scss">
@import "styles/colors.scss";

.type-of-product {
  width: 100%;

  .chart-bg {
    position: absolute;
    background-size: cover;
    height: 80px;
    width: 80px;
    top: 102px;
    right: 75px;
    border-radius: 50%;
  }
  .main-container {
    position: relative;
    padding: 0;
  }
  .chart-container {
    position: absolute;
    max-width: 250px;
    max-height: 230px;
    right: 0;
    margin: -10px -10px 0 0;
  }
  .form-card {
    padding-top: 0;
    padding-bottom: 0;
  }
  .color-badge {
    width: 30px;
    height: 5px;
    border-radius: 5px;
    background: red;
    margin-top: -5px;
  }
  .icon {
    width: 50%;
    font-size: 20px;
  }
  .hidden-div {
    position: absolute;
    top: 0;
    width: 100%;
    height: 45px;
    background: white;
    z-index: 1;
  }
  .type-row {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    max-width: 250px;
    margin-bottom: 12px;
  }
  .row-container {
    padding: 50px 0 50px 0;
  }
  .label-container {
    display: flex;
    width: 120px;
  }
  .small-label {
    color: $deemed-gray;
  }
}

</style>
