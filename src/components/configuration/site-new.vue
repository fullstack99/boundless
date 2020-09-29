<template lang="pug">
  span.d-inline-block
    // open new site modal
    v-btn(icon, @click.stop="openNewSiteModal")
      v-icon location_on

    // new site modal
    v-dialog(v-model='newSiteModal', max-width='768')
      v-stepper(v-model='stepper')
        v-stepper-header
          v-stepper-step(:complete='stepper > 1', step='1') Name of step 1
          v-divider
          v-stepper-step(:complete='stepper > 2', step='2') Name of step 2
          v-divider
          v-stepper-step(step='3') Name of step 3
        v-stepper-items
          v-stepper-content(step='1')
            div.mb-5.py-5
              new-site-modal-step1
            v-btn(color='primary', @click.native='stepper = 2') Continue
            v-btn(flat='') Cancel
          v-stepper-content(step='2')
            div.mb-5.py-5
              new-site-modal-step2
            v-btn(color='primary', @click.native='stepper = 3') Continue
            v-btn(flat='') Cancel
          v-stepper-content(step='3')
            div.mb-5.py-5
              new-site-modal-step3
            v-btn(color='primary') Save
            v-btn(flat='') Cancel
</template>

<script>
import NewSiteModalStep1 from './site-new-step1.vue'
import NewSiteModalStep2 from './site-new-step2.vue'
import NewSiteModalStep3 from './site-new-step3.vue'

export default {
  name: 'NewSiteModal',

  components: {
    NewSiteModalStep1,
    NewSiteModalStep2,
    NewSiteModalStep3
  },

  data () {
    return {
      stepper: 0,
      newSiteModal: ''
    }
  },

  methods: {
    openNewSiteModal () {
      this.newSiteModal = true
    }
  }
}
</script>
