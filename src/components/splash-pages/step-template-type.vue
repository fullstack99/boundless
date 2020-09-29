<template lang="pug">
  v-card
    v-layout(row)
      v-flex(xs12)
        v-container(grid-list-lg, wrap)
          h4 {{ $t('splash.addSplashTemplate') }}
          v-layout(row)
            v-flex(xs12, sm6)
              v-text-field(v-model='name', :label="$t(' splash.nameLabel ')", append-icon="help_outlined")
            v-flex(xs12, sm6)
              v-select(:items='groups', v-model='group', :label="$t(' splash.groupLabel ')", append-icon="help_outlined")
    v-divider
    .item-list
      .item(v-for="templateType in splashTemplateTypes", @click="selectSplashTemplateType(templateType)", :class="{'active': templateType.id == selectedSplashTemplateType.id}")
        v-icon {{templateType.icon}}
        p {{$t(templateType.title)}}
    v-divider
    v-card-actions(row)
      v-flex.text-xs-right.pr-2.mt-2(sm-2)
        v-btn(color="primary", @click.native="$emit('continue')", :disabled="isContinueDisabled") Continue
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  props: ['currentStep'],
  data () {
    return {
      name: '',
      group: '',
      groups: ['Etam Global', '> Etam France', '> Etam Romania', '>> Etam Oradea']
    }
  },
  computed: {
    ...mapGetters('splashpage', ['splashTemplateTypes', 'selectedSplashTemplateType']),

    isContinueDisabled () {
      if (this.selectedSplashTemplateType.id && this.name && this.group) {
        return false
      }

      return true
    }
  },
  methods: {
    ...mapActions('splashpage', ['selectSplashTemplateType'])
  }
}
</script>
