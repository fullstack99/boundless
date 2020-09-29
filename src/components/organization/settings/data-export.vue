<template lang="pug">
  .data-export
    v-layout(row)
      v-flex.mr-2(xs12 sm6)
        h3.small-heading.py-3 {{ $t('organization.exportDataFTP') }}
        .form-card
          v-layout(row)
            v-flex(xs6)
              v-text-field.mr-3(:name="$t('general.serverHost')", :label="$t('general.serverHost')", v-model="ftp.serverHost", required)
              v-text-field.mr-3(:name="$t('general.username')", :label="$t('general.username')", v-model="ftp.username", required)
              v-select.mr-3(:items='protocols', :label="$t('general.protocol')", single-line, v-model="ftp.protocol")
            v-flex(xs6)
              v-text-field.ml-3(:name="$t('general.serverPort')", :label="$t('general.serverPort')", v-model="ftp.serverPort", required)
              v-text-field.ml-3(:name="$t('general.password')", :label="$t('general.password')", v-model="ftp.password", required)
              v-text-field.ml-3(:name="$t('general.path')", :label="$t('general.path')", v-model="ftp.path")
          v-layout(row)
            v-flex.text-xs-right(xs12)
              v-btn(color="success", round, large, :disabled="isFtpButtonDisabled") {{$t('general.save')}}
      v-flex.ml-2(xs12, sm6)
        h3.small-heading.py-3 {{ $t('organization.exportDataCRM') }}
        .form-card
          v-layout(row)
            v-flex(xs6)
              v-select.ml-3(:items='providers', v-model='crm.provider', :label="$t('general.chooseProvider')", single-line, required)
          v-layout(row)
            v-flex.text-xs-right(xs12)
              v-btn(color="success", round, large, :disabled="isCrmButtonDisabled") {{$t('general.save')}}

</template>

<script>
export default {
  name: 'DataExport',

  data () {
    return {
      ftp: {
        path: '',
        serverHost: '',
        id: '',
        protocol: 'FTP',
        serverPort: '',
        password: ''
      },
      crm: {
        provider: ''
      },
      protocols: [
        'FTP',
        'SFTP'
      ],
      providers: [
        'SalesForce'
      ]
    }
  },

  computed: {
    isFtpButtonDisabled () {
      return !this.ftp.serverHost || !this.ftp.serverPort || !this.ftp.username || !this.ftp.password
    },
    isCrmButtonDisabled () {
      return !this.crm.provider
    }
  }
}
</script>
