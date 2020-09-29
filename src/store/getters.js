export default {
  currentUser: state => state.currentUser,
  serverRegistrationErrorMessage: state => state.serverRegistrationErrorMessage,
  serverRegistrationSuccessMessage: state => state.serverRegistrationSuccessMessage,
  serverLoginErrorMessage: state => state.serverLoginErrorMessage,
  serverResetPassErrorMessage: state => state.serverResetPassErrorMessage,
  serverResetPassSuccessMessage: state => state.serverResetPassSuccessMessage,
  passwordResetResult: state => state.passwordResetResult,
  groupAndSiteFileStructure: state => state.groupAndSiteFileStructure,
  equipmentDetails: state => state.equipmentDetails,
  tagsMenu: state => state.tagsMenu,
  moveMenu: state => state.moveMenu,
  drawer: state => state.drawer,
  notificationPanel: state => state.notificationPanel,
  devices: state => state.devices,
  users: state => state.users,
  organizations: state => state.organizations,
  wifiAuthorizationListing: state => state.wifiAuthorizationListing,
  countries: state => state.countries,
  menu: state => state.menu,
  isMobile: state => state.isMobile,
  pointerIsTouch: state => state.pointerIsTouch,
  windowSize: state => state.windowSize,
  showActivityIndicator: state => state.showActivityIndicator,
  route: state => state.route,
  splashPages: state => state.splashPages,
  splashTemplateTypes: state => state.splashTemplateTypes,
  selectedSplashTemplateType: state => state.selectedSplashTemplateType,
  campaigns: state => state.campaigns
}
