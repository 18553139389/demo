import bootstrap from '@lib/Boostrap'
import eventBus from '@lib/eventBus'

export default {
  // Application Constructor
  initialize: function (store) {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this, store), false)
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function (store) {
    this.receivedEvent('deviceready')
    store.dispatch('deviceStatus/UPDATE_MOBILE_DEVICE_STATUS', true)
    /* eslint-disable */
    // StatusBar.hide
    /* eslint-enable */
    // window.open = cordova.InAppBrowser.open
    bootstrap.runMobileApp(store)
  },
  // Update DOM on a Received Event
  receivedEvent: function (id) {
    let devicePlatform = device.platform
    eventBus.$emit('changeRootClass', devicePlatform)
  }
}
