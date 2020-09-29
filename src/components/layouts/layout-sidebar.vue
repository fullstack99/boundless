<template lang='pug'>
  v-app.layout-sidebar(v-if="!loading")
      left-navigation(:menu="menu")

      toolbar
      toolbar-bottom(:menu="menu", v-if="menu.length")

      v-content
        v-container.main-container(fluid, :loading="loading", v-if="!loading")
          v-layout
            router-view(:auth="auth", :authenticated="authenticated")
      v-footer(app)

      activity-indicator(:show="showActivityIndicator")
  // Loading screen
  v-app(v-else)
    v-container.main-container(fill-height)
      v-layout(align-center, justify-center, fill-height)
        v-progress-circular(:size="50" indeterminate color="primary")
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import leftNavigation from '../layout/left-navigation.vue'
import toolbar from '../layout/toolbar.vue'
import toolbarBottom from '../layout/toolbar-bottom.vue'
import activityIndicator from '../common/activity-indicator.vue'

import AuthService from '@/api/auth0.service'

const auth = new AuthService()
const {login, logout} = auth

export default {
  name: 'LayoutSidebar',

  props: ['authenticated', 'auth'],

  data () {
    return {
      loading: true
    }
  },

  computed: {
    ...mapGetters(['showActivityIndicator', 'menu'])
  },

  components: {
    leftNavigation,
    toolbar,
    toolbarBottom,
    activityIndicator
  },

  methods: {
    ...mapActions(['bootstrap', 'fetchMenu']),
    login,
    logout
  },

  mounted () {
    this.bootstrap().then(() => {
      this.loading = false
    })

    if (this.fetchMenu.length < 1) {
      this.fetchMenu()
    }
  }

}
</script>

<style lang="scss">

.layout-sidebar {
  // Add strict padding-top because Vuetify doesn't size the content with 2 toolbars properly
  .content {
    padding-top: 180px !important;
  }

  .main-container {
    padding-left: 95px;
    padding-right: 95px;
  }

  .page-content {
    width: 100%;
    margin-top: 55px;

    &.no-margin {
      margin-top: 0;
    }
  }
}

</style>
