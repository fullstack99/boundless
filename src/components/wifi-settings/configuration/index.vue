<template lang="pug">
  v-container
    v-layout(row)
      v-flex(xs12)
        v-card.pa-3
          div.square-link-wrapper
            h4 {{ $t('wifi.openWifi') }}
            h4 {{ $t('wifi.securedWifi') }}

          div.square-link-wrapper
            div.square-link
              router-link(:to="{name: 'WifiConfigurationGuest'}")
                h4 {{ $t('wifi.guestWifi') }}
            div.square-link
              router-link(:to="{name: 'WifiConfigurationTicket'}")
                h4 {{ $t('wifi.accessTicket') }}
            div.square-link
              router-link(:to="{name: 'WifiConfigurationMultipleAccess'}")
                h4 {{ $t('wifi.multipleAccess') }}
            div.square-link
              router-link(:to="{name: 'WifiConfigurationSponsors'}")
                h4 {{ $t('wifi.sponsors') }}
          v-divider.my-5
          router-view
</template>

<script>
export default {
  name: 'WifiConfiguration'
}
</script>

<style lang="sass" scoped>
  .square-link-wrapper
    padding: 0
    margin: 0
    list-style: none

    display: -webkit-box
    display: -moz-box
    display: -ms-flexbox
    display: -webkit-flex
    display: flex

    -webkit-flex-flow: row wrap
    justify-content: flex-start

    > *
      width: 150px

      display: -webkit-box
      display: -moz-box
      display: -ms-flexbox
      display: -webkit-flex
      display: flex

      padding: 5px
      margin: 0 10px 0 0
      font-weight: bold
      font-size: 16px

      &:first-child
        margin: 0 100px 0 0

  .square-link
    height: 150px
    color: #888
    background: #eee
    border: 1px solid #ddd
    border-radius: 5px

    align-items: center
    text-align: center
    justify-content: center
</style>
