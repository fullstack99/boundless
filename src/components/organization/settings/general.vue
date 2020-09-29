<template lang="pug">
  .general
    v-btn.primary-action(color='primary')
      | {{ $t('general.save') }}
      v-icon save
    v-layout(row)
      v-flex.mr-2(xs12, md6)
        h3.small-heading.py-3 {{ $t('organization.uploadYourLogo') }}
        .form-card.text-xs-center
          v-tooltip(top)
            image-upload(slot="activator", :img="this.currentLogo", :tile="true", @change="processLogo($event)")
            span {{ $t('organization.selectNewLogo') }}
          br
          v-progress-circular.mt-2(v-if="uploadingLogo", indeterminate, color="primary")
          v-btn(
            v-else, v-show="this.currentLogo", color="error", round, small, @click="removeLogo",
            :loading="removingLogo"
          ) {{ $t('organization.removeLogo') }}
          input(ref="inputLogo", hidden, accept="image/*", type="file", @change="processLogo($event)")

      v-flex.ml-2(xs12, md6)
        h3.py-3.small-heading {{ $t(' general.mobileApps ') }}
        .card.form-card
          v-layout(row)
            v-flex(xs12 md6)
              v-text-field.mr-3(:name="$t('organization.googleID')", :label="$t('organization.googleID')", append-icon="help_outlined")
            v-flex(xs12 md6)
              v-text-field.ml-3(:name="$t('organization.iOSID')", :label="$t('organization.iOSID')", append-icon="help_outlined")

    v-layout.mt-5(row)
      v-flex.mr-2(xs12, md6)
        h3.small-heading.py-3.error--text {{$t('general.dangerZone')}}
        .form-card.small.danger
          v-layout(row, align-center)
            v-flex(xs7)
              p {{$t('organization.deleteOrganizationText')}}
            v-flex.text-xs-right(xs5)
              v-btn(
                color="error", round, @click="showDeleteConfirmation"
              ) {{$t('organization.deleteThisOrganization')}}
      v-flex.ml-2(xs12, md6)

    confirm-delete(ref="confirm")

    v-dialog(
      v-model="deletingOrganization", persistent, width="300", content-class="deleting-org"
    )
      v-card(color="primary", dark)
        v-card-text {{ $t('organization.deletingOrganization') }}...
          v-progress-linear(indeterminate, color="white", calss="mb-0")
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import ConfirmDelete from '@/components/common/confirm-delete'
import ImageUpload from '@/components/common/image-upload'

export default {
  data () {
    return {
      selectedFile: null,
      removingLogo: false,
      uploadingLogo: false,
      deletingOrganization: false
    }
  },
  components: {
    ConfirmDelete,
    ImageUpload
  },
  computed: {
    ...mapGetters('organization', ['selectedOrganization']),
    currentLogo () {
      return this.selectedFile || this.selectedOrganization.logo
    }
  },
  methods: {
    ...mapActions('organization', ['deleteOrganization', 'updateOrganization', 'uploadOrganizationLogo']),
    removeLogo () {
      this.removingLogo = true
      const orgData = {
        orgId: this.selectedOrganization.id,
        data: {
          logo: null
        }
      }
      this.updateOrganization(orgData).then(response => {
        this.selectedFile = null
        this.removingLogo = false
      }).catch(err => {
        this.removingLogo = false
        console.log(err)
      })
    },
    showDeleteConfirmation () {
      const options = {
        color: 'error',
        width: 500,
        confirmText: `${this.$t('organization.deleteResponse')} ${this.selectedOrganization.name}`,
        deleteButtonText: this.$t('organization.deleteThisOrganizationPermanently')
      }
      this.$refs.confirm.open('', options).then((confirm) => {
        if (confirm) {
          this.deletingOrganization = true
          this.deleteOrganization(this.selectedOrganization.id).then(response => {
            setTimeout(() => (window.location = '/'), 500)
          }).catch(err => {
            global.toastr['error'](this.$t('general.errorOccurred'), this.$t('general.error'))
            this.deletingOrganization = false
            console.log(err)
          })
        }
      })
    },
    previewSelectedFile (selectedFile) {
      /*
         Enables preview of the selected file even if
         the upload is not finished yet.
      */
      const fileReader = new FileReader()
      fileReader.onload = (event) => {
        this.selectedFile = event.target.result
      }
      fileReader.readAsDataURL(selectedFile)
    },
    processLogo (selectedFile) {
      this.uploadingLogo = true
      this.previewSelectedFile(selectedFile)

      const data = {
        orgId: this.selectedOrganization.id,
        logo: selectedFile
      }
      this.uploadOrganizationLogo(data).then(response => {
        this.uploadingLogo = false
        this.selectedFile = null
      }).catch(err => {
        this.uploadingLogo = false
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss">
  .avatar {
    cursor: pointer;
  }
  .dialog.deleting-org {
    background-color: transparent !important;
    box-shadow: none;
    -webkit-box-shadow: none;
  }
</style>
