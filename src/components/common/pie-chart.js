import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: ['data', 'options'],
  name: 'PieChart',
  mounted () {
    console.log(this.initialData)
    this.renderChart(this.initialData, {
      cutoutPercentage: 85,
      aspectRatio: 1,
      // legend: {
      //   display: false
      // },
      pieceLabel: {
        render: 'label',
        // arc: true,
        fontColor: this.initialData.datasets[0].backgroundColor,
        fontSize: 15,
        position: 'outside',
        outsidePadding: 4
      },
      tooltips: {
        enabled: false
      },
      elements: {
        arc: {
          borderWidth: 0
        }
      },
      responsive: true
    })
  },
  data () {
    return {
      initialData: this.data // just acts like wrapper
    }
  }
}
