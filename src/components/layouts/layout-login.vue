<template lang='pug'>
  v-app
    v-content
      .login-container
        .login-box
            .logo-container
              img.logo-image(src="/static/images/boundless-logo.png")
              p.tag-line {{ $t('login.welcomeTo') }}
              h3.logo-text  BOUNDLESS
            router-view(:auth="auth", :authenticated="authenticated")
        .login-bg

    activity-indicator(:show="showActivityIndicator")
</template>

<script>
import {mapGetters} from 'vuex'
import leftNavigation from '../layout/left-navigation.vue'
import toolbar from '../layout/toolbar.vue'
import activityIndicator from '../common/activity-indicator.vue'

import AuthService from '@/api/auth0.service'

const auth = new AuthService()
const {login, logout} = auth

export default {
  name: 'LayoutLogin',

  props: ['authenticated', 'auth'],

  computed: {
    ...mapGetters(['showActivityIndicator'])
  },

  components: {
    leftNavigation,
    toolbar,
    activityIndicator
  },

  methods: {
    login,
    logout
  }
}
</script>

<style lang="scss">
.login-container {
  display: flex;
  height: 100%;
  font-family: 'Source Sans Pro', sans-serif;
  background-color: #457ef1;

  .logo-container {
    text-align: center;

    .logo-image {
      max-width: 100%;
      height: auto;
    }

    .tag-line {
      margin-top: 50px;
      margin-bottom: 5px;
      font-weight: 600;
      font-size: 16px;
      color: #0f203f;
      font-family: 'Fira Sans', sans-serif;
    }

    .logo-text {
      text-transform: uppercase;
      font-weight: 400;
      font-size: 30px;
      color: #0f203f;
      letter-spacing: 7px;
      font-family: 'Exo 2', sans-serif;
      font-weight: 500;
    }
  }
}

.login-bg {
  flex: 1;
  background: url('/static/images/background.png') no-repeat center center;
  background-size: cover;
}

.login-box {
  max-width: 600px;
  flex: 1;
  background-color: white;
  padding: 60px 150px;
  max-height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-text {
  margin: 30px 0;
  color: #8797b3;
  font-size: 16px;
  line-height: 1.5;
  text-align: center;
}

.forgot-link {
  color: #8797b3;
  text-decoration: none;
  margin-top: 10px;
}
</style>
