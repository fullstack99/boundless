<template lang="pug">
  v-card
    v-container(grid-list-lg, wrap)
      h4.mb-4 {{ $t('splash.projectMode') }}
      v-divider.mb-4
      p Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      v-divider.mt-4.mb-4
      h4.mb-2 {{ $t('splash.defineNeeds')}}
      v-layout(row)
        v-flex(xs12, sm6)
          v-text-field(v-model='brief', :label="$t('splash.loadBrief')", append-icon="help_outlined")
        v-flex(xs12, sm6)
          v-text-field(v-model='docs', :label="$t('splash.loadDocs')", append-icon="help_outlined")
      v-layout(row)
        v-flex(xs12)
          v-text-field(v-model='message', textarea, :label="$t('splash.yourMessage')", append-icon="help_outlined")
      h4.mb-4.mt-5 {{ $t('splash.howItWorks')}}
      v-divider.mb-4
      p Lorem ipsum dolor sist amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      .item-list
        .item(v-for="item in items", @click="selectItem(item)", :class="{'active': item.id == selectedItem.id}")
          v-icon {{item.icon}}
          p {{item.title}} <br> <small> ( {{item.alt}} ) </small>
      h4.mt-5.mb-4 {{$t('splash.toBeRecalled')}} |  <small>{{$t('splash.makeAnAppointment')}}</small>
      v-divider.mb-4
      v-layout(row)
        v-flex(xs12, sm6)
          v-text-field(v-model='availability', :label="$t('splash.yourAvailability')", append-icon="help_outlined")
        v-flex(xs12, sm6)
          v-text-field(v-model='phone', :label="$t('general.phoneNumber')", append-icon="help_outlined")
      v-layout(row)
        v-flex(xs12)
          v-text-field(v-model='contactMessage', textarea, :label="$t('splash.yourMessage')", append-icon="help_outlined")
      v-flex.text-xs-right.mb-4(xs12)
          v-btn(color="success") Send
    v-card-actions(row)
      v-flex.pr-2.mt-2(sm-2)
        v-btn(@click.native="$emit('back')") Back
      v-flex.text-xs-right.pr-2.mt-2(sm-2)
        v-btn(color="primary", @click.native="$emit('continue')", :disabled="isContinueDisabled") Continue
</template>

<script>
export default {
  props: ['currentStep'],
  data () {
    return {
      brief: '',
      docs: '',
      message: '',
      items: [
        {id: 1, title: this.$t('splash.smallTeam'), alt: this.$t('splash.twoPersons'), icon: 'fas fa-user'},
        {id: 2, title: this.$t('splash.standardTeam'), alt: this.$t('splash.fourPersons'), icon: 'fas fa-users'},
        {id: 3, title: this.$t('splash.customTeam'), alt: this.$t('splash.tailored'), icon: 'fas fa-cut'}
      ],
      selectedItem: {id: null},
      availability: '',
      phone: '',
      contactMessage: ''
    }
  },
  computed: {
    isContinueDisabled () {
      if (this.selectedItem.id) {
        return false
      }

      return true
    }
  },
  methods: {
    selectItem (item) {
      this.selectedItem = item
    }
  }
}
</script>

<style scoped>
  .item-list {
    justify-content: center;
  }
</style>
