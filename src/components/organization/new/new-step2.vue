<template lang="pug">
  v-container
    v-layout(row)
      v-flex(xs12)
        h1 {{ $t( 'organization.title2' ) }} (2/2)
        hr
        em {{ $t( 'organization.description2' ) }}
    v-layout(row)
      v-flex.py-5.px-1(xs6 sm3)
        v-card
          v-card-media.d-block.text-xs-right
            v-icon help_outline
          v-card-title(primary-title='')
            h3.headline.mb-0
              | {{ $t('organization.createManually') }}
      v-flex.py-5.px-1(xs6 sm3)
        v-card
          v-card-media.d-block.text-xs-right
            v-icon help_outline
          v-card-title(primary-title='')
            h3.headline.mb-0
              | {{ $t('organization.importCsvXls') }}
      v-flex.py-5.px-1(xs6 sm3)
        v-card
          v-card-media.d-block.text-xs-right
            v-icon help_outline
          v-card-title(primary-title='')
            h3.headline.mb-0
              | {{ $t('organization.importMeraki') }}
      v-flex.py-5.px-1(xs6 sm3)
        v-card
          v-card-media.d-block.text-xs-right
            v-icon help_outline
          v-card-title(primary-title='')
            h3.headline.mb-0
              | {{ $t('organization.importApiVendor') }}
    v-layout(row)
      v-flex.py-5.px-1(xs6 sm3)
        v-btn(block) {{ $t(' organization.seeOnlineManual ') }}
      v-flex.py-5.px-1(xs6 sm3)
        v-btn(block) {{ $t(' organization.downloadManual ') }}
      v-flex.py-5.px-1(xs6 sm3)
        v-btn(block) {{ $t(' organization.ignoreThisStep ') }}
      v-flex.py-5.px-1(xs6 sm3)
        v-btn(block) {{ $t(' organization.createOrganization ') }}
</template>

<script>
export default {
  name: 'NewOrganizationStep2'
}
</script>
