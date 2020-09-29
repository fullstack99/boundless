<template lang="pug">
  .page-content
    v-layout.mb-5
      v-flex(xs12, sm12, md6, lg6)
        h2 {{$t('splash.editSplashPage')}}
      v-flex.pb-3(xs6, md6, lg6, text-xs-right)
        v-btn.primary-action(color='primary', @click.stop='showNewSplashDialog = true')
          | {{ $t('splash.addSplash') }}
          v-icon add_circle_outline
    add-splash-dialog(:show="showNewSplashDialog", @close="showNewSplashDialog = false")
</template>

<script>
import addSplashDialog from './add-splash-dialog.vue'

export default {
  name: 'SplashPageEdit',

  components: {
    addSplashDialog
  },

  data () {
    return {
      showNewSplashDialog: false
    }
  }

}
</script>
