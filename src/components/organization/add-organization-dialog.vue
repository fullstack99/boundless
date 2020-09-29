<template lang="pug">
  base-dialog(:show="show", @close="$emit('close')")
    h2.dialog-heading.mb-3 {{ $t('general.newOrganization') }}
    p {{ $t('organization.description1') }}
    v-layout(row)
      v-flex.py-2.pr-3(xs12 sm6)
        // organization name field
        v-text-field(v-model='orgData.name',
          :label="$t('organization.enterOrganizationName')",
          append-icon="help_outlined"
          :error-messages="nameErrors",
          @input="$v.orgData.name.$touch()",
          @blur="$v.orgData.name.$touch()"
          type="text",
          required
        )
      v-flex.py-2.pl-3(xs12 sm6)
        // region field
        v-select(:items='regionChoices',
          v-model='orgData.region',
          :label="$t('organization.selectRegion')",
          :error-messages="regionErrors",
          @input="$v.orgData.region.$touch()",
          @blur="$v.orgData.region.$touch()"
          append-icon="help_outlined"
          single-line,
          required
        )
    v-layout.mt-3(row)
      v-flex(sm12, text-xs-right)
        v-btn(
          :loading="loading"
          color="success",
          @click="addOrganization", round, large
        ) {{ $t('organization.createOrganization') }}
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {required} from 'vuelidate/lib/validators'

import baseDialog from '@/components/common/base-dialog'
import ErrorHandlerMixin from '@/mixins/error-handler.mixin'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  mixins: [
    ErrorHandlerMixin
  ],

  mounted () {
    this.fetchOrganizationOptions()
  },

  validations: {
    orgData: {
      name: {
        required
      },
      region: {
        required
      }
    }
  },

  data () {
    return {
      currentStep: 0,
      orgData: {
        name: '',
        region: null
      },
      loading: false
    }
  },

  computed: {
    ...mapGetters('organization', ['regionChoices']),
    nameErrors () {
      const errors = []
      if (!this.$v.orgData.name.$dirty) return errors
      !this.$v.orgData.name.required && errors.push('Name is required')
      return errors.length > 0 ? errors : this.getErrorMessages('name')
    },
    regionErrors () {
      const errors = []
      if (!this.$v.orgData.region.$dirty) return errors
      !this.$v.orgData.region.required && errors.push('Region is required')
      return errors
    }
  },

  components: {
    baseDialog
  },

  methods: {
    ...mapActions('organization', ['createOrganization', 'fetchOrganizations', 'fetchOrganizationOptions']),
    addOrganization () {
      this.$v.$touch()

      if (!this.$v.orgData.$invalid) {
        this.loading = true
        this.createOrganization(this.orgData).then(response => {
          const newOrg = response.data.data
          this.$emit('close', newOrg)
          this.loading = false
          this.orgData = {}
          this.$v.orgData.$reset()
        }).catch(err => {
          // `this.setErrorData()` is from ErrorHandlerMixin
          this.setErrorData(err)
          this.loading = false
        })
      }
    }
  }
}
</script>
