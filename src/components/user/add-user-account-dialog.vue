<template lang="pug">
  base-dialog(:show='show', @close="$emit('close')")
    v-layout(row)
      v-flex(sm11)
        h2.dialog-heading.px-2.py-3 {{ $t('user.newUserAccountCreation') }}
    v-divider
    v-layout(row)
      v-flex(xs12)
        v-container(grid-list-lg, wrap)
          v-layout(row)
            v-flex(xs12)
              | {{ $t('etc.loremShort') }}
    v-divider
    v-layout.px-4(row)
      v-flex.px-1(xs12, sm6)
        v-text-field(v-model='password', :label="$t(' general.password ')", append-icon="help_outlined", required)
      v-flex.px-1(xs12, sm6)
        v-text-field(v-model='confirmPassword', :label="$t(' general.confirmPassword ')", append-icon="help_outlined", required)
    v-layout.px-4(row)
      v-flex.px-1(xs12, sm6)
        v-text-field(v-model='company', :label="$t(' general.company ')", append-icon="help_outlined")
      v-flex.px-1(xs12, sm6)
        v-text-field(v-model='role', :label="$t(' general.function ')", append-icon="help_outlined")
    v-layout.px-4(row)
      v-flex.px-1(xs12, sm6)
        v-text-field(v-model='phoneNumber', :label="$t(' general.mobile ')", append-icon="help_outlined")
      v-flex.px-1(xs12, sm6)
        v-select(:items='languages', v-model='language', :label="$t(' general.language ')")

    v-layout(row)
      v-flex.text-xs-right.pb-3.pr-2(sm-2)
        v-btn(color='success', @click.stop='addNewUserAccount') {{ $t('general.create') }}
</template>

<script>
import baseDialog from '@/components/common/base-dialog'

export default {
  props: ['show'],
  data () {
    return {
      password: '',
      confirmPassword: '',
      company: '',
      role: '',
      phoneNumber: '',
      language: '',
      languages: ['Romanian', 'French', 'English']
    }
  },
  components: {
    baseDialog
  }
}
</script>
