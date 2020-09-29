<template lang='pug'>
  v-container(grid-list-md)
    v-layout(row)
      // materialDetails row
      v-flex(xs12)
        v-container(grid-list-md)
          v-layout(row)
            v-flex(xs12)
              h2 {{ $t('settings.materialDetails') }}
              hr.mb-3
              p {{ $t('settings.materialDetailsDescription') }}

        // 'tabs' row
        v-container(grid-list-md)
          v-layout(row)
            v-flex(xs3)
              div.material-details-buttons
                | {{ $t('organization.createManually') }}
                v-icon.pl-2(small) help

            v-flex(xs3)
              div.material-details-buttons
                | {{ $t('organization.importCsvXls') }}
                v-icon(small) help

            v-flex(xs3)
              div.material-details-buttons
                | {{ $t('organization.importMeraki') }}
                v-icon(small) help

            v-flex(xs3)
              div.material-details-buttons
                | {{ $t('organization.importApiVendor') }}
                v-icon(small) help

          // materialDetails : createManually row
          v-layout.mt-5.pt-5(row)
            v-flex(xs12)
              h2 {{ $t('settings.materialDetails') }} : {{ $t('organization.createManually') }}
              hr.mb-3
              p {{ $t('settings.createManuallyDescription') }}

          v-layout(row)
            v-flex(xs12, sm6)
              v-select(:items='routerModels', v-model='routerModel', :label="$t(' settings.routerModel ')", append-icon="help", required)
              v-text-field(v-model='routerName', :label="$t(' settings.routerName ')")

            v-flex(xs12, sm6)
              v-layout.pt-4(row)
                v-flex(xs9)
                  p {{ $t('settings.routerMACAddress') }}*
                v-flex.text-xs-right(xs3)
                  v-icon(small) help

              v-layout(row)
                v-flex(xs2)
                  v-text-field()
                v-flex(xs2)
                  v-text-field()
                v-flex(xs2)
                  v-text-field()
                v-flex(xs2)
                  v-text-field()
                v-flex(xs2)
                  v-text-field()
                v-flex(xs2)
                  v-text-field()

          v-layout(row)
            v-flex(xs12, sm6)
              v-select(:items='routerModels', v-model='routerModel', :label="$t(' settings.routerModel ')", append-icon="help", required)
              v-text-field(v-model='routerName2', :label="$t(' settings.routerName ')")

            v-flex(xs12, sm6)
              v-layout.pt-4(row)
                v-flex(xs9)
                  p {{ $t('settings.routerMACAddress') }}*
                v-flex.text-xs-right(xs3)
                  v-icon(small) help

              v-layout(row)
                v-flex(xs2)
                  v-text-field()
                v-flex(xs2)
                  v-text-field()
                v-flex(xs2)
                  v-text-field()
                v-flex(xs2)
                  v-text-field()
                v-flex(xs2)
                  v-text-field()
                v-flex(xs2)
                  v-text-field()

          v-layout(row)
            v-flex.text-xs-right(xs12)
              v-btn {{ $t(' general.remove ') }}
              v-btn {{ $t(' general.addAnother ') }}

          // materialDetails : createManually row
          v-layout.mt-5.pt-5(row)
            v-flex(xs12)
              h2 {{ $t('settings.materialDetails') }} : {{ $t('organization.importApiVendor') }} (Meraki)
              hr.mb-3
              p {{ $t('organization.importApiVendorDescription') }}

          v-layout.text-xs-center(row)
            v-flex(xs4)
              v-icon(size="100") home
            v-flex(xs4)
              v-icon(size="100") favorite
            v-flex(xs4)
              v-icon(size="100") grade

        v-layout(row)
          v-flex.pt-5(xs6 sm3)
            v-btn(block) {{ $t(' organization.seeOnlineManual ') }}
          v-flex.pt-5(xs6 sm3)
            v-btn(block) {{ $t(' organization.downloadManual ') }}
          v-flex.pt-5(xs6 sm3)
            v-btn(block) {{ $t(' organization.ignoreThisStep ') }}
</template>
<script>
export default {
  name: 'NewSiteModalStep2',

  data () {
    return {
      step2model: '',
      routerName: '',
      routerName2: '',
      routerModels: ['a', 'b', 'c'],
      routerModel: ''
    }
  }
}
</script>

<style lang="sass" scoped>
  .material-details-buttons
    height: 90px
    padding: 25px 15px
    border-radius: 7px
    display: flex
    align-items: center
    text-align: center
    color: #333
    background: #eee
    cursor: pointer
</style>
